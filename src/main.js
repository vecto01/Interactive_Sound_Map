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
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'sound-modal-title');

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.setAttribute('aria-labelledby', 'sound-modal-title');

    const description = document.createElement('div');
    description.id = 'sound-modal-description';
    description.textContent = 'Редактируйте длину звука и его имя.';
    description.style = 'margin-top: 5px; color: #666;';
    modalContent.appendChild(description);

    const title = document.createElement('h3');
    title.id = 'sound-modal-title';
    title.textContent = 'Редактировать звук';
    title.className = 'modal-title';
    modalContent.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'modal-subtitle';
    subtitle.style = 'text-align: center; margin: 10px 0;';
    subtitle.textContent = 'Загрузите длину звука и его имя:';
    modalContent.appendChild(subtitle);

    const soundControls = document.createElement('div');
    soundControls.className = 'sound-controls';

    const durationInput = document.createElement('input');
    durationInput.type = 'number';
    durationInput.id = 'soundDurationInput';
    durationInput.min = '1';
    durationInput.max = '10';
    durationInput.step = '0.1';
    durationInput.placeholder = 'Длина звука (сек.)';
    durationInput.ariaLabel = 'Длина звука';
    soundControls.appendChild(durationInput);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'soundNameInput';
    nameInput.placeholder = 'Имя звука';
    nameInput.ariaLabel = 'Имя звука';
    soundControls.appendChild(nameInput);

    const saveButton = document.createElement('button');
    saveButton.id = 'saveSound';
    saveButton.className = 'save-button';
    saveButton.textContent = 'Сохранить';
    soundControls.appendChild(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancelSound';
    cancelButton.className = 'cancel-button';
    cancelButton.textContent = 'Отменить';
    soundControls.appendChild(cancelButton);

    modalContent.appendChild(soundControls);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.style.display = 'block';
    modal.style.overflowY = 'auto';

    const modalOverlay = modal.querySelector('.modal-overlay');
    modalOverlay.addEventListener('click', function() {
        closeModal(modal);
    });

    const saveButtonElement = document.getElementById('saveSound');
    const cancelButtonElement = document.getElementById('cancelSound');
    const durationInputElement = document.getElementById('soundDurationInput');
    const nameInputElement = document.getElementById('soundNameInput');

    // Настройка tabindex для переключения по Tab
    durationInputElement.setAttribute('tabindex', '0');
    nameInputElement.setAttribute('tabindex', '1');
    saveButtonElement.setAttribute('tabindex', '2');
    cancelButtonElement.setAttribute('tabindex', '3');

    // Обработка нажатия Enter для сохранения
    saveButtonElement.addEventListener('click', function() {
        saveSoundToStorage(soundId, durationInputElement, nameInputElement);
        closeModal(modal);
    });

    saveButtonElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            saveSoundToStorage(soundId, durationInputElement, nameInputElement);
            closeModal(modal);
        }
    });

    cancelButtonElement.addEventListener('click', function() {
        closeModal(modal);
    });

    cancelButtonElement.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });

    // Обработка нажатия Enter в полях ввода
    durationInputElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            saveSoundToStorage(soundId, durationInputElement, nameInputElement);
            closeModal(modal);
        }
    });

    nameInputElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            saveSoundToStorage(soundId, durationInputElement, nameInputElement);
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