// payment.js

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

