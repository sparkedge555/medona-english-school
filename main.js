/* ============================================================
   MEDONA ENGLISH SCHOOL — MAIN JAVASCRIPT
   ============================================================ */

/* PAGE NAVIGATION */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) { page.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.remove('open');
  setTimeout(setupReveal, 100);
}

/* HAMBURGER MENU */
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* SCROLL REVEAL */
function setupReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  reveals.forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}

/* GALLERY FILTER */
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'block' : 'none';
  });
}

/* LIGHTBOX */
function openLightbox(el) {
  const img = el.querySelector('img');
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (!e || e.target === e.currentTarget || e.currentTarget.classList.contains('lightbox-close')) {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* KEYBOARD EVENTS */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* Close mobile menu on outside click */
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  if (menu && hamburger && menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

/* INIT */
document.addEventListener('DOMContentLoaded', function () {
  setupReveal();
});
