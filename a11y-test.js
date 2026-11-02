document.addEventListener('DOMContentLoaded', () => {
    // Проверка :focus-visible для всех фокусируемых элементов
    const focusableElements = document.querySelectorAll('[tabindex="-1"]:not([tabindex=""]), a[href], button, input, select, textarea, [contenteditable], [role="button"]');
    focusableElements.forEach(el => {
        if (!el.matches(':focus-visible')) {
            console.error(`[A11Y ERROR] Element ${el.tagName} ${el.id || el.className} does not support :focus-visible.`);
        }
    });

    // Проверка скролла модального окна
    const modal = document.querySelector('[data-test="modal"]');
    if (modal) {
        const scrollableContent = modal.querySelector('[data-test="scrollable-content"]');
        if (scrollableContent) {
            scrollableContent.addEventListener('scroll', () => {
                console.log('Модальное окно прокручивается:', scrollableContent.scrollTop);
            });
            
            // Проверка видимости элементов внутри модального окна
            const scrollableElements = scrollableContent.querySelectorAll('[data-test="scrollable-item"]');
            scrollableElements.forEach(el => {
                if (!el.offsetParent) {
                    console.error(`[A11Y ERROR] Scrollable item ${el.id} is not visible after scroll.`);
                }
            });
        }
    }

    // Проверка ARIA-атрибутов
    const ariaElements = document.querySelectorAll('[aria-live], [aria-busy]');
    ariaElements.forEach(el => {
        if (!el.getAttribute('aria-live') || !el.getAttribute('aria-busy')) {
            console.error(`[A11Y ERROR] Missing ARIA attributes on element: ${el.tagName} ${el.id || el.className}`);
        }
    });

    // Логирование ошибок в консоль
    console.log('A11Y тест завершён. Проверьте консоль браузера.');
});