#!/usr/bin/env node
/*
 * check-vars.mjs — Fusion 主题变量完整性 / 无残留校验(零依赖)
 *
 * 用法: node tools/check-vars.mjs
 *
 * 硬门禁(失败则 exit 1):
 *  1. 奇偶校验:全部 fusion-*.css 主题变体的 :root 必须定义完全相同的 --变量名集合(值可不同)。
 *  2. 完整性:base 各 css 中无 fallback 的 var(--X) 必须能解析到——主题公共变量 / base 自定义变量 / Typora 内置白名单。
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
const themeFiles = readdirSync(root).filter((f) => /^fusion-.*\.css$/.test(f));
const baseDir = join(root, 'fusion-dark', 'base');
const baseFiles = readdirSync(baseDir).filter((f) => f.endsWith('.css'));

// base 可引用但主题不定义的 Typora 内置变量白名单
const BUILTIN = new Set([]);

function read(p) {
  return readFileSync(p, 'utf8');
}

// 提取 :root { ... } 内定义的 --变量名集合(:root 内无嵌套花括号)
function rootVarNames(css) {
  const names = new Set();
  const re = /:root\s*\{([\s\S]*?)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const dre = /(--[a-zA-Z0-9-]+)\s*:/g;
    let d;
    while ((d = dre.exec(m[1]))) names.add(d[1]);
  }
  return names;
}

// 提取任意作用域的 --变量名定义(:root 与元素局部自定义属性都算)
function allVarDefs(css) {
  const names = new Set();
  const re = /(--[a-zA-Z0-9-]+)\s*:/g;
  let m;
  while ((m = re.exec(css))) names.add(m[1]);
  return names;
}

// 提取无 fallback 的 var(--X) 用法(闭括号紧跟,即无逗号)
function requiredVarUsages(css) {
  const names = new Set();
  const re = /var\(\s*(--[a-zA-Z0-9-]+)\s*\)/g;
  let m;
  while ((m = re.exec(css))) names.add(m[1]);
  return names;
}

let failed = false;
const line = '─'.repeat(60);

// --- 1. 奇偶校验 ---
const themeSets = themeFiles.map((f) => ({ file: f, vars: rootVarNames(read(join(root, f))) }));
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

// --- 3. 残留报告(不致失败) ---
const allFiles = [
  ...themeFiles.map((f) => ({ label: f, css: read(join(root, f)) })),
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
