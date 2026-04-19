# Fusion — Typora 主题集

> 🌐 **Language / 语言：** [English](README_en.md) | 简体中文

> 🎨 一套面向程序员与研究者的 [Typora](https://typora.io/) 主题集，融合 **Zeus** 侧栏风格与 **Phycat** 内容区设计，提供 **9 种配色方案**（含 2 个学术/论文风），全部达到 WCAG AA 以上护眼对比度。

---

## 🎨 主题一览

| 主题 | 配色 | 主色调 | 背景色 | 正文对比度 | 护眼 |
|---|---|---|---|---|---|
| **Fusion Dark Orange** | Dark + Orange | `#e8944c` | `#1e1e1e` | 8.3:1 AAA | |
| **Fusion Dracula** | Full Dracula | `#ff79c6` | `#282a36` | 7.8:1 AAA | |
| **Fusion Nord** | Nord | `#88c0d0` | `#2e3440` | 7.0:1 AAA | |
| **Fusion Amber** | Light + Amber | `#b45309` | `#f9f7f4` | 6.4:1 AA | |
| **Fusion Material** | Material Palenight | `#82aaff` | `#101010` | 13.4:1 AAA |
| **Fusion Solarized** | Solarized Dark | `#b58900` | `#1a1f2b` | 8.1:1 AAA | 🌿 |
| **Fusion Gruvbox** | Gruvbox Dark | `#d79921` | `#282828` | 8.6:1 AAA | 🌿 |
| **Fusion Academic Light** | Academic Light 🎓 | `#9C2F2F` | `#F8F4ED` | 11.4:1 AAA | |
| **Fusion Academic Dark** | Academic Dark 🎓 | `#C9A96E` | `#0D0D0D` | 13.6:1 AAA | |

---

## ✨ 设计理念

**Fusion** 是一套混合主题集，汇聚多种风格之精华：

| 区域 | 风格来源 | 特征 |
|---|---|---|
| **侧栏** | Zeus | 简洁的 VS Code 风暗色面板 |
| **内容区** | Phycat | 丰富的动画、玻璃拟态、霓虹发光效果 |
| **语法高亮** | 各配色方案 | 对比鲜明、护眼的色彩令牌 |

架构：每个主题仅定义变量（~150 行），共享同一套基础样式（`fusion-dark/base.css`），实现一处修改全部生效。

---

## 🎓 学术主题特性

`fusion-academic-light.css` 与 `fusion-academic-dark.css` 专为大学生、研究生和研究者设计：

| 特性 | 说明 |
|---|---|
| **标题字体** | EB Garamond / Georgia Serif 衬线字体，学术论文质感 |
| **行高** | 1.95（宽松阅读，适合长时间研究笔记） |
| **内容边距** | 宽边距（左右各 100px），仿论文排版 |
| **引用块** | 左侧 5px 强调色竖条，无 Emoji，斜体正式感 |
| **浅色配色** | 米白 `#F8F4ED` 背景 · 酒红 `#9C2F2F` 强调 · 深海军蓝 `#1A2A44` 辅色 |
| **深色配色** | 纯黑 `#0D0D0D` 背景 · 金色 `#C9A96E` 强调 · 青石蓝 `#88A0B8` 辅色 |

---

## 📁 文件结构

```
typora-fusion-dark-theme/
├── fusion-dark/
│   ├── base.css               # 共享基础样式（所有主题复用）
│   ├── CascadiaCode.woff2     # 等宽字体（代码块与行内代码）
│   └── LXGWWenKai-Regular.ttf # 霞鹜文楷（正文段落中文字体）
├── fusion-dark-orange.css     # Dark + Orange
├── fusion-dracula.css         # Dracula
├── fusion-nord.css            # Nord
├── fusion-amber.css           # Light + Amber
├── fusion-material.css        # Material Palenight
├── fusion-solarized.css       # Solarized Dark 🌿
├── fusion-gruvbox.css         # Gruvbox Dark 🌿
├── fusion-academic-light.css  # Academic Light 🎓
└── fusion-academic-dark.css   # Academic Dark 🎓
```

---

## 🎨 功能亮点

### 标题系统（自动编号 + 渐变下划线）
- **H1** — 居中排版，聚焦/悬停时下划线动态展开（文档标题，不编号）
- **H2–H6** — 底部渐变下划线（主色→次色→透明） + CSS 计数器自动编号
  - H2: `1.` `2.` `3.` — H3: `1.1` `1.2` — H4: `1.1.1` — 以此类推至 5 级
  - 下划线宽度逐级递减（H2=100%, H3=75%, H4=55%, H5=40%, H6=28%）
  - 悬停时下划线亮起 + 发光 + 轻微上浮

### 代码
- **围栏代码块** — macOS 红黄绿交通灯装饰、语言标签、Dracula 风语法着色
- **行内代码** — 橙色徽章样式，悬停时弹性放大
- **字体** — [Cascadia Code](https://github.com/microsoft/cascadia-code)（连字等宽字体）

### 内容元素
- **引用块** — 圆角卡片 + 💡 Emoji，悬停时橙色发光边框
- **任务列表** — 圆形复选框，勾选时脉冲发光动画
- **表格** — 玻璃拟态样式，单元格悬停高亮
- **链接** — 内联 SVG 链接图标悬停旋转，霓虹文字阴影
- **高亮 / Mark** — 悬停时渐变填充动画
- **斜体** — 动态针脚下划线纹理
- **加粗** — 橙色强调色 + 底部发光边框
- **`<kbd>` 按键** — 3D 键帽样式，可按下动画

### Callout 提示块（GitHub 风格）
| 类型 | 颜色 | 图标 |
|---|---|---|
| `[!NOTE]` | 蓝紫色 | 📝 |
| `[!TIP]` | 青色 | 💡 |
| `[!WARNING]` | 琥珀色 | ⚠️ |
| `[!IMPORTANT]` | 橙色 | 🔥 |
| `[!CAUTION]` | 红色 | 💀 |

### 目录（TOC）
玻璃拟态卡片，双渐变背景，悬停平滑上浮，带「📑 Contents」标题。

### YAML 元数据块
虚线边框卡片，右上角浮动 `YAML` 徽章；悬停时过渡为实线橙色边框。

### 侧栏（Zeus 风格）
- VS Code 风文件树，活动文件带橙色左边框
- 标签指示器橙色发光
- 极细滚动条（4px）
- 快速打开弹窗深色主题

### Mermaid 流程图
自定义深色覆盖：Dracula 背景节点、主色调边框、样式化边标签。

### 响应式布局
| 视口宽度 | 内容区最大宽度 |
|---|---|
| `< 1400px` | 950px |
| `≥ 1400px` | 1024px |
| `≥ 1800px` | 1200px |

### 打印支持
色彩精确的打印样式，标题与代码块防分页，移除文字阴影确保干净输出。

---

## 🚀 安装方法

1. 打开 Typora → **偏好设置 → 外观 → 打开主题文件夹**
2. 将你想要的主题文件（如 `fusion-dark-orange.css`）和 `fusion-dark/` 目录复制到主题文件夹中
3. 重启 Typora（或刷新主题）
4. 在 **偏好设置 → 外观 → 主题** 中选择对应主题

> 💡 所有主题共享 `fusion-dark/` 资源目录，只需复制一次即可。

---

## 🎨 颜色参考（以 Fusion Dark Orange 为例）

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg-color` | `#1e1e1e` | 页面背景 |
| `--text-color` | `#d4d4d4` | 主要文字 |
| `--text-color-secondary` | `#b0b8c4` | 段落、次要文字 |
| `--primary-color` | `#e8944c` | 橙色强调（标题、链接、边框） |
| `--secondary-color` | `#9eaffa` | 蓝色强调（斜体、Note 提示块） |
| `--side-bar-bg-color` | `#252526` | 侧栏背景 |
| `--code-block-bg` | `#282a36` | 代码块背景（Dracula 风格） |

> 其他主题的变量值请查阅对应 `fusion-*.css` 文件。

---

## 🔤 字体

| 字体 | 用途 | 来源 |
|---|---|---|
| [Cascadia Code](https://github.com/microsoft/cascadia-code) | 代码块、行内代码、kbd | 已内置（`CascadiaCode.woff2`） |
| [霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | 正文段落（中文与衬线字体回退） | 已内置（`LXGWWenKai-Regular.ttf`） |
| Open Sans / 系统无衬线字体 | UI 与标题 | 系统回退 |

---

## 🛠 自定义

所有设计令牌均为 **CSS 自定义属性**，定义于 `:root`。修改强调色示例：

```css
:root {
    --primary-color: #你的颜色;
    --glow-color: rgba(R, G, B, 0.6);   /* 与主色匹配 */
    --hover-background-color: #你的颜色;
    --select-text-bg-color: rgba(R, G, B, 0.3);
}
```

---

## 📄 许可证

MIT License — 欢迎 Fork、修改与再分发。
