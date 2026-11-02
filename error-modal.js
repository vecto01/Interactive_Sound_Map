document.addEventListener('DOMContentLoaded', function() {
    const errorModal = document.getElementById('error-modal');
    
    // Функция для показа окна ошибки
    function showErrorModal(message, isSoundError) {
        const errorContent = errorModal.querySelector('.error-content');
        
        if (isSoundError) {
            errorContent.innerHTML = 
                `<div class="error-title">Ошибка загрузки звука</div>
                <div class="error-message">${message}</div>
                <div class="error-buttons">
                    <button class="retry" onclick="showErrorModal('Попытка повторена...', false)">Попробовать снова</button>
                    <button class="close" onclick="hideErrorModal()">Закрыть</button>
                </div>`;
        } else {
            errorContent.innerHTML = 
                `<div class="error-title">Ошибка</div>
                <div class="error-message">${message}</div>
                <div class="error-buttons">
                    <button class="close" onclick="hideErrorModal()">Закрыть</button>
                </div>`;
        }
        
        errorModal.style.display = 'flex';
    }
    
    // Функция для скрытия окна ошибки
    function hideErrorModal() {
        errorModal.style.display = 'none';
    }
    
    // Инициализация обработки ошибок загрузки звука
    window.showErrorModal = showErrorModal;
    window.hideErrorModal = hideErrorModal;
    
    // Пример вызова из родительского кода (например, из main.js)
    // showErrorModal('Ошибка: звук не загрузился', true);
});