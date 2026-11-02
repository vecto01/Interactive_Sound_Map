#!/usr/bin/env node
// Инициализация элементов и обработка загрузки
let testButton = document.querySelector('.test-button');
let loadingSpinner = document.getElementById('loadingSpinner');
let soundMap = document.getElementById('soundMap');
let soundModal = document.getElementById('soundModal');
let closeModalButton = document.getElementById('closeModalButton');
let saveSoundButton = document.getElementById('saveSoundButton');

// Показываем загрузку
function showLoading() {
  if (loadingSpinner) {
    loadingSpinner.style.display = 'flex';
    soundMap.classList.add('loading');
  }
}

// Скрываем загрузку
function hideLoading() {
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
    soundMap.classList.remove('loading');
  }
}

// Функция для открытия модального окна
function openModal() {
  soundModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Функция для закрытия модального окна
function closeModal() {
  soundModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Обработка нажатия на кнопку Test Sound
function handleTestSound() {
  showLoading();
  setTimeout(() => {
    openModal();
    hideLoading();
  }, 1000);
}

// Проверка на пульсацию кнопки при загрузке
function handleLoading() {
  if (testButton) {
    testButton.classList.add('test-button-pulse');
  }
}

// Обработка клавиатуры для модального окна
soundModal.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
  }
});

// Обработка нажатия на кнопку Test Sound
if (testButton) {
  testButton.addEventListener('click', handleTestSound);
  testButton.addEventListener('focus', () => {
    testButton.classList.add('test-button-focus');
  });
  testButton.addEventListener('blur', () => {
    testButton.classList.remove('test-button-focus');
  });
}

// Закрытие модального окна
if (closeModalButton) {
  closeModalButton.addEventListener('click', () => closeModal());
}

// Обработка нажатия на карту звука
soundMap.addEventListener('click', (event) => {
  const dot = event.target.closest('.map-dot');
  if (dot) {
    alert(`Вы выбрали звук с ID: ${dot.getAttribute('data-sound')}`);
  }
});

// Инициализация загрузки интерфейса
window.addEventListener('DOMContentLoaded', handleLoading);