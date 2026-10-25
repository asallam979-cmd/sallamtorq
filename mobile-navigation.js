/* Shared, compact mobile navigation for inner pages. */
(() => {
  if (document.querySelector('.mobile-home-header')) return;

  const header = document.querySelector('header');
  if (!header) return;

  const css = document.createElement('style');
  css.textContent = `
    .satorq-mobile-menu-button,.satorq-mobile-scrim,.satorq-mobile-drawer{display:none!important}
    @media(max-width:600px){
      body{overflow-x:hidden}
      .satorq-mobile-nav-host{position:sticky!important;top:0!important;z-index:10000!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:9px!important;width:100%!important;min-height:60px!important;height:60px!important;padding:7px 12px!important;background:rgba(5,7,9,.97)!important;border-bottom:1px solid rgba(255,255,255,.14)!important;box-sizing:border-box!important;backdrop-filter:blur(14px)}
      .satorq-mobile-nav-host>.satorq-mobile-menu-button{order:0!important;flex:0 0 42px!important;width:42px!important;height:42px!important;display:grid!important;align-content:center!important;justify-items:center!important;gap:6px!important;padding:0!important;border:1px solid rgba(255,255,255,.18)!important;border-radius:50%!important;background:rgba(255,255,255,.06)!important;color:#fff!important}
      .satorq-mobile-menu-button i{display:block!important;width:19px!important;height:2px!important;background:#fff!important;border-radius:2px!important}
      .satorq-mobile-nav-host>nav{display:none!important}
      .satorq-mobile-nav-host .satorq-mobile-brand{order:1!important;flex:1 1 auto!important;min-width:0!important;margin:0 auto!important;text-align:center!important;white-space:nowrap!important;overflow:visible!important}
      .satorq-mobile-nav-host>.satorq-unified-tools,.satorq-mobile-nav-host>.tools{order:2!important;flex:0 1 auto!important;min-width:0!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:7px!important;margin:0!important}
      .satorq-mobile-nav-host>.sales{order:2!important;flex:0 1 auto!important;min-width:0!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:4px!important;margin:0!important;white-space:nowrap!important}
      .satorq-mobile-nav-host>.sales a{padding:7px 6px!important;font-size:7px!important;letter-spacing:.35px!important}
      .satorq-mobile-nav-host>.satorq-cta,.satorq-mobile-nav-host>.cta,.satorq-mobile-nav-host>.st-cta{order:2!important;flex:0 0 auto!important;margin:0!important;padding:9px 10px!important;font-size:8px!important}
      .satorq-mobile-scrim{display:block!important;position:fixed!important;inset:0!important;z-index:10001!important;background:rgba(0,0,0,.62)!important;opacity:0!important;visibility:hidden!important;transition:opacity .22s ease,visibility .22s ease!important}
      .satorq-mobile-scrim.is-open{opacity:1!important;visibility:visible!important}
      .satorq-mobile-drawer{display:block!important;position:fixed!important;inset:0 auto 0 0!important;z-index:10002!important;width:min(86vw,360px)!important;height:100dvh!important;overflow:auto!important;padding:0 20px 30px!important;background:#0b0d0f!important;color:#fff!important;box-shadow:16px 0 50px rgba(0,0,0,.45)!important;transform:translateX(-105%)!important;visibility:hidden!important;transition:transform .25s ease,visibility .25s ease!important;box-sizing:border-box!important}
      .satorq-mobile-drawer.is-open{transform:translateX(0)!important;visibility:visible!important}
      .satorq-mobile-drawer-head{position:sticky!important;top:0!important;display:flex!important;align-items:center!important;justify-content:space-between!important;height:72px!important;margin:0 -20px 12px!important;padding:0 20px!important;background:#0b0d0f!important;border-bottom:1px solid #292929!important;font-weight:900!important;letter-spacing:.3px!important}
      .satorq-mobile-drawer-head button{width:40px!important;height:40px!important;border:0!important;background:transparent!important;color:#fff!important;font-size:30px!important}
      .satorq-mobile-drawer a{position:relative!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;min-height:49px!important;padding-right:30px!important;border-bottom:1px solid rgba(255,255,255,.1)!important;color:#f4f4f4!important;text-decoration:none!important;font-size:13px!important;font-weight:750!important;letter-spacing:.45px!important;text-transform:uppercase!important}
      .satorq-mobile-drawer a:after{content:''!important;position:absolute!important;top:50%!important;right:8px!important;display:block!important;width:9px!important;height:9px!important;border-top:2px solid #e10613!important;border-right:2px solid #e10613!important;transform:translateY(-50%) rotate(45deg)!important}
      body.satorq-mobile-menu-open{overflow:hidden!important}
    }
  `;
  document.head.append(css);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'satorq-mobile-menu-button';
  button.setAttribute('aria-label', 'Open navigation');
  button.setAttribute('aria-expanded', 'false');
  button.innerHTML = '<i></i><i></i><i></i>';
  header.classList.add('satorq-mobile-nav-host');
  header.insertBefore(button, header.firstChild);

  const brand = header.querySelector('.satorq-unified-logo,.st-logo,.logo,.brand,a[href="index.html"]');
  brand?.classList.add('satorq-mobile-brand');

  const drawer = document.createElement('nav');
  drawer.className = 'satorq-mobile-drawer';
  drawer.setAttribute('aria-label', 'SA.TORQ Navigation');
  drawer.setAttribute('aria-hidden', 'true');
  const top = document.createElement('div');
  top.className = 'satorq-mobile-drawer-head';
  top.innerHTML = '<span>SA.TORQ</span><button type="button" aria-label="Close navigation">×</button>';
  drawer.append(top);
  [
    ['HOME', 'index.html'],
    ['SIGN UP / LOGIN', 'account.html'],
    ['MODELS', 'models-catalog.html'],
    ['MOTOVANS', 'motovans.html'],
    ['MOTO GEAR', 'moto-gear.html'],
    ['RIDERS', 'riders.html#clans'],
    ['SERVICE', 'service.html'],
    ['PARTS', 'racing-parts.html'],
    ['TORQ MARKET', 'marketplace.html'],
    ['TRAINING', 'index.html#training'],
    ['PERFORMANCE TUNING', 'performance-tuning.html'],
    ['EVENTS', 'index.html#events']
  ].forEach(([label, href]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    drawer.append(link);
  });

  const overlay = document.createElement('div');
  overlay.className = 'satorq-mobile-scrim';
  document.body.append(overlay, drawer);
  const closeButton = top.querySelector('button');
  const close = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('satorq-mobile-menu-open');
  };
  const open = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    button.setAttribute('aria-expanded', 'true');
    document.body.classList.add('satorq-mobile-menu-open');
  };
  button.addEventListener('click', () => button.getAttribute('aria-expanded') === 'true' ? close() : open());
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', close);
  drawer.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
})();
