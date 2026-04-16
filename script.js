/* ============================================================
   SCRIPT.JS — Medona English School
   ============================================================ */

/* ---- PAGE NAVIGATION ---- */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) {
    page.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');
  // Trigger reveal for the new page
  setTimeout(setupReveal, 100);
}

/* ---- HAMBURGER MENU ---- */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

/* ---- SCROLL REVEAL ---- */
function setupReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}
document.addEventListener('DOMContentLoaded', setupReveal);

/* ---- ADMISSION FORM VALIDATION ---- */
function submitForm() {
  const fields = [
    {id:'studentName', label:'Student name'},
    {id:'parentName',  label:'Parent name'},
    {id:'phone',       label:'Phone number', pattern:/^[6-9]\d{9}$/},
    {id:'email',       label:'Email', optional:true, pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    {id:'classApply',  label:'Class'},
    {id:'dob',         label:'Date of birth'},
    {id:'address',     label:'Address'}
  ];
  let valid = true;
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const errEl = document.getElementById('err-'+f.id);
    if (!el || !errEl) return;
    el.classList.remove('error');
    errEl.textContent = '';
    const val = el.value.trim();
    if (!f.optional && !val) {
      errEl.textContent = f.label + ' is required.';
      el.classList.add('error');
      valid = false;
    } else if (val && f.pattern && !f.pattern.test(val)) {
      errEl.textContent = 'Please enter a valid ' + f.label.toLowerCase() + '.';
      el.classList.add('error');
      valid = false;
    }
  });
  if (valid) {
    document.getElementById('form-content').style.display = 'none';
    document.getElementById('success-msg').style.display = 'block';
  }
}
function resetForm() {
  document.getElementById('form-content').style.display = 'block';
  document.getElementById('success-msg').style.display = 'none';
  document.querySelectorAll('#form-content input, #form-content select, #form-content textarea').forEach(el => {
    el.value = '';
    el.classList.remove('error');
  });
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}

/* ---- CONTACT FORM ---- */
function submitContact() {
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  document.getElementById('cf-success').style.display = 'block';
  ['cf-name','cf-phone','cf-email','cf-subject','cf-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

/* ---- GALLERY FILTER ---- */
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/* ---- LIGHTBOX ---- */
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
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox({target:null});
});
