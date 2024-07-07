document.addEventListener('DOMContentLoaded', function () {
    const themeToggleNavbar = document.getElementById('themeToggle');
    const themeToggleLabelNavbar = document.getElementById('themeToggleLabel');
    const themeToggleSidebar = document.getElementById('themeToggleSidebar');
    const themeToggleLabelSidebar = document.getElementById('themeToggleLabelSidebar');
    const whiteLogo = document.querySelector('.sidebar-logo');
    const smallSidebarToggle = document.querySelector('.small-sidebar-toggle');
  
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeToggleLabelNavbar.textContent = 'الوضع الليلي';
            themeToggleLabelSidebar.textContent = 'الوضع الليلي';
            whiteLogo.src = '/admin/public/img/whitedark.png'; // تغيير الصورة للوضع الداكن
        } else {
            themeToggleLabelNavbar.textContent = 'الوضع النهاري';
            themeToggleLabelSidebar.textContent = 'الوضع النهاري';
            whiteLogo.src = '/admin/public/img/white.png'; // تغيير الصورة للوضع النهاري
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    if (savedTheme === 'dark') {
        themeToggleNavbar.checked = true;
        themeToggleSidebar.checked = true;
    } else {
        themeToggleNavbar.checked = false;
        themeToggleSidebar.checked = false;
    }

    themeToggleNavbar.addEventListener('change', () => {
        if (themeToggleNavbar.checked) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    });

    themeToggleSidebar.addEventListener('change', () => {
        if (themeToggleSidebar.checked) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    });

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebarId');
        const content = document.getElementById('content');
        const sidebarDivider = document.getElementById('sidebar-divider');
        const navbar = document.querySelector('.navbar');
        const sidebarTextElements = document.querySelectorAll('.sidebar-text');
        const themeToggleContainer = document.querySelector('.small-sidebar-toggle');

        sidebar.classList.toggle('small-sidebar');
        content.classList.toggle('small-content');
        sidebarDivider.classList.toggle('small-sidebar-divider');
        navbar.classList.toggle('small-navbar');

        sidebarTextElements.forEach(element => {
            element.classList.toggle('d-none');
        });

        // إخفاء أو إظهار زر التبديل عند تقليص الشريط الجانبي
        if (sidebar.classList.contains('small-sidebar')) {
            themeToggleContainer.style.display = 'none';
        } else {
            themeToggleContainer.style.display = 'block';
        }
    }

    const toggleButton = document.querySelector('.bi-x-circle');
    toggleButton.addEventListener('click', toggleSidebar);
});
