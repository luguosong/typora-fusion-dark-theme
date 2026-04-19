# Fusion Typora Theme — 项目上下文

> 本文件是项目的**单一事实源**，涵盖架构、编码规范、开发流程与禁止事项。

## 项目概览

为 [Typora](https://typora.io/) Markdown 编辑器打造的 CSS 主题集，融合了：

- **Zeus** 侧栏设计（VS Code 风暗色面板）
- **Phycat** 内容区设计（玻璃拟态、霓虹发光、丰富动画）
- 多种配色方案（Dark、Dracula、Nord、Light、Material、Solarized、Gruvbox）

项目**无构建系统、无包管理器、无 JavaScript**，完全由纯 CSS 构成。

---

## 仓库结构

```
typora-fusion-dark-theme/
├── fusion-dark/
│   ├── base.css                  # 共享基础样式（~1545 行，所有主题复用）
│   ├── CascadiaCode.woff2        # 内置等宽字体
│   └── LXGWWenKai-Regular.ttf   # 内置中文衬线字体
├── fusion-dark.css               # Dark + Orange 主题（变量层）
├── fusion-dracula.css            # Full Dracula 主题（变量层）
├── fusion-nord.css               # Nord 主题（变量层）
├── fusion-light.css              # Light + Amber 主题（变量层）
├── fusion-material.css           # Material Palenight 主题（变量层）
├── fusion-solarized.css          # Solarized Dark 护眼主题（变量层）
├── fusion-gruvbox.css            # Gruvbox Dark 护眼主题（变量层）
├── README.md                     # 中文文档
├── README_en.md                  # 英文文档
└── CLAUDE.md                     # 本文件
```

---

## 架构：变量层 + 基础样式层

```
┌──────────────────────────┐
│  fusion-dark.css         │  ← 主题变量层（~130 行）
│  fusion-dracula.css      │    仅定义 :root CSS 自定义属性
│  fusion-nord.css         │    通过 @import 引入 base.css
│  fusion-light.css        │
│  fusion-material.css     │
│  fusion-solarized.css    │
│  fusion-gruvbox.css      │
└────────┬─────────────────┘
         │ @import url("fusion-dark/base.css")
         ▼
┌──────────────────────┐
│  fusion-dark/base.css│  ← 共享基础样式层（~1545 行）
│                      │    所有选择器、布局、动画
│                      │    颜色全部通过 var() 引用
└──────────────────────┘
```

### 修改规则

| 需求 | 修改文件 |
|---|---|
| 调整某个主题的颜色/色调 | 对应主题的 `fusion-*.css` |
| 新增所有主题共享的变量 | 所有 `fusion-*.css` 中的 `:root` |
| 修改结构/布局/选择器 | `fusion-dark/base.css` |
| 新增主题变体 | 创建新的 `fusion-<name>.css`，`@import` base.css 并定义完整变量集 |

---

## base.css Section 排列顺序

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
| 5 | Headings | H1 居中标题 + H2–H6 渐变下划线 + CSS 计数器自动编号 |
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

### 标题编号系统

H2–H6 使用 CSS Counters 实现自动多级编号，H1 作为文档标题不参与编号：

```
#write         → counter-reset: h2 h3 h4 h5 h6
#write h1      → counter-reset: h2 h3 h4 h5 h6  （遇到 H1 重新计数）
#write h2      → counter-increment: h2; counter-reset: h3 h4 h5 h6
#write h3      → counter-increment: h3; counter-reset: h4 h5 h6
#write h4–h6   → 依此类推
```

编号通过 `::before` 伪元素展示：

| 级别 | 前缀格式 | 示例 |
|------|---------|------|
| H2 | `counter(h2) ". "` | 1. 2. 3. |
| H3 | `counter(h2) "." counter(h3) " "` | 1.1 1.2 2.1 |
| H4 | 三级点分 | 1.1.1 |
| H5 | 四级点分 | 1.1.1.1 |
| H6 | 五级点分 | 1.1.1.1.1 |

H2–H6 视觉统一为**渐变下划线 + 编号前缀**（下划线宽度逐级递减：H2=100%、H3=75%、H4=55%、H5=40%、H6=28%），通过字号递减区分层级。

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
6. 如需新增变量，须在**所有 7 个主题文件**的 `:root` 中同步添加
7. 在默认状态添加 `transition`
8. 在**编辑模式**和**专注模式**下均测试效果

---

## 新增主题变体流程

1. 复制任意现有主题文件（如 `fusion-dark.css`）为 `fusion-<name>.css`
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
| `fusion-dark.css` | Dark + Orange | `#f07830` | `#141414` | 11.6:1 AAA |
| `fusion-dracula.css` | Full Dracula | `#ff79c6` | `#111117` | 18.1:1 AAA |
| `fusion-nord.css` | Nord | `#88c0d0` | `#121519` | 12.5:1 AAA |
| `fusion-light.css` | Light + Amber | `#c96b0a` | `#f0f3f7` | 14.8:1 AAA |
| `fusion-material.css` | Material Palenight | `#82aaff` | `#0d1018` | 12.0:1 AAA |
| `fusion-solarized.css` | Solarized Dark 🌿 | `#d4a017` | `#0e1119` | 8.5:1 AAA |
| `fusion-gruvbox.css` | Gruvbox Dark 🌿 | `#f0b429` | `#161616` | 13.0:1 AAA |

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
cp fusion-dark.css <typora-themes-dir>/
cp -r fusion-dark/ <typora-themes-dir>/
# 3. 重启 Typora 选择主题

# 查看 CSS 变量行数
wc -l fusion-dark.css fusion-dracula.css fusion-nord.css fusion-light.css fusion-material.css

# 查看 base.css 某个 Section
grep -n "========================" fusion-dark/base.css
```

---

## 禁止事项

- **不得**手动添加浏览器厂商前缀 — Typora 内嵌 Chromium 已支持现代 CSS
- **不得**修改字体文件路径，必须保持 `fusion-dark/FileName.ext` 格式
- **不得**在 UI 外壳 Section 和 Print Styles 以外使用 `!important`（外壳 Section 需要覆盖 Typora 内置样式，Print 需强制覆盖深色文字）
- **不得**引入 CSS 嵌套语法（`:is()`、`@layer` 等）— 保持与 Typora 内嵌 Chromium 版本的兼容性
- **不得**使用 `transition: all` — 必须列出具体属性以避免意外属性参与过渡
- **不得**使用 `word-wrap` — 使用标准属性 `overflow-wrap` 代替
- **不得**在 base.css 中硬编码颜色值 — 所有颜色必须通过 `var()` 引用主题变量
- **不得**只修改单个主题文件中的变量而忽略其他主题 — 新增变量需同步到所有 7 个主题文件
