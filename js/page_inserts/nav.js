// /js/page_inserts/nav.js
// Loads nav.html and wires up menu, links, logo, and cart count.

export async function loadNav(targetSelector = '#nav-root', url) {
  const root = document.querySelector(targetSelector);
  if (!root) return;

  const html = await fetchHTML(url);
  root.innerHTML = html;

  initNav(root);
}

async function fetchHTML(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.text();
}

function getBasePath() {
  const path = window.location.pathname;
  // On GitHub Pages, your project lives under /webMaster/
  if (path.startsWith('/webMaster/')) return '/webMaster/';
  // On local (VS Code Live Server), it's just /
  return '/';
}

function initNav(root) {
  const base = getBasePath();

  // Set logo src based on base path
  const logoImg = root.querySelector('img[data-src]');
  if (logoImg) {
    const assetPath = logoImg.getAttribute('data-src'); // e.g. "images/brand/logo/01.png"
    logoImg.src = base + assetPath;
  }

  // Set links based on data-link attributes
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

  // Mobile toggle
  const btn = root.querySelector('#nav-menu-btn');
  const links = root.querySelector('#nav-links');
  if (btn && links) {
    const toggle = () => {
      const isHidden = links.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', (!isHidden).toString());
    };
    btn.addEventListener('click', toggle);
  }

  // Scroll shadow
  const nav = root.querySelector('nav');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (!nav) return;
    if (y > 8 && lastY <= 8) nav.classList.add('shadow');
    if (y <= 8 && lastY > 8) nav.classList.remove('shadow');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Active link highlight
  const currentPath = window.location.pathname;
  root.querySelectorAll('a[data-link]').forEach((a) => {
    const key = a.getAttribute('data-link');
    const rel = routes[key];
    if (!rel) return;

    const full = base + rel;
    if (
      currentPath === full ||
      currentPath.endsWith(rel) ||
      (key === 'home' && (currentPath === base || currentPath === base.replace(/\/$/, '')))
    ) {
      a.classList.add('underline');
    }
  });

  // Cart count from localStorage
  const countEl = root.querySelector('#cart-count');
  if (countEl) {
    try {
      const count = Number(localStorage.getItem('cartCount') || '0');
      countEl.textContent = String(count);
    } catch {
      countEl.textContent = '0';
    }
  }
}
