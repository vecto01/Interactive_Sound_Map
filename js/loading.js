document.addEventListener('DOMContentLoaded', function() {
  const loadingContainer = document.querySelector('.loading-container');
  const mapContainer = document.querySelector('.map-container');
  let testButton = document.querySelector('.test-button');
  
  // Показываем анимацию загрузки
  loadingContainer.style.display = 'flex';
  
  // Проверка и добавление пульсации кнопки
  if (testButton) {
    testButton.classList.add('test-button-pulse');
  }
  
  // Скрываем анимацию после загрузки карточек
  mapContainer.addEventListener('load', function() {
    if (testButton) {
      testButton.classList.remove('test-button-pulse');
    }
    loadingContainer.style.opacity = '0';
    setTimeout(() => {
      loadingContainer.style.display = 'none';
    }, 300); // Плавное скрытие
  });
});