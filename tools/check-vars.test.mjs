import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { basename, dirname, join } from 'node:path';
import { mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { test } from 'node:test';

const checker = readFileSync(new URL('./check-vars.mjs', import.meta.url), 'utf8');
const defaults = {
  '--primary-color': '#123456',
  '--accent-color': 'var(--primary-color)',
  '--font-serif': '"Georgia"',
  '--font-sans-serif': 'var(--font-serif), serif',
};
const baseCss = ':root { --shared: #abcdef; }\n#write { color: var(--accent-color); font-family: var(--font-sans-serif); }';

function theme(overrides = {}) {
  return ':root {\n' + Object.entries({ ...defaults, ...overrides })
    .map(([name, value]) => `  ${name}: ${value};`).join('\n') + '\n}';
}

function runFixture({ first = theme(), second = theme(), base = baseCss, empty = false } = {}) {
  const parent = realpathSync(tmpdir());
  const directory = mkdtempSync(join(parent, 'fusion-vars-test-'));
  try {
    mkdirSync(join(directory, 'tools'));
    mkdirSync(join(directory, 'fusion-dark', 'base'), { recursive: true });
    writeFileSync(join(directory, 'tools', 'check-vars.mjs'), checker);
    writeFileSync(join(directory, 'fusion-dark', 'base', 'foundation.css'), base);
    if (!empty) {
      writeFileSync(join(directory, 'fusion-one.css'), first);
      writeFileSync(join(directory, 'fusion-two.css'), second);
    }
    const result = spawnSync(process.execPath, [join(directory, 'tools', 'check-vars.mjs')], {
      cwd: directory, encoding: 'utf8', timeout: 5000,
    });
    assert.ifError(result.error);
    return { status: result.status, output: result.stdout + result.stderr };
  } finally {
    const target = realpathSync(directory);
    assert.equal(dirname(target), parent);
    assert.ok(basename(target).startsWith('fusion-vars-test-'));
    rmSync(target, { recursive: true, force: true });
  }
}

const cases = [
  ['valid theme aliases', {}, 0, /校验通过/],
  ['missing font alias reproduces the review finding', {
    first: theme({ '--font-sans-serif': 'var(--missing-font), serif' }),
  }, 1, /fusion-one\.css:\d+.*--font-sans-serif.*--missing-font/],
  ['transitive missing alias includes its chain', {
    first: theme({ '--font-serif': 'var(--missing-font)' }),
  }, 1, /--font-sans-serif.*--font-serif.*--missing-font/],
  ['self reference', {
    first: theme({ '--accent-color': 'var(--accent-color)' }),
  }, 1, /循环引用.*--accent-color.*--accent-color/],
  ['multi-token cycle', {
    first: theme({ '--primary-color': 'var(--accent-color)' }),
  }, 1, /循环引用.*--primary-color.*--accent-color.*--primary-color/],
  ['cycle in an unused fallback is invalid', {
    first: theme({ '--accent-color': 'var(--primary-color, var(--accent-color))' }),
  }, 1, /循环引用.*--accent-color/],
  ['literal fallback handles a missing optional token', {
    first: theme({ '--accent-color': 'var(--optional, #abcdef)' }),
  }, 0, /校验通过/],
  ['nested fallback resolves through a function', {
    first: theme({ '--accent-color': 'var(--optional, color-mix(in srgb, var(--primary-color), transparent))' }),
  }, 0, /校验通过/],
  ['unresolved nested fallback fails', {
    first: theme({ '--accent-color': 'var(--optional, var(--also-missing))' }),
  }, 1, /fusion-one\.css:\d+.*--accent-color.*--also-missing/],
  ['unused missing fallback is permitted', {
    first: theme({ '--accent-color': 'var(--primary-color, var(--also-missing))' }),
  }, 0, /校验通过/],
  ['empty fallback is permitted', {
    first: theme({ '--accent-color': 'var(--optional,)' }),
  }, 0, /校验通过/],
  ['initial triggers a valid fallback', {
    first: theme({ '--primary-color': 'initial', '--accent-color': 'var(--primary-color, #abcdef)' }),
  }, 0, /校验通过/],
  ['initial triggers an unresolved fallback', {
    first: theme({ '--primary-color': 'initial', '--accent-color': 'var(--primary-color, var(--missing))' }),
  }, 1, /fusion-one\.css:\d+.*--accent-color.*--missing/],
  ['initial cannot satisfy a required reference', {
    first: theme({ '--primary-color': 'initial' }),
  }, 1, /fusion-one\.css:\d+.*--accent-color.*--primary-color/],
  ['comments and quoted text are not references or declarations', {
    first: '/* :root { --fake: var(--unknown); } */\n' + theme({
      '--font-serif': '"Literal var(--unknown); } /* text */"',
      '--accent-color': 'var(/* ignored */ --primary-color)',
    }),
  }, 0, /校验通过/],
  ['commented definition cannot satisfy a theme reference', {
    first: theme({ '--accent-color': 'var(--fake)' }),
    base: baseCss + '\n/* :root { --fake: #abcdef; } */',
  }, 1, /fusion-one\.css:\d+.*--accent-color.*--fake/],
  ['element-local base token cannot satisfy a root theme alias', {
    first: theme({ '--accent-color': 'var(--local-only)' }),
    base: baseCss + '\n#write { --local-only: #abcdef; }',
  }, 1, /fusion-one\.css:\d+.*--accent-color.*--local-only/],
  ['base root token can satisfy a theme alias', {
    first: theme({ '--accent-color': 'var(--shared)' }),
  }, 0, /校验通过/],
  ['last root declaration wins', {
    first: theme({ '--accent-color': 'var(--missing)' }) + '\n:root { --accent-color: #abcdef; }',
  }, 0, /校验通过/],
  ['last root declaration can introduce a missing reference', {
    first: theme() + '\n:root { --accent-color: var(--missing); }',
  }, 1, /fusion-one\.css:\d+.*--accent-color.*--missing/],
  ['important declaration takes precedence over later normal declaration', {
    first: theme({ '--accent-color': '#abcdef !important' }) + '\n:root { --accent-color: var(--missing); }',
  }, 0, /校验通过/],
  ['parity gate still rejects different theme token sets', {
    first: theme().replace('  --accent-color: var(--primary-color);\n', ''),
  }, 1, /缺少|多出/],
  ['base required-variable gate still works', {
    base: baseCss + '\n#write { border-color: var(--missing-base); }',
  }, 1, /引用未定义变量.*--missing-base/],
  ['base fallback remains permitted', {
    base: baseCss + '\n#write { border-color: var(--optional, #abcdef); }',
  }, 0, /校验通过/],
  ['missing theme files fail with an actionable message', {
    empty: true,
  }, 1, /未找到.*fusion-.*\.css/],
];

for (const [name, fixture, expectedStatus, diagnostic] of cases) {
  test(name, () => {
    const result = runFixture(fixture);
    assert.equal(result.status, expectedStatus, result.output);
    assert.match(result.output, diagnostic);
  });
}
