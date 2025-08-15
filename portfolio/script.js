(function() {
  const body = document.documentElement;
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const toTop = document.querySelector('.to-top');
  const year = document.getElementById('year');

  // Year
  if (year) year.textContent = new Date().getFullYear();

  // Nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      if (nav.classList.contains('open')) {
        nav.style.display = 'flex';
      } else {
        if (window.innerWidth < 860) nav.style.display = 'none';
      }
    });
    // Close on link click (mobile)
    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A' && window.innerWidth < 860) {
        navToggle.click();
      }
    });
    // Ensure correct display on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 860) {
        nav.style.display = 'flex';
      } else if (!nav.classList.contains('open')) {
        nav.style.display = 'none';
      }
    });
    if (window.innerWidth < 860) nav.style.display = 'none';
  }

  // Theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') body.classList.add('light');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light');
      const isLight = body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggle.textContent = isLight ? '☀️' : '🌙';
    });
    const isLight = body.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  }

  // Back to top
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (y > 350) toTop.classList.add('show'); else toTop.classList.remove('show');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', id);
        }
      }
    });
  });
})();