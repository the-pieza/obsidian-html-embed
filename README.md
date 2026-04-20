# HTML Embed for Obsidian

> Embed standalone interactive HTML files — **with working JavaScript** — directly inside your Obsidian notes.

Drop a small code block in any note and a sandboxed iframe is rendered in its place, served through Obsidian's own resource path so that scripts, styles, and local assets all load correctly. Perfect for living documents: algorithm visualizations beside your CS notes, interactive chemistry diagrams beside your study guide, or custom dashboards beside your project plan.

## Why this plugin exists

Obsidian's reading view sanitizes raw `<iframe>` tags and strips `<script>` blocks, which makes it surprisingly difficult to embed your own self-contained interactive HTML. **HTML Embed** registers a tiny custom code block (`html-embed`) that resolves a vault-relative HTML file through the supported `app://` resource protocol — so JavaScript runs, styles apply, and the embed feels native.

## Usage

````markdown
```html-embed
file: visualizations/binary-search-tree.html
height: 600
```
````

**Options:**

| Key      | Default | Description                                                                  |
|----------|---------|------------------------------------------------------------------------------|
| `file`   | _required_ | Path to the HTML file. Vault-relative or absolute (e.g. `C:/path/to/file.html`). |
| `height` | `600`   | Iframe height in pixels.                                                     |
| `width`  | `100%`  | Iframe width.                                                                |

A small "Open in browser" link is added under each embed as a fallback.

## Example use cases

- Algorithm step-throughs (BFS, A*, sorting)
- Cipher / cryptography playgrounds
- Interactive math demos (function plotters, geometry, probability)
- Live data dashboards (load a local CSV and render with vanilla JS)
- Custom flashcard widgets, timers, or study tools

## Installation

### From Community Plugins (after release approval)

1. Open Obsidian → **Settings → Community plugins**
2. Disable Restricted mode if it's on
3. Browse → search **"HTML Embed"** → Install → Enable

### Manual installation

1. Download `main.js` and `manifest.json` from the [latest release](https://github.com/aint-vscp/obsidian-html-embed/releases/latest)
2. Copy them into `<your-vault>/.obsidian/plugins/html-embed/`
3. Reload Obsidian and enable **HTML Embed** in Settings → Community plugins

## Security

Each embed is rendered inside a sandboxed iframe with `allow-scripts allow-same-origin allow-forms allow-popups`. Only files from your own vault can be loaded. As with any plugin that runs JavaScript, only embed HTML files you trust.

## About

This plugin is published by **[The Pieza](https://thepieza.com/)**, a community building tools and experiences for makers, students, and educators. The Pieza ships small, sharp, well-crafted utilities that respect the user's time and attention.

In partnership with **[Mr. Dewey](https://mrdewey.tech/)** — an all-in-one academic buddy and educational reformer working to centralize the student academic workspace. **HTML Embed** is part of Mr. Dewey's larger mission to help students keep their notes, references, study aids, and interactive learning materials together in one place.

## Contributing

Issues and PRs welcome at <https://github.com/aint-vscp/obsidian-html-embed>. Please keep the plugin focused — small surface area is a feature, not a limitation.

## License

[MIT](LICENSE) © The Pieza
