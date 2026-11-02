document.addEventListener('DOMContentLoaded', function() { 
  const loadingContainer = document.querySelector('.loading-container');
  const mapContainer = document.querySelector('.map-container');
  
  // Показываем анимацию загрузки
  loadingContainer.style.display = 'flex';
  
  // Скрываем анимацию после загрузки карточек
  mapContainer.addEventListener('load', function() {
    loadingContainer.style.opacity = '0';
    setTimeout(() => {
      loadingContainer.style.display = 'none';
    }, 300); // Плавное скрытие
  });
});