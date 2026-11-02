document.addEventListener('DOMContentLoaded', () => {
    // Проверка :focus-visible для всех кнопок и элементов форм
    const focusableElements = document.querySelectorAll('[tabindex="-1"], button, input, textarea, select, [data-test="focusable"]');
    focusableElements.forEach(el => {
        if (!el.matches(':focus-visible')) {
            console.warn(`Элемент ${el.tagName} не поддерживает :focus-visible. Проверьте доступность!`);
        }
    });

    // Проверка ARIA-атрибутов для сообщений и индикаторов
    const ariaElements = document.querySelectorAll('[aria-live], [aria-busy]');
    ariaElements.forEach(el => {
        if (!el.hasAttribute('aria-live') && !el.hasAttribute('aria-busy')) {
            console.warn(`Элемент ${el.tagName} отсутствует ARIA-атрибут ${el.getAttribute('aria-live') || 'aria-busy'}.`);
        }
    });

    // Проверка текста и видимости элементов
    const texts = document.querySelectorAll('span, p, h1, h2, h3, h4, h5, h6');
    texts.forEach(text => {
        if (text.textContent.trim() && !text.hasAttribute('aria-hidden')) {
            console.log(`Текст ${text.textContent} доступен для пользователя.`);
        }
    });

    // Проверка скролла и видимости
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        const scrollable = mainContent.scrollHeight > mainContent.clientHeight;
        if (!scrollable) {
            console.warn('Основной контент не поддерживает скролл. Проверьте контент!');
        }
    }

    // Проверка сообщения о завершении загрузки
    const successMessage = document.getElementById('success-message');
    if (successMessage && !successMessage.hasAttribute('aria-live')) {
        console.warn('Сообщение о завершении загрузки отсутствует ARIA-атрибут aria-live.');
    }
});