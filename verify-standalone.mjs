/**
 * Real end-to-end check: load the standalone file in jsdom, execute its scripts
 * and confirm the React app mounts and renders the shell + home page.
 */
import { readFile } from 'node:fs/promises';
import { JSDOM, VirtualConsole } from 'jsdom';

const html = await readFile('standalone/aladdin-dxp.html', 'utf8');
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', e => errors.push(`jsdomError: ${e.message}`));
virtualConsole.on('error', (...args) => errors.push(`console.error: ${args.join(' ')}`));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole,
  url: 'file:///standalone/aladdin-dxp.html',
});

await new Promise(resolve => setTimeout(resolve, 1500));

const doc = dom.window.document;
const root = doc.getElementById('root');
const rendered = root ? root.innerHTML : '';
const overlay = doc.querySelector('pre');

const checks = [
  ['scripts executed without error', errors.length === 0],
  ['root element filled', rendered.length > 5000],
  ['no error overlay', !overlay],
  ['header rendered', rendered.includes('<header')],
  ['hero headline present', rendered.includes('علاءالدین') || rendered.includes('طراحی')],
  ['primary CTA rendered', rendered.includes('مشاوره')],
  ['design tokens applied', html.includes('--ds-color-text-primary')],
  ['persian digits in UI', /[۰-۹]/.test(rendered)],
];

for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
if (errors.length) console.log('\nerrors:\n' + errors.slice(0, 5).join('\n'));
if (overlay) console.log('\noverlay text:\n' + overlay.textContent.slice(0, 400));
console.log(`\nrendered ${rendered.length} chars of DOM`);
process.exit(checks.every(([, ok]) => ok) ? 0 : 1);
