(function() {
    const timerDisplay = document.getElementById('timer');
    const timerBtn = document.getElementById('timerBtn');
    if (!timerDisplay || !timerBtn) return;

    let timerInterval = null;
    let totalSeconds = 0;
    let isRunning = false;
    let isComplete = false;
    let alarmInterval = null;
    const btnIcon = timerBtn.querySelector('.btn-icon');

    const parseTime = (val) => {
        const [mins, secs] = val.includes(':') ? val.split(':') : [val, '0'];
        return parseFloat(mins) * 60 + parseFloat(secs);
    };

    const initTimer = () => {
        totalSeconds = parseTime(timerDisplay?.dataset?.default || timerDisplay?.textContent);
        updateDisplay();
    };

    const playAlarm = () => {
        const playBeep = () => {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const playTone = (freq, startTime, duration) => {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
                oscillator.start(startTime);
                oscillator.stop(startTime + duration);
            };
            const now = audioCtx.currentTime;
            playTone(880, now, 0.15);
            playTone(1100, now + 0.12, 0.15);
            playTone(880, now + 0.24, 0.15);
            playTone(1100, now + 0.36, 0.15);
        };
        playBeep();
        alarmInterval = setInterval(playBeep, 1500);
    };

    const stopAlarm = () => {
        clearInterval(alarmInterval);
        alarmInterval = null;
    };

    const updateDisplay = () => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = Math.abs(totalSeconds % 60);
        timerDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const setBtnState = (icon, text) => {
        btnIcon.textContent = icon;
        timerBtn.lastChild.textContent = ` ${text}`;
    };

    const startTimer = () => {
        if (totalSeconds <= 0) return;
        isRunning = true;
        isComplete = false;
        setBtnState('⏸', 'Pausar');
        timerBtn.classList.add('paused');
        timerDisplay.parentElement.classList.add('timer-running');
        timerDisplay.parentElement.classList.remove('timer-complete');

        const tick = totalSeconds % 1 !== 0 ? 100 : 1000;

        timerInterval = setInterval(() => {
            totalSeconds -= tick / 1000;
            updateDisplay();
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                isComplete = true;
                totalSeconds = 0;
                updateDisplay();
                setBtnState('⏹', 'PARAR!');
                timerDisplay.parentElement.classList.remove('timer-running');
                timerDisplay.parentElement.classList.add('timer-complete');
                playAlarm();
            }
        }, tick);
    };

    const pauseTimer = () => {
        isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
        setBtnState('▶', 'Continuar');
        timerBtn.classList.remove('paused');
        timerDisplay.parentElement.classList.remove('timer-running');
    };

    const flashWarning = (btn) => {
        btn.classList.add('warning-flash');
        setTimeout(() => btn.classList.remove('warning-flash'), 500);
    };

    timerBtn.addEventListener('click', () => {
        if (isComplete) {
            stopAlarm();
            isComplete = false;
            initTimer();
            setBtnState('▶', 'Iniciar');
            timerBtn.classList.remove('paused');
            timerDisplay.parentElement.classList.remove('timer-complete');
        } else if (isRunning) {
            pauseTimer();
        } else {
            if (totalSeconds <= 0) initTimer();
            updateDisplay();
            startTimer();
        }
    });

    const selectPreset = (btn) => {
        if (isRunning) {
            flashWarning(btn);
            return;
        }
        stopAlarm();
        isComplete = false;
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        totalSeconds = parseFloat(btn.dataset.time) * 60;
        updateDisplay();
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        setBtnState('▶', 'Iniciar');
        timerBtn.classList.remove('paused');
        timerDisplay.parentElement.classList.remove('timer-complete');
    };

    document.querySelectorAll('.preset-btn').forEach(btn => btn.addEventListener('click', () => selectPreset(btn)));

    document.querySelectorAll('.steps-list a[href^="#timer-"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetBtn = document.getElementById(link.getAttribute('href').substring(1));
            if (targetBtn) {
                selectPreset(targetBtn);
                targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    initTimer();
})();