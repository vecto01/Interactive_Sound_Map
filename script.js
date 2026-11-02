document.addEventListener('DOMContentLoaded', function() {
    // Лоадер и анимации
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingText = document.querySelector('.loading-text');
    const testLoadBtn = document.getElementById('test-load-button');
    
    // Показываем вращающийся индикатор
    function showLoader() {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        loadingScreen.setAttribute('aria-busy', 'true');
        loadingText.textContent = 'Loading...';
    }
    
    // Плавное исчезновение лоадера с анимацией завершения
    function hideLoaderWithAnimation() {
        loadingScreen.style.opacity = '0.5';
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.classList.add('hidden');
            
            // Добавим визуальный индикатор успешной загрузки
            const spinner = document.querySelector('.spinner');
            spinner.style.borderTopColor = 'var(--primary-color)';
            spinner.style.animationPlaybackRate = '1.5';
            
            setTimeout(() => {
                spinner.style.animationPlaybackRate = '1';
            }, 500);
        }, 1000);
    }
    
    // Симуляция загрузки звука
    function simulateSoundLoad() {
        showLoader();
        
        // Имитация загрузки звука с анимацией
        setTimeout(() => {
            hideLoaderWithAnimation();
            
            // Показываем кнопку теста
            testLoadBtn.style.display = 'block';
        }, 1500);
    }
    
    // Логика обработки ошибок
    function showErrorModal(message, isSoundError) {
        const errorModal = document.getElementById('error-modal');
        if (!errorModal) return;
        
        const errorContent = errorModal.querySelector('.error-content');
        errorContent.innerHTML = '';
        
        const errorTitle = document.createElement('div');
        errorTitle.className = 'error-title';
        errorTitle.textContent = `Ошибка${isSoundError ? ' загрузки звука' : ''}:
        `;
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        const retryButton = document.createElement('button');
        retryButton.className = 'retry';
        retryButton.textContent = isSoundError ? 'Попробовать снова' : '';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'close';
        closeButton.textContent = 'Закрыть';
        
        const errorButtons = document.createElement('div');
        errorButtons.className = 'error-buttons';
        errorButtons.appendChild(retryButton);
        errorButtons.appendChild(closeButton);
        
        errorContent.appendChild(errorTitle);
        errorContent.appendChild(errorMessage);
        errorContent.appendChild(errorButtons);
        
        errorModal.style.display = 'flex';
        
        // Обработка нажатий
        retryButton.onclick = () => {
            simulateSoundLoad();
        };
        
        closeButton.onclick = () => {
            errorModal.style.display = 'none';
        };
    }
    
    // Кнопка теста загрузки звука
    testLoadBtn.addEventListener('click', simulateSoundLoad);
    
    // Инициализация
    simulateSoundLoad();
})