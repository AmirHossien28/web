/**
 * Builds a single self-contained HTML file of the whole site.
 *
 * Why: the sandbox requires a traffic-access token for its public URLs, so a
 * direct link cannot be opened from outside. This bundle runs from `file://`
 * with no server and no install.
 *
 * How: the app bundle is compiled to a classic IIFE and embedded as base64
 * inside an inert `<script type="application/octet-stream">` payload. Base64
 * contains no `<` or `!`, so the HTML parser cannot mis-read the bundle, and a
 * classic script needs no CORS (ES modules are blocked on `file://`).
 *
 * Usage: npm run build:standalone  →  standalone/aladdin-dxp.html
 */
import { build } from 'vite';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { transform } from 'esbuild';

const root = process.cwd();
const outDir = 'dist-standalone';
const target = 'standalone/aladdin-dxp.html';

/* ------------------------------------------------------------------ build */

await rm(outDir, { recursive: true, force: true });

await build({
  configFile: path.join(root, 'vite.config.ts'),
  base: './',
  logLevel: 'warn',
  build: {
    outDir,
    emptyOutDir: true,
    cssCodeSplit: false,
    target: 'es2019',
    rollupOptions: { output: { manualChunks: undefined } },
  },
});

const assets = await readdir(path.join(outDir, 'assets'), { recursive: true });
const cssFile = assets.find(file => typeof file === 'string' && file.endsWith('.css'));
const jsFile = assets.find(file => typeof file === 'string' && file.endsWith('.js'));
if (!cssFile || !jsFile) throw new Error('Build produced no CSS or JS asset to inline.');

const css = await readFile(path.join(outDir, 'assets', cssFile), 'utf8');
const esm = await readFile(path.join(outDir, 'assets', jsFile), 'utf8');

/* ------------------------------------------------- classic-script conversion */

const { code: iife, warnings } = await transform(esm, {
  loader: 'js',
  format: 'iife',
  target: 'es2019',
  minify: true,
  legalComments: 'none',
  define: { 'import.meta.url': 'document.baseURI' },
});
for (const warning of warnings) console.warn('esbuild:', warning.text);

const payload = Buffer.from(iife, 'utf8').toString('base64');

/* ------------------------------------------------------------------ assemble */

let html = await readFile(path.join(outDir, 'index.html'), 'utf8');

html = html
  .replace(/<script type="module"[^>]*><\/script>/, '')
  .replace(/<link rel="stylesheet"[^>]*>/, '');

/* the emitted asset tags must be gone before we inline anything else */
if (/(src|href)="[^"]*assets\//.test(html)) {
  throw new Error('Inlining failed: an external asset reference remains in the shell.');
}
/* the payload runs after the root element exists, at the end of <body> */
if (!html.includes('<div id="root"></div>')) {
  throw new Error('Inlining failed: the root element was not found.');
}

const payloadTag = `<script id="app-payload" type="application/octet-stream">${payload}</script>`;

/*
 * Classic bootstrap: decode the payload, run it, and surface any failure in the
 * page so a problem is never a silent blank screen.
 */
const bootstrap = `<script>
      (function () {
        var show = function (message) {
          var box = document.createElement('pre');
          box.setAttribute('dir', 'ltr');
          box.style.cssText =
            'margin:2rem;padding:1rem;border:1px solid #fecdca;border-radius:8px;background:#fef3f2;color:#b42318;font:13px/1.6 monospace;white-space:pre-wrap';
          box.textContent = 'Aladdin DXP could not start:\\n\\n' + message;
          document.body.appendChild(box);
        };
        var boot = function () {
        try {
          var base64 = document.getElementById('app-payload').textContent.replace(/\\s+/g, '');
          var binary = atob(base64);
          var bytes = new Uint8Array(binary.length);
          for (var i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
          var code = new TextDecoder('utf-8').decode(bytes);
          new Function(code)();
        } catch (error) {
          show((error && error.message) || String(error));
        }
        };
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', boot);
        } else {
          boot();
        }
      })();
    </script>`;

html = html
  .replace('<div id="root"></div>', `<div id="root"></div>\n    ${payloadTag}\n    ${bootstrap}`)
  .replace('</head>', `  <style>\n${css}\n  </style>\n</head>`);

if (css.includes('</style')) throw new Error('Inlining failed: the stylesheet contains a style terminator.');
if (!html.includes('id="root"')) throw new Error('Inlining failed: the root element is missing.');

await mkdir('standalone', { recursive: true });
await writeFile(target, html, 'utf8');
await rm(outDir, { recursive: true, force: true });

/* ------------------------------------------------------------------ report */

const kb = (size) => `${(size / 1024).toFixed(0)} KB`;
console.log(`✓ ${target}`);
console.log(`  html ${kb(Buffer.byteLength(html))} · css ${kb(css.length)} · app ${kb(iife.length)} (base64 ${kb(payload.length)})`);
