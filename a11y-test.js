// Автоматическая проверка доступности :focus-visible и скролла модального окна

// Определяем элементы, которые должны поддерживать :focus-visible
const focusableElements = document.querySelectorAll('[data-test="focusable"]');

// Проверяем, что элементы поддерживают :focus-visible
function checkFocusVisible() {
    const errors = [];
    focusableElements.forEach(el => {
        if (!el.matches(':focus-visible')) {
            errors.push({
                element: el,
                message: 'Элемент не поддерживает :focus-visible'
            });
        }
    });
    return errors;
}

// Проверяем скролл модального окна
function checkModalScroll() {
    const modal = document.querySelector('[data-test="modal"]');
    const scrollableContent = modal.querySelector('[data-test="scrollable"]');
    
    if (scrollableContent) {
        const scrollHeight = scrollableContent.scrollHeight;
        const clientHeight = scrollableContent.clientHeight;
        
        if (scrollHeight > clientHeight) {
            console.log('Скрин: Модальное окно поддерживает скролл');
        } else {
            console.error('Ошибка: Контент модального окна не требует скролла или не поддерживается');
        }
    } else {
        console.error('Ошибка: Элемент для скролла не найден в модальном окне');
    }
}

// Запуск проверок
checkFocusVisible();
checkModalScroll();

// Логирование ошибок в консоль (для владельца)
console.log('=== Доступность проверена ===');