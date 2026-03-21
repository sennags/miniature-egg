(function() {
    const html = document.documentElement;
    const icon = document.querySelector('.theme-icon');
    
    function getThemeByTime() {
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes();
        const totalMin = h * 60 + m;
        const darkStart = 17 * 60 + 30;  // 17:30
        const darkEnd = 6 * 60 + 30;     // 6:30
        
        return totalMin >= darkStart || totalMin < darkEnd ? 'dark' : 'light';
    }
    
    function updateTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return;
        
        const theme = getThemeByTime();
        const currentTheme = html.getAttribute('data-theme');
        
        if (theme !== currentTheme) {
            html.setAttribute('data-theme', theme);
            if (icon) icon.textContent = theme === 'dark' ? '☾' : '☀';
        }
    }
    
    function setInitialTheme() {
        const saved = localStorage.getItem('theme');
        const theme = saved || getThemeByTime();
        html.setAttribute('data-theme', theme);
        if (icon) icon.textContent = theme === 'dark' ? '☾' : '☀';
    }
    
    setInitialTheme();
    setInterval(updateTheme, 60000);
    
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('#themeToggle')) {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (icon) icon.textContent = newTheme === 'dark' ? '☾' : '☀';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('reveal'), 200 + index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50% 0px 0px 0px' });

    document.querySelectorAll('.prep-card').forEach(observer.observe, observer);
})();
