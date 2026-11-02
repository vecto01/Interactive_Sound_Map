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

  // Логика редактирования звука и валидация длины звука
  function validateSoundDuration(duration) {
    if (duration > 10000) { // 10 секунд в миллисекундах
      alert('Длительность звука не может превышать 10 секунд!');
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
        alert('Звук успешно сохранён!');
      }
    } else {
      localStorage.setItem('soundDuration', newDuration);
      alert('Звук успешно сохранён!');
    }
  }

  const soundInput = document.getElementById('sound-input');
  const saveButton = document.getElementById('save-sound-button');

  if (soundInput && saveButton) {
    soundInput.addEventListener('change', handleSoundEdit);
    saveButton.addEventListener('click', () => {
      const duration = parseInt(soundInput.value);
      if (validateSoundDuration(duration)) {
        alert('Сохранение звука подтверждено!');
      }
    });
  }

  // Отображение редактора звука при клике на тест-кнопку
  const testLoadButton = document.getElementById('test-load-button');
  const soundEditorContainer = document.getElementById('sound-editor-container');

  if (testLoadButton && soundEditorContainer) {
    testLoadButton.addEventListener('click', () => {
      soundEditorContainer.style.display = 'block';
    });
  }
})