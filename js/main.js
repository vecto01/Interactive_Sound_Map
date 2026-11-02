document.addEventListener('DOMContentLoaded', () => {
  // Логика темной/светлой темы
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  }

  // Логика адаптивности кнопки "Play"
  const playButton = document.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', () => {
      // Логика для кнопки на мобильных
      if (window.innerWidth <= 768) {
        playButton.style.display = 'none';
        setTimeout(() => {
          playButton.style.display = 'block';
        }, 1000);
      }
    });
  }

  // Анимация загрузки
  const skeletonLoader = document.querySelector('.skeleton-loader');
  const mapContainer = document.querySelector('.map-container');

  if (skeletonLoader && mapContainer) {
    mapContainer.addEventListener('load', () => {
      skeletonLoader.style.display = 'none';
      skeletonLoader.style.animation = 'none';
    });
    
    // Отображаем кнопку теста загрузки звука
    const testLoadContainer = document.getElementById('test-load-container');
    if (testLoadContainer) {
      testLoadContainer.style.display = 'block';
    }
  }

  // Запуск анимации прогресса
  const progressBar = document.querySelector('.loading-progress-bar');
  if (progressBar) {
    progressBar.style.animationPlaybackRate = '1';
    setTimeout(() => {
      progressBar.style.animation = 'none';
    }, 1500);
  }
})