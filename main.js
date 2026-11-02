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
            showErrorMessage(`Максимальное количество звуков: ${maxSounds}. Пожалуйста, удалите старые звуки.`);
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