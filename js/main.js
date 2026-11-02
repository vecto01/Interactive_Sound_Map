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
  })

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  }

  // Функция для отображения окна ошибки
  function showErrorModal(message) {
    const errorModal = document.getElementById('error-modal');
    if (errorModal) {
      errorModal.style.display = 'flex';
      errorModal.querySelector('.error-message').textContent = message;
    }
  }

  // Анимация загрузки
  const skeletonLoader = document.querySelector('.skeleton-loader');
  const mapContainer = document.querySelector('.map-container');

  if (skeletonLoader && mapContainer) {
    mapContainer.addEventListener('load', () => {
      skeletonLoader.style.display = 'none';
      skeletonLoader.style.animation = 'none';
    })

    const testLoadContainer = document.getElementById('test-load-container');
    if (testLoadContainer) {
      testLoadContainer.style.display = 'block';
    }
  }

  // Запуск анимации загрузки
  const loadingCircle = document.querySelector('.loading-circle');
  const loadingContainer = document.querySelector('.loading-container');
  if (loadingCircle && loadingContainer) {
    setTimeout(() => {
      loadingCircle.classList.add('completed');
      setTimeout(() => {
        loadingCircle.classList.add('success');
        setTimeout(() => {
          const successContainer = document.createElement('div');
          successContainer.className = 'loading-success';
          successContainer.innerHTML = '<div class="checkmark"></div><span class="progress-text">Загрузка завершена!</span>';
          loadingContainer.appendChild(successContainer);
          loadingContainer.classList.add('completed');
          setTimeout(() => {
            loadingContainer.style.opacity = '0';
            setTimeout(() => {
              loadingContainer.style.display = 'none';
            }, 300);
          }, 500);
        }, 500);
      }, 500);
    }, 1500);
  }

  // Логика редактирования звука и валидация длины звука
  function validateSoundDuration(duration) {
    if (!duration || isNaN(duration)) { // Проверка на пустое значение или некорректный ввод
      showErrorModal('Пожалуйста, укажите длительность звука!');
      return false;
    }
    if (duration > 10000) { // 10 секунд в миллисекундах
      showErrorModal('Длительность звука не может превышать 10 секунд!');
      return false;
    }
    return true;
  }

  function handleSoundEdit(event) {
    const newDuration = parseInt(event.target.value);
    if (!validateSoundDuration(newDuration)) {
      return;
    }

    const savedSound = localStorage.getItem('soundDuration');
    if (savedSound) {
      const parsedSound = parseInt(savedSound);
      if (parsedSound !== newDuration) {
        localStorage.setItem('soundDuration', newDuration);
        showErrorModal('Звук успешно обновлён!');
      } else {
        showErrorModal('Данные уже сохранены!');
      }
    } else {
      localStorage.setItem('soundDuration', newDuration);
      showErrorModal('Звук успешно сохранён!');
    }
  }

  const soundInput = document.getElementById('sound-input');
  const saveButton = document.getElementById('save-sound-button');

  if (soundInput && saveButton) {
    soundInput.addEventListener('change', handleSoundEdit);
    saveButton.addEventListener('click', () => {
      const duration = parseInt(soundInput.value);
      if (!validateSoundDuration(duration)) {
        return;
      }

      try {
        localStorage.setItem('soundDuration', duration);
        showErrorModal('Сохранение звука подтверждено!');
      } catch (error) {
        showErrorModal('Ошибка сохранения! Проверьте настройки браузера.');
      }
    });
  }

  // Отображение редактора звука при клике на тест-кнопку
  const testLoadButton = document.getElementById('test-load-button');
  const soundEditorContainer = document.getElementById('sound-editor-container');

  if (testLoadButton && soundEditorContainer) {
    testLoadButton.addEventListener('click', () => {
      soundEditorContainer.style.display = 'block';
      // Загрузка скрипта keyboard_controller.js и инициализация обработчиков
      const keyboardScript = document.createElement('script');
      keyboardScript.src = 'js/keyboard_controller.js';
      keyboardScript.onload = () => {
        const keyboardController = window.keyboardController;
        keyboardController.setupEventListeners(soundEditorContainer);
      };
      document.head.appendChild(keyboardScript);
    });
  }
})