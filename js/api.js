const API_KEY = "4KH-IFR-KW5-TSE-D7G-KWU-2SD-UCO";
const PROXY_URL = 'https://server-imei-checher.onrender.com/proxy';

async function checkImei(imei, service = 0) {
    const postData = {
        service: service,
        imei: imei,
        key: API_KEY
    };

    try {
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();
        
        if (!responseText.trim()) {
            throw new Error('Empty response from server');
        }
        
        const result = JSON.parse(responseText);
        
        window.utils.cacheResult(imei, result);
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(`API request failed: ${error.message}`);
    }
}

function getApiKey() {
    return API_KEY;
}

window.api = {
    checkImei,
    getApiKey
};