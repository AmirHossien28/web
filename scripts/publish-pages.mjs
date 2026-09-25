/**
 * Publishes the standalone build to GitHub Pages.
 *
 * GitHub Pages serves this repository from the `/docs` folder of the current
 * branch, so the self-contained HTML produced by `build:standalone` is copied
 * there as `index.html`. A `.nojekyll` marker stops Pages from running Jekyll
 * over the output.
 *
 * Usage: npm run build:pages   (build:standalone + copy)
 */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

const source = 'standalone/aladdin-dxp.html';
const target = 'docs/index.html';

const html = await readFile(source, 'utf8');

/* Pages must serve this file verbatim, so make sure it really is self-contained. */
if (!html.includes('id="app-payload"') || !html.includes('id="root"')) {
  throw new Error('Refusing to publish: the standalone bundle looks incomplete.');
}
if (/(src|href)="[^"]*assets\//.test(html)) {
  throw new Error('Refusing to publish: the bundle references external assets.');
}

await mkdir('docs', { recursive: true });
await copyFile(source, target);
await writeFile('docs/.nojekyll', '');

console.log(`✓ ${target} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB) ready for GitHub Pages`);
