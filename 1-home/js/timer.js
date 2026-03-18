const timerDisplay = document.getElementById('timer');
const timerBtn = document.getElementById('timerBtn');
let timerInterval = null;
let totalSeconds = 0;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(totalSeconds);
}

function startTimer() {
    if (totalSeconds <= 0) return;
    
    timerBtn.textContent = 'Pausar';
    timerInterval = setInterval(() => {
        totalSeconds--;
        updateDisplay();
        
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerBtn.textContent = 'Reiniciar';
            timerDisplay.style.color = 'var(--nav-cta-bg)';
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerBtn.textContent = 'Continuar';
}

if (timerBtn) {
    timerBtn.addEventListener('click', () => {
        if (timerInterval) {
            pauseTimer();
            timerInterval = null;
        } else if (timerDisplay.textContent === '0:00') {
            updateDisplay();
            startTimer();
        } else {
            startTimer();
        }
    });
}

document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const minutes = parseInt(btn.dataset.time);
        totalSeconds = minutes * 60;
        updateDisplay();
        timerDisplay.style.color = 'var(--text-dark)';
        
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerBtn.textContent = 'Iniciar';
        }
    });
});

const initialTime = timerDisplay?.textContent;
if (initialTime) {
    const [mins, secs] = initialTime.split(':');
    totalSeconds = parseInt(mins) * 60 + parseInt(secs);
}
