# Fusion — Typora Theme

> 🌐 **Language / 语言：** English | [简体中文](README.md)

> 🖤 A programmer-focused dark theme for [Typora](https://typora.io/), blending **Zeus** sidebar aesthetics with **Phycat** content styling — **4 warm, eye-friendly color schemes** (plum / petrol green / Gruvbox / brick), all meeting WCAG AA contrast.

---

## 🎨 Theme Overview

| Theme | Palette | Primary | Background | Contrast | Eye-friendly |
|---|---|---|---|---|---|
| **Fusion Aubergine** | Dark + Warm Plum 🟣 | `#a06e80` | `#15120e` | ≈13:1 AAA | 🌿 |
| **Fusion Olive** | Dark + Petrol Green 🫒 | `#4a988e` | `#12150f` | ≈10.5:1 AAA | 🌿 |
| **Fusion Gruvbox** | Gruvbox Dark | `#fabd2f` | `#282828` | 10.2:1 AAA | 🌿 |
| **Fusion Maroon** | Dark + Warm Brick 🍂 | `#c47260` | `#15110f` | ≈11:1 AAA | 🌿 |

---

## ✨ Design Philosophy

**Fusion** is a hybrid theme combining the best of multiple worlds:

| Layer | Style Source | Characteristics |
|---|---|---|
| **Sidebar** | Zeus | Clean VS Code–inspired dark panel |
| **Content Area** | Phycat | Rich animations, glass morphism, glow effects |

Architecture: each theme is a variable-only file (~150 lines) that shares a single structural base (`fusion-dark/base.css`).

---

## 🗂 File Structure

```
typora-fusion-dark-theme/
├── fusion-dark/
│   ├── base.css               # Shared structural styles (all themes)
│   ├── LXGWWenKai-Regular.ttf                  # Chinese body/heading font (kaiti)
│   └── SourceCodePro-Italic-VariableFont_wght.ttf  # Latin / code font (mono·variable)
├── fusion-aubergine.css       # Dark + Warm Plum (flagship)
├── fusion-olive.css           # Dark + Petrol Green
├── fusion-gruvbox.css         # Gruvbox Dark 🌿
└── fusion-maroon.css          # Dark + Warm Brick
```

---

## 🎨 Feature Highlights

### Heading System (auto-numbered + gradient underline)
- **H1** — Centered, animated expanding underline bar on hover/focus
- **H2** — Glass morphism card with radial gradient background
- **H3** — Left accent bar that grows on hover
- **H4** — Filled orange dot marker with slide animation
- **H5** — Circle outline marker with glow
- **H6** — Dash (`-`) prefix with color transition

### Code
- **Fenced Code Blocks** — macOS traffic-light dots decoration, language label, Dracula-inspired syntax tokens
- **Inline Code** — Orange tinted badge, bouncy scale-up on hover
- **Font** — [Source Code Pro](https://github.com/adobe-fonts/source-code-pro) (mono, variable weight)

### Content Elements
- **Blockquotes** — Rounded card with 💡 emoji, glowing border on hover
- **Task Lists** — Animated circular checkbox with glow pulse on check
- **Tables** — Glass morphism style with per-cell hover highlight
- **Links** — Inline SVG link icon that rotates on hover, neon text-shadow
- **Highlights / Mark** — Gradient fill-up animation on hover
- **Italic** — Animated stitched underline pattern
- **Bold** — Orange accent color with bottom-border glow
- **`<kbd>`** — 3D key cap with press-down animation

### Callouts / Alerts (GitHub-style)
| Type | Color | Emoji |
|---|---|---|
| `[!NOTE]` | Blue/Purple | 📝 |
| `[!TIP]` | Cyan | 💡 |
| `[!WARNING]` | Amber | ⚠️ |
| `[!IMPORTANT]` | Orange | 🔥 |
| `[!CAUTION]` | Red | 💀 |

### Table of Contents (TOC)
Glass morphism card with a dual-gradient background, smooth hover lift, and a labeled "📑 Contents" header.

### YAML Front Matter
Dashed-border card with a floating `YAML` badge; transitions to solid border on hover.

### Sidebar (Zeus Style)
- VS Code–style file tree with active-file orange left border
- Orange-glowing tab indicators
- Minimal scrollbars (4px)
- Quick-open popup with dark styling

### Mermaid Diagrams
Custom dark overrides: Dracula background nodes, primary-color borders, styled edge labels.

### Responsive Layout
| Viewport | Content Max-Width |
|---|---|
| `< 1400px` | 950px |
| `≥ 1400px` | 1024px |
| `≥ 1800px` | 1200px |

### Print Support
Color-accurate print styles, page-break guards on headings and code blocks, text-shadow removal for clean output.

---

## 🚀 Installation

1. Open Typora → **Preferences → Appearance → Open Theme Folder**
2. Copy `fusion-aubergine.css` and the `fusion-dark/` directory into the theme folder
3. Restart Typora (or refresh themes)
4. Select **Fusion Aubergine** (or another Fusion theme) from **Preferences → Appearance → Theme**

---

## 🎨 Color Reference

| Variable | Value | Role |
|---|---|---|
| `--bg-color` | `#15120e` | Page background (warm paper) |
| `--text-color` | `#d6d2c9` | Primary text |
| `--text-color-secondary` | `#b8b2a6` | Paragraphs, muted text |
| `--primary-color` | `#a06e80` | Warm plum accent (headings, links, borders) |
| `--secondary-color` | `#c9b37a` | Warm gold secondary |
| `--side-bar-bg-color` | `#1a1712` | Sidebar background |
| `--code-block-bg` | `#2a2520` | Code block background (warm chrome) |

---

## 🔤 Fonts

| Font | Usage | Source |
|---|---|---|
| Latin serif (Charter → Georgia → Palatino) | English body / UI / tables (#14 Kami typography) | System fallback |
| [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | Chinese body / headings (kaiti) | Bundled (`LXGWWenKai-Regular.ttf`) |
| [Source Code Pro](https://github.com/adobe-fonts/source-code-pro) | Code blocks / inline code / kbd / YAML (mono only) | Bundled (`SourceCodePro-Italic-VariableFont_wght.ttf`) |

---

## 🛠 Customization

All design tokens are defined as **CSS custom properties** in `:root`. To change the accent color:

```css
:root {
    --primary-color: #your-color;
    --glow-color: rgba(R, G, B, 0.6);   /* match primary */
    --hover-background-color: #your-color;
    --select-text-bg-color: rgba(R, G, B, 0.3);
}
```

---

## 📄 License

MIT License — feel free to fork, modify, and redistribute.
