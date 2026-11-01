document.addEventListener('DOMContentLoaded', () => {
  const skeletonLoader = document.querySelector('.skeleton-loader');
  const mapContainer = document.querySelector('.map-container');

  if (skeletonLoader && mapContainer) {
    mapContainer.addEventListener('load', () => {
      skeletonLoader.style.display = 'none';
      const spinLoader = document.createElement('div');
      spinLoader.className = 'spin-loader';
      skeletonLoader.appendChild(spinLoader);
      setTimeout(() => {
        spinLoader.style.display = 'none';
      }, 1000);
    });
  }

  // Логика адаптивности кнопки "Play"
  const playButton = document.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        playButton.style.opacity = '0.5';
        setTimeout(() => {
          playButton.style.opacity = '1';
        }, 1000);
      }
    });
  }
})