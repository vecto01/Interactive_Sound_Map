document.addEventListener('DOMContentLoaded', function() {
    // Лоадер и анимации
    const loadingScreen = document.querySelector('.loading-screen');
    const spinner = document.querySelector('.spinner');
    const loadingText = document.querySelector('.loading-text');
    const cardsContainer = document.getElementById('cards-container');
    
    // Показываем вращающийся индикатор
    function showLoader() {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        spinner.style.animation = 'spin 1s ease-in-out infinite';
        loadingText.textContent = 'Loading...';
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
    
    // Проверка загрузки карты
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('load', hideLoader);
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
});