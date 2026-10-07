const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const headerCta = document.querySelector('.cta-header');

function closeMobileMenu() {
  header?.classList.remove('nav-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  target.scrollIntoView({ behavior: 'smooth' });
  closeMobileMenu();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (href && href !== '#' && document.querySelector(href)) {
      event.preventDefault();
      scrollToTarget(href);
    }
  });
});

document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    question.parentElement.classList.toggle('active');
  });
});

headerCta?.addEventListener('click', () => {
  scrollToTarget('#contato');
});

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
