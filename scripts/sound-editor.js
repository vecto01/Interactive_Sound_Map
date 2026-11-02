const saveSound = () => {
    try {
        const soundData = { /* данные звука */ }; // Здесь замените на реальные данные
        localStorage.setItem('userSound', JSON.stringify(soundData));
        alert('Звук сохранён!');
    } catch (e) {
        alert('Ошибка: не хватает места в localStorage!');
    }
};

const loadSound = () => {
    const savedSound = localStorage.getItem('userSound');
    if (savedSound) {
        const soundData = JSON.parse(savedSound);
        // Здесь загружаем данные в интерфейс
        console.log('Звук загружен:', soundData);
    } else {
        alert('Звука в localStorage нет.');
    }
};