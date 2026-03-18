const topbar = document.querySelector('.topbar');
const topbarTrigger = document.querySelector('.topbar-trigger');
let hideTimeout;

topbarTrigger.addEventListener('mouseenter', () => {
    topbar.classList.add('active');
    clearTimeout(hideTimeout);
});

topbar.addEventListener('mouseenter', () => {
    topbar.classList.add('active');
    clearTimeout(hideTimeout);
});

topbar.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        topbar.classList.remove('active');
    }, 300);
});

topbarTrigger.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        topbar.classList.remove('active');
    }, 300);
});

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '◐' : '◑';
    }
}
