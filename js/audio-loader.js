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
    // Логика загрузки звука с обработкой ошибок
    loadSound: function(url) {
        return new Promise((resolve, reject) => {
            this.showLoader();
            
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Загрузка звука прервана: ${response.status} ${response.statusText}. Проверьте URL или интернет-соединение.`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const audioSource = audioContext.createBufferSource();
                    const audioBuffer = audioContext.decodeAudioData(blob);
                    audioSource.buffer = audioBuffer;
                    audioSource.connect(audioContext.destination);
                    audioSource.start(0);
                    resolve(audioBuffer);
                })
                .catch(error => {
                    reject(error);
                    this.hideLoader();
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'audio-error-message';
                    errorMessage.textContent = 'Ошибка загрузки звука. Попробуйте снова.';
                    errorMessage.style.position = 'fixed';
                    errorMessage.style.top = '50%';
                    errorMessage.style.left = '50%';
                    errorMessage.style.transform = 'translate(-50%, -50%)';
                    errorMessage.style.backgroundColor = '#ffebee';
                    errorMessage.style.color = '#c62828';
                    errorMessage.style.padding = '15px';
                    errorMessage.style.borderRadius = '8px';
                    document.body.appendChild(errorMessage);
                });
        });
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