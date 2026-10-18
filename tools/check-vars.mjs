#!/usr/bin/env node
/*
 * check-vars.mjs — Fusion 主题变量完整性 / 无残留校验(零依赖)
 *
 * 用法: node tools/check-vars.mjs
 * 回归测试: node --test tools/check-vars.test.mjs
 *
 * 硬门禁(失败则 exit 1):
 *  1. 奇偶校验:全部 fusion-*.css 主题变体的 :root 必须定义完全相同的 --变量名集合(值可不同)。
 *  2. 完整性:base 各 css 中无 fallback 的 var(--X) 必须能解析到——主题公共变量 / base 自定义变量 / Typora 内置白名单。
 *  3. 主题引用:逐主题检查 :root 值的传递引用与循环,正确处理 fallback。
 *     仅使用主题 / base 的 :root 定义,元素局部变量不能满足主题引用。
 *
 * 报告(不致失败,追踪手绘迁移进度):
 *  - 残留 --glow-* 定义 / 用法
 *  - 残留 backdrop-filter(玻璃)
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// 动态发现主题变体(仓库根 fusion-*.css)与 base 分节文件(排除仅含 @import 的清单 base.css)
const themeFiles = readdirSync(root).filter((f) => /^fusion-.*\.css$/.test(f)).sort();
const baseDir = join(root, 'fusion-dark', 'base');
const baseFiles = readdirSync(baseDir).filter((f) => f.endsWith('.css')).sort();

if (!themeFiles.length) {
  console.error('校验失败 ✗: 未找到主题文件 fusion-*.css');
  process.exit(1);
}

// base 可引用但主题不定义的 Typora 内置变量白名单
const BUILTIN = new Set([]);

function read(p) {
  return readFileSync(p, 'utf8');
}

// 屏蔽注释和字符串,保留长度与换行,避免示例 / SVG / 字体名被当作代码。
function codeOnly(css) {
  return css.replace(/\/\*[\s\S]*?\*\/|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g,
    (text) => text.replace(/[^\r\n]/g, ' '));
}

// 仓库约定 :root 无 CSS 嵌套;按顶层分号读取声明,保留最后生效的定义与行号。
function rootVarDefinitions(css) {
  const definitions = new Map();
  const code = codeOnly(css);
  const re = /:root\s*\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(code))) {
    const body = m[1];
    let start = 0;
    let depth = 0;
    for (let i = 0; i <= body.length; i++) {
      if (body[i] === '(' || body[i] === '[') depth++;
      if (body[i] === ')' || body[i] === ']') depth--;
      if (i < body.length && (body[i] !== ';' || depth !== 0)) continue;
      const declaration = body.slice(start, i);
      const d = /^\s*(--[a-zA-Z0-9-]+)\s*:([\s\S]*)$/.exec(declaration);
      if (d) {
        const important = /!\s*important\s*$/i.test(d[2]);
        const offset = m.index + m[0].indexOf('{') + 1 + start + declaration.indexOf(d[1]);
        if (important || !definitions.get(d[1])?.important) {
          definitions.set(d[1], { value: d[2], important, line: css.slice(0, offset).split('\n').length });
        }
      }
      start = i + 1;
    }
  }
  return definitions;
}

// 每个调用保留自己的 fallback;逗号后的整个值都是 fallback,包括嵌套函数。
function varReferences(value) {
  const code = codeOnly(value);
  const calls = [];
  const re = /(?<![a-zA-Z0-9_-])var\(\s*(--[a-zA-Z0-9-]+)\s*([,)])/gi;
  let m;
  while ((m = re.exec(code))) {
    const fallbackStart = re.lastIndex;
    let end = code.indexOf('(', m.index) + 1;
    let depth = 1;
    while (end < code.length && depth) {
      if (code[end] === '(') depth++;
      if (code[end] === ')') depth--;
      if (depth) end++;
    }
    calls.push({
      name: m[1],
      fallback: m[2] === ',' ? varReferences(code.slice(fallbackStart, end)) : null,
      invalid: depth !== 0,
    });
    re.lastIndex = end + 1;
  }
  return calls;
}

function themeReferenceErrors(theme, baseRoots) {
  const definitions = new Map([...baseRoots, ...theme.definitions]);
  const references = new Map([...definitions].map(([name, d]) => [name, varReferences(d.value)]));
  const errors = [];
  const visited = new Set();
  const cyclic = new Set();
  const path = [];

  // CSS 变量规范要求 fallback 中的引用也参与循环检测,即使该 fallback 未使用。
  // https://www.w3.org/TR/css-variables-1/#cycles
  function visitCalls(calls, origin) {
    for (const call of calls) {
      visit(call.name, origin);
      if (call.fallback !== null) visitCalls(call.fallback, origin);
    }
  }
  function visit(name, origin) {
    const index = path.indexOf(name);
    if (index >= 0) {
      path.slice(index).forEach((v) => cyclic.add(v));
      errors.push(`${theme.file}:${theme.definitions.get(origin).line} 循环引用: ${[...path, name].join(' → ')}`);
      return;
    }
    if (visited.has(name) || !definitions.has(name)) return;
    path.push(name);
    visitCalls(references.get(name), origin);
    path.pop();
    visited.add(name);
  }
  for (const name of theme.definitions.keys()) visit(name, name);

  const resolved = new Map();
  const resolving = new Set();
  function resolveCalls(calls) {
    for (const call of calls) {
      if (call.invalid) return { kind: '无效 var()', chain: [call.name] };
      let failure = resolve(call.name);
      if (failure && call.fallback !== null) failure = resolveCalls(call.fallback);
      if (failure) return failure;
    }
    return null;
  }
  function resolve(name) {
    if (BUILTIN.has(name)) return null;
    if (!definitions.has(name)) return { kind: '引用未定义变量', chain: [name] };
    if (cyclic.has(name) || resolving.has(name)) return { kind: '循环引用', chain: [name] };
    if (resolved.has(name)) return resolved.get(name);
    // initial 声明本身合法,但引用它时必须走 fallback。
    if (/^\s*initial\s*(?:!\s*important\s*)?$/i.test(definitions.get(name).value)) {
      return { kind: '引用无效初始值', chain: [name] };
    }
    resolving.add(name);
    const failure = resolveCalls(references.get(name));
    resolving.delete(name);
    const result = failure ? { ...failure, chain: [name, ...failure.chain] } : null;
    resolved.set(name, result);
    return result;
  }
  for (const [name, definition] of theme.definitions) {
    if (cyclic.has(name) || !references.get(name).length) continue;
    const failure = resolve(name);
    if (failure) errors.push(`${theme.file}:${definition.line} ${failure.kind}: ${failure.chain.join(' → ')}`);
  }
  return errors;
}

// 提取任意作用域的 --变量名定义(:root 与元素局部自定义属性都算)
function allVarDefs(css) {
  const names = new Set();
  const code = codeOnly(css);
  const re = /(--[a-zA-Z0-9-]+)\s*:/g;
  let m;
  while ((m = re.exec(code))) names.add(m[1]);
  return names;
}

// 提取无 fallback 的 var(--X) 用法(闭括号紧跟,即无逗号)
function requiredVarUsages(css) {
  const names = new Set();
  const code = codeOnly(css);
  const re = /var\(\s*(--[a-zA-Z0-9-]+)\s*\)/g;
  let m;
  while ((m = re.exec(code))) names.add(m[1]);
  return names;
}

let failed = false;
const line = '─'.repeat(60);

// --- 1. 奇偶校验 ---
const themeSets = themeFiles.map((file) => {
  const css = read(join(root, file));
  const definitions = rootVarDefinitions(css);
  return { file, css, definitions, vars: new Set(definitions.keys()) };
});
const reference = themeSets[0];
console.log(`\n[奇偶校验] 主题变体 ${themeFiles.length} 个,以 ${reference.file}(${reference.vars.size} 变量)为基准`);
for (const t of themeSets.slice(1)) {
  const missing = [...reference.vars].filter((v) => !t.vars.has(v));
  const extra = [...t.vars].filter((v) => !reference.vars.has(v));
  if (missing.length || extra.length) {
    failed = true;
    if (missing.length) console.error(`  ✗ ${t.file} 缺少: ${missing.join(', ')}`);
    if (extra.length) console.error(`  ✗ ${t.file} 多出: ${extra.join(', ')}`);
  }
}
if (!failed) console.log(`  ✓ 全部主题 :root 变量名一致`);

// --- 2. 完整性 ---
const themeCommon = new Set([...reference.vars].filter((v) => themeSets.every((t) => t.vars.has(v))));
const baseCss = baseFiles.map((f) => read(join(baseDir, f)));
const baseDefined = new Set();
baseCss.forEach((css) => allVarDefs(css).forEach((v) => baseDefined.add(v)));
const resolvable = new Set([...themeCommon, ...baseDefined, ...BUILTIN]);
console.log(`\n[完整性] 扫描 base ${baseFiles.length} 个文件的无 fallback var() 用法`);
let undefinedCount = 0;
baseFiles.forEach((f, i) => {
  const used = requiredVarUsages(baseCss[i]);
  const undef = [...used].filter((v) => !resolvable.has(v));
  if (undef.length) {
    failed = true;
    undefinedCount += undef.length;
    console.error(`  ✗ base/${f} 引用未定义变量: ${undef.join(', ')}`);
  }
});
if (!undefinedCount) console.log(`  ✓ base 全部无 fallback var() 均可解析`);

// --- 3. 主题值的传递引用与循环 ---
const baseRoots = new Map(baseCss.flatMap((css) => [...rootVarDefinitions(css)]));
console.log(`\n[主题引用] 检查 ${themeSets.length} 个主题的 :root 引用链与循环`);
let themeErrorCount = 0;
for (const theme of themeSets) {
  const errors = themeReferenceErrors(theme, baseRoots);
  themeErrorCount += errors.length;
  for (const error of errors) console.error(`  ✗ ${error}`);
}
if (themeErrorCount) failed = true;
else console.log('  ✓ 全部主题引用链均可解析,无循环引用');

// --- 4. 残留报告(不致失败) ---
const allFiles = [
  ...themeSets.map((t) => ({ label: t.file, css: t.css })),
  ...baseFiles.map((f, i) => ({ label: `base/${f}`, css: baseCss[i] })),
];
const glow = allFiles.filter((x) => /--glow-/.test(x.css)).map((x) => x.label);
const glass = allFiles.filter((x) => /backdrop-filter\s*:/.test(x.css)).map((x) => x.label);
console.log(`\n[残留报告] 手绘迁移进度追踪(不影响门禁)`);
console.log(`  --glow-* 残留于: ${glow.length ? glow.join(', ') : '无'}`);
console.log(`  backdrop-filter 残留于: ${glass.length ? glass.join(', ') : '无'}`);

console.log(`\n${line}`);
if (failed) {
  console.error('校验失败 ✗');
  process.exit(1);
}
console.log('校验通过 ✓');
