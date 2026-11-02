document.addEventListener('DOMContentLoaded', function() {
    const loadingElement = document.querySelector('.loading');
    const mainContent = document.querySelector('.main-content');
    
    // Проверка загрузки карты (например, через fetch или проверка DOM)
    function checkLoadComplete() {
        // Упрощённая проверка: если DOM загружен, считаем загрузку завершённой
        if (document.readyState === 'complete') {
            loadingElement.style.opacity = '0';
            setTimeout(() => {
                loadingElement.style.display = 'none';
                mainContent.style.display = 'block';
            }, 500);
        } else {
            setTimeout(checkLoadComplete, 100);
        }
    }
    
    // Запуск проверки
    checkLoadComplete();
});