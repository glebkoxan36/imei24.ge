const APPLE_API_KEY = "4KH-IFR-KW5-TSE-D7G-KWU-2SD-UCO";
const APPLE_API_URL = 'https://api.ifreeicloud.co.uk';
const APPLE_SERVICE_ID = 205;

async function checkiPhone(imei, model) {
    const postData = {
        service: APPLE_SERVICE_ID,
        imei: imei,
        key: APPLE_API_KEY
    };

    try {
        const formData = new URLSearchParams();
        for (const key in postData) {
            formData.append(key, postData[key]);
        }

        const response = await fetch(APPLE_API_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Unknown error from API');
        }

        return {
            success: true,
            response: result.response,
            object: result.object,
            model: model,
            imei: imei
        };

    } catch (error) {
        console.error('Apple API Error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

window.appleApi = {
    checkiPhone
};