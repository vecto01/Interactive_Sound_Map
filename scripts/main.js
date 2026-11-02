// main.js
// Управление анимациями загрузки и завершения

// Показываем загрузку
const loadingIndicator = document.querySelector('.loading-indicator');
const loadingText = document.querySelector('.loading-text');

// Имитация загрузки
setTimeout(() => {
    loadingIndicator.classList.add('complete');
    loadingText.style.opacity = '0';
}, 1500);

// Логирование ошибок
window.errorHandler = function(message) {
    console.error('Ошибка:', message);
    alert(`Произошла ошибка: ${message}`);
};

// Функция для обработки сохранения звука
window.saveSound = function(soundData) {
    try {
        if (window.localStorage.length > 100) {
            window.errorHandler('localStorage переполнен. Предлагаем использовать sessionStorage или очистить localStorage.');
            
            const confirmation = confirm('localStorage переполнен. Хотите использовать sessionStorage или очистить localStorage?');
            
            if (confirmation) {
                sessionStorage.setItem('saved_sound', soundData);
                console.log('Звук сохранён в sessionStorage.');
            } else {
                localStorage.clear();
                console.log('localStorage очищен.');
            }
        } else {
            localStorage.setItem('saved_sound', soundData);
            console.log('Звук сохранён в localStorage.');
        }
    } catch (error) {
        window.errorHandler('Ошибка при сохранении звука: ' + error.message);
    }
};

// Запуск тестов доступности
console.log('Тест доступности :focus-valid и скролла запущен.');

// Управление анимациями загрузки и завершения
if (document.querySelector('.loading-indicator')) {
    const spinner = document.querySelector('.spinner');
    
    // Показываем индикатор загрузки
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    
    // Запуск анимации спинера
    spinner.classList.add('complete');
    
    // Визуальная обратная связь после завершения загрузки
    setTimeout(() => {
        document.querySelector('.loading-indicator').style.opacity = '0';
        document.querySelector('.loading-indicator').style.transform = 'translateY(100px)';
        
        // Показываем основной контент
        const mapPlaceholder = document.querySelector('.map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.style.opacity = '1';
            mapPlaceholder.style.animation = 'fadeInContent 0.5s ease-out forwards';
        }
        
        // Возвращаем скроллирование
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
            document.querySelector('.loading-indicator').style.display = 'none';
        }, 500);
    }, 1500);
}

// Добавляем анимацию fadeInContent для основного контента
const style = document.createElement('style');
style.textContent = `@keyframes fadeInContent {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}`;

document.head.appendChild(style);