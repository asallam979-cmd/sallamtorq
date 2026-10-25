/* Homepage mobile navigation. It reuses the site's existing destinations only. */
(() => {
  const panel = document.querySelector('.mobile-panel');
  const scrim = document.querySelector('.mobile-scrim');
  const content = document.querySelector('[data-mobile-panel-content]');
  const menuButtons = [...document.querySelectorAll('[data-mobile-menu]')];
  const openButton = document.querySelector('[data-mobile-menu-open]');
  const searchButton = document.querySelector('[data-mobile-search-open]');
  const closeButtons = [...document.querySelectorAll('[data-mobile-menu-close]')];

  if (!panel || !scrim || !content) return;

  const menus = {
    models: {
      title: 'MODELS',
      links: [
        ['MODELS', 'models-catalog.html'],
        ['MODELS CATALOG', 'models-catalog-expanded.html'],
        ['MASTER CATALOG', 'master-catalog.html'],
        ['MODELS', 'models.html']
      ]
    },
    parts: {
      title: 'PARTS',
      links: [
        ['PARTS', 'racing-parts.html'],
        ['SERVICE', 'service.html'],
        ['PERFORMANCE TUNING', 'performance-tuning.html'],
        ['MOTOVANS', 'motovans.html']
      ]
    },
    'moto-gear': {
      title: 'MOTO GEAR',
      links: [
        ['MOTO GEAR', 'moto-gear.html'],
        ['RIDERS', 'riders.html#clans'],
        ['TRAINING', '#training'],
        ['EVENTS', '#events'],
        ['FAQ', '#faq'],
        ['SIGN UP / LOGIN', 'account.html']
      ]
    }
  };

  function setExpanded(name) {
    menuButtons.forEach(button => button.setAttribute('aria-expanded', String(button.dataset.mobileMenu === name && panel.classList.contains('is-open'))));
  }

  function openPanel(markup, name = '') {
    content.innerHTML = markup;
    panel.classList.add('is-open');
    scrim.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mobile-menu-open');
    if (openButton) openButton.setAttribute('aria-expanded', 'true');
    setExpanded(name);
    const autofocus = content.querySelector('[data-mobile-autofocus]');
    if (autofocus) autofocus.focus();
  }

  function closePanel() {
    panel.classList.remove('is-open');
    scrim.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mobile-menu-open');
    if (openButton) openButton.setAttribute('aria-expanded', 'false');
    setExpanded('');
  }

  function menuMarkup(menu) {
    return `<span class="mobile-panel-heading">${menu.title}</span>${menu.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}`;
  }

  function allMenuMarkup() {
    return [
      ['MODELS', 'models-catalog.html'],
      ['MOTOVANS', 'motovans.html'],
      ['MOTO GEAR', 'moto-gear.html'],
      ['RIDERS', 'riders.html#clans'],
      ['SERVICE', 'service.html'],
      ['PARTS', 'racing-parts.html'],
      ['TRAINING', '#training'],
      ['PERFORMANCE TUNING', 'performance-tuning.html'],
      ['EVENTS', '#events'],
      ['FAQ', '#faq'],
      ['SIGN UP / LOGIN', 'account.html']
    ].map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
  }

  function searchMarkup() {
    return `<span class="mobile-panel-heading">SEARCH SA.TORQ</span><form class="mobile-search-form" data-mobile-search-form><input data-mobile-autofocus type="search" aria-label="Search SA.TORQ" placeholder="Search models, parts, service..."><button type="submit">SEARCH</button></form><div data-mobile-search-results>${allMenuMarkup()}</div>`;
  }

  menuButtons.forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.mobileMenu;
    if (panel.classList.contains('is-open') && button.getAttribute('aria-expanded') === 'true') {
      closePanel();
      return;
    }
    openPanel(menuMarkup(menus[name]), name);
  }));

  openButton?.addEventListener('click', () => openPanel(allMenuMarkup()));
  searchButton?.addEventListener('click', () => openPanel(searchMarkup()));
  closeButtons.forEach(button => button.addEventListener('click', closePanel));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePanel();
  });

  content.addEventListener('submit', event => {
    if (!event.target.matches('[data-mobile-search-form]')) return;
    event.preventDefault();
    const query = event.target.querySelector('input').value.trim().toLowerCase();
    const matches = Object.values(menus).flatMap(menu => menu.links).filter(([label]) => label.toLowerCase().includes(query));
    const results = content.querySelector('[data-mobile-search-results]');
    results.innerHTML = matches.length
      ? matches.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')
      : '<p class="mobile-panel-heading">NO MATCHES — PLEASE TRY ANOTHER SEARCH.</p>';
  });
})();
