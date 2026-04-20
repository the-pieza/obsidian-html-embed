'use strict';

const obsidian = require('obsidian');

class HtmlEmbedPlugin extends obsidian.Plugin {
  async onload() {
    console.log('HTML Embed plugin loaded');

    this.registerMarkdownCodeBlockProcessor('html-embed', (source, el, ctx) => {
      const lines = source.trim().split('\n').map(l => l.trim()).filter(Boolean);
      let filePath = '';
      let height = '600';
      let width = '100%';

      for (const line of lines) {
        const [key, ...rest] = line.split(':');
        const value = rest.join(':').trim();
        if (!value) {
          // bare line = file path
          filePath = line;
        } else if (key.trim().toLowerCase() === 'file') {
          filePath = value;
        } else if (key.trim().toLowerCase() === 'height') {
          height = value;
        } else if (key.trim().toLowerCase() === 'width') {
          width = value;
        }
      }

      if (!filePath) {
        el.createEl('div', {
          text: 'html-embed: missing "file:" path',
          attr: { style: 'color:#d94c4c;font-family:monospace;padding:8px;border:1px solid #d94c4c;border-radius:4px' }
        });
        return;
      }

      // Resolve path: if relative, resolve against vault root
      let resolvedPath = filePath;
      if (!filePath.match(/^[a-zA-Z]:[\\\/]/) && !filePath.startsWith('/')) {
        const vaultPath = this.app.vault.adapter.basePath || '';
        resolvedPath = vaultPath + '/' + filePath;
      }
      // Normalize backslashes
      resolvedPath = resolvedPath.replace(/\\/g, '/');

      // Use Obsidian's resource path so the iframe is served by the app
      const resourceUrl = this.app.vault.adapter.getResourcePath
        ? this.app.vault.adapter.getResourcePath(filePath.replace(/\\/g, '/'))
        : 'app://local/' + encodeURI(resolvedPath);

      const iframe = el.createEl('iframe', {
        attr: {
          src: resourceUrl,
          width: width,
          height: height,
          style: `border:1px solid var(--background-modifier-border);border-radius:6px;background:var(--background-primary);width:${width};height:${height}px;`,
          sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups'
        }
      });

      // Fallback link
      const link = el.createEl('div', {
        attr: { style: 'font-size:11px;color:var(--text-muted);margin-top:4px;text-align:right' }
      });
      link.createEl('a', {
        text: 'Open ' + filePath + ' in browser ↗',
        attr: { href: 'file:///' + resolvedPath, target: '_blank' }
      });
    });
  }

  onunload() {
    console.log('HTML Embed plugin unloaded');
  }
}

module.exports = HtmlEmbedPlugin;
