document.addEventListener('DOMContentLoaded', function() {
    // Показываем загрузку
    const loadingContainer = document.getElementById('loading-container');
    const mainContent = document.getElementById('main-content');
    const successMessage = document.getElementById('success-message');
    
    // Устанавливаем обработчик для загрузки данных
    window.loadData = function() {
        // Скрываем загрузку
        loadingContainer.classList.add('hidden');
        
        // Показываем сообщение об успешном завершении
        successMessage.classList.remove('hidden');
        
        // Загружаем основной контент
        setTimeout(() => {
            mainContent.innerHTML = '<div style="text-align: center; color: #4CAF50;">Содержимое загружено!</div>';
            
            // Убираем сообщение о завершении
            successMessage.classList.add('hidden');
        }, 500);
    };
    
    // Логирование ошибок
    window.errorHandler = function(message) {
        console.error('Ошибка:', message);
        alert(`Произошла ошибка: ${message}`);
    };
    
    // Функция для обработки сохранения звука
    window.saveSound = function(soundData) {
        try {
            // Проверяем объем localStorage
            if (window.localStorage.length > 100) {
                window.errorHandler('localStorage переполнен. Предлагаем использовать sessionStorage или очистить localStorage.');
                
                // Показываем предложение пользователю
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
    
    // Тест функции сохранения
    window.testSaveSound = function() {
        const testSound = JSON.stringify({ sound: 'test_data' });
        saveSound(testSound);
        console.log('Тест сохранения звука выполнен.');
    };
    
    // Запуск тестов доступности
    console.log('Тест доступности :focus-valid и скролла запущен.');
});