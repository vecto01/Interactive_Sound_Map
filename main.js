document.addEventListener('DOMContentLoaded', function() {
    const soundCards = document.querySelectorAll('.sound-card');
    
    soundCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const soundId = this.dataset.soundId;
            showEditSoundModal(soundId);
        });
    });

    // Логика загрузки с прогресс-баром и анимацией
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgressBar = document.querySelector('.progress-bar');
    const loadingProgressContainer = document.querySelector('.loading-progress-container');
    const loadingMessage = document.querySelector('.loading-message');
    const spinner = document.querySelector('.loading-spinner');
    const checkmark = document.querySelector('.loading-checkmark');

    function showLoadingScreen() {
        loadingScreen.style.display = 'flex';
        loadingProgressContainer.style.display = 'flex';
        spinner.style.display = 'block';
        loadingMessage.textContent = 'Загрузка...';
        document.body.classList.add('loading-screen');
        loadingMessage.setAttribute('aria-live', 'polite');
    }

    function hideLoadingScreen() {
        spinner.style.animationPlayState = 'paused';
        spinner.style.opacity = '0';
        setTimeout(() => {
            spinner.style.display = 'none';
            checkmark.style.display = 'block';
            loadingProgressContainer.style.display = 'flex';
            document.getElementById('test-load-container').style.display = 'block';
            loadingMessage.textContent = 'Готово!';
            loadingMessage.style.color = '#2E7D32';
        }, 300);
    }

    function simulateLoadingProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            loadingProgressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                hideLoadingScreen();
            }
        }, 500);
    }

    // Запуск симуляции загрузки через 3 секунды
    setTimeout(() => {
        showLoadingScreen();
        simulateLoadingProgress();
    }, 3000);

    // Функция для показа модального окна редактирования
    function showEditSoundModal(soundId) {
        const modal = document.createElement('div');
        modal.className = 'sound-edit-modal';
        modal.innerHTML = `
            <div class="modal-overlay" aria-hidden="true"></div>
            <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="sound-modal-title">
                <h3 id="sound-modal-title" class="modal-title">Редактировать звук</h3>
                <p class="modal-subtitle" style="text-align: center; margin: 10px 0;">Загрузите звуковой файл или выберите существующий:</p>
                <div class="sound-controls">
                    <input type="file" id="soundFileInput" accept="audio/*" class="file-input" aria-label="Загрузите звуковой файл">
                    <button id="saveSound" class="save-button">Сохранить</button>
                    <button id="cancelSound" class="cancel-button">Отменить</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.style.display = 'block';
        modal.style.overflowY = 'auto';

        const saveButton = document.getElementById('saveSound');
        const cancelButton = document.getElementById('cancelSound');
        const fileInput = document.getElementById('soundFileInput');

        saveButton.addEventListener('click', function() {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                saveSoundToStorage(soundId, file);
                closeModal(modal);
            }
        });

        cancelButton.addEventListener('click', function() {
            closeModal(modal);
        });

        // Закрытие модального окна при нажатии на Esc
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal(modal);
            }
        });

        // Закрытие модального окна при клике вне его
        modal.querySelector('.modal-overlay').addEventListener('click', function() {
            closeModal(modal);
        });
    }

    // Функция для сохранения звука в localStorage
    function saveSoundToStorage(soundId, file) {
        const audioBlob = URL.createObjectURL(file);
        const soundData = {
            id: soundId,
            audio: audioBlob,
            volume: 0.7
        };
        localStorage.setItem(`sound-${soundId}`, JSON.stringify(soundData));
        console.log(`Звук с ID ${soundId} сохранён!`);
    }

    // Функция для закрытия модального окна
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }
});