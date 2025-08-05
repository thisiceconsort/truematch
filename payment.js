// payment-page.js

// IMPORTANT: Replace with your actual public keys and Formspree endpoint
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-55e5d0e754e7da9baacac6e2cb4e04ac-X';
const PAYSTACK_PUBLIC_KEY = 'pk_live_6b671064b6a716c1ceffe82bf20a28c317a69584';
const FORMSPREE_SINGLE_ENDPOINT_ID = 'xovdrlby';
const EXCHANGERATE_API_KEY = 'd852fe1a5c2d4ef9a40400ed'; // Should be on a backend for production
const DEFAULT_AMOUNT_NGN = 1500; // Registration/Renewal base price
const WHATSAPP_NUMBER = '2348027350284'; // without the '+'

// Currency Symbols for display
const currencySymbols = {
    NGN: '₦',
    GHS: '₵',
    KES: 'KSh',
    ZAR: 'R',
    UGX: 'USh',
    TZS: 'TSh',
    RWF: 'RF',
    XOF: 'CFA', // West African CFA franc
    XAF: 'FCFA', // Central African CFA franc
    USD: '$'
};

// Flutterwave Country-Channel Mapping for direct payment routing
const FLUTTERWAVE_COUNTRIES_MAP = {
    'NG': { currency: 'NGN', channels: ['card', 'banktransfer', 'ussd', 'qr'] },
    'GH': { currency: 'GHS', channels: ['mobilemoneyghana'] },
    'KE': { currency: 'KES', channels: ['mpesa'] },
    'UG': { currency: 'UGX', channels: ['mobilemoneyuganda'] },
    'TZ': { currency: 'TZS', channels: ['mobilemoneytzpesa'] },
    'ZM': { currency: 'ZMW', channels: ['mobilemoneyzambia'] },
    'RW': { currency: 'RWF', channels: ['mobilemoneyrwanda'] },
    'ZA': { currency: 'ZAR', channels: ['card', 'eft'] },
    'CI': { currency: 'XOF', channels: ['mobilemoneyfranco'] },
    'SN': { currency: 'XOF', channels: ['mobilemoneyfranco'] },
    'CM': { currency: 'XAF', channels: ['mobilemoneyfranco'] },
    'BF': { currency: 'XOF', channels: ['mobilemoneyfranco'] },
    'TG': { currency: 'XOF', channels: ['mobilemoneyfranco'] },
    'BJ': { currency: 'XOF', channels: ['mobilemoneyfranco'] },
    'GA': { currency: 'XAF', channels: ['mobilemoneyfranco'] },
    'GQ': { currency: 'XAF', channels: ['mobilemoneyfranco'] },
    'AO': { currency: 'AOA', channels: ['card'] },
    'MZ': { currency: 'MZN', channels: ['card'] },
    'GM': { currency: 'GMD', channels: ['card'] },
    'SL': { currency: 'SLL', channels: ['card'] },
    'ET': { currency: 'ETB', channels: ['card'] },
    // A fallback for countries not explicitly listed
    'default': { currency: 'USD', channels: ['card', 'banktransfer', 'ussd', 'qr', 'mobilemoney'] }
};

// --- DOM Elements ---
const loadingMessage = document.getElementById('loadingMessage');
const paymentContent = document.getElementById('paymentContent');
const errorState = document.getElementById('errorState');
const summaryMessage = document.getElementById('summaryMessage');
const userNameEl = document.getElementById('userName');
const userEmailEl = document.getElementById('userEmail');
const userCountryEl = document.getElementById('userCountry');
const paymentForEl = document.getElementById('paymentFor');
const paymentAmountEl = document.getElementById('paymentAmount');
const paymentButtonsContainer = document.getElementById('paymentButtonsContainer');
const whatsappLink = document.getElementById('whatsappLink');

// --- Global Data Store ---
let paymentDetails = {};

// --- Utility Functions ---
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    for (const [key, value] of params.entries()) {
        data[key] = value;
    }
    return data;
}

function currencySymbol(code) {
    return currencySymbols[code] || code;
}

async function getConvertedAmount(amountInNGN, targetCurrencyCode) {
    if (targetCurrencyCode === 'NGN') return amountInNGN;

    const apiUrl = `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/NGN`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API error! Status: ${response.status}`);
        const data = await response.json();
        if (data.result !== 'success' || !data.conversion_rates[targetCurrencyCode]) {
            throw new Error('Invalid API response or currency not supported.');
        }
        const rate = data.conversion_rates[targetCurrencyCode];
        return Math.round(amountInNGN * rate);
    } catch (error) {
        console.error('Currency conversion failed:', error);
        alert(`Failed to convert currency. Proceeding with NGN payment. Error: ${error.message}`);
        return amountInNGN;
    }
}

function displayPaymentError() {
    loadingMessage.classList.add('hidden');
    errorState.classList.remove('hidden');
    console.error('Invalid URL parameters.');
}

// --- Payment Handlers ---
async function initiateFlutterwavePayment() {
    if (typeof FlutterwaveCheckout === 'undefined') {
        alert('Flutterwave SDK not loaded. Please check your internet connection.');
        return;
    }

    const countryCode = paymentDetails.country || 'NG';
    const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[countryCode.toUpperCase()] || FLUTTERWAVE_COUNTRIES_MAP['default'];
    const targetCurrencyCode = countryInfo.currency;

    const convertedAmount = await getConvertedAmount(paymentDetails.amount, targetCurrencyCode);

    FlutterwaveCheckout({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: `FLW_${paymentDetails.type}_${Date.now()}`,
        amount: convertedAmount,
        currency: targetCurrencyCode,
        country: countryCode,
        payment_options: countryInfo.channels.join(','),
        customer: {
            email: paymentDetails.email,
            phone_number: paymentDetails.phone,
            name: paymentDetails.name,
        },
        meta: {
            ...paymentDetails
        },
        customizations: {
            title: 'Ice Consort Privilege Payment',
            description: `Payment for ${paymentDetails.paymentFor}`,
            logo: 'https://i.imgur.com/ba9qC0y.jpeg',
        },
        callback: (data) => handlePaymentSuccess(data, 'Flutterwave'),
        onclose: () => {
            alert('Payment window closed. Please try again if payment was not completed.');
        },
    });
}

function initiatePaystackPayment() {
    if (typeof PaystackPop === 'undefined') {
        alert('Paystack SDK not loaded. Please check your internet connection.');
        return;
    }

    const paystackAmount = paymentDetails.amount * 100;

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: paymentDetails.email,
        amount: paystackAmount,
        ref: `PSTK_${paymentDetails.type}_${Date.now()}`,
        currency: 'NGN',
        metadata: {
            ...paymentDetails
        },
        callback: (response) => handlePaymentSuccess(response, 'Paystack'),
        onClose: () => {
            alert('Payment window closed. Please try again if payment was not completed.');
        }
    });
    handler.openIframe();
}

async function handlePaymentSuccess(response, gateway) {
    if (response.status === 'success' || response.status === 'successful') {
        const successData = {
            _form_type: `Payment Success - ${paymentDetails.type}`,
            paymentGateway: gateway,
            ...paymentDetails,
            transactionReference: response.reference || response.transaction_id,
            timestamp: new Date().toISOString()
        };

        try {
            await sendDataToFormspree(FORMSPREE_SINGLE_ENDPOINT_ID, successData);
        } catch (e) {
            console.error('Failed to send success data to Formspree:', e);
        }

        // Redirect back to the main page with success parameters
        const redirectUrl = new URL(window.location.origin);
        redirectUrl.searchParams.append('payment_status', 'success');
        redirectUrl.searchParams.append('payment_type', paymentDetails.type);
        redirectUrl.searchParams.append('transaction_id', successData.transactionReference);
        
        window.location.href = redirectUrl.toString();
    } else {
        alert('Payment failed. Please try again.');
    }
}

async function sendDataToFormspree(endpointId, data) {
    const response = await fetch(`https://formspree.io/f/${endpointId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Formspree error: ${response.status} - ${errorText}`);
    }
}

// --- Main Initialization Function ---
async function initPaymentPage() {
    const params = getUrlParams();
    
    // Validate required parameters
    if (!params.name || !params.email || !params.country || !params.type) {
        displayPaymentError();
        return;
    }
    
    paymentDetails = {
        name: decodeURIComponent(params.name),
        email: decodeURIComponent(params.email),
        phone: decodeURIComponent(params.phone),
        country: decodeURIComponent(params.country),
        type: decodeURIComponent(params.type),
        amount: params.amount ? parseFloat(params.amount) : DEFAULT_AMOUNT_NGN,
        handle: decodeURIComponent(params.handle) || null,
        accessCode: decodeURIComponent(params.accessCode) || null,
        referralHandle: decodeURIComponent(params.referralHandle) || null,
        paymentFor: ''
    };

    switch (paymentDetails.type) {
        case 'registration':
            paymentDetails.paymentFor = 'New User Registration';
            summaryMessage.textContent = 'Please confirm the details and choose your preferred payment method.';
            break;
        case 'renewal':
            paymentDetails.paymentFor = 'Subscription Renewal';
            summaryMessage.textContent = 'Please confirm the renewal details and choose your preferred payment method.';
            break;
        case 'deposit':
            paymentDetails.paymentFor = 'Account Deposit';
            summaryMessage.textContent = 'Please confirm the deposit details and choose your preferred payment method.';
            break;
        case 'video':
            paymentDetails.paymentFor = 'Exclusive Video Unlock';
            summaryMessage.textContent = 'Please confirm the video unlock details and choose your preferred payment method.';
            break;
        default:
            paymentDetails.paymentFor = 'General Payment';
            summaryMessage.textContent = 'Please confirm the details and choose your preferred payment method.';
    }

    // Display the details
    userNameEl.textContent = paymentDetails.name;
    userEmailEl.textContent = paymentDetails.email;
    userCountryEl.textContent = paymentDetails.country;
    paymentForEl.textContent = paymentDetails.paymentFor;

    // Set WhatsApp link
    const whatsappMessage = `Hello Iceconsort, I am having trouble with payment for ${paymentDetails.paymentFor}. My name is ${paymentDetails.name} and my handle is ${paymentDetails.handle || 'N/A'}. Can you please assist me?`;
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // Show content, hide loader
    loadingMessage.classList.add('hidden');
    paymentContent.classList.remove('hidden');

    // Dynamic button rendering based on country
    await renderPaymentButtons();
}

async function renderPaymentButtons() {
    const countryCode = paymentDetails.country.toUpperCase();
    const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[countryCode] || FLUTTERWAVE_COUNTRIES_MAP['default'];
    const targetCurrencyCode = countryInfo.currency;
    const convertedAmount = await getConvertedAmount(paymentDetails.amount, targetCurrencyCode);

    paymentAmountEl.textContent = `${currencySymbol(targetCurrencyCode)}${convertedAmount.toLocaleString()}`;

    // Clear existing buttons
    paymentButtonsContainer.innerHTML = '';

    // Create Flutterwave button
    const flutterwaveBtn = document.createElement('button');
    flutterwaveBtn.id = 'flutterwaveBtn';
    flutterwaveBtn.className = 'payment-button';
    flutterwaveBtn.innerHTML = `
        <img src="https://i.imgur.com/ElPGTna.jpeg" alt="Flutterwave Logo"> Pay with Flutterwave
    `;
    paymentButtonsContainer.appendChild(flutterwaveBtn);
    flutterwaveBtn.addEventListener('click', initiateFlutterwavePayment);

    // Create Paystack button (only for NGN)
    if (countryInfo.currency === 'NGN') {
        const paystackBtn = document.createElement('button');
        paystackBtn.id = 'paystackBtn';
        paystackBtn.className = 'payment-button';
        paystackBtn.innerHTML = `
            <img src="https://i.imgur.com/Us974zg.jpeg" alt="Paystack Logo"> Pay with Paystack
        `;
        paymentButtonsContainer.appendChild(paystackBtn);
        paystackBtn.addEventListener('click', initiatePaystackPayment);
    }
}

// Start the process
document.addEventListener('DOMContentLoaded', initPaymentPage);
