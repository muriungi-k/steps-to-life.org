(() => {
  const header = document.querySelector('.glass-site-header');
  if (!header) return;
  const menu = header.querySelector('.glass-nav-links');
  const toggle = header.querySelector('.glass-menu-toggle');
  const searchToggle = header.querySelector('.glass-search-toggle');
  const searchPanel = header.querySelector('.glass-site-search');
  const input = header.querySelector('#glass-search-input');
  const results = header.querySelector('.glass-search-results');
  const links = [...menu.querySelectorAll('a')];
  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }
  function closeSearch() {
    searchPanel.hidden = true;
    searchToggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', () => {
    closeSearch();
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  function showResults() {
    const query = input.value.trim().toLowerCase();
    const matches = links.filter(link => link.textContent.toLowerCase().includes(query));
    results.replaceChildren(...matches.map(link => {
      const result = document.createElement('a');
      result.href = link.getAttribute('href');
      result.textContent = link.textContent;
      return result;
    }));
    header.querySelector('.glass-search-empty').hidden = matches.length > 0;
  }
  searchToggle.addEventListener('click', () => {
    closeMenu();
    searchPanel.hidden = !searchPanel.hidden;
    searchToggle.setAttribute('aria-expanded', String(!searchPanel.hidden));
    if (!searchPanel.hidden) { showResults(); input.focus(); }
  });
  input.addEventListener('input', showResults);
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) { closeMenu(); closeSearch(); } });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!searchPanel.hidden) { closeSearch(); searchToggle.focus(); }
      else if (menu.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
    }
  });
  window.addEventListener('resize', closeMenu);
})();
