// /js/page_inserts/footer.js
// Loads footer.html and sets year, last modified, and footer links.

export async function loadFooter(targetSelector = '#footer-root', url) {
  const root = document.querySelector(targetSelector);
  if (!root) return;

  const html = await fetchHTML(url);
  root.innerHTML = html;

  const base = getBasePath();

  // Set year
  const yearEl = root.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Set last modified
  const lastEl = root.querySelector('#lastModified');
  if (lastEl) {
    const lastMod = new Date(document.lastModified);
    lastEl.textContent = lastMod.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }

  // Footer links
  const routes = {
    home: 'index.html',
    catalog: 'pages/catalog.html',
    signup: 'pages/signup.html',
    best: 'pages/best-seller.html',
    contact: 'pages/contact.html'
  };

  root.querySelectorAll('a[data-link]').forEach((a) => {
    const key = a.getAttribute('data-link');
    const rel = routes[key];
    if (!rel) return;
    a.href = base + rel;
  });
}

async function fetchHTML(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.text();
}

function getBasePath() {
  const path = window.location.pathname;
  if (path.startsWith('/webMaster/')) return '/webMaster/';
  return '/';
}
