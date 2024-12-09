document.addEventListener('DOMContentLoaded', () => {
    const timeInput = document.getElementById('time-input');
    const addTimerButton = document.getElementById('add-timer');
    const timersList = document.getElementById('timers');

    function createTimer(duration) {
        let remainingTime = duration;
        let timerId = null;
        let isPaused = false;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="time-display">${remainingTime} сек.</span>
            <button class="stop-timer">Остановить</button>
            <button class="delete-timer">Удалить</button>
        `;
        timersList.appendChild(listItem);

        function updateTimer() {
            if (remainingTime > 0 && !isPaused) {
                remainingTime--;
                listItem.querySelector('.time-display').textContent = `${remainingTime} сек.`;
            } else if (remainingTime <= 0) {
                clearInterval(timerId);
                listItem.remove();
            }
        }

        timerId = setInterval(updateTimer, 1000);

        const stopButton = listItem.querySelector('.stop-timer');
        const deleteButton = listItem.querySelector('.delete-timer');


        stopButton.addEventListener('click', () => {
            isPaused = !isPaused;
            if (isPaused) {
                stopButton.textContent = 'Продолжить';
                stopButton.classList.remove('stop-timer');
                stopButton.classList.add('resume-timer');
            } else {
                stopButton.textContent = 'Остановить';
                stopButton.classList.remove('resume-timer');
                stopButton.classList.add('stop-timer');
            }
        });

        deleteButton.addEventListener('click', () => {
            clearInterval(timerId);
            listItem.remove();
        });
    }

    addTimerButton.addEventListener('click', () => {
        const time = parseInt(timeInput.value, 10);

        if (isNaN(time) || time <= 0) {
            alert('Введите корректное время (больше 0)!');
            return;
        }

        createTimer(time);
        timeInput.value = '';
    });

    timeInput.addEventListener('input', () => {
        if (timeInput.value < 0) {
            timeInput.value = '';
        }
    });
});
