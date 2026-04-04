const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  },
);

revealItems.forEach((item) => observer.observe(item));

const footerYear = document.querySelector('#footer-year');
if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} Todos os direitos reservados`;
}

const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (siteHeader && navToggle && siteNav) {
  const closeMenu = () => {
    siteHeader.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        closeMenu();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

const waitlistForm = document.querySelector('#waitlist-form');
const formNote = document.querySelector('#form-note');

if (waitlistForm) {
  waitlistForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(waitlistForm);
    const nome = formData.get('nome')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const modalidade = formData.get('modalidade')?.toString().trim() ?? '';
    const rotina = formData.get('rotina')?.toString().trim() ?? '';
    const objetivo = formData.get('objetivo')?.toString().trim() ?? '';

    const subject = encodeURIComponent(`Waitlist Kyron - ${nome || 'Novo interesse'}`);
    const body = encodeURIComponent(
      [
        'Quero entrar na waitlist do Kyron.',
        '',
        `Nome: ${nome}`,
        `Email: ${email}`,
        `Modalidade: ${modalidade}`,
        `Rotina: ${rotina}`,
        `Objetivo atual: ${objetivo}`,
      ].join('\n'),
    );

    if (formNote) {
      formNote.textContent = 'Abrindo seu cliente de email com a mensagem montada.';
    }

    window.location.href = `mailto:lucca.vilaca@gmail.com?subject=${subject}&body=${body}`;
  });
}
