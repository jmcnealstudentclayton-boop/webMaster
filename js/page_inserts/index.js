// Orchestrator that loads all page inserts for any page that imports it.
// Usage: import '/js/page_inserts/index.js'


import { loadNav } from './nav.js';
import { loadFooter } from './footer.js';


export async function loadPageInserts() {
    await Promise.all([
        loadNav('#nav-root', '/page_inserts/nav.html'),
        loadFooter('#footer-root', '/page_inserts/footer.html')
    ]);
}


// Auto-run when directly imported on a page
if (document.currentScript?.type === 'module') {
    // run after DOM ready to ensure targets exist
    const run = () => loadPageInserts().catch(console.error);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
}