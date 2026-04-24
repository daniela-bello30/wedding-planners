/* =====================================================
   ELENA & CO. — Main JavaScript
   GSAP 3 + ScrollTrigger animations
   ===================================================== */

gsap.registerPlugin(ScrollTrigger);

/* ─── CUSTOM CURSOR ─────────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

console.log('Cursor elements found:', cursor, cursorFollower);
console.log('GSAP available:', typeof gsap);

if (cursor && cursorFollower) {
  // Verificar que GSAP esté disponible
  if (typeof gsap !== 'undefined') {
    console.log('Initializing cursor animations');
    const xCursor = gsap.quickTo(cursor, 'x', { duration: 0.1 });
    const yCursor = gsap.quickTo(cursor, 'y', { duration: 0.1 });
    const xFollower = gsap.quickTo(cursorFollower, 'x', { duration: 0.45, ease: 'power3' });
    const yFollower = gsap.quickTo(cursorFollower, 'y', { duration: 0.45, ease: 'power3' });

    window.addEventListener('mousemove', (e) => {
      console.log('Mouse move event:', e.clientX, e.clientY);
      xCursor(e.clientX);
      yCursor(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
    });

    document.querySelectorAll('a, button, .service-card, .g-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorFollower, { scale: 1.8, opacity: .35, duration: .25 });
        gsap.to(cursor, { scale: .6, duration: .2 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursorFollower, { scale: 1, opacity: .55, duration: .25 });
        gsap.to(cursor, { scale: 1, duration: .2 });
      });
    });
  } else {
    console.error('GSAP not available');
  }
} else {
  console.error('Cursor elements not found');
}

/* ─── NAVBAR SCROLL ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
ScrollTrigger.create({
  start: 'top -60',
  onEnter: () => navbar.classList.add('scrolled'),
  onLeaveBack: () => navbar.classList.remove('scrolled'),
});

/* ─── MOBILE MENU ────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  gsap.fromTo('.mobile-link, .mobile-cta', {
    y: 30, opacity: 0
  }, {
    y: 0, opacity: 1, stagger: .07, duration: .45, ease: 'power2.out', delay: .15
  });
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ─── SMOOTH ANCHOR SCROLL ───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── HERO ANIMATIONS ────────────────────────────────── */
const heroTl = gsap.timeline({ delay: .2 });

heroTl
  .from('.hero-eyebrow', { opacity: 0, y: 20, duration: .7, ease: 'power2.out' })
  .from('.word', {
    opacity: 0,
    y: 30,
    stagger: .12,
    duration: .65,
    ease: 'power3.out'
  }, '-=.3')
  .from('.hero-line-2', { opacity: 0, y: 20, duration: .7, ease: 'power2.out' }, '-=.2')
  .from('.hero-sub', { opacity: 0, y: 16, duration: .6, ease: 'power2.out' }, '-=.3')
  .from('.hero-ctas', { opacity: 0, y: 14, duration: .55, ease: 'power2.out' }, '-=.25')
  .from('.hero-proof', { opacity: 0, y: 10, duration: .5, ease: 'power2.out' }, '-=.25')
  .from('.hero-float-badge', { opacity: 0, x: -20, duration: .6, ease: 'power2.out' }, '-=.4')
  .from('.hero-gold-line', { scaleX: 0, transformOrigin: 'left', duration: .8, ease: 'power2.inOut' }, '-=.4')
  .from('.deco-circle--1', { opacity: 0, scale: .85, duration: 1, ease: 'power2.out' }, '-=.8')
  .from('.deco-circle--2', { opacity: 0, scale: .85, duration: 1, ease: 'power2.out' }, '-=.8');

/* Hero image parallax */
gsap.to('.hero-img', {
  yPercent: 15,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

/* Deco circles parallax */
gsap.to('.deco-circle--1', {
  y: -60,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 2
  }
});
gsap.to('.deco-circle--2', {
  y: 40,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 3
  }
});

/* ─── TRUST BAR TICKER ───────────────────────────────── */
const ticker = document.getElementById('ticker');
if (ticker) {
  const clone = ticker.cloneNode(true);
  ticker.parentNode.appendChild(clone);

  const totalWidth = ticker.scrollWidth;
  gsap.set(clone, { x: totalWidth });

  const tickerAnim = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
  tickerAnim
    .to(ticker, { x: -totalWidth, duration: 28 }, 0)
    .to(clone, { x: 0, duration: 28 }, 0);
}

/* ─── GENERIC SCROLL REVEAL HELPER ──────────────────── */
function revealOnScroll(selector, extra = {}) {
  const els = gsap.utils.toArray(selector);
  els.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: .8,
        ease: 'power2.out',
        ...extra,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

/* ─── PROBLEM SECTION ─────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.problem-section',
  start: 'top 85%',
  onEnter: () => {
    gsap.from('.problem-section .section-heading', {
      opacity: 0, y: 30, duration: .7, ease: 'power2.out'
    });
    gsap.from('.pain-card', {
      opacity: 0,
      x: -40,
      stagger: .15,
      duration: .6,
      ease: 'power2.out',
      delay: .2
    });
    gsap.from('.problem-close', {
      opacity: 0, y: 16, duration: .6, ease: 'power2.out', delay: .7
    });
    gsap.from('.problem-stat-block', {
      opacity: 0, scale: .9, duration: .8, ease: 'back.out(1.4)', delay: .3
    });
  }
});

/* ─── ABOUT SECTION ───────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.about-section',
  start: 'top 85%',
  onEnter: () => {
    gsap.from('.about-img--main', { opacity: 0, x: -30, duration: .8, ease: 'power2.out' });
    gsap.from('.about-img--secondary', { opacity: 0, x: 20, y: 20, duration: .8, ease: 'power2.out', delay: .2 });
    gsap.from('.about-img--tertiary', { opacity: 0, scale: .9, duration: .7, ease: 'power2.out', delay: .35 });
    gsap.from('.about-img-badge', { opacity: 0, y: 16, duration: .5, ease: 'power2.out', delay: .5 });
    gsap.from('.about-text > *', {
      opacity: 0,
      y: 24,
      stagger: .12,
      duration: .65,
      ease: 'power2.out',
      delay: .15
    });
  }
});

/* ─── SERVICES ────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.services-section',
  start: 'top 85%',
  onEnter: () => {
    gsap.from('.services-section .section-title-wrap > *', {
      opacity: 0, y: 20, stagger: .12, duration: .6, ease: 'power2.out'
    });
    gsap.from('.service-card', {
      opacity: 0,
      scale: .95,
      y: 24,
      stagger: .15,
      duration: .75,
      ease: 'power2.out',
      delay: .2
    });
  }
});

/* ─── PROCESS ─────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.process-section',
  start: 'top 85%',
  onEnter: () => {
    gsap.from('.process-section .section-title-wrap > *', {
      opacity: 0, y: 20, stagger: .12, duration: .6, ease: 'power2.out'
    });
    gsap.from('.process-step', {
      opacity: 0,
      y: 32,
      stagger: .18,
      duration: .7,
      ease: 'power2.out',
      delay: .25
    });
    gsap.from('.process-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1,
      ease: 'power2.inOut',
      delay: .2
    });
    gsap.from('.process-cta', {
      opacity: 0, y: 16, duration: .6, ease: 'power2.out', delay: .8
    });
  }
});

/* ─── STATS COUNTER ───────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.stats-section',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.from('.stats-section .stats-gold-line', {
      scaleX: 0,
      transformOrigin: 'center',
      stagger: .2,
      duration: .8,
      ease: 'power2.inOut'
    });
    gsap.from('.stat-item', {
      opacity: 0,
      y: 28,
      stagger: .12,
      duration: .6,
      ease: 'power2.out',
      delay: .15
    });

    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        delay: .3,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
      });
    });
  }
});

/* ─── TESTIMONIALS ────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.testimonials-section',
  start: 'top 85%',
  onEnter: () => {
    gsap.from('.testimonials-section .section-title-wrap', {
      opacity: 0, y: 24, duration: .65, ease: 'power2.out'
    });
    gsap.from('.testimonial-card', {
      opacity: 0,
      x: 40,
      stagger: .16,
      duration: .75,
      ease: 'power2.out',
      delay: .2
    });
  }
});

/* ─── GALLERY ─────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.gallery-section',
  start: 'top 85%',
  onEnter: () => {
    gsap.from('.gallery-section .section-title-wrap', {
      opacity: 0, y: 24, duration: .65, ease: 'power2.out'
    });
    gsap.from('.g-item', {
      opacity: 0,
      y: 28,
      stagger: .08,
      duration: .6,
      ease: 'power2.out',
      delay: .2
    });
    gsap.from('.gallery-cta', {
      opacity: 0, y: 16, duration: .5, ease: 'power2.out', delay: .75
    });
  }
});

/* ─── CONTACT SECTION ─────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.contact-section',
  start: 'top 80%',
  onEnter: () => {
    gsap.from('.contact-image-side', {
      opacity: 0, x: -30, duration: .9, ease: 'power2.out'
    });
    gsap.from('.contact-form-card', {
      opacity: 0, y: 40, duration: .9, ease: 'power2.out', delay: .15
    });
  }
});

/* ─── FINAL CTA ───────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.final-cta-section',
  start: 'top 85%',
  onEnter: () => {
    gsap.from('.final-cta-heading', { opacity: 0, y: 32, duration: .8, ease: 'power2.out' });
    gsap.from('.final-cta-script', { opacity: 0, y: 16, duration: .65, ease: 'power2.out', delay: .2 });
    gsap.from('.final-cta-inner .btn', { opacity: 0, scale: .92, duration: .6, ease: 'back.out(1.5)', delay: .4 });
    gsap.from('.final-cta-footnote', { opacity: 0, duration: .5, ease: 'power2.out', delay: .7 });
  }
});

/* ─── FOOTER ──────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.footer',
  start: 'top 92%',
  onEnter: () => {
    gsap.from('.footer-col', {
      opacity: 0,
      y: 20,
      stagger: .1,
      duration: .6,
      ease: 'power2.out'
    });
  }
});

/* ─── CONTACT FORM VALIDATION ─────────────────────────── */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(input, msg) {
  input.classList.add('invalid');
  const errEl = input.parentElement.querySelector('.form-error');
  if (errEl) errEl.textContent = msg;
}

function clearError(input) {
  input.classList.remove('invalid');
  const errEl = input.parentElement.querySelector('.form-error');
  if (errEl) errEl.textContent = '';
}

function validateForm() {
  let valid = true;
  const nombres = form.querySelector('#nombres');
  const fecha = form.querySelector('#fecha');
  const invitados = form.querySelector('#invitados');
  const ciudad = form.querySelector('#ciudad');

  if (!nombres.value.trim()) {
    showError(nombres, 'Por favor ingresa el nombre de la pareja.');
    valid = false;
  } else clearError(nombres);

  if (!fecha.value) {
    showError(fecha, 'Por favor selecciona una fecha aproximada.');
    valid = false;
  } else clearError(fecha);

  if (!invitados.value) {
    showError(invitados, 'Por favor selecciona el número de invitados.');
    valid = false;
  } else clearError(invitados);

  if (!ciudad.value.trim()) {
    showError(ciudad, 'Por favor ingresa la ciudad o lugar.');
    valid = false;
  } else clearError(ciudad);

  return valid;
}

form.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('input', () => clearError(input));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  gsap.to(form, {
    opacity: 0, y: -16, duration: .35, ease: 'power2.in',
    onComplete: () => {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
      gsap.fromTo(formSuccess,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: .6, ease: 'power2.out' }
      );
    }
  });
});
