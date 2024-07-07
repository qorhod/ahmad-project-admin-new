document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.querySelector('#bd-theme');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon-active use') : null;
  const themeButtons = document.querySelectorAll('[data-bs-theme-value]');

  if (!themeToggle) {
    console.error('Theme toggle button not found!');
    return;
  }
  if (!themeIcon) {
    console.error('Theme icon not found!');
    return;
  }
  if (!themeButtons.length) {
    console.error('Theme buttons not found!');
    return;
  }

  const setTheme = (theme) => {
    console.log(`Setting theme to ${theme}`);
    document.documentElement.setAttribute('data-bs-theme', theme);
    themeIcon.setAttribute('href', theme === 'dark' ? '#moon-stars-fill' : '#sun-fill');
    localStorage.setItem('theme', theme);
  };

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.getAttribute('data-bs-theme-value');
      console.log(`Button clicked: setting theme to ${theme}`);
      setTheme(theme);
      themeButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
    });
  });

  const preferredTheme = localStorage.getItem('theme') || 'auto';
  console.log(`Preferred theme: ${preferredTheme}`);
  setTheme(preferredTheme);
  themeButtons.forEach((button) => {
    if (button.getAttribute('data-bs-theme-value') === preferredTheme) {
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.setAttribute('aria-pressed', 'false');
    }
  });
});
