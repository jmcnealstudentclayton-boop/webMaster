

import { loadPageInserts } from '../page_inserts/index.js';

loadPageInserts().catch(console.error);

const onReady = () => {
  const bannerText = document.querySelector('section.relative div');
  if (!bannerText) return;

  bannerText.style.transition = 'transform 500ms ease, opacity 500ms ease';
  bannerText.style.transform = 'translateY(8px)';
  bannerText.style.opacity = '0';

  requestAnimationFrame(() => {
    bannerText.style.transform = 'translateY(0)';
    bannerText.style.opacity = '1';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  onReady();
}
