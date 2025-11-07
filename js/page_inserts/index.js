// /js/page_inserts/index.js
// Orchestrator that loads nav + footer into #nav-root and #footer-root

import { loadNav } from './nav.js';
import { loadFooter } from './footer.js';

export async function loadPageInserts() {
  // Resolve nav/footer HTML relative to THIS file, not the page URL
  const navUrl = new URL('/page_inserts/nav.html', import.meta.url);
  const footerUrl = new URL('/page_inserts/footer.html', import.meta.url);

  await Promise.all([
    loadNav('#nav-root', navUrl),
    loadFooter('#footer-root', footerUrl)
  ]);
}

// Auto-run when this file is used directly via <script type="module" src="...">
const isModuleScript = document.currentScript?.type === 'module';

if (isModuleScript) {
  const run = () => loadPageInserts().catch(console.error);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}
