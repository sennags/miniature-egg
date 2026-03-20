(function() {
    const timerDisplay = document.getElementById('timer');
    const timerBtn = document.getElementById('timerBtn');
    
    if (!timerDisplay || !timerBtn) return;
    
    let timerInterval = null;
    let totalSeconds = 0;
    let isRunning = false;
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function updateDisplay() {
        timerDisplay.textContent = formatTime(totalSeconds);
    }
    
    function setButtonState(state) {
        const btnIcon = timerBtn.querySelector('.btn-icon');
        switch(state) {
            case 'start':
                timerBtn.innerHTML = '<span class="btn-icon">▶</span> Iniciar';
                timerBtn.classList.remove('paused');
                break;
            case 'pause':
                btnIcon.textContent = '⏸';
                timerBtn.innerHTML = '<span class="btn-icon">⏸</span> Pausar';
                timerBtn.classList.add('paused');
                break;
            case 'resume':
                btnIcon.textContent = '▶';
                timerBtn.innerHTML = '<span class="btn-icon">▶</span> Continuar';
                timerBtn.classList.remove('paused');
                break;
            case 'complete':
                btnIcon.textContent = '↻';
                timerBtn.innerHTML = '<span class="btn-icon">↻</span> Reiniciar';
                timerBtn.classList.add('paused');
                timerDisplay.parentElement.classList.add('timer-complete');
                break;
        }
    }
    
    function startTimer() {
        if (totalSeconds <= 0) return;
        
        isRunning = true;
        setButtonState('pause');
        timerDisplay.parentElement.classList.add('timer-running');
        timerDisplay.parentElement.classList.remove('timer-complete');
        
        timerInterval = setInterval(() => {
            totalSeconds--;
            updateDisplay();
            
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                isRunning = false;
                setButtonState('complete');
                timerDisplay.parentElement.classList.remove('timer-running');
            }
        }, 1000);
    }
    
    function pauseTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
        setButtonState('resume');
        timerDisplay.parentElement.classList.remove('timer-running');
    }
    
    timerBtn.addEventListener('click', () => {
        if (isRunning) {
            pauseTimer();
        } else if (totalSeconds <= 0) {
            const initialTime = timerDisplay.dataset.default || '3:00';
            const [mins, secs] = initialTime.split(':');
            totalSeconds = parseInt(mins) * 60 + parseInt(secs);
            updateDisplay();
            startTimer();
        } else {
            startTimer();
        }
    });
    
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const minutes = parseInt(btn.dataset.time);
            totalSeconds = minutes * 60;
            updateDisplay();
            
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                isRunning = false;
                setButtonState('start');
            }
            
            timerDisplay.parentElement.classList.remove('timer-complete');
        });
    });
    
    const initialTime = timerDisplay?.dataset?.default || timerDisplay?.textContent;
    if (initialTime) {
        const timeParts = initialTime.split(':');
        totalSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
    }
})();
