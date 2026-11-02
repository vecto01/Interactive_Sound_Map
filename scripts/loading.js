document.addEventListener('DOMContentLoaded', function() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const contentContainer = document.getElementById('content-container');
  const testSoundButton = document.querySelector('#test-sound');
  
  // Логика для кнопки "Пробный звук"
  testSoundButton.addEventListener('click', function() {
    showLoading();
    
    // Симуляция загрузки
    setTimeout(hideLoadingAndShowComplete, 2000);
  });
  
  // Отображение модального окна загрузки
  function showLoading() {
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.opacity = '1';
  }
  
  // Закрытие модального окна загрузки и отображение завершения
  function hideLoadingAndShowComplete() {
    setTimeout(() => {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
        
        // Создаем галочку и текст
        const completeIcon = document.createElement('div');
        completeIcon.className = 'complete-icon';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const soundHeader = document.createElement('h2');
        soundHeader.textContent = 'Готово!';
        modalContent.appendChild(soundHeader);
        
        const newButton = document.createElement('button');
        newButton.className = 'button';
        newButton.textContent = 'Пробный звук';
        newButton.id = 'test-sound';
        
        // Очищаем и обновляем контент
        contentContainer.innerHTML = '';
        contentContainer.appendChild(completeIcon);
        contentContainer.appendChild(modalContent);
        contentContainer.appendChild(newButton);
        
        // Убираем ARIA-атрибуты
        loadingOverlay.setAttribute('aria-busy', 'false');
      }, 300);
    }, 1000);
  }
});