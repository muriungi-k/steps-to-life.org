(() => {
  const secure = location.protocol === 'https:';
  const cookieName = secure ? '__Host-stl_preferences' : 'stl_preferences';
  function readChoice() {
    const match = String(document.cookie || '').split(';').map(part => part.trim()).find(part => part.startsWith(cookieName + '='));
    const value = match?.slice(cookieName.length + 1);
    return ['v1-essential','v1-media'].includes(value) ? value : null;
  }
  let choice = readChoice();
  function node(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    if (text) element.textContent = text;
    return element;
  }
  const panel = node('section', 'cookie-banner');
  panel.setAttribute('aria-label', 'Cookie and external media preferences');
  const title = node('h2', '', 'Your privacy choices');
  const description = node('p', '', 'We use a preference cookie and browser storage for your cart. No analytics or advertising trackers are installed. YouTube videos contact an external provider only when you allow external media.');
  const actions = node('div', 'cookie-actions');
  const essential = node('button', '', 'Essential only');
  const media = node('button', '', 'Allow external media');
  essential.type = media.type = 'button';
  actions.append(essential, media);
  const notice = node('p','cookie-save-status');
  notice.setAttribute('role','status');
  panel.append(title, description, actions, notice);
  panel.hidden = Boolean(choice);
  document.body.append(panel);
  const settings = node('button', 'cookie-settings', 'Cookie settings');
  settings.type = 'button';
  document.querySelector('.shared-footer-bottom')?.append(settings);
  settings.addEventListener('click', () => { panel.hidden = false; essential.focus(); });
  function syncMedia() {
    document.querySelectorAll('iframe[data-consent-src]').forEach(frame => {
      let placeholder = frame.parentElement.querySelector('.media-consent-placeholder');
      if (!placeholder) {
        placeholder = node('div','media-consent-placeholder');
        placeholder.append(node('p','', 'This video is hosted by YouTube. Allow external media to load it.'));
        const allow = node('button','', 'Allow YouTube video');
        allow.type = 'button';
        allow.addEventListener('click', () => { panel.hidden = false; media.focus(); });
        placeholder.append(allow);
        frame.parentElement.append(placeholder);
      }
      const permitted = choice === 'v1-media';
      frame.hidden = !permitted;
      placeholder.hidden = permitted;
      if (permitted && !frame.getAttribute('src')) frame.setAttribute('src', frame.dataset.consentSrc);
      if (!permitted) frame.removeAttribute('src');
    });
  }
  function choose(value) {
    choice = value;
    try {
      document.cookie = `${cookieName}=${value}; Max-Age=15552000; Path=/; SameSite=Lax${secure ? '; Secure' : ''}`;
    } catch { /* Session choice still works if cookies are blocked. */ }
    syncMedia();
    if (readChoice() === value) { panel.hidden = true; settings.focus({ preventScroll: true }); }
    else { notice.textContent = 'Your choice is active for this visit. Your browser did not save the preference cookie.'; }
  }
  essential.addEventListener('click', () => choose('v1-essential'));
  media.addEventListener('click', () => choose('v1-media'));
  syncMedia();
})();
