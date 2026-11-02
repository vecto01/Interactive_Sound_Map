# Инициализация загрузки интерфейса
// Проверка и обработка ошибок localStorage
function saveSound() {
  try {
    const soundData = {
      id: 'test',
      name: 'Test Sound',
      location: 'Global'
    };
    localStorage.setItem('userSound', JSON.stringify(soundData));
    alert('Звук сохранён!');
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      alert('Ошибка: не хватает места в localStorage!');
      const confirmStorage = confirm('Не хватает места в localStorage. Хотите:
        1. Использовать sessionStorage (очистится при закрытии браузера)?
        2. Очистить localStorage вручную?');
      
      if (confirmStorage === 1) {
        sessionStorage.setItem('userSound', JSON.stringify(soundData));
        alert('Звук сохранён в sessionStorage!');
      } else if (confirmStorage === 2) {
        localStorage.removeItem('userSound');
        alert('localStorage очищен. Попробуйте сохранить звук снова.');
      }
    } else {
      alert('Ошибка сохранения: ' + e.message);
    }
  }

// Кнопка сохранения звука
if (saveSoundButton) {
  saveSoundButton.addEventListener('click', saveSound);
  saveSoundButton.addEventListener('focus', () => {
    saveSoundButton.classList.add('test-button-focus');
  });
  saveSoundButton.addEventListener('blur', () => {
    saveSoundButton.classList.remove('test-button-focus');
  });
}