let siteReady = false;

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initSite() {
  initLucideIcons();
  if (siteReady) return;
  siteReady = true;

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  function closeMobileMenu() {
    header?.classList.remove('nav-open');
    document.body.classList.remove('nav-locked');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  }

  function toggleMobileMenu() {
    const isOpen = header.classList.toggle('nav-open');
    document.body.classList.toggle('nav-locked', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      const target = href && href !== '#' ? document.querySelector(href) : null;
      if (!target) return;

      event.preventDefault();
      closeMobileMenu();
      const offset = header?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach((openItem) => {
        openItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  menuToggle?.addEventListener('click', toggleMobileMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initSite();
});

if (document.readyState !== 'loading') {
  initSite();
}
