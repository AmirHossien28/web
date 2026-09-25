/**
 * End-to-end verification of the standalone build.
 *
 * Loads `standalone/aladdin-dxp.html` in a real DOM engine (jsdom), executes its
 * inline scripts and drives the app: navigation, the pricing estimator, token
 * documentation and returning home. This is the check that guarantees the
 * single-file build actually runs from `file://`.
 *
 * Usage: npm run verify:standalone   (requires: npm i -D jsdom)
 */
import { readFile } from 'node:fs/promises';
import { JSDOM, VirtualConsole } from 'jsdom';

const file = 'standalone/aladdin-dxp.html';
const html = await readFile(file, 'utf8');

const notices = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => notices.push(error.message));
virtualConsole.on('error', (...args) => notices.push(args.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole,
  url: `file:///${file}`,
});

const { window } = dom;
const { document } = window;
const wait = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

const results = [];
const check = (name, ok, detail = '') => results.push([name, ok, detail]);
const rootText = () => document.getElementById('root')?.textContent ?? '';

await wait(1300);

/* ---------------------------------------------------------------- rendering */

check('home renders hero and navigation', rootText().includes('علاءالدین') && Boolean(document.querySelector('a[href="/pricing"]')));
check('header, footer and skip link present', Boolean(document.querySelector('header')) && Boolean(document.querySelector('footer')) && Boolean(document.querySelector('a[href="#main"]')));
check('persian digits rendered', /[\u06F0-\u06F9]/.test(rootText()));

/* --------------------------------------------------------------- navigation */

const navigate = (href) => {
  const link = document.querySelector(`a[href="${href}"]`);
  if (!link) return false;
  link.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
  return true;
};

check('navigate → /pricing', navigate('/pricing'));
await wait();
check('pricing view shows the comparison table', Boolean(document.querySelector('table')) && document.querySelectorAll('table tbody tr').length >= 5);

/* React tracks input values on the node, so drive the range through the
   prototype setter — exactly what a real drag produces. */
const range = document.querySelector('input[type="range"]');
check('estimator slider present', Boolean(range));
if (range) {
  const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setValue.call(range, '55');
  range.dispatchEvent(new window.Event('input', { bubbles: true }));
  await wait();
  check('estimate recalculates on slider change', /۵۵/.test(rootText()));
}

check('navigate → /design-system', navigate('/design-system'));
await wait();
check(
  'design system documents its tokens',
  /توکن/.test(rootText()) &&
    document.querySelectorAll('[class*="bg-ink"], [class*="bg-brand"]').length >= 4,
);

check('navigate → /process', navigate('/process'));
await wait();
check('process view renders', /معماری/.test(rootText()));

check('navigate → /', navigate('/'));
await wait();
check('home restored', /نمونه‌کارها/.test(rootText()));

/* ---------------------------------------------------------------- overlays */

const consult = [...document.querySelectorAll('button')].find(node => (node.textContent || '').includes('مشاوره'));
check('consultation CTA present', Boolean(consult));
if (consult) {
  consult.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
  await wait();
  check('dialog opens with aria-modal', Boolean(document.querySelector('[role="dialog"][aria-modal="true"]')));
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await wait();
  check('dialog closes on Escape', !document.querySelector('[role="dialog"][aria-modal="true"]'));
}

/* Only real application errors count: jsdom reports unimplemented browser APIs
   (scrollTo, layout) as notices which do not occur in a real browser. */
const realErrors = notices.filter(message => !/Not implemented/.test(message));
check('no application errors', realErrors.length === 0, realErrors.slice(0, 3).join(' | '));

/* ----------------------------------------------------------------- report */

for (const [name, ok, detail] of results) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : detail ? `  →  ${detail}` : ''}`);
}
const passed = results.filter(([, ok]) => ok).length;
console.log(`\n${passed}/${results.length} checks passed · DOM size ${rootText().length.toLocaleString('en-US')} chars`);

process.exit(passed === results.length ? 0 : 1);
