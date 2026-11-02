// Логика обработки клавиатуры
document.addEventListener('keydown', function(event) {
  const soundEditorModal = document.getElementById('sound-editor-modal');
  const errorModal = document.getElementById('error-modal');
  
  // Закрытие модальных окон по Escape
  if ((soundEditorModal && soundEditorModal.classList.contains('open')) || (errorModal && errorModal.classList.contains('open'))) {
    if (event.key === 'Escape') {
      if (soundEditorModal) soundEditorModal.classList.remove('open');
      if (errorModal) errorModal.classList.remove('open');
    }
  }
  
  // Сохранение звука по нажатию Enter в полях ввода
  const inputFields = document.querySelectorAll('.sound-input');
  
  const saveSound = () => {
    const soundData = {
      id: document.querySelector('.sound-input[data-sound-id]').value,
      value: document.querySelector('.sound-input').value
    };
    try {
      localStorage.setItem('userSound', JSON.stringify(soundData));
      alert('Звук сохранён!');
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        alert('Ошибка: не хватает места в localStorage!');
      } else {
        alert('Ошибка сохранения: ' + e.message);
      }
    }
  };
  
  inputFields.forEach(field => {
    if (field.value && event.key === 'Enter') {
      saveSound();
    }
  });
});

// Анимация точек загрузки
function animateDots() {
  const dotsLoader = document.getElementById('dotsLoader');

  
  let currentIndex = 0;
  
  function pulseDot(index) {
    const dot = dotsLoader.children[index];
    dot.style.opacity = '1';
    
    setTimeout(() => {
      dot.style.opacity = '0.3';
      if (index < 2) {
        pulseDot(index + 1);
      } else {
        pulseDot(0);
      }
    }, 500);
  }
  
  pulseDot(currentIndex);
}

// Логика модального окна редактирования звука
const soundEditorModal = document.getElementById('sound-editor-modal');

function openSoundEditorModal() {
  if (!soundEditorModal) return;
  
  soundEditorModal.setAttribute('role', 'dialog');
  soundEditorModal.setAttribute('aria-modal', 'true');
  soundEditorModal.setAttribute('aria-label', 'Редактирование звука');
  
  soundEditorModal.classList.add('open');
}

function closeSoundEditorModal() {
  if (soundEditorModal) {
    soundEditorModal.classList.remove('open');
  }
}

// Логика обработки загрузки и ошибок
const loadingScreen = document.querySelector('.loading-screen');
const loadingText = document.querySelector('.loading-text');
const testLoadBtn = document.getElementById('test-load-button');

function showLoader() {
  loadingScreen.style.display = 'flex';
  loadingScreen.style.opacity = '1';
  loadingScreen.setAttribute('aria-busy', 'true');
  loadingText.textContent = 'Loading...';
  
  // Показываем анимацию точек загрузки
  animateDots();
}

function hideLoaderWithAnimation() {
  loadingScreen.style.opacity = '0.5';
  
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.classList.add('hidden');
    
    const spinner = document.querySelector('.spinner');
    spinner.style.borderTopColor = 'var(--primary-color)';
    spinner.style.animationPlaybackRate = '1.5';
    
    setTimeout(() => {
      spinner.style.animationPlaybackRate = '1';
    }, 500);
  }, 1000);
}

function simulateSoundLoad() {
  showLoader();
  
  setTimeout(() => {
    hideLoaderWithAnimation();
    
    if (testLoadBtn) {
      testLoadBtn.style.display = 'block';
    }
  }, 1500);
}

function simulateSoundError() {
  showErrorModal('Не удалось загрузить звук', true);
}

// Кнопка теста загрузки звука
if (testLoadBtn) {
  testLoadBtn.addEventListener('click', simulateSoundLoad);
}

// Инициализация
if (testLoadBtn) {
  simulateSoundLoad();
}