document.addEventListener('DOMContentLoaded', function() {
    const imeiInput = document.getElementById('imei');
    const modelSelect = document.getElementById('model');
    const checkBtn = document.getElementById('check-btn');
    const resultContainer = document.getElementById('result-container');
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const loading = document.getElementById('loading');
    const currentYear = document.getElementById('current-year');

    currentYear.textContent = new Date().getFullYear();

    checkBtn.addEventListener('click', async function() {
        const imei = imeiInput.value.trim();
        const model = modelSelect.value;

        if (!imei || imei.length < 10) {
            resultContainer.innerHTML = window.ui.showError('შეცდომა: შეიყვანეთ სწორი IMEI ან სერიული ნომერი');
            statusDot.classList.remove('active');
            statusText.textContent = 'შემოწმების შეცდომა';
            statusText.style.color = '#f55';
            return;
        }
        
        if (!model) {
            resultContainer.innerHTML = window.ui.showError('შეცდომა: აირჩიეთ iPhone-ის მოდელი');
            statusDot.classList.remove('active');
            statusText.textContent = 'შემოწმების შეცდომა';
            statusText.style.color = '#f55';
            return;
        }

        loading.style.display = 'block';
        statusDot.classList.remove('active');
        statusText.textContent = 'iPhone-ის მონაცემების შემოწმება...';
        statusText.style.color = '#e0e0ff';
        resultContainer.innerHTML = `
            <div class="terminal-text">
                > პრემიუმ შემოწმების დაწყება
                > მოდელი: ${model}
                > IMEI: ${imei}
                > API: ifreeicloud.co.uk
            </div>
        `;

        try {
            const result = await window.appleApi.checkiPhone(imei, model);
            resultContainer.innerHTML = window.ui.displayiPhoneResult(result);
            statusDot.classList.add('active');
            statusText.textContent = 'შემოწმება წარმატებით დასრულდა';
            statusText.style.color = '#0f0';
        } catch (error) {
            resultContainer.innerHTML = window.ui.showError(`შეცდომა: ${error.message}`);
            statusDot.classList.remove('active');
            statusText.textContent = 'შემოწმების შეცდომა';
            statusText.style.color = '#f55';
        } finally {
            loading.style.display = 'none';
        }
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const category = this.parentElement;
            category.classList.toggle('active');
        });
    });
});