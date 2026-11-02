// Загрузка данных языков
fetch('/lang.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network error or invalid JSON');
    }
    return response.json();
  })  
  .then(data => {
    const languageData = data;
    localStorage.setItem('langData', JSON.stringify(languageData));
    
    // Обновление текста на странице
    updateText(localStorage.getItem('language') || 'en');
  })  
  .catch(error => {
    console.error('Ошибка загрузки данных:', error);
    // Если загрузка данных локализации не удалась, используем английский по умолчанию
    updateText('en');
  });

// Функция обновления текста
function updateText(lang) {
  const langData = JSON.parse(localStorage.getItem('langData'));
  
  // Обновление текста элементов
  document.querySelectorAll('[data-text]').forEach(el => {
    const key = el.getAttribute('data-text');
    el.textContent = langData[lang]?.[key] || key;
  });

  // Обновление заголовка и футера
  document.querySelector('h1').textContent = langData[lang]?.['welcome'] || 'Interactive Sound Map';
  document.querySelector('.footer p').textContent = langData[lang]?.['footer'] || '© 2024 Interactive Sound Map';

  // Логика управления индикатором загрузки
  setTimeout(() => {
    document.getElementById('loading-spinner').style.display = 'none';
    document.querySelector('.spinner').classList.add('complete');
    document.querySelector('.content').style.display = 'flex';
    document.querySelector('.ready-banner').style.display = 'block';
  }, 2000);
}