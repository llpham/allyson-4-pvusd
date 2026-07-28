// Shared behaviour for every page (index.html, about.html).
// Loaded with `defer`, so the DOM is parsed before this runs.

// Current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') { navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
});

// Theme toggle (persisted)
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);
document.getElementById('themeToggle').addEventListener('click', () => {
  const cur = root.getAttribute('data-theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const next = cur === 'dark' ? 'light'
    : cur === 'light' ? 'dark'
    : (prefersDark ? 'light' : 'dark');
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
