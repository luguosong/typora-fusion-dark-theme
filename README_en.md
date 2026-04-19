# Fusion — Typora Theme

> 🌐 **Language / 语言：** English | [简体中文](README.md)

> 🖤 A programmer-focused dark theme for [Typora](https://typora.io/), blending **Zeus** sidebar aesthetics with **Phycat** content styling — now with **9 color schemes** including academic/scholarly variants.

---

## 🎨 Theme Overview

| Theme | Palette | Primary | Background | Contrast | Eye-friendly |
|---|---|---|---|---|---|
| **Fusion Dark** | Dark + Orange | `#e8944c` | `#1e1e1e` | 8.3:1 AAA | |
| **Fusion Dracula** | Full Dracula | `#ff79c6` | `#282a36` | 7.8:1 AAA | |
| **Fusion Nord** | Nord | `#88c0d0` | `#2e3440` | 7.0:1 AAA | |
| **Fusion Light** | Light + Amber | `#b45309` | `#f9f7f4` | 6.4:1 AA | |
| **Fusion Material** | Material Palenight | `#82aaff` | `#292d3e` | 6.9:1 AA | |
| **Fusion Solarized** | Solarized Dark | `#b58900` | `#1a1f2b` | 8.1:1 AAA | 🌿 |
| **Fusion Gruvbox** | Gruvbox Dark | `#d79921` | `#282828` | 8.6:1 AAA | 🌿 |
| **Fusion Academic** | Academic Light 🎓 | `#9C2F2F` | `#F8F4ED` | 11.4:1 AAA | |
| **Fusion Academic Dark** | Academic Dark 🎓 | `#C9A96E` | `#0E1B2C` | 8.8:1 AAA | |

---

## ✨ Design Philosophy

**Fusion** is a hybrid theme combining the best of multiple worlds:

| Layer | Style Source | Characteristics |
|---|---|---|
| **Sidebar** | Zeus | Clean VS Code–inspired dark panel |
| **Content Area** | Phycat | Rich animations, glass morphism, glow effects |
| **Academic** | LaTeX | Serif headings, wide margins, scholarly blockquotes |

Architecture: each theme is a variable-only file (~150 lines) that shares a single structural base (`fusion-dark/base.css`).

---

## 🗂 File Structure

```
typora-fusion-dark-theme/
├── fusion-dark/
│   ├── base.css               # Shared structural styles (all themes)
│   ├── CascadiaCode.woff2     # Monospace font (code blocks)
│   └── LXGWWenKai-Regular.ttf # Chinese serif font (body)
├── fusion-dark.css            # Dark + Orange
├── fusion-dracula.css         # Full Dracula
├── fusion-nord.css            # Nord
├── fusion-light.css           # Light + Amber
├── fusion-material.css        # Material Palenight
├── fusion-solarized.css       # Solarized Dark 🌿
├── fusion-gruvbox.css         # Gruvbox Dark 🌿
├── fusion-academic.css        # Academic Light 🎓
└── fusion-academic-dark.css   # Academic Dark 🎓
```

---

## 🎓 Academic Themes

The two academic themes are designed for university students and researchers writing or reading Markdown notes:

| Feature | Value |
|---|---|
| Headings | EB Garamond / Georgia serif font |
| Line height | 1.95 (comfortable long-read spacing) |
| Content margins | Wide (100px per side) |
| Blockquote | Clean left accent bar, no emoji |
| Colors (light) | Cream `#F8F4ED` background · Burgundy `#9C2F2F` accent · Navy `#1A2A44` secondary |
| Colors (dark) | Navy `#0E1B2C` background · Gold `#C9A96E` accent · Slate blue `#88A0B8` secondary |

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
- **Font** — [Cascadia Code](https://github.com/microsoft/cascadia-code) (ligature-ready monospace)

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
2. Copy `fusion-dark.css` and the `fusion-dark/` directory into the theme folder
3. Restart Typora (or refresh themes)
4. Select **Fusion Dark** from **Preferences → Appearance → Theme**

---

## 🎨 Color Reference

| Variable | Value | Role |
|---|---|---|
| `--bg-color` | `#1e1e1e` | Page background |
| `--text-color` | `#d4d4d4` | Primary text |
| `--text-color-secondary` | `#9ca3af` | Paragraphs, muted text |
| `--primary-color` | `#e8944c` | Orange accent (headings, links, borders) |
| `--secondary-color` | `#9eaffa` | Blue accent (italic, note callout) |
| `--side-bar-bg-color` | `#252526` | Sidebar background |
| `--code-block-bg` | `#282a36` | Code block background (Dracula) |

---

## 🔤 Fonts

| Font | Usage | Source |
|---|---|---|
| [Cascadia Code](https://github.com/microsoft/cascadia-code) | Code blocks, inline code, kbd | Bundled (`CascadiaCode.woff2`) |
| [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) | Body paragraphs (CJK & serif fallback) | Bundled (`LXGWWenKai-Regular.ttf`) |
| Open Sans / System Sans | UI & headings | System fallback |

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
