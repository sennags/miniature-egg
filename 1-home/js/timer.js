(function() {
    const timerDisplay = document.getElementById('timer');
    const timerBtn = document.getElementById('timerBtn');
    if (!timerDisplay || !timerBtn) return;

    let timerInterval = null;
    let totalSeconds = 0;
    let isRunning = false;
    const btnIcon = timerBtn.querySelector('.btn-icon');

    const updateDisplay = () => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const setBtnState = (icon, text) => {
        btnIcon.textContent = icon;
        timerBtn.lastChild.textContent = ` ${text}`;
    };

    const startTimer = () => {
        if (totalSeconds <= 0) return;
        isRunning = true;
        setBtnState('⏸', 'Pausar');
        timerBtn.classList.add('paused');
        timerDisplay.parentElement.classList.add('timer-running', 'timer-complete');

        timerInterval = setInterval(() => {
            totalSeconds--;
            updateDisplay();
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                isRunning = false;
                setBtnState('↻', 'Reiniciar');
                timerDisplay.parentElement.classList.remove('timer-running');
            }
        }, 1000);
    };

    const pauseTimer = () => {
        isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
        setBtnState('▶', 'Continuar');
        timerBtn.classList.remove('paused');
        timerDisplay.parentElement.classList.remove('timer-running');
    };

    timerBtn.addEventListener('click', () => {
        if (isRunning) pauseTimer();
        else {
            if (totalSeconds <= 0) {
                const [mins, secs] = (timerDisplay.dataset.default || '3:00').split(':');
                totalSeconds = parseInt(mins) * 60 + parseInt(secs);
            }
            updateDisplay();
            startTimer();
        }
    });

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            totalSeconds = parseInt(btn.dataset.time) * 60;
            updateDisplay();
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
            setBtnState('▶', 'Iniciar');
            timerBtn.classList.remove('paused');
            timerDisplay.parentElement.classList.remove('timer-complete');
        });
    });

    const [mins, secs] = (timerDisplay?.dataset?.default || timerDisplay?.textContent).split(':');
    totalSeconds = parseInt(mins) * 60 + parseInt(secs);
})();