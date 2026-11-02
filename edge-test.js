// edge-test.js - Тестирование производительности анимаций и доступности

// Проверка производительности анимации спиннера
function testSpinnerPerformance() {
  const spinner = document.querySelector('.spinner');
  const startTime = performance.now();
  
  // Запуск анимации
  spinner.style.animation = 'spin 1.5s ease-in-out infinite';
  
  // Остановка анимации и измерение времени
  setTimeout(() => {
    spinner.style.animation = 'none';
    const endTime = performance.now();
    console.log(`Анимация спиннера завершилась за ${endTime - startTime} мс.`);
    
    // Проверка FPS
    const fps = 1000 / (endTime - startTime);
    console.log(`FPS: ${fps.toFixed(2)}`);
    
    if (fps < 30) {
      console.error('Анимация не плавная (FPS < 30).');
    }
  }, 1500);
}

// Проверка доступности (a11y)
function testAccessibility() {
  const spinner = document.querySelector('.spinner');
  const spinnerComplete = document.querySelector('.spinner.complete');
  const loadingText = document.querySelector('.loading-text');
  
  // Проверка ARIA
  if (!spinner.hasAttribute('aria-live')) {
    spinner.setAttribute('aria-live', 'polite');
    console.log('Добавлен ARIA-атрибут для спиннера.');
  }
  
  if (!spinnerComplete.hasAttribute('aria-busy')) {
    spinnerComplete.setAttribute('aria-busy', 'true');
    console.log('Добавлен ARIA-атрибут для завершения анимации.');
  }
  
  // Проверка текста на доступность
  if (!loadingText.textContent.trim()) {
    loadingText.textContent = 'Загрузка...';
    console.log('Добавлен текст для спиннера.');
  }
}

// Запуск тестов
console.log('Тестирование производительности и доступности...');

// Проверка производительности
testSpinnerPerformance();

// Проверка доступности
testAccessibility();

// Проверка на отключенном JavaScript
if (typeof document.querySelectorAll === 'undefined') {
  console.error('JS отключен: проверка недоступна.');
}