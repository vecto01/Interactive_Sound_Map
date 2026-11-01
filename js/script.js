document.addEventListener('DOMContentLoaded', () => {
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
});