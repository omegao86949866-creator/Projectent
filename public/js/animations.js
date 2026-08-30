/* ── PAGE LOAD FADE-IN ── */
document.documentElement.classList.add('js-loaded');

/* ── HEADER SHRINK ON SCROLL ── */
(function() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    if (y > lastScroll + 8 && y > 120) {
      header.classList.add('header--hidden');
    } else if (y < lastScroll - 4) {
      header.classList.remove('header--hidden');
    }
    lastScroll = y;
  }, { passive: true });
})();

/* ── SCROLL-TRIGGERED CARD ANIMATIONS (IntersectionObserver) ── */
(function() {
  const cards = document.querySelectorAll('.cards, .box, .episode-item');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  cards.forEach((card, i) => {
    card.classList.add('anim-hidden');
    card.style.transitionDelay = `${Math.min(i * 40, 500)}ms`;
    observer.observe(card);
  });
})();

/* ── SECTION HEADING ENTRANCE ── */
(function() {
  const headings = document.querySelectorAll('.section-heading');
  if (!headings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('heading-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  headings.forEach(h => {
    h.classList.add('heading-hidden');
    observer.observe(h);
  });
})();

/* ── GENRE PILL FILTER ON SEARCH PAGE ── */
(function() {
  const pills = document.querySelectorAll('.genre-pill');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transform = 'translateY(-3px) scale(1.05)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = '';
    });
  });
})();

/* ── RIPPLE EFFECT ON BUTTONS / LINKS ── */
(function() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn-ripple');
    if (!target) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
    `;
    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
})();

/* ── SEARCH INPUT FOCUS GLOW ── */
(function() {
  const inputs = document.querySelectorAll('.search-form input[type="search"]');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.search-form')?.classList.add('search-focused');
    });
    input.addEventListener('blur', () => {
      input.closest('.search-form')?.classList.remove('search-focused');
    });
  });
})();

/* ── STAGGER GRID ITEMS ON INITIAL LOAD ── */
(function() {
  const grid = document.querySelector('.box-cards, .grid-box');
  if (!grid) return;
  grid.classList.add('grid-loaded');
})();
