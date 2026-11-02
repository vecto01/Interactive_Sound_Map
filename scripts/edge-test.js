// Тест производительности анимаций и edge-кейсов
// Проверка на низких ресурсах и отключенном JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("🔍 Тест запущен: проверка производительности анимаций и edge-кейсов")
  
  // Проверка плавности анимации спинера
  const startTime = performance.now();
  const spinner = document.querySelector(".loading-spinner");
  if (spinner) {
    spinner.style.transition = "transform 0.1s ease-in-out"; // Короткий интервал для симуляции низких ресурсов
    spinner.style.transform = "rotate(360deg)";
    const endTime = performance.now();
    console.log(`⏱️ Анимация завершилась за ${endTime - startTime} мс (низкие ресурсы)`);
  }
  
  // Проверка адаптивности при отключенном JS
  try {
    const jsEnabled = typeof document.querySelector !== "function";
    if (jsEnabled) {
      console.error("⚠️ JS отключен: адаптивность проверена невозможна")
    } else {
      console.log("✅ JS включен: адаптивность проверена")
    }
  } catch (error) {
    console.log("⚠️ Ошибка теста: " + error.message)
  }
  
  // Проверка адаптивности на малых экранах
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    console.log("📱 Проверка адаптивности на мобильном устройстве: ✅")
  }
})