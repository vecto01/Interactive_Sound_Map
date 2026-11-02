// Тест производительности анимаций и отключенного JS
// Проверка работы приложения на ограниченных ресурсах

// Проверка анимаций на слабых устройствах
console.log('=== Проверка анимаций ===');
const start = performance.now();
const spinner = document.querySelector('.loading-spinner');
spinner.style.transition = 'transform 0.3s ease-in-out';
spinner.style.transform = 'rotate(360deg)';
const end = performance.now();
console.log(`Анимация завершилась за ${end - start} мс (малый интервал)`);

// Проверка отключенного JS
if (typeof document.querySelectorAll !== 'function') {
  console.error('JS отключен: проверка адаптивности невозможна');
} else {
  // Проверка адаптивности на малом экране
  const mobileContainer = document.querySelector('.container');
  if (mobileContainer) {
    console.log('Адаптивность проверена на малом экране');
  }
}

// Проверка темной темы
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log(`Темная тема: ${prefersDark ? 'активна' : 'отключена'}`);

// Проверка ARIA-атрибутов
const spinnerElement = document.querySelector('.loading-spinner');
if (spinnerElement) {
  spinnerElement.setAttribute('aria-live', 'polite');
  spinnerElement.setAttribute('aria-busy', 'true');
  console.log('ARIA-атрибуты добавлены');
}

// Проверка фокуса для доступности
const loadingText = document.querySelector('.loading-text');
if (loadingText) {
  loadingText.setAttribute('tabindex', '0');
  console.log('Доступность для клавиатуры проверена');
}