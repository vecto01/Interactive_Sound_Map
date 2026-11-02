// Тест клавиатуры для Interactive_Sound_Map
// Запускается через браузер (например, Chrome DevTools)

// Создаем модальное окно для тестирования
const modal = document.createElement('div');
modal.id = 'test-modal';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
modal.style.zIndex = '1000';
modal.style.display = 'none';
modal.style.ariaHidden = 'true';

const content = document.createElement('div');
content.id = 'test-content';
content.style.backgroundColor = 'white';
content.style.padding = '20px';
content.style.maxWidth = '500px';
content.style.margin = '100px auto';
content.style.textAlign = 'center';
content.style.role = 'dialog';
content.style.ariaModal = 'true';

content.innerHTML = "" +
    `<h3>Тест клавиатуры</h3>` +
    `<div style="margin: 20px 0;">` +
        `<input id="test-input" type="text" placeholder="Введите текст" style="width: 100%; padding: 8px; margin-bottom: 10px;">` +
        `<button id="save-btn" style="width: 100%; padding: 8px; background: #4CAF50; color: white; border: none; cursor: pointer;">Сохранить</button>` +
    `</div>` +
    `<button id="close-btn" style="margin-top: 10px; padding: 8px; background: #f44336; color: white; border: none; cursor: pointer;">Закрыть</button>`;

modal.appendChild(content);
document.body.appendChild(modal);

// Открываем модальное окно
modal.style.display = 'block';

// Фокусируемся на поле ввода
const input = document.getElementById('test-input');
input.focus();

// Логируем события клавиатуры
const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        console.log('✅ Нажата клавиша Enter в поле ввода');
    }
    if (e.target.id === 'save-btn' && e.key === 'Enter') {
        console.log('✅ Нажата клавиша Enter в кнопке Сохранить');
    }
    if (e.target.id === 'close-btn' && e.key === 'Escape') {
        console.log('✅ Нажата клавиша Escape для закрытия');
    }
    if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        const nextElement = activeElement.nextElementSibling;
        const prevElement = activeElement.previousElementSibling;
        
        if (e.shiftKey) {
            // Shift+Tab: переключение назад
            if (prevElement) {
                prevElement.focus();
                console.log(`✅ Shift+Tab: переключение к предыдущему элементу: ${prevElement.id}`);
            }
        } else {
            // Tab: переключение вперед
            if (nextElement) {
                nextElement.focus();
                console.log(`✅ Tab: переключение к следующему элементу: ${nextElement.id}`);
            }
        }
    }
};

// Присоединяем обработчик событий
document.addEventListener('keydown', handleKeyDown);

// Логируем начальное состояние
console.log('🔍 Начало теста клавиатуры...');