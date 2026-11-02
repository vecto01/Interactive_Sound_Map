const keyboardController = {
    // Сохранение звука по нажатию Enter
    saveSoundOnEnter: (soundEditorContainer) => {
        const soundInput = document.getElementById('soundDurationInput');
        const soundNameInput = document.getElementById('soundNameInput');
        const duration = parseFloat(soundInput.value);
        const name = soundNameInput.value || 'Unnamed Sound';

        if (duration >= 1 && duration <= 10) {
            // Логика сохранения (объединена с функцией в main.js)
            localStorage.setItem('userSound', JSON.stringify({ duration, name }));
            soundEditorContainer.style.display = 'none';
            showSuccessMessage('Звук сохранён!');
        } else {
            showErrorMessage('Длина звука должна быть числом от 1 до 10 секунд!');
        }
    },
    // Отмена по нажатию Escape
    cancelEditing: (soundEditorContainer) => {
        soundEditorContainer.style.display = 'none';
        showErrorMessage('Редактирование отменено.');
    },
    // Переключение между полями по Tab
    handleTabNavigation: () => {
        const soundNameInput = document.getElementById('soundNameInput');
        const soundDurationInput = document.getElementById('soundDurationInput');

        // Переключение между полями
        if (soundNameInput.value.trim() === '') {
            soundDurationInput.focus();
        } else {
            soundNameInput.focus();
        }
    },
    // Обновление обработчиков событий
    setupEventListeners: (soundEditorContainer) => {
        document.addEventListener('keydown', (e) => {
            if (soundEditorContainer.style.display === 'block') {
                if (e.key === 'Enter') {
                    keyboardController.saveSoundOnEnter(soundEditorContainer);
                } else if (e.key === 'Escape') {
                    keyboardController.cancelEditing(soundEditorContainer);
                } else if (e.key === 'Tab') {
                    keyboardController.handleTabNavigation();
                }
            }
        });
    }
};