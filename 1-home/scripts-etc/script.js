// Controle da topbar interativa
const topbar = document.querySelector('.topbar');
const topbarTrigger = document.querySelector('.topbar-trigger');
let hideTimeout;

// Mostrar topbar quando mouse entra na zona de ativação
topbarTrigger.addEventListener('mouseenter', () => {
    topbar.classList.add('active');
    clearTimeout(hideTimeout);
});

// Mostrar topbar quando mouse entra nela
topbar.addEventListener('mouseenter', () => {
    topbar.classList.add('active');
    clearTimeout(hideTimeout);
});

// Esconder topbar quando mouse sai
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
