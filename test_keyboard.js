// Автоматический тест клавиатуры для редактора звука
// Запускается через браузер и проверяет:
// 1. Нажатие Enter сохраняет звук.
// 2. Нажатие Escape закрывает редактор.
// 3. Переключение по Tab работает корректно.

// Инициализация теста
function testKeyboardNavigation() {
    // Получаем элементы редактора
    const soundEditorContainer = document.querySelector('.sound-editor-container');
    const soundInput = document.getElementById('soundDuration-1');
    const soundNameInput = document.getElementById('soundName-1');
    const saveButton = document.getElementById('saveSoundButton-1');
    const cancelButton = document.getElementById('cancelSoundButton-1');
    
    // Проверка на наличие элементов
    if (!soundEditorContainer || !soundInput || !soundNameInput || !saveButton || !cancelButton) {
        console.error('Элементы редактора не найдены.');
        return false;
    }
    
    // Устанавливаем фокус на поле длины звука
    soundInput.focus();
    
    // Проверка нажатия Enter
    console.log('Тестируем нажатие Enter...');
    const eventEnter = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true
    });
    soundInput.dispatchEvent(eventEnter);
    
    // Проверка, что редактор закрылся (если сохранение прошло успешно)
    setTimeout(() => {
        if (soundEditorContainer.classList.contains('hidden')) {
            console.log('✅ Нажатие Enter корректно сохраняет звук.');
        } else {
            console.error('❌ Нажатие Enter не закрыло редактор.');
        }
    }, 1000);
    
    // Проверка нажатия Escape
    console.log('Тестируем нажатие Escape...');
    const eventEscape = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true
    });
    soundEditorContainer.dispatchEvent(eventEscape);
    
    // Проверка, что редактор закрылся
    setTimeout(() => {
        if (soundEditorContainer.classList.contains('hidden')) {
            console.log('✅ Нажатие Escape корректно закрывает редактор.');
        } else {
            console.error('❌ Нажатие Escape не закрыло редактор.');
        }
    }, 1000);
    
    // Проверка переключения по Tab
    console.log('Тестируем переключение по Tab...');
    const eventTab = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true
    });
    
    // Переключение между полями
    soundInput.dispatchEvent(eventTab);
    setTimeout(() => {
        const currentElement = document.activeElement;
        if (currentElement === soundNameInput) {
            console.log('✅ Переключение на soundNameInput.');
        } else {
            console.error('❌ Переключение на soundNameInput не сработало.');
        }
    }, 500);
    
    // Переключение на кнопку save
    soundNameInput.dispatchEvent(eventTab);
    setTimeout(() => {
        const currentElement = document.activeElement;
        if (currentElement === saveButton) {
            console.log('✅ Переключение на saveButton.');
        } else {
            console.error('❌ Переключение на saveButton не сработало.');
        }
    }, 500);
    
    // Переключение на кнопку cancel
    saveButton.dispatchEvent(eventTab);
    setTimeout(() => {
        const currentElement = document.activeElement;
        if (currentElement === cancelButton) {
            console.log('✅ Переключение на cancelButton.');
        } else {
            console.error('❌ Переключение на cancelButton не сработало.');
        }
    }, 500);
    
    // Переключение обратно на soundInput
    cancelButton.dispatchEvent(eventTab);
    setTimeout(() => {
        const currentElement = document.activeElement;
        if (currentElement === soundInput) {
            console.log('✅ Переключение обратно на soundInput.');
        } else {
            console.error('❌ Переключение обратно на soundInput не сработало.');
        }
    }, 500);
    
    return true;
}

// Запуск теста
if (typeof window !== 'undefined') {
    testKeyboardNavigation();
}