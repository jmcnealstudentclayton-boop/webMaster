import { loadNav } from './nav.js';
import { loadFooter } from './footer.js';

export async function loadPageInserts() {
  const isGithub = window.location.hostname.includes('github.io');
  const basePath = isGithub ? '/webMaster' : '';

  const navUrl = new URL(`${basePath}/page_inserts/nav.html`, window.location.origin);
  const footerUrl = new URL(`${basePath}/page_inserts/footer.html`, window.location.origin);

  await Promise.all([
    loadNav('#nav-root', navUrl),
    loadFooter('#footer-root', footerUrl)
  ]);
}
