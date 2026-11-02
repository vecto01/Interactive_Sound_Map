document.addEventListener('DOMContentLoaded', function() {
    console.log('Тест доступности запущен.');
    
    // Проверка :focus-visible для всех взаимодействий
    const focusableElements = document.querySelectorAll('[data-test="focusable"], button, input, textarea, select, [role="button"]');
    
    focusableElements.forEach(element => {
        const isFocusVisible = element.matches(':focus-visible');
        
        if (!isFocusVisible) {
            console.error(`Элемент ${element.tagName} не поддерживает :focus-visible.`);
            element.setAttribute('aria-label', 'Элемент не поддерживает фокус');
        }
    });
    
    // Проверка скролла модального окна
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Проверка видимости элементов внутри модального окна
    const scrollableElements = document.querySelectorAll('.modal-content [data-test="scrollable"]');
    
    scrollableElements.forEach(element => {
        const isVisible = element.scrollIntoView({ behavior: 'smooth' });
        
        if (!isVisible) {
            console.error(`Элемент ${element.tagName} не может быть прокручен в модальном окне.`);
        }
    });
    
    // Проверка ARIA-атрибутов для индикаторов загрузки
    const loadingIndicator = document.querySelector('.loading-indicator.completed');
    if (loadingIndicator) {
        loadingIndicator.setAttribute('aria-live', 'polite');
        loadingIndicator.setAttribute('aria-busy', 'true');
    }
    
    // Проверка сообщения об успешном завершении
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.setAttribute('aria-live', 'polite');
    }
    
    console.log('Тест доступности завершён.');
});