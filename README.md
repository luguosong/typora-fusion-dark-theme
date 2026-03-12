# Fusion Dark — Typora 主题

> 🌐 **Language / 语言：** [English](README_en.md) | 简体中文

> 🖤 一款面向程序员的 [Typora](https://typora.io/) 深色主题，融合 **Zeus** 侧栏风格与 **Phycat** 内容区设计，以橙色与蓝色为点缀色。

---

## ✨ 设计理念

**Fusion Dark** 是一款混合主题，汇聚两种风格之精华：

| 区域 | 风格来源 | 特征 |
|---|---|---|
| **侧栏** | Zeus | 简洁的 VS Code 风暗色面板 |
| **内容区** | Phycat | 丰富的动画、玻璃拟态、霓虹发光效果 |
| **语法高亮** | Dracula | 对比鲜明、护眼的色彩令牌 |

主调色盘以暖橙色（`#e8944c`）作为主强调色，以冷蓝色（`#9eaffa`）为辅助色，背景为深暗色（`#1e1e1e`）。

---

## �� 文件结构

```
typora-fusion-dark-theme/
├── fusion-dark.css            # 主题样式表（约 1,674 行）
└── fusion-dark/
    ├── CascadiaCode.woff2     # 等宽字体（代码块与行内代码）
    └── LXGWWenKai-Regular.ttf # 霞鹜文楷（正文段落中文字体）
```

---

## 🎨 功能亮点

### 标题系统（6 个独立样式）
- **H1** — 居中排版，聚焦/悬停时下划线动态展开
- **H2** — 玻璃拟态卡片，带径向渐变背景
- **H3** — 左侧强调竖条，悬停时自动伸长
- **H4** — 橙色实心圆点标记，滑入动画
- **H5** — 空心圆框标记，发光效果
- **H6** — 破折号（`-`）前缀，颜色渐变过渡

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
2. 将 `fusion-dark.css` 和 `fusion-dark/` 目录复制到主题文件夹中
3. 重启 Typora（或刷新主题）
4. 在 **偏好设置 → 外观 → 主题** 中选择 **Fusion Dark**

---

## 🎨 颜色参考

| 变量 | 值 | 用途 |
|---|---|---|
| `--bg-color` | `#1e1e1e` | 页面背景 |
| `--text-color` | `#d4d4d4` | 主要文字 |
| `--text-color-secondary` | `#9ca3af` | 段落、次要文字 |
| `--primary-color` | `#e8944c` | 橙色强调（标题、链接、边框） |
| `--secondary-color` | `#9eaffa` | 蓝色强调（斜体、Note 提示块） |
| `--side-bar-bg-color` | `#252526` | 侧栏背景 |
| `--code-block-bg` | `#282a36` | 代码块背景（Dracula 风格） |

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
