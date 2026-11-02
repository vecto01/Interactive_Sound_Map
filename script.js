document.addEventListener('DOMContentLoaded', function() {
    // Лоадер и анимации
    const loadingScreen = document.querySelector('.loading-screen');
    const spinner = document.querySelector('.loading-spinner');
    const loadingText = document.querySelector('.loading-message');
    const cardsContainer = document.getElementById('cards-container');
    
    // Показываем вращающийся индикатор
    function showLoader() {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        spinner.style.animation = 'spin 1s ease-in-out infinite';
        loadingText.textContent = 'Loading...';
        loadingScreen.setAttribute('aria-busy', 'true');
    }
    
    // Плавное исчезновение лоадера
    function hideLoader() {
        spinner.style.animation = 'none';
        loadingScreen.style.opacity = '0.5';
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            cardsContainer.style.opacity = '1';
            cardsContainer.style.transition = 'opacity 0.5s ease-out';
        }, 1000);
    }
    
    // Функция для загрузки звука с прогрессом
    function loadSound(soundId) {
        const soundElement = document.getElementById(`sound-${soundId}`);
        if (!soundElement) {
            showErrorModal('Ошибка: звук не найден.', false);
            return;
        }
        
        showLoader();
        
        // Добавим индикатор прогресса
        const progressBar = document.createElement('div');
        progressBar.className = 'sound-progress-bar';
        progressBar.style.width = '0%';
        progressBar.style.height = '4px';
        progressBar.style.backgroundColor = '#4CAF50';
        progressBar.style.marginTop = '10px';
        progressBar.style.borderRadius = '2px';
        
        loadingScreen.appendChild(progressBar);
        
        try {
            soundElement.load();
            soundElement.play();
            
            // Проверка успешной загрузки
            soundElement.onloadedmetadata = function() {
                // Увеличиваем индикатор прогресса
                const progress = document.querySelector('.sound-progress-bar');
                progress.style.width = '100%';
                
                setTimeout(() => {
                    hideLoader();
                    progress.remove();
                }, 1000);
            };
            
            soundElement.onerror = function() {
                showErrorModal('Ошибка: звук не загрузился. Проверьте файл или интернет-соединение.', true);
                progress.remove();
            };
            
        } catch (error) {
            showErrorModal(`Ошибка: ${error.message}`, false);
            progress.remove();
        }
    }
    
    // Проверка загрузки карты
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('load', hideLoader);
    }
    
    // Кнопка теста загрузки звука
    const testSoundLoadBtn = document.getElementById('test-sound-load');
    if (testSoundLoadBtn) {
        testSoundLoadBtn.setAttribute('tabindex', '0');
        testSoundLoadBtn.setAttribute('aria-label', 'Тест загрузки звука');
        testSoundLoadBtn.addEventListener('click', () => {
            loadSound('1');
        });
    }
    
    // Инициализация лоадера
    showLoader();
    
    // Анимация появления футера
    const footer = document.querySelector('footer');
    if (footer) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > footer.offsetTop - 100) {
                footer.classList.add('visible');
            } else {
                footer.classList.remove('visible');
            }
        });
    }
    
    // Импортируем функцию для показа окна ошибки
    const errorModal = document.getElementById('error-modal');
    if (errorModal) {
        window.showErrorModal = function(message, isSoundError) {
            const errorContent = errorModal.querySelector('.error-content');
            
            errorContent.innerHTML = '';
            
            const errorTitle = document.createElement('div');
            errorTitle.className = 'error-title';
            errorTitle.textContent = `Ошибка${isSoundError ? ' загрузки звука' : ''}`;
            
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            
            const retryButton = document.createElement('button');
            retryButton.className = 'retry';
            retryButton.textContent = isSoundError ? 'Попробовать снова' : '';
            if (isSoundError) {
                retryButton.onclick = () => {
                    loadSound('1');
                };
            }
            
            const closeButton = document.createElement('button');
            closeButton.className = 'close';
            closeButton.textContent = 'Закрыть';
            closeButton.onclick = hideErrorModal;
            
            const errorButtons = document.createElement('div');
            errorButtons.className = 'error-buttons';
            errorButtons.appendChild(retryButton);
            errorButtons.appendChild(closeButton);
            
            errorContent.appendChild(errorTitle);
            errorContent.appendChild(errorMessage);
            errorContent.appendChild(errorButtons);
            
            errorModal.style.display = 'flex';
        };
        
        window.hideErrorModal = function() {
            errorModal.style.display = 'none';
        };
    }
});