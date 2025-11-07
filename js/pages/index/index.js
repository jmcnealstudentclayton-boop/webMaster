// Home page entry. It calls the page_inserts orchestrator and can include page-only logic.
import { loadPageInserts } from '/js/page_inserts/index.js';


// Load nav + footer inserts
loadPageInserts().catch(console.error);


// Any index-only JS can live below
// Example: animate banner text on load
const onReady = () => {
    const bannerText = document.querySelector('section.relative div');
    if (bannerText) {
        bannerText.style.transition = 'transform 500ms ease, opacity 500ms ease';
        bannerText.style.transform = 'translateY(8px)';
        bannerText.style.opacity = '0';
        requestAnimationFrame(() => {
            bannerText.style.transform = 'translateY(0)';
            bannerText.style.opacity = '1';
        });
    }
};


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
} else {
    onReady();
}