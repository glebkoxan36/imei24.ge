function displayResult(result, imei) {
    const responseText = result.response || "ტექსტური პასუხი არ არის";
    const details = result.object || {};

    let deviceStatus = "უცნობი სტატუსი";
    let statusClass = "";
    let statusIcon = "fa-question-circle";
    let statusColor = "#a0a0ff";

    if (responseText.includes("Clean")) {
        deviceStatus = "სუფთა";
        statusClass = "success";
        statusIcon = "fa-check-circle";
        statusColor = "#0f0";
    } else if (responseText.includes("Blacklisted")) {
        deviceStatus = "შავ სიაშია";
        statusClass = "error";
        statusIcon = "fa-ban";
        statusColor = "#f55";
    } else if (responseText.includes("Lost")) {
        deviceStatus = "დაკარგულია";
        statusClass = "error";
        statusIcon = "fa-exclamation-triangle";
        statusColor = "#f90";
    }

    let resultHTML = `
        <div class="status-header">
            <div class="status-icon" style="color: ${statusColor}">
                <i class="fas ${statusIcon}"></i>
            </div>
            <div>
                <h3 style="color: ${statusColor}; margin-bottom: 5px;">${deviceStatus}</h3>
                <p>IMEI: <strong>${window.utils.escapeHTML(imei)}</strong></p>
            </div>
        </div>
        
        <div class="response-summary">
            <p><i class="fas fa-comment-alt"></i> <strong>სერვერის პასუხი:</strong> ${window.utils.escapeHTML(responseText)}</p>
            <p><i class="fas fa-calendar-check"></i> შემოწმების თარიღი: ${new Date().toLocaleString()}</p>
        </div>
    `;

    if (Object.keys(details).length > 0) {
        resultHTML += `
            <div class="result-details">
                <h3><i class="fas fa-info-circle"></i> მოწყობილობის დეტალები</h3>
                <div class="info-grid">
        `;
        
        for (const [key, value] of Object.entries(details)) {
            resultHTML += `
                <div class="info-card">
                    <h4>${window.utils.formatKey(key)}</h4>
                    <p>${window.utils.escapeHTML(window.utils.formatValue(key, value))}</p>
                </div>
            `;
        }
        
        resultHTML += `
                </div>
            </div>
        `;
    } else {
        resultHTML += `
            <div class="result-details">
                <p class="no-details"><i class="fas fa-info-circle"></i> დამატებითი დეტალები მიუწვდომელია</p>
            </div>
        `;
    }

    return resultHTML;
}

function displayiPhoneResult(result) {
    if (!result.success) {
        return showError(`API შეცდომა: ${result.error}`);
    }

    const deviceInfo = result.object || {};
    const responseText = result.response || "API-დან პასუხი არ არის";
    const model = result.model || "უცნობი მოდელი";
    const imei = result.imei || "";

    let statusColor = '#a0a0ff';
    let statusIcon = 'fa-question-circle';
    let statusText = 'უცნობი სტატუსი';

    if (responseText.includes("Clean")) {
        statusColor = '#0f0';
        statusIcon = 'fa-check-circle';
        statusText = 'სუფთა';
    } else if (responseText.includes("Blacklisted")) {
        statusColor = '#f55';
        statusIcon = 'fa-ban';
        statusText = 'შავ სიაშია';
    } else if (responseText.includes("Lost")) {
        statusColor = '#f90';
        statusIcon = 'fa-exclamation-triangle';
        statusText = 'დაკარგულია';
    }

    let resultHTML = `
        <div class="status-header">
            <div class="status-icon" style="color: ${statusColor}">
                <i class="fas ${statusIcon}"></i>
            </div>
            <div>
                <h3 style="color: ${statusColor}; margin-bottom: 5px;">${statusText}</h3>
                <p>IMEI: <strong>${window.utils.escapeHTML(imei)}</strong></p>
                <p>მოდელი: <strong>${model}</strong></p>
            </div>
        </div>
        
        <div class="response-summary">
            <p><i class="fas fa-comment-alt"></i> <strong>API პასუხი:</strong> ${window.utils.escapeHTML(responseText)}</p>
            <p><i class="fas fa-calendar-check"></i> შემოწმების თარიღი: ${new Date().toLocaleString()}</p>
        </div>
    `;

    if (Object.keys(deviceInfo).length > 0) {
        resultHTML += `
            <div class="result-details">
                <h3><i class="fas fa-info-circle"></i> მოწყობილობის დეტალები</h3>
                <div class="info-grid">
        `;
        
        for (const [key, value] of Object.entries(deviceInfo)) {
            resultHTML += `
                <div class="info-card">
                    <h4>${window.utils.formatKey(key)}</h4>
                    <p>${window.utils.escapeHTML(window.utils.formatValue(key, value))}</p>
                </div>
            `;
        }
        
        resultHTML += `
                </div>
            </div>
        `;
    } else {
        resultHTML += `
            <div class="result-details">
                <p class="no-details"><i class="fas fa-info-circle"></i> დამატებითი დეტალები მიუწვდომელია</p>
            </div>
        `;
    }

    return resultHTML;
}

function showError(message) {
    return `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i> 
            <div>${window.utils.escapeHTML(message)}</div>
        </div>
    `;
}

function initFeatures() {
    return `
        <div class="feature">
            <i class="fas fa-shield-alt"></i>
            <h3>გაფართოებული უსაფრთხოება</h3>
            <p>დაცული კავშირი და მონაცემთა დაშიფვრა უზრუნველყოფს თქვენი მოთხოვნების უსაფრთხოებას.</p>
        </div>
        <div class="feature">
            <i class="fas fa-bolt"></i>
            <h3>მყისიერი შედეგები</h3>
            <p>IMEI-ის შემოწმება ხდება რეალურ დროში მინიმალური დაყოვნებით.</p>
        </div>
        <div class="feature">
            <i class="fas fa-database"></i>
            <h3>ვრცელი მონაცემთა ბაზა</h3>
            <p>წვდომა მოწყობილობების ყველაზე სრულ მონაცემთა ბაზაზე მთელი მსოფლიოდან.</p>
        </div>
    `;
}

window.ui = {
    displayResult,
    displayiPhoneResult,
    showError,
    initFeatures
};