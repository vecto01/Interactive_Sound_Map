// Тест клавиатуры для проверки доступности и порядка фокуса
// Запускается через браузер (например, Chrome DevTools)

// Создаем модальное окно для тестирования
const modal = document.createElement('div');
modal.id = 'test-modal';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
modal.style.zIndex = '10000';
modal.style.display = 'none';
modal.style.ariaHidden = 'true';

const content = document.createElement('div');
content.id = 'test-content';
content.style.backgroundColor = 'white';
content.style.padding = '20px';
content.style.maxWidth = '400px';
content.style.margin = '100px auto';
content.style.textAlign = 'center';
content.style.role = 'dialog';
content.style.ariaModal = 'true';

content.innerHTML = "" +
    `<h3>Тест клавиатуры</h3>` +
    `<div style="margin: 20px 0;">` +
        `<input id="test-input" type="number" placeholder="Введите длительность" min="1" max="10" tabindex="1" aria-label="Длина звука" autofocus>
        <button id="save-btn" style="width: 100%; padding: 10px; background: #4CAF50; color: white; border: none; cursor: pointer; margin-bottom: 10px;">Сохранить</button>` +
        `<button id="close-btn" style="width: 100%; padding: 10px; background: #666; color: white; border: none; cursor: pointer;">Закрыть</button>` +
    `</div>`;

modal.appendChild(content);

// Открываем модальное окно
document.body.appendChild(modal);
modal.style.display = 'block';

// Проверка фокуса на элементы
document.getElementById('test-input').focus();

// Логируем события клавиатуры
const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'test-input') {
            console.log('✅ Нажата Enter в поле ввода');
        } else if (activeElement.id === 'save-btn') {
            console.log('✅ Нажата Enter в кнопке Сохранить');
        }
    }
    
    if (e.key === 'Escape') {
        if (document.activeElement.id === 'close-btn') {
            console.log('✅ Нажата Escape для закрытия');
        }
    }
    
    if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        const nextElement = activeElement.nextElementSibling;
        const prevElement = activeElement.previousElementSibling;
        
        if (e.shiftKey) {
            if (prevElement) {
                prevElement.focus();
                console.log(`✅ Shift+Tab: переключение к предыдущему элементу: ${prevElement.id}`);
            }
        } else {
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

// Фокусируемся на поле ввода
window.addEventListener('load', () => {
    const input = document.getElementById('test-input');
    const saveBtn = document.getElementById('save-btn');
    const closeBtn = document.getElementById('close-btn');
    
    // Проверяем доступность по Tab
    const tabIndexOrder = [
        input,
        saveBtn,
        closeBtn
    ];
    
    tabIndexOrder.forEach((el, index) => {
        if (el.tabIndex === index + 1) {
            console.log(`✅ Элемент ${el.id} доступен по Tab (порядок ${index + 1})`);
        } else {
            console.error(`❌ Элемент ${el.id} недоступен по Tab (ожидался порядок ${index + 1})`);
        }
    });
});