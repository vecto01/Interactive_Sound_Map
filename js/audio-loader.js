const AudioLoader = {
    // Индикатор загрузки звука
    showLoader: function() {
        const loader = document.createElement('div');
        loader.className = 'audio-loader';
        loader.setAttribute('aria-live', 'polite');
        loader.style.position = 'fixed';
        loader.style.top = '0px';
        loader.style.left = '0px';
        loader.style.width = '100%';
        loader.style.height = '100vh';
        loader.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        loader.style.display = 'flex';
        loader.style.alignItems = 'center';
        loader.style.justifyContent = 'center';
        loader.style.zIndex = '9999';
        loader.style.color = 'white';
        loader.style.fontFamily = 'Arial, sans-serif';
        loader.style.fontSize = 'calc(1rem + 0.5vw)';
        loader.style.padding = '20px';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'audio-progress-bar';
        progressBar.style.width = '0%';
        progressBar.style.height = '40px';
        progressBar.style.backgroundColor = '#4CAF50';
        progressBar.style.borderRadius = '20px';
        progressBar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        
        const progressText = document.createElement('span');
        progressText.textContent = 'Загрузка звука...';
        
        loader.appendChild(progressBar);
        loader.appendChild(progressText);
        document.body.appendChild(loader);
    },
    // Анимация прогресса загрузки
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