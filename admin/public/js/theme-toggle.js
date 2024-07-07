// theme-toggle.js
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelector('#themeToggle');
    const themeToggleLabel = document.querySelector('#themeToggleLabel');
    const whiteLogo = document.querySelector('.sidebar-logo');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            whiteLogo.src = '/admin/public/img/whitedark.png'; // تغيير الصورة للوضع الداكن
            themeToggleLabel.textContent = 'الوضع الليلي';
            themeToggle.checked = true;
        } else {
            whiteLogo.src = '/admin/public/img/white.png'; // تغيير الصورة للوضع النهاري
            themeToggleLabel.textContent = 'الوضع النهاري';
            themeToggle.checked = false;
        }
    };

    themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'dark' : 'light';
        setTheme(theme);
    });

    const preferredTheme = localStorage.getItem('theme') || 'light';
    setTheme(preferredTheme);
});
