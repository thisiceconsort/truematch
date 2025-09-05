document.addEventListener('DOMContentLoaded', () => {

    // --- Payment Related Constants and Functions ---
    // These are duplicated from main.js to allow this file to work independently.
    const PAYSTACK_PUBLIC_KEY = 'pk_live_6b671064b6a716c1ceffe82bf20a28c317a69584'; // Replace with your actual LIVE key!
    const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-55e5d0e754e7da9baacac6e2cb4e04ac-X';
    const FORMSPREE_SINGLE_ENDPOINT_ID = 'xpwjdjld';
    const EXCHANGERATE_API_KEY = 'd852fe1a5c2d4ef9a40400ed';
    const REGISTRATION_PAYMENT_NGN = 750;
    const RENEWAL_PAYMENT_NGN = 250;
    const REFERRAL_BONUS_NGN = 0;
    const FLUTTERWAVE_COUNTRIES_MAP = {
        'NG': { name: 'Nigeria', currency: 'NGN', channels: ['card', 'banktransfer', 'ussd', 'qr', 'opay', 'googlepay', 'applepay'] },
        'GH': { name: 'Ghana', currency: 'GHS', channels: ['card', 'mobilemoneyghana'] },
        'KE': { name: 'Kenya', currency: 'KES', channels: ['card', 'mpesa'] },
        'UG': { name: 'Uganda', currency: 'UGX', channels: ['card', 'mobilemoneyuganda'] },
        'TZ': { name: 'Tanzania', currency: 'TZS', channels: ['card', 'mobilemoneytzpesa'] },
        'ZM': { name: 'Zambia', currency: 'ZMW', channels: ['card', 'mobilemoneyzambia'] },
        'RW': { name: 'Rwanda', currency: 'RWF', channels: ['card', 'mobilemoneyrwanda'] },
        'ZA': { name: 'South Africa', currency: 'ZAR', channels: ['card', 'eft', '1voucher', 'googlepay', 'applepay'] },
        'CI': { name: 'Ivory Coast', currency: 'XOF', channels: ['card', 'mobilemoneyfranco'] },
        'SN': { name: 'Senegal', currency: 'XOF', channels: ['card', 'mobilemoneyfranco'] },
        'CM': { name: 'Cameroon', currency: 'XAF', channels: ['card', 'mobilemoneyfranco'] },
        'MW': { name: 'Malawi', currency: 'MWK', channels: ['card', 'mobilemoney'] },
        'US': { name: 'United States', currency: 'USD', channels: ['card', 'account', 'googlepay', 'applepay'] },
        'GB': { name: 'United Kingdom', currency: 'GBP', channels: ['card', 'account', 'googlepay', 'applepay'] }
    };
    const currencySymbols = {
        NGN: '₦', GHS: '₵', KES: 'KSh', ZAR: 'R', UGX: 'USh', TZS: 'TSh', RWF: 'RF', XOF: 'CFA', XAF: 'FCFA', USD: '$'
    };

    function currencySymbol(code) {
        return currencySymbols[code] || code;
    }

    function getCurrencyForCountry(countryCode) {
        const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[countryCode.toUpperCase()];
        return countryInfo ? countryInfo.currency : 'NGN';
    }

    async function getConvertedAmount(amountInNGN, targetCurrencyCode) {
        if (targetCurrencyCode === 'NGN') {
            return amountInNGN;
        }
        const apiUrl = `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/NGN`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch exchange rates from API.');
            const data = await response.json();
            if (data.result === 'success' && data.conversion_rates && data.conversion_rates[targetCurrencyCode]) {
                const rateNGNToTarget = data.conversion_rates[targetCurrencyCode];
                return Math.round(amountInNGN * rateNGNToTarget);
            } else {
                throw new Error('Invalid API response or currency not supported by API.');
            }
        } catch (error) {
            console.error('Error fetching conversion rate:', error);
            alert(`Failed to convert currency to ${targetCurrencyCode}. Proceeding with NGN payment as fallback. Error: ${error.message}`);
            return amountInNGN;
        }
    }

    // --- Payment Logic ---
    let pendingPaymentDetails = null;

    async function showPaymentOptionsModal(paymentDetails) {
        pendingPaymentDetails = paymentDetails;

        const { type, amount, targetCurrencyCode } = pendingPaymentDetails;

        let convertedAmount = amount;
        let convertedText = ``;

        if (targetCurrencyCode && targetCurrencyCode !== 'NGN') {
            try {
                convertedAmount = await getConvertedAmount(amount, targetCurrencyCode);
                convertedText = `(approx. ${currencySymbol(targetCurrencyCode)}${convertedAmount.toLocaleString()})`;
            } catch (error) {
                console.error('Error getting converted amount:', error);
            }
        }

        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const paymentOptionsContainer = document.getElementById('paymentOptionsContainer');

        modalTitle.textContent = `Choose Payment Method for ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        modalBody.innerHTML = `
        <p class="note-text">You are paying: <strong>${currencySymbol('NGN')}${amount.toLocaleString('en-NG')}</strong> ${convertedText} <b>only!</b></p>
         <div class="action-buttons" style="flex-direction:column; gap:15px; margin-top:20px;">
            <button class="form-submit-btn" id="payWithPaystackBtn" style="background: linear-gradient(90deg, #FFD700, #FFA500); color: #333;">
                <img src="" alt="" style="height:24px; margin-right:10px;"> Not Available [Down]
            </button>
            <button class="form-submit-btn" id="payWithFlutterwaveBtn" style="background: linear-gradient(90deg, #1A1A2E, #25D366);">
                <img src="" alt="" style="height:24px; margin-right:10px;"> Available [Join Now]
            </button>
            <div class="Reminder">
                <p>
                 Unlock raw pleasure fast with Mobile money, Mpasa, Ivoucher, EFT, Bank transfer, Google pay, Apple pay & Visa/MasterCard.
                </p>
            </div>
        </div>
    `;

        document.getElementById('payWithPaystackBtn').onclick = () => {
            handlePaystackPayment(amount, paymentDetails.email, paymentDetails.name, paymentDetails.phone, paymentDetails.country, type);
        };

        document.getElementById('payWithFlutterwaveBtn').onclick = async () => {
            const converted = await getConvertedAmount(amount, targetCurrencyCode);
            handleFlutterwavePayment(converted, paymentDetails.email, paymentDetails.phone, paymentDetails.name, paymentDetails.country, type, targetCurrencyCode);
        };
    }

    function handlePaystackPayment(amount, email, name, phone, country, paymentType) {
        // Save details to sessionStorage before leaving the page
        sessionStorage.setItem('pendingPaymentDetails', JSON.stringify(pendingPaymentDetails));

        const paystackAmount = amount * 100;
        const chargeCurrency = 'NGN';
        let reference = `${paymentType.toUpperCase()}_${new Date().getTime()}`;
        if (pendingPaymentDetails?.accessCode) reference += `_${pendingPaymentDetails.accessCode}`;
        if (pendingPaymentDetails?.videoId) reference += `_${pendingPaymentDetails.videoId}`;
        pendingPaymentDetails.paymentGatewayUsed = 'Paystack';
        if (typeof PaystackPop === 'undefined') {
            alert('Paystack SDK not loaded. Please try again.');
            return;
        }
        const handler = PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: email, amount: paystackAmount, ref: reference, currency: chargeCurrency,
            metadata: { customer_name: name, customer_phone: phone, payment_type: paymentType, country: country, access_code: pendingPaymentDetails?.accessCode || 'N/A', video_id: pendingPaymentDetails?.videoId || 'N/A' },
            callback: function(response) {
                if (response.status === 'success') {
                    // Clear sessionStorage on successful payment
                    sessionStorage.removeItem('pendingPaymentDetails');
                    window.location.href = `icp.html?payment=success&type=${paymentType}&ref=${response.reference}&details=${btoa(JSON.stringify(pendingPaymentDetails))}`;
                } else {
                    // Clear sessionStorage on failed payment
                    sessionStorage.removeItem('pendingPaymentDetails');
                    alert('Payment not completed or failed.');
                    window.location.href = 'icp.html?payment=failed';
                }
            },
            onClose: function() {
                // Clear sessionStorage if the payment window is closed
                sessionStorage.removeItem('pendingPaymentDetails');
                alert('Payment window closed.');
                window.location.href = 'icp.html?payment=closed';
            }
        });
        handler.openIframe();
    }

    function handleFlutterwavePayment(amount, email, phone, name, country, paymentType, targetCurrencyCode = 'NGN') {
        // Save details to sessionStorage before leaving the page
        sessionStorage.setItem('pendingPaymentDetails', JSON.stringify(pendingPaymentDetails));

        if (typeof FlutterwaveCheckout === 'undefined') {
            alert('Flutterwave SDK not loaded. Please try again.');
            return;
        }
        const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[country];
        if (!countryInfo) {
            alert('Payment via Flutterwave not supported for your country yet.');
            window.location.href = 'icp.html?payment=failed';
            return;
        }
        let txRef = `${paymentType.toUpperCase()}_FLW_${new Date().getTime()}`;
        if (pendingPaymentDetails?.accessCode) txRef += `_${pendingPaymentDetails.accessCode}`;
        if (pendingPaymentDetails?.videoId) txRef += `_${pendingPaymentDetails.videoId}`;
        pendingPaymentDetails.paymentGatewayUsed = 'Flutterwave';
        FlutterwaveCheckout({
            public_key: FLUTTERWAVE_PUBLIC_KEY, tx_ref: txRef, amount: amount, currency: targetCurrencyCode, country: country, payment_options: countryInfo.channels.join(','),
            customer: { email: email, phone_number: phone, name: name },
            meta: { payment_type: paymentType, customer_country: country, customer_uniqueness: pendingPaymentDetails?.accessCode || 'N/A', video_id: pendingPaymentDetails?.videoId || 'N/A' },
            customizations: { title: 'Ice Consort Privilege Payment', description: `Payment for ${paymentType}`, logo: 'https://via.placeholder.com/100/1a1a2e/00ffbf?text=ICP' },
            callback: function(data) {
                if (data.status === 'successful' || data.status === 'completed') {
                    // Clear sessionStorage on successful payment
                    sessionStorage.removeItem('pendingPaymentDetails');
                    window.location.href = `icp.html?payment=success&type=${paymentType}&ref=${data.transaction_id || data.flw_ref}&details=${btoa(JSON.stringify(pendingPaymentDetails))}`;
                } else {
                    // Clear sessionStorage on failed payment
                    sessionStorage.removeItem('pendingPaymentDetails');
                    alert('Payment not completed or failed.');
                    window.location.href = 'icp.html?payment=failed';
                }
            },
            onclose: function() {
                // Clear sessionStorage if the payment window is closed
                sessionStorage.removeItem('pendingPaymentDetails');
                alert('Payment window closed.');
                window.location.href = 'icp.html?payment=closed';
            },
        });
    }

    // --- Initialization on Payment Page Load ---
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');

    let paymentDetails = null;

    // First, try to load details from sessionStorage (if the user is returning)
    const storedData = sessionStorage.getItem('pendingPaymentDetails');
    if (storedData) {
        try {
            paymentDetails = JSON.parse(storedData);
        } catch (e) {
            console.error('Failed to parse stored payment details:', e);
            sessionStorage.removeItem('pendingPaymentDetails'); // Clear corrupted data
        }
    } else if (encodedData) {
        // If no stored data, check the URL parameter (initial page load)
        try {
            paymentDetails = JSON.parse(atob(encodedData));
            // Save the details to sessionStorage for future reloads
            sessionStorage.setItem('pendingPaymentDetails', JSON.stringify(paymentDetails));
        } catch (e) {
            console.error('Failed to decode payment details:', e);
            alert('Invalid payment details. Redirecting to home page.');
            window.location.href = 'milaaje.org';
            return;
        }
    }

    if (!paymentDetails) {
        alert('No payment details found. Redirecting to home page.');
        window.location.href = 'milaaje.org';
        return;
    }

    // Now, proceed with the payment process using the loaded details
    showPaymentOptionsModal(paymentDetails);

});
