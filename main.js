// Обработка клавиатуры для редактирования звука
function handleKeyDown(event, soundId, modal) {
    const soundEditorContainer = document.querySelector(`.sound-editor-container-${soundId}`);
    const soundInput = document.getElementById(`soundDuration-${soundId}`);
    const soundNameInput = document.getElementById(`soundName-${soundId}`);
    const saveButton = document.getElementById(`saveSoundButton-${soundId}`);
    const cancelButton = document.getElementById(`cancelSoundButton-${soundId}`);

    // Проверка, что событие принадлежит элементам редактора
    const isEditorElement = [soundInput, soundNameInput, saveButton, cancelButton].some(el => el && el.contains(event.target)) || 
                          soundEditorContainer.contains(event.target);

    // Сохранение звука по нажатию Enter
    if (soundInput && soundInput.contains(event.target) && event.key === 'Enter') {
        event.preventDefault();
        saveSoundToStorage(soundId, soundInput, soundNameInput);
    }
    // Отмена по нажатию Escape
    else if (soundEditorContainer && event.key === 'Escape') {
        event.preventDefault();
        closeModal(soundEditorContainer);
    }
    // Навигация по табуляции
    else if (event.key === 'Tab') {
        event.preventDefault();
        const focusOrder = [soundInput, soundNameInput, saveButton, cancelButton];
        const currentElement = event.target;
        const currentIndex = focusOrder.findIndex(el => el && el === currentElement);
        const nextIndex = (currentIndex + 1) % focusOrder.length;
        const nextElement = focusOrder[nextIndex];
        if (nextElement) {
            nextElement.focus();
        }
    }
}

// Функция инициализации редактора звука
function initSoundEditor(soundId, modal) {
    const soundInput = document.getElementById(`soundDuration-${soundId}`);
    const soundNameInput = document.getElementById(`soundName-${soundId}`);
    const saveButton = document.getElementById(`saveSoundButton-${soundId}`);
    const cancelButton = document.getElementById(`cancelSoundButton-${soundId}`);
    const soundEditorContainer = document.querySelector(`.sound-editor-container-${soundId}`);
    soundEditorContainer.setAttribute('aria-modal', 'true');
    soundEditorContainer.setAttribute('aria-label', 'Редактор звука: добавление нового звука');

    // Привязка обработчиков клавиатуры
    soundInput.addEventListener('keydown', function(event) {
        handleKeyDown(event, soundId, modal);
    });
    soundNameInput.addEventListener('keydown', function(event) {
        handleKeyDown(event, soundId, modal);
    });
    saveButton.addEventListener('keydown', function(event) {
        handleKeyDown(event, soundId, modal);
    });
    cancelButton.addEventListener('keydown', function(event) {
        handleKeyDown(event, soundId, modal);
    });
    // Обработка Escape для модального окна
    soundEditorContainer.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal(soundEditorContainer);
        }
    });

    // Функция сохранения звука
    function saveSoundToStorage(soundId, durationInput, soundNameInput) {
        const duration = parseFloat(durationInput.value);
        const name = soundNameInput.value.trim() || 'Unnamed Sound';

        // Проверка на пустое имя
        if (!name) {
            showErrorMessage('Имя звука не может быть пустым.');
            return;
        }

        // Валидация длины звука с более детальными сообщениями об ошибках
        let isValid = true;
        if (isNaN(duration)) {
            showErrorMessage('Длина звука должна быть числом!');
            isValid = false;
        } else if (duration <= 0) {
            showErrorMessage('Длина звука должна быть положительной!');
            isValid = false;
        } else if (duration > 10) {
            showErrorMessage('Длина звука не должна превышать 10 секунд!');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Проверка на переполнение localStorage
        const soundsData = JSON.parse(localStorage.getItem('userSounds')) || [];
        const maxSounds = 10;

        if (soundsData.length >= maxSounds) {
            showErrorMessage(`Максимальное количество звуков: ${maxSounds}. Удалите старые звуки или создайте новые плейлисты для хранения больше звуков.`);
            return;
        }

        // Сохранение данных в localStorage
        try {
            const updatedSounds = [...soundsData, { id: soundId, duration, name }];
            localStorage.setItem('userSounds', JSON.stringify(updatedSounds));
            showSuccessMessage('Звук сохранён успешно!');
            closeModal(modal);
        } catch (error) {
            showErrorMessage('Ошибка сохранения звука. Проверьте соединение или попробуйте позже.');
            console.error('Ошибка сохранения:', error);
        }
    }
}