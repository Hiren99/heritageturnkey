(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Mark active link by path if not already set
  const links = document.querySelectorAll('.nav-links a[href]');
  links.forEach(link => {
    try{
      const href = link.getAttribute('href');
      if (!href) return;
      const path = location.pathname.split('/').pop() || 'index.html';
      if (href === path && !link.classList.contains('active')) {
        link.classList.add('active');
      }
    }catch(e){}
  });
})();