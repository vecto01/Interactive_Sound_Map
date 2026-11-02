// Логика обработки загрузки и редактирования звука

// Контроль загрузки
const loadingContainer = document.getElementById('loading-container');
const loadingMessage = document.querySelector('.loading-message');
const loadingSpinner = document.querySelector('.loader');

// Контроль редактирования звука
const soundInput = document.getElementById('sound-input');
const soundNameInput = document.getElementById('sound-name');
const saveSoundButton = document.getElementById('save-sound-button');
const soundEditorContainer = document.getElementById('sound-editor-container');

// Показываем загрузку
function showLoading() {
    loadingContainer.classList.add('active');
    loadingMessage.textContent = 'Loading...';
    loadingSpinner.style.animationPlaybackRate = '1';
    loadingSpinner.style.opacity = '1';
}

// Завершаем загрузку
function hideLoading() {
    setTimeout(() => {
        loadingSpinner.classList.add('completed');
        loadingMessage.textContent = 'Загрузка завершена!';
    }, 100);
}

// Валидация длины звука
function validateSoundDuration(duration) {
    const maxDuration = 10; // Максимальная длина звука в секундах
    const numDuration = parseFloat(duration);
    if (isNaN(numDuration) || numDuration <= 0 || numDuration > maxDuration) {
        return false;
    }
    return true;
}

// Показ ошибок через DOM
function showErrorMessage(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.style.position = 'fixed';
        errorDiv.style.bottom = '20px';
        errorDiv.style.right = '20px';
        errorDiv.style.padding = '10px';
        errorDiv.style.background = '#ffebee';
        errorDiv.style.color = '#d32f2f';
        errorDiv.style.zIndex = '1000';
        document.body.appendChild(errorDiv);
    }
}

// Показ успешного сохранения
function showSuccessMessage(message) {
    const successElement = document.getElementById('success-message');
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
    } else {
        const successDiv = document.createElement('div');
        successDiv.id = 'success-message';
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        successDiv.style.position = 'fixed';
        successDiv.style.bottom = '20px';
        successDiv.style.right = '20px';
        successDiv.style.padding = '10px';
        successDiv.style.background = '#dff0d8';
        successDiv.style.color = '#3c763d';
        successDiv.style.zIndex = '1000';
        document.body.appendChild(successDiv);
    }
}

// Функция для сохранения звука в localStorage
function saveSoundToStorage(soundId, durationInput, soundNameInput) {
    const duration = parseFloat(durationInput.value);
    const name = soundNameInput.value || 'Unnamed Sound';

    // Валидация длины звука
    if (!validateSoundDuration(duration)) {
        showErrorMessage('Длина звука должна быть числом от 1 до 10 секунд!');
        return;
    }

    // Проверка на переполнение localStorage
    const soundsData = JSON.parse(localStorage.getItem('userSounds')) || [];
    const maxSounds = 10; // Максимальное количество звуков

    if (soundsData.length >= maxSounds) {
        showErrorMessage('Сохранено слишком много звуков. Очистите их или удалите старые.');
        return;
    }

    // Сохранение данных в localStorage
    try {
        const updatedSounds = [...soundsData, { id: soundId, duration, name }];
        localStorage.setItem('userSounds', JSON.stringify(updatedSounds));
        showSuccessMessage('Звук сохранён успешно!');
        soundEditorContainer.style.display = 'none';
        hideLoading();
    } catch (error) {
        showErrorMessage('Ошибка сохранения. Попробуйте позже.');
        console.error('Ошибка сохранения звука:', error);
    }
}

// Функция для показа модального окна редактирования
function showEditSoundModal(soundId) {
    const modal = document.createElement('div');
    modal.className = 'sound-edit-modal';
    modal.innerHTML = `
        <div class="modal-overlay" aria-hidden="true"></div>
        <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="sound-modal-title">
            <h3 id="sound-modal-title" class="modal-title">Редактировать звук</h3>
            <p class="modal-subtitle" style="text-align: center; margin: 10px 0;">Загрузите длину звука и его имя:</p>
            <div class="sound-controls">
                <input type="number" id="soundDurationInput" min="1" max="10" step="0.1" placeholder="Длина звука (сек.)" aria-label="Длина звука">
                <input type="text" id="soundNameInput" placeholder="Имя звука" aria-label="Имя звука">
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
    const durationInput = document.getElementById('soundDurationInput');
    const nameInput = document.getElementById('soundNameInput');

    saveButton.addEventListener('click', function() {
        saveSoundToStorage(soundId, durationInput, nameInput);
        closeModal(modal);
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

// Функция для закрытия модального окна
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.removeChild(modal);
}