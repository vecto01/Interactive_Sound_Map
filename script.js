document.addEventListener('DOMContentLoaded', function() {
    // Анимация загрузки
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Проверка наличия данных для отображения
    if (mainContent.children.length > 0) {
        loadingScreen.style.display = 'none';
    }
    
    // Темная/светлая тема
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Загрузка сохранённого состояния
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    // Логика переключения тем
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Анимация появления карточек
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            card.classList.add('active');
            // Убираем анимацию после клика, если нужно
            // card.classList.remove('active');
        });
    });
    
    // Анимация футера при прокрутке
    const footer = document.querySelector('footer');
    window.addEventListener('scroll', () => {
        if (window.scrollY > footer.offsetTop - 100) {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }
    });
    
    // Фиксация кнопки на мобильных
    const playButton = document.createElement('button');
    playButton.className = 'play-button';
    playButton.textContent = 'Play';
    playButton.style.backgroundColor = '#4CAF50';
    playButton.style.color = 'white';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '4px';
    playButton.style.padding = '12px 24px';
    playButton.style.cursor = 'pointer';
    
    document.body.appendChild(playButton);
    
    // Проверка адаптивности на мобильных
    if (window.innerWidth <= 768) {
        playButton.style.display = 'block';
    }
    
    // Динамическое добавление карточек (если есть) для анимации
    const cardsContainer = document.querySelector('.map-container');
    if (cardsContainer.children.length > 0) {
        cardsContainer.style.opacity = '0';
        cardsContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            cardsContainer.style.opacity = '1';
            cardsContainer.style.transform = 'translateY(0)';
        }, 100);
    }
});