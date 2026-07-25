# Fusion Typora Theme — 项目上下文

> 本文件是项目的**单一事实源**，涵盖架构、编码规范、开发流程与禁止事项。

## 项目概览

为 [Typora](https://typora.io/) Markdown 编辑器打造的 CSS 主题集，融合了：

- **Zeus** 侧栏设计（VS Code 风暗色面板）
- **Phycat** 内容区设计（玻璃拟态、霓虹发光、丰富动画）
- 多种配色方案（Dark Orange、Teal、Gruvbox、Academic Dark Nord）

项目**无构建系统、无包管理器、无 JavaScript**，完全由纯 CSS 构成。

---

## 仓库结构

```
typora-fusion-dark-theme/
├── fusion-dark/
│   ├── base.css                  # @import manifest（19 行，按原 section 顺序引入 base/，勿改顺序）
│   ├── base/                     # 共享基础样式（按职责拆为 8 文件，所有主题复用）
│   │   ├── foundation.css        # 字体 / Base / 内容区布局 / 段落（原 §1–4）
│   │   ├── content-text.css      # 标题 / 分隔线 / 链接 / 行内样式（原 §5–9）
│   │   ├── content-blocks.css    # 引用 / 列表 / 任务 / 表格 / 图片 / Kbd / YAML / Alerts / TOC / 脚注
│   │   ├── code.css              # 围栏代码块 / 语法高亮 / 行内代码 / 代码提示
│   │   ├── ui-shell.css          # 侧栏 / 大纲 / 弹窗 / 菜单 / 设置 / 导出栏
│   │   ├── media-extensions.css  # 数学 / Mermaid / 原生 HTML 块
│   │   ├── chrome-behavior.css   # 专注模式 / 滚动条 / 输入按钮 / 光标 / 表格调整
│   │   └── export.css            # 打印 / 移动导出
│   ├── CascadiaCode.woff2        # 内置等宽字体
│   └── LXGWWenKai-Regular.ttf   # 内置中文衬线字体
├── fusion-dark-orange.css        # Dark + Orange 主题（变量层）
├── fusion-teal.css               # Dark + Teal 深色青碧主题（变量层）
├── fusion-gruvbox.css            # Gruvbox Dark 护眼主题（变量层）
├── fusion-academic-dark.css      # Academic Dark (Nord Polar Night) 学术深色主题（变量层）
├── README.md                     # 中文文档
├── README_en.md                  # 英文文档
└── CLAUDE.md                     # 本文件
```

---

## 架构：变量层 + 基础样式层

```
┌──────────────────────────┐
│  fusion-dark-orange.css  │  ← 主题变量层（~160 行）
│  fusion-teal.css         │    仅定义 :root CSS 自定义属性
│  fusion-gruvbox.css      │    通过 @import 引入 base.css
│  fusion-academic-dark.css│
└────────┬─────────────────┘
         │ @import url("fusion-dark/base.css")
         ▼
┌──────────────────────┐
│  fusion-dark/base.css│  ← @import manifest（19 行，按原 section 顺序）
└────────┬─────────────┘    ⚠ 同特异性规则按 import 顺序解析，勿改顺序
         ▼
┌──────────────────────┐
│  fusion-dark/base/   │  ← 共享基础样式层（8 文件，~1800 行）
│  foundation … export │    所有选择器、布局、动画
│                      │    颜色全部通过 var() 引用
└──────────────────────┘
```

### 修改规则

| 需求 | 修改文件 |
|---|---|
| 调整某个主题的颜色/色调 | 对应主题的 `fusion-*.css` |
| 新增所有主题共享的变量 | 所有 `fusion-*.css` 中的 `:root`（共 4 个文件） |
| 修改结构/布局/选择器 | `fusion-dark/base/` 下对应分文件（`base.css` 仅 manifest，勿直接写样式） |
| 新增主题变体 | 创建新的 `fusion-<name>.css`，`@import` base.css 并定义完整变量集 |

---

## base.css Section 排列顺序

> 下列 Section 原属单文件 base.css；现已按职责拆分到 `base/` 的 8 个分文件（见各文件头注释与上方「仓库结构」）。Section 编号仅供定位，不再对应单一文件。

样式表使用块注释将各部分清晰分隔：

```css
/* ======================== Section Name ======================== */
```

| # | Section | 说明 |
|---|---|---|
| 1 | Fonts | `@font-face` 内置字体声明 |
| 2 | Base | `html`、`body`、`::selection` |
| 3 | Content Area Layout | `#write` 容器（无 max-width 限制）、纹理叠层 |
| 4 | Paragraph | 段落字体与间距 |
| 5 | Headings | H1 居中标题 + H2–H6 逐级差异化(两色调渐变 + 每级不同手绘装饰) |
| 6 | Horizontal Rule | 动态菱形中心装饰分隔线 |
| 7 | Links | 图标前缀 + 霓虹悬停 |
| 8 | Blockquote | 圆角卡片 + Emoji 装饰 |
| 9 | Inline Styles | `strong`、`em`、`mark`、`del` |
| 10 | Lists | 无序/有序列表 + 垂直连接线 |
| 11 | Task List | 动态圆形复选框 |
| 12 | Code Blocks | macOS 交通灯头部、Dracula 背景、CodeMirror 覆盖 |
| 13 | Syntax Tokens | `.cm-*` 颜色分配 |
| 14 | Inline Code | 徽章样式 + 弹性悬停 |
| 15 | Tables | 玻璃拟态 + 单元格悬停高亮 |
| 16 | Images | 圆角 + 悬停缩放 |
| 17 | Kbd | 3D 键帽 + 按下动画 |
| 18 | YAML Front Matter | 虚线边框卡片 + 浮动徽签 |
| 19 | Alerts / Callouts | Note、Tip、Warning、Important、Caution |
| 20 | TOC | 渐变背景玻璃卡片 |
| 21 | Footnotes | 注脚引用样式 |
| 22 | Sidebar | Zeus 风文件树与面板 |
| 23 | Outline Panel | 活动项高亮、垂直导引线 |
| 24 | Pinned Outline | 右侧固定大纲面板 |
| 25 | Quick Open | 深色弹窗 |
| 26 | Code Tooltip | 围栏代码块定位提示 |
| 27 | Context Menu | 深色下拉菜单 + 橙色强调 |
| 28 | Modal/Dialog | 深色遮罩面板 |
| 29 | Auto Suggest | 自动补全下拉框 |
| 30 | Math Block | MathJax / KaTeX 深色修复 |
| 31 | Mermaid | 流程图深色覆盖 |
| 32 | Focus Mode | 非聚焦块淡化 |
| 33 | Scrollbar | 自定义 webkit 滚动条 |
| 34 | Input/Button | 全局表单元素覆盖 |
| 35 | Settings Panel | 偏好设置窗口 |
| 36 | Megamenu / File Panel | 文件浏览面板 |
| 37 | Export Sidebar | 导出视图浮动侧栏 |
| 38 | Caret & Selection | 光标颜色 |
| 39 | Table Resize Popover | 插入表格网格弹窗 |
| 40 | Print Styles | `@media print` 覆盖（含强制浅色文字） |
| 41 | Mobile Export | `@media screen` 窄视口适配 |

---

## 设计令牌系统

所有颜色、阴影和布局值均为 CSS 自定义属性，定义于每个主题文件的 `:root`。**禁止硬编码已有变量对应的值。**

### 变量分层（每个主题文件的 :root 结构）

```
:root {
    /* --- Core Palette --- */        核心色板（7 个）
    /* --- Text Hierarchy --- */      文字层级（4 个）
    /* --- Surface Hierarchy --- */   表面层级（6 个）
    /* --- Border Hierarchy --- */    边框层级（3 个）
    /* --- Overlay --- */             叠层透明度（9 个）
    /* --- Shadow --- */              阴影透明度（10 个）
    /* --- Glow Effects --- */        发光效果
    /* --- Sidebar (Zeus) --- */      侧栏专用
    /* --- Headings --- */            标题装饰
    /* --- Window & Panel --- */      面板边框
    /* --- Code Highlighting --- */   语法高亮
    /* --- Kbd --- */                 键帽颜色
    /* --- Alert Colors --- */        提示块颜色
    /* --- Fonts --- */               字体栈
    /* --- Content Area --- */        内容区纹理
    /* --- Markdown --- */            Markdown 标记字符
    /* --- Export / Focus / Mermaid ---*/  杂项
}
```

### 核心调色板变量（以 fusion-dark 为例）

```css
--bg-color             /* #1e1e1e  – 页面背景 */
--text-color           /* #d4d4d4  – 主要文字 */
--text-color-secondary /* #b0b8c4  – 段落/次要文字 */
--primary-color        /* #e8944c  – 橙色强调色 */
--secondary-color      /* #9eaffa  – 蓝色强调色 */
--accent-color         /* #9eaffa  – secondary 别名 */
--border-color         /* #3a3a3a  – 默认边框 */
```

### 发光系统

```css
--glow-color           /* rgba(232, 148, 76, 0.45) */
--glow-shadow-text     /* 0 0 5px var(--glow-color) */
--glow-shadow-box      /* 0 0 8px var(--glow-color) */
```

**悬停状态**使用 `--glow-shadow-text` / `--glow-shadow-box`，**不得**硬编码阴影数值。

### 代码语法令牌（Dracula 风格）

```css
--code-keyword    /* #ff79c6 */
--code-function   /* #50fa7b */
--code-string     /* #f1fa8c */
--code-comment    /* #6272a4 */
--code-type       /* #8be9fd */
--code-number     /* #bd93f9 */
--code-meta       /* #ffb86c */
```

### Overlay 与 Shadow 梯度

主题文件提供从 2% 到 20% 的 overlay 梯度和从 5% 到 60% 的 shadow 梯度，适配深色/浅色主题的不同底色：

- **深色主题** → overlay 基于白色 `rgba(255, 255, 255, N%)`
- **浅色主题** → overlay 基于黑色 `rgba(0, 0, 0, N%)`

### 标题层级区分系统

标题采用**多维度区分**让 H1–H6 一眼可辨(而非仅字号递减):字号阶梯 + 字重 + 两色调渐变 + 每级不同的手绘装饰。**不使用 CSS 计数器自动编号**——兼容笔记自带的手动序号;且所有装饰都避开「文字前导位」,不与手动序号冲突。

| 级别 | 字号 | 字重 | 颜色 | 手绘装饰 |
|------|------|------|------|---------|
| H1 | 1.8rem | 粗 | 主色 | 居中波浪下划线(`.content-title` 合并定义) |
| H2 | 1.55rem | 700 | 主色 | 整宽波浪下划线(`--sketch-wave`) |
| H3 | 1.35rem | 700 | 主色 | 左侧竖条笔刷(`--sketch-brush`,置于文字左侧 gutter) |
| H4 | 1.18rem | 600 | 主色↔正文色 70% 混合 | 直线下划线(`--sketch-line`) |
| H5 | 1.02rem | 600 | 主色↔正文色 35% 混合 | 点线下划线(`--sketch-dots`) |
| H6 | 0.92rem | 700 | 正文次要色 | 无装饰,大写 + 字间距(标签体) |

颜色渐变用 `color-mix()` 从 `--primary-color`/`--text-color` 派生,**不新增每主题变量**。装饰统一用 `::after`(`::before` 留给 Typora 内置标题标签);编辑模式(`.md-focus`)隐藏装饰。H6 的 `text-transform: uppercase` 仅对英文生效,中文靠字号/字间距/色差区分。设计缘由见 `docs/adr/0002-heading-level-differentiation.md`。

### 变量使用与清理

主题文件中的变量分三类：

| 类别 | 说明 | 是否可删除 |
|------|------|-----------|
| **base.css 引用** | 被 `var()` 直接引用的变量 | ❌ |
| **Typora 内部** | 被 Typora App 直接读取（如 `--font-monospace`、`--mermaid-theme`、`--md-char-color`） | ❌ |
| **设计令牌** | 属于渐变/阴影/发光系统但暂未引用的变量 | ⚠️ 需确认 |

清理变量前必须确认其不属于 Typora 内部变量。已知 Typora 内部变量包括：
`--control-text-color`、`--active-file-border-color`、`--window-border`、`--panel-border-color`、
`--search-select-*`、`--rawblock-edit-panel-bd`、`--focus-ring-color`、`--blur-text-color`、
`--md-char-color`、`--heading-char-color`、`--meta-content-color`、`--mermaid-theme` 等。

---

## 编码规范

### 选择器作用域

- **内容样式**始终限定在 `#write` 下 — 例如 `#write h2`、`#write table`
- **侧栏样式**限定在 `#typora-sidebar`、`#file-library`、`.outline-*`
- **UI 外壳**（弹窗、菜单）使用组件类名 — 例如 `.context-menu`、`.modal-content`

### 交互状态

每个样式元素应至少定义以下状态（适用时）：

```css
element          { /* 默认 */ }
element:hover    { /* 悬停 — 使用发光变量 */ }
element.md-focus,
element:focus    { /* Typora 聚焦类 + 原生 focus */ }
```

### 动画约定

`transition` 写在**默认状态**，**不要**写在 `:hover` 上。**禁止使用 `transition: all`**，必须列出具体属性：

```css
transition: color 0.3s ease, transform 0.3s ease;
transition: background-color 0.3s ease, box-shadow 0.3s ease;
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性 */
transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);  /* 平滑减速 */
```

优先使用 `transform` 和 `opacity` 做动画（GPU 合成层）。避免对 `width`、`height` 等布局属性做动画。
如需缩放效果，使用 `transform: scaleX()` / `scaleY()` 代替 `width` / `height` 过渡。

### 可访问性

移除默认 `outline` 时，**必须**添加 `:focus-visible` 替代样式：

```css
element:focus-visible {
    box-shadow: 0 0 0 2px var(--bg-color), 0 0 0 4px var(--primary-color);
}
```

### `color-mix()` 用法

使用 `color-mix(in srgb, var(--primary-color), transparent N%)` 代替硬编码 rgba：

```css
/* ✅ 推荐 */
background: color-mix(in srgb, var(--primary-color), transparent 90%);

/* ❌ 避免 */
background: rgba(232, 148, 76, 0.1);
```

---

## 新增元素样式流程

1. 确认正确的 **Section**（参见上方 Section 排列顺序）
2. 在 `fusion-dark/base.css` 中添加子节注释：
   ```css
   /* --- 元素名称 --- */
   ```
3. 内容选择器限定在 `#write` 下
4. 定义默认、`:hover`、`:focus`、`.md-focus` 状态
5. 所有颜色值使用 CSS 变量（定义在主题文件中）
6. 如需新增变量，须在**所有 4 个主题文件**的 `:root` 中同步添加
7. 在默认状态添加 `transition`
8. 在**编辑模式**和**专注模式**下均测试效果

---

## 新增主题变体流程

1. 复制任意现有主题文件（如 `fusion-dark-orange.css`）为 `fusion-<name>.css`
2. 保持 `@import url("fusion-dark/base.css")` 不变
3. 修改 `:root` 中全部变量值以匹配目标配色方案
4. 在 Typora 主题文件夹中安装测试
5. 更新 README.md 的主题列表

---

## 字体指南

| 使用场景 | 字体变量 / 字体族 |
|---|---|
| 正文 / UI | `var(--font-sans-serif)` |
| 段落 | Optima、"LXGW WenKai"、Georgia（中文支持硬编码字体栈） |
| 代码与 kbd | `var(--font-monospace)` → "Cascadia Code" |

**不得**添加新的 `@font-face` 声明，除非字体文件已提交至 `fusion-dark/` 文件夹。

---

## 主题变体一览

| 文件 | 配色方案 | 主色调 | 背景色 | 正文对比度 |
|---|---|---|---|---|
| `fusion-dark-orange.css` | Dark + Orange | `#f07830` | `#141414` | 11.6:1 AAA |
| `fusion-teal.css` | Dark + Teal 🌊 | `#349890` | `#141414` | 11.6:1 AAA |
| `fusion-gruvbox.css` | Gruvbox Dark 🌿 | `#fabd2f` | `#282828` | 10.2:1 AAA |
| `fusion-academic-dark.css` | Academic Dark (Nord) 🎓 | `#88c0d0` | `#121519` | 12.5:1 AAA |

---

## 测试清单

修改样式后，请在每个受影响的主题中验证以下 Typora 元素的渲染效果：

- [ ] H1–H6 标题（编辑模式与预览模式）
- [ ] 带语言标签的围栏代码块
- [ ] 行内代码悬停动画
- [ ] 引用块与 Emoji 图标
- [ ] 任务列表的勾选与未勾选状态
- [ ] 表格标题行与行悬停
- [ ] 全部 5 种 Alert/Callout 类型
- [ ] TOC 目录卡片（`[toc]`）
- [ ] YAML 元数据块
- [ ] 侧栏文件树活动项
- [ ] Mermaid 流程图渲染
- [ ] 打印预览（文件 → 导出 → PDF）

---

## 常用操作

```bash
# 安装主题到 Typora（Windows）
# 1. 打开 Typora → 偏好设置 → 外观 → 打开主题文件夹
# 2. 复制主题文件和资源目录：
cp fusion-dark-orange.css <typora-themes-dir>/
cp -r fusion-dark/ <typora-themes-dir>/
# 3. 重启 Typora 选择主题

# 查看 CSS 变量行数
wc -l fusion-dark-orange.css fusion-teal.css fusion-gruvbox.css fusion-academic-dark.css

# 查看 base/ 各分文件的 Section
grep -rn "========================" fusion-dark/base/
```

---

## 禁止事项

- **不得**手动添加浏览器厂商前缀 — Typora 内嵌 Chromium 已支持现代 CSS
- **不得**修改字体文件路径，必须保持 `fusion-dark/FileName.ext` 格式
- **不得**在 UI 外壳 Section 和 Print Styles 以外使用 `!important`（外壳 Section 需要覆盖 Typora 内置样式，Print 需强制覆盖深色文字）
- **不得**引入 CSS 嵌套语法（`:is()`、`@layer` 等）— 保持与 Typora 内嵌 Chromium 版本的兼容性
- **不得**使用 `transition: all` — 必须列出具体属性以避免意外属性参与过渡
- **不得**使用 `word-wrap` — 使用标准属性 `overflow-wrap` 代替
- **不得**在 `base/` 各文件中硬编码颜色值 — 所有颜色必须通过 `var()` 引用主题变量
- **不得**只修改单个主题文件中的变量而忽略其他主题 — 新增变量需同步到所有 4 个主题文件

## Agent skills

### Issue tracker

Issues live in GitHub Issues (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical labels as-is (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
