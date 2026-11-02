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

  // ARIA-атрибуты для модального окна
  const soundEditorContainer = document.getElementById('sound-editor-container');
  if (soundEditorContainer) {
    soundEditorContainer.setAttribute('role', 'dialog');
    soundEditorContainer.setAttribute('aria-modal', 'true');
    soundEditorContainer.setAttribute('aria-label', 'Редактор звука: измените длительность звука');
  }

  // Логика индикатора загрузки
  const loadingSpinner = document.getElementById('loadingSpinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
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
  const loadingCircle = document.querySelector('.loading-circle');
  const loadingContainer = document.querySelector('.loading-container');
  if (loadingCircle && loadingContainer) {
    setTimeout(() => {
      loadingCircle.style.animation = 'spin 1s ease-in-out infinite';
    }, 1500);
  }

  // Завершение анимации загрузки
  const skeletonLoader = document.querySelector('.skeleton-loader');
  const mapContainer = document.querySelector('.map-container');
  if (skeletonLoader && mapContainer) {
    mapContainer.addEventListener('load', () => {
      skeletonLoader.style.display = 'none';
      skeletonLoader.style.animation = 'none';
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
    });
  }

  // Логика редактирования звука и валидация длины звука
  function validateSoundDuration(duration) {
    if (!duration || isNaN(duration)) {
      showErrorModal('Пожалуйста, укажите длительность звука!');
      return false;
    }
    if (duration > 10000) {
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
        alert('Звук успешно сохранён в localStorage!');
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          alert('Ошибка: не хватает места в localStorage!');
        } else if (e.name === 'TypeError') {
          alert('Ошибка: данные некорректны. Проверьте ввод.');
        } else {
          alert('Ошибка сохранения: ' + e.message);
        }
      }
    });
  }

  // Отображение модального окна при клике на тест-кнопку
  const testButton = document.getElementById('testButton');
  if (testButton) {
    testButton.addEventListener('click', () => {
      const modal = document.getElementById('testModal');
      const modalContent = document.getElementById('testModalContent');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      modalContent.style.display = 'block';
    });
  }

  // Логика закрытия модального окна по нажатию на "Закрыть"
  const closeModalButton = document.getElementById('close-modal-button');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      const modal = document.getElementById('testModal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Логика закрытия модального окна через Escape
  const soundEditor = document.getElementById('sound-editor-container');
  if (soundEditor) {
    soundEditor.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && soundEditor.classList.contains('active')) {
        soundEditor.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
})