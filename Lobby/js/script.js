(function() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = savedTheme === 'dark' ? '☾' : '☀';
    
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
                setTimeout(() => entry.target.classList.add('reveal'), index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50% 0px 0px 0px' });

    document.querySelectorAll('.prep-card').forEach(observer.observe, observer);
})();