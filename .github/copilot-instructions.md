# Fusion Typora Theme — Copilot 指引

> 📖 项目完整上下文见 [`CLAUDE.md`](../CLAUDE.md)（架构、规范、常用命令等）。本文件仅包含 Copilot 工具特有配置。

## 快速导航

| 需求 | 文件 |
|------|------|
| 项目架构 & 多主题体系 | `CLAUDE.md`（根目录） |
| 共享基础样式 | `fusion-dark/base.css` |
| 主题变量定义 | `fusion-*.css`（根目录） |

## Copilot 特有规则

### 修改 base.css 后的同步检查

修改 `fusion-dark/base.css` 中引用的变量后，使用以下搜索确认所有主题文件都已定义该变量：

```
搜索范围: fusion-*.css（根目录）
搜索模式: --新变量名
预期: 5 个文件全部命中
```

### 主题文件变量完整性

每个 `fusion-*.css` 的 `:root` 块必须包含完全相同的变量名集合（值不同）。新增变量时，Copilot 应自动在所有 5 个主题文件中同步添加。
