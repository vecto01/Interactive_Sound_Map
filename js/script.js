document.addEventListener('DOMContentLoaded', () => {
  // Кнопка теста загрузки звука
  const testSoundLoadButton = document.getElementById('test-sound-load');
  if (testSoundLoadButton) {
    testSoundLoadButton.addEventListener('click', () => {
      simulateSoundLoad();
    });
  }

  // Темная/светлая тема
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Загрузка сохранённого состояния
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
  }
  
  // Логика переключения
  themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode', themeToggle.checked);
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
  });

  // Анимация прогресса загрузки
  const loadingProgressBar = document.querySelector('.loading-progress-bar');
  const loadingText = document.querySelector('.loading-text');
  const soundMapContainer = document.getElementById('sound-map-container');
  
  // Заполнить прогресс-бар
  loadingProgressBar.style.width = '100%';
  
  // Скрыть элементы после загрузки контента
  soundMapContainer.addEventListener('load', () => {
    loadingProgressBar.style.display = 'none';
    loadingText.style.display = 'none';
    
    if (!soundMapContainer.children.length) {
      soundMapContainer.innerHTML = '<div class="placeholder">Ready! Interactive Map will appear here.</div>';
    }
  });

  // Импортируем функционал индикатора загрузки звука
  const AudioLoader = window.AudioLoader || (function() {
    const loader = {
      showLoader: function() {
        const loaderDiv = document.createElement('div');
        loaderDiv.className = 'audio-loader';
        loaderDiv.setAttribute('aria-live', 'polite');
        loaderDiv.style.position = 'fixed';
        loaderDiv.style.top = '0px';
        loaderDiv.style.left = '0px';
        loaderDiv.style.width = '100%';
        loaderDiv.style.height = '100vh';
        loaderDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        loaderDiv.style.display = 'flex';
        loaderDiv.style.alignItems = 'center';
        loaderDiv.style.justifyContent = 'center';
        loaderDiv.style.zIndex = '9999';
        loaderDiv.style.color = 'white';
        loaderDiv.style.fontFamily = 'Arial, sans-serif';
        loaderDiv.style.fontSize = 'calc(1rem + 0.5vw)';
        loaderDiv.style.padding = '20px';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'audio-progress-bar';
        progressBar.style.width = '0%';
        progressBar.style.height = '40px';
        progressBar.style.backgroundColor = '#4CAF50';
        progressBar.style.borderRadius = '20px';
        progressBar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        
        const progressText = document.createElement('span');
        progressText.textContent = 'Загрузка звука...';
        
        loaderDiv.appendChild(progressBar);
        loaderDiv.appendChild(progressText);
        document.body.appendChild(loaderDiv);
      },
      animateProgress: function(progress) {
        const progressBar = document.querySelector('.audio-progress-bar');
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
        }
      },
      hideLoader: function() {
        const loader = document.querySelector('.audio-loader');
        if (loader) {
          loader.remove();
        }
      }
    };
    return loader;
  })();

  // Логика загрузки звука
  function loadAudioSources() {
    AudioLoader.showLoader();
    // Пример: загрузка звука с анимацией прогресса
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      AudioLoader.animateProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        AudioLoader.hideLoader();
      }
    }, 300);

    // Имитация загрузки звука
    setTimeout(() => {
      soundMapContainer.dispatchEvent(new Event('sound-loaded'));
    }, 2000);
  }
});