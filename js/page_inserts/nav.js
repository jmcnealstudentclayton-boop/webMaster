// Loads /page_inserts/nav.html into #nav-root and wires up behaviors
export async function loadNav(targetSelector = '#nav-root', url = '/page_inserts/nav.html') {
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


function initNav(root) {
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


    // Sticky shadow on scroll
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


    // Simple active link highlight by path
    try {
        const path = location.pathname.replace(/\/$/, '') || '/';
        root.querySelectorAll('a[href]').forEach(a => {
            const href = a.getAttribute('href');
            if (!href) return;
            const normalized = href.replace(/\/$/, '') || '/';
            if (normalized === path) a.classList.add('underline');
        });
    } catch { }


    // Example: mock cart count from localStorage
    const cartCount = root.querySelector('#cart-count');
    if (cartCount) {
        try {
            const count = Number(localStorage.getItem('cartCount') || '0');
            cartCount.textContent = String(count);
        } catch { }
    }
}