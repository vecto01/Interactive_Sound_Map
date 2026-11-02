document.addEventListener('DOMContentLoaded', function() {
  // Логика загрузки карты и анимации
  const loadingIndicator = document.querySelector('.loading-indicator');
  const loadingBar = document.querySelector('.loading-bar');
  const mapContainer = document.querySelector('.map-container');
  let isLoading = true;
  let progress = 0;

  // Анимация загрузки
  function animateLoading() {
    if (isLoading) {
      loadingIndicator.style.display = 'block';
      loadingBar.style.display = 'block';
      
      // Плавное вращение индикатора
      loadingIndicator.style.animation = 'spin 1.5s linear infinite';
      
      // Плавное заполнение прогресс-бара
      const progressBar = loadingBar.querySelector('::after');
      const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
          clearInterval(interval);
          loadingIndicator.style.animation = 'none';
          loadingIndicator.style.opacity = '0';
          setTimeout(() => {
            loadingIndicator.style.display = 'none';
            loadingBar.style.display = 'none';
            isLoading = false;
            
            // Карта загружается после анимации
            mapContainer.innerHTML = '<div class="map"></div>';
            const points = document.querySelector('.map');
            points.innerHTML = '<div class="point"></div>';
          }, 1000);
        }
      }, 100);
    }
  }

  // Логика модального окна и обработка событий
  const saveSound = () => {
    try {
      const soundData = { /* Пример данных: */ name: 'test_sound', volume: 0.7, source: 'local' };
      const userSound = JSON.stringify(soundData);
      
      // Проверка на переполнение localStorage
      if (localStorage.length >= 100) { // Порог можно настроить
        const shouldDelete = window.confirm('localStorage переполнен! Сохранённые данные будут удалены. Продолжить очистку?');
        if (shouldDelete) {
          localStorage.clear();
          alert('localStorage очищен. Данные сохранены в sessionStorage.');
        } else {
          console.error('localStorage переполнен, но данные не сохранены.');
          return;
        }
      }
      
      localStorage.setItem('userSound', userSound);
      alert('Звук успешно сохранён!');
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        alert('Ошибка: не хватает места в localStorage. Проверьте размер файлов или очистите кэш браузера.');
      } else if (e instanceof TypeError) {
        alert('Ошибка: неверный формат данных для сохранения.');
      } else {
        alert('Ошибка сохранения: ' + e.message);
      }
    }
  };

  // Пример вызова функции
  animateLoading();

  // Тест функции сохранения звука
  window.testSaveSound = saveSound;
});