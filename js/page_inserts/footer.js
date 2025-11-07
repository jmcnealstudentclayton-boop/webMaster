// Loads /page_inserts/footer.html into #footer-root and sets the year and last modified date
export async function loadFooter(targetSelector = '#footer-root', url = '/page_inserts/footer.html') {
    const root = document.querySelector(targetSelector);
    if (!root) return;
    const html = await fetchHTML(url);
    root.innerHTML = html;


    // Set the year
    const y = root.querySelector('#year');
    if (y) y.textContent = new Date().getFullYear();


    // Set the last modified date
    const modified = root.querySelector('#lastModified');
    if (modified) {
        const lastMod = new Date(document.lastModified);
        const formatted = lastMod.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
        modified.textContent = formatted;
    }
}


async function fetchHTML(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    return res.text();
}