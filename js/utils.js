function validateIMEI(imei) {
    if (!imei || imei.length < 10) {
        return false;
    }
    return true;
}

function formatKey(key) {
    const keyMap = {
        "model": "მოდელი",
        "brand": "ბრენდი",
        "color": "ფერი",
        "storage": "მეხსიერება",
        "production_date": "წარმოების თარიღი",
        "network_status": "ქსელის სტატუსი",
        "country": "ქვეყანა",
        "activation_status": "აქტივაციის სტატუსი",
        "purchase_date": "შეძენის თარიღი",
        "warranty": "გარანტია",
        "blacklist_status": "შავი სიის სტატუსი",
        "simlock": "SIM ბლოკირება",
        "firmware": "ფირმვერი",
        "find_my_iphone": "Find My iPhone",
        "icloud_status": "iCloud სტატუსი",
        "carrier": "ოპერატორი",
        "serial_number": "სერიული ნომერი",
        "product_type": "პროდუქტის ტიპი",
        "purchase_country": "შეძენის ქვეყანა",
        "activation_date": "აქტივაციის თარიღი"
    };

    return keyMap[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function formatValue(key, value) {
    if (key.includes("date") && value) {
        return new Date(value).toLocaleDateString();
    }
    
    if (key === "warranty" && value) {
        return value === "Active" ? "აქტიური" : "ვადა გასულია";
    }
    
    if (key === "blacklist_status") {
        return value === "Clean" ? "სუფთა" : "შავ სიაშია";
    }
    
    if (key === "simlock") {
        return value === "Locked" ? "დაბლოკილია" : "თავისუფალია";
    }
    
    if (key === "icloud_status") {
        return value === "On" ? "ჩართულია" : "გამორთულია";
    }
    
    if (key === "activation_status") {
        return value === "Activated" ? "აქტივირებულია" : "არააქტივირებული";
    }
    
    return value || "მონაცემები არ არის";
}

function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function cacheResult(imei, data) {
    try {
        const history = JSON.parse(localStorage.getItem('imeiHistory') || '[]');
        const newEntry = {
            imei,
            data,
            timestamp: new Date().toISOString()
        };

        const newHistory = [newEntry, ...history.slice(0, 9)];
        localStorage.setItem('imeiHistory', JSON.stringify(newHistory));
        return newHistory;
    } catch (e) {
        console.error('Cache error:', e);
        return [];
    }
}

function getCachedResult(imei) {
    try {
        const history = JSON.parse(localStorage.getItem('imeiHistory') || '[]');
        return history.find(entry => entry.imei === imei);
    } catch (e) {
        console.error('Cache read error:', e);
        return null;
    }
}

window.utils = {
    validateIMEI,
    formatKey,
    formatValue,
    escapeHTML,
    cacheResult,
    getCachedResult
};