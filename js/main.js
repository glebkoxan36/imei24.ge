document.addEventListener('DOMContentLoaded', function() {
    // DOM элементы
    const imeiInput = document.getElementById('imei');
    const checkBtn = document.getElementById('check-btn');
    const resultContainer = document.getElementById('result-container');
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const loading = document.getElementById('loading');
    const apiKeyDisplay = document.getElementById('api-key-display');
    const currentYear = document.getElementById('current-year');
    const featuresContainer = document.querySelector('.features');

    // Инициализация
    apiKeyDisplay.textContent = window.api.getApiKey();
    currentYear.textContent = new Date().getFullYear();
    featuresContainer.innerHTML = window.ui.initFeatures();
    imeiInput.focus();

    // Обработчик проверки IMEI
    checkBtn.addEventListener('click', async function() {
        const imei = imeiInput.value.trim();

        // Валидация IMEI
        if (!window.utils.validateIMEI(imei)) {
            resultContainer.innerHTML = window.ui.showError('შეცდომა: IMEI უნდა შედგებოდეს 15 ციფრისგან');
            statusDot.classList.remove('active');
            statusText.textContent = 'შემოწმების შეცდომა';
            statusText.style.color = '#f55';
            return;
        }

        // Показать индикатор загрузки
        loading.style.display = 'block';
        statusDot.classList.remove('active');
        statusText.textContent = 'შემოწმება მიმდინარეობს...';
        statusText.style.color = '#e0e0ff';
        resultContainer.innerHTML = '<div class="terminal-text">> მოთხოვნა გაიგზავნა სერვერზე<br>> IMEI-ის დამუშავება: ' + imei + '</div>';

        try {
            // Проверка кэша
            const cached = window.utils.getCachedResult(imei);
            if (cached) {
                resultContainer.innerHTML = window.ui.displayResult(cached.data, imei);
                statusDot.classList.add('active');
                statusText.textContent = 'შემოწმება წარმატებით დასრულდა (кешировано)';
                statusText.style.color = '#0f0';
            } else {
                // Запрос к API
                const result = await window.api.checkImei(imei);
                
                if (!result) {
                    throw new Error('No data received');
                }
                
                resultContainer.innerHTML = window.ui.displayResult(result, imei);
                statusDot.classList.add('active');
                statusText.textContent = 'შემოწმება წარმატებით დასრულდა';
                statusText.style.color = '#0f0';
            }
        } catch (error) {
            resultContainer.innerHTML = window.ui.showError(`შეცდომა: ${error.message}`);
            statusDot.classList.remove('active');
            statusText.textContent = 'შემოწმების შეცდომა';
            statusText.style.color = '#f55';
        } finally {
            loading.style.display = 'none';
        }
    });
});
// Обработчики для бокового меню
document.addEventListener('DOMContentLoaded', function() {
    // Переключение видимости меню
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Раскрытие/закрытие подменю
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const category = this.parentElement;
            category.classList.toggle('active');
        });
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
});