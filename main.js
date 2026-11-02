// Обновлённая логика обработки кликов и редактирования звука
// Загрузка DOM после того, как страница полностью загружена

// Логика обработки загрузки и ошибок уже есть в существующем коде

// Добавление обработки кликов на карточки звука
document.addEventListener('DOMContentLoaded', function() {
    const soundCards = document.querySelectorAll('.sound-card');
    
    soundCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const soundId = this.dataset.soundId;
            showEditSoundModal(soundId);
        });
    });

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

        // Показываем модальное окно
        modal.style.display = 'block';
        modal.style.overflowY = 'auto';

        // Логика обработки событий в модальном окне
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

    // Логика загрузки с прогресс-баром и анимацией
    const loadingContainer = document.getElementById('loading-container');
    const loadingProgressBar = document.querySelector('.progress-bar');
    const loadingProgressContainer = document.querySelector('.loading-progress-container');
    const loadingMessage = document.querySelector('.loading-message');
    const spinner = document.querySelector('.loading-spinner');
    
    let loadingProgress = 0;

    function simulateLoadingProgress() {
        loadingProgress += 10;
        loadingProgressBar.style.width = `${loadingProgress}%`;

        if (loadingProgress >= 100) {
            setTimeout(() => {
                loadingContainer.style.display = 'none';
                document.getElementById('test-load-container').style.display = 'block';
                loadingMessage.textContent = 'Готово!';
                
                // Анимация исчезновения индикатора
                spinner.style.animation = 'none';
                spinner.style.opacity = '0';
                setTimeout(() => {
                    spinner.style.display = 'none';
                    loadingProgressContainer.style.display = 'none';
                }, 300);
            }, 500);
        }
    }

    // Запуск симуляции загрузки через 3 секунды
    setTimeout(simulateLoadingProgress, 3000);

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