// --- Currency Conversion Logic ---
// REMOVE the static exchangeRates object, as we will now fetch live rates.
// const exchangeRates = { ... };

const currencySymbols = {
    NGN: '₦',
    GHS: '₵',
    KES: 'KSh',
    ZAR: 'R',
    TZS: 'TSh',
    UGX: 'USh',
    ZMW: 'ZK',
    RWF: 'FRw',
    XAF: 'CFA',
    XOF: 'CFA',
    GMD: 'D',
    LRD: '$',
    SLL: 'Le'
};

function currencySymbol(code) {
    return currencySymbols[code] || code;
}

// --- NEW: API Key for ExchangeRate-API.com ---
// IMPORTANT: In a production environment, this API key should be handled on your backend
// to prevent exposure and misuse. For this client-side demonstration, it's placed here.
const EXCHANGERATE_API_KEY = 'd852fe1a5c2d4ef9a40400ed'; // <<< REPLACE WITH YOUR ACTUAL KEY

/**
 * Fetches the live exchange rate from NGN to a target currency and converts the amount.
 * @param {number} amountInNGN - The base amount in Nigerian Naira (NGN).
 * @param {string} targetCurrencyCode - The 3-letter ISO code of the target currency (e.g., 'ZAR', 'GHS').
 * @returns {Promise<number>} - A promise that resolves with the converted amount, or the original NGN amount if conversion fails.
 */
async function getConvertedAmount(amountInNGN, targetCurrencyCode) {
    if (targetCurrencyCode === 'NGN') {
        return amountInNGN; // No conversion needed if target is NGN
    }

    try {
        const apiUrl = `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/NGN`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API fetch error: ${response.status} - ${errorText}`);
            throw new Error('Failed to fetch exchange rates from API.');
        }

        const data = await response.json();

        if (data.result === 'success' && data.conversion_rates && data.conversion_rates[targetCurrencyCode]) {
            const rateNGNToTarget = data.conversion_rates[targetCurrencyCode];
            const convertedValue = amountInNGN * rateNGNToTarget;
            return Math.round(convertedValue); // Round to nearest whole number for display/payment
        } else {
            console.error('API response format error or target currency not found:', data);
            throw new Error('Invalid API response or currency not supported by API.');
        }

    } catch (error) {
        console.error('Error during currency conversion:', error);
        alert(`Failed to get live exchange rates for ${targetCurrencyCode}. Payment will proceed in NGN.`);
        return amountInNGN; // Fallback to original NGN amount on error
    }
}
// --- End Currency Conversion ---

// --- Formspree Integration ---
// IMPORTANT: Replace 'YOUR_FORMSPREE_ENDPOINT_ID_HERE' with your actual Formspree form ID
const FORMSPREE_SINGLE_ENDPOINT_ID = 'YOUR_FORMSPREE_ENDPOINT_ID_HERE'; 

async function sendDataToFormspree(formspreeId, data) {
    try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log(`Data successfully sent to Formspree for ID ${formspreeId}.`);
        } else {
            const errorText = await response.text();
            console.error(`Failed to send data to Formspree for ID ${formspreeId}: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error(`Network error sending data to Formspree for ID ${formspreeId}:`, error);
    }
}
// --- End Formspree Integration ---


// Global variables
let videosPerPage = 6;
let currentVideoIndex = 0;
let pendingPaymentDetails = null; // To hold details for a payment that needs to go through gateway selection


// Utility function to toggle password visibility
function togglePasswordVisibility(id, iconElement) {
    const input = document.getElementById(id);
    if (input.type === 'password') {
        input.type = 'text';
        iconElement.innerHTML = '<i class="fa fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        iconElement.innerHTML = '<i class="fa fa-eye"></i>';
    }
}

// --- Modals General Control ---
function showAccessCodeModal(message = '') {
    document.getElementById('accessCodeModal').style.display = 'flex';
    document.getElementById('accessMessage').textContent = message;
    document.getElementById('accessMessage').classList.add('error');
    document.getElementById('accessCode').classList.remove('invalid');
}

function hideAccessCodeModal() {
    document.getElementById('accessCodeModal').style.display = 'none';
}

function showRegistrationModal(message = '', isError = false) {
    document.getElementById('registrationModal').style.display = 'flex';
    const msgElem = document.getElementById('registrationMessage');
    msgElem.textContent = message;
    msgElem.className = 'message ' + (isError ? 'error' : '');
    // Pre-fill email and phone if user is logged in (though typically registration implies new user)
    if (currentUserData) {
        document.getElementById('regEmail').value = currentUserData.email || '';
        document.getElementById('regPhone').value = currentUserData.phone || '';
        document.getElementById('regCountry').value = currentUserData.country || '';
        document.getElementById('regName').value = currentUserData.name || '';
    }
}

function hideRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'none';
    document.getElementById('registrationForm').reset();
    document.getElementById('registrationMessage').textContent = '';
    document.querySelectorAll('#registrationForm .invalid').forEach(el => el.classList.remove('invalid'));
}

function showPaymentOptionsModal(paymentType, amount) {
    document.getElementById('paymentOptionsTitle').textContent = `Choose Payment Method for ${paymentType === 'registration' ? 'Membership' : paymentType === 'video' ? 'Video Unlock' : paymentType === 'matchmaker' ? 'Bio Submission' : 'Subscription Renewal'}`;
    document.getElementById('paymentAmount').textContent = `${amount.toLocaleString()} NGN`; // Still showing NGN here as base
    document.getElementById('paymentOptionsModal').style.display = 'flex';

    // Set up listeners for payment buttons based on the current context
    const payWithPaystackBtn = document.getElementById('payWithPaystackBtn');
    const payWithFlutterwaveMMBtn = document.getElementById('payWithFlutterwaveMMBtn');

    // Remove previous listeners to prevent duplicates
    payWithPaystackBtn.replaceWith(payWithPaystackBtn.cloneNode(true));
    payWithFlutterwaveMMBtn.replaceWith(payWithFlutterwaveMMBtn.cloneNode(true));

    const newPaystackBtn = document.getElementById('payWithPaystackBtn');
    const newFlutterwaveMMBtn = document.getElementById('payWithFlutterwaveMMBtn');

    newPaystackBtn.onclick = () => {
        hidePaymentOptionsModal();
        handlePaystackPayment(
            pendingPaymentDetails.amount, // Paystack always takes NGN amount and handles its own conversion if international card
            pendingPaymentDetails.email,
            pendingPaymentDetails.name,
            pendingPaymentDetails.phone,
            pendingPaymentDetails.country,
            pendingPaymentDetails.type
        );
    };

    newFlutterwaveMMBtn.onclick = async () => { // Make this async to await conversion
        hidePaymentOptionsModal();
        const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[pendingPaymentDetails.country];
        const targetCurrencyCode = countryInfo?.currency || 'NGN'; // Default to NGN

        const convertedAmount = await getConvertedAmount(pendingPaymentDetails.amount, targetCurrencyCode);

        handleFlutterwavePayment(
            convertedAmount, // Pass the converted amount
            pendingPaymentDetails.email,
            pendingPaymentDetails.phone,
            pendingPaymentDetails.name,
            pendingPaymentDetails.country,
            pendingPaymentDetails.type,
            targetCurrencyCode // Pass target currency code
        );
    };
}

function hidePaymentOptionsModal() {
    document.getElementById('paymentOptionsModal').style.display = 'none';
}

function showExpiredSubscriptionModal() {
    document.getElementById('expiredSubscriptionModal').style.display = 'flex';
    document.getElementById('accessCodeModal').style.display = 'none'; // Ensure access code modal is hidden
}

function hideExpiredSubscriptionModal() {
    document.getElementById('expiredSubscriptionModal').style.display = 'none';
}

function showBuyVideoModal(video) {
    const buyVideoModal = document.getElementById('buyVideoModal');
    // Display NGN price to the user, conversion happens at payment initiation
    document.getElementById('buyVideoPrice').textContent = video.price.toLocaleString() + ' NGN'; 
    buyVideoModal.style.display = 'flex';
    buyVideoModal.dataset.videoId = video.id; // Store video ID for payment
    buyVideoModal.dataset.videoPrice = video.price; // Store price for payment (in NGN)
}

function hideBuyVideoModal() {
    document.getElementById('buyVideoModal').style.display = 'none';
}

function showSellVideoModal() {
    document.getElementById('sellVideoModal').style.display = 'flex';
}

function hideSellVideoModal() {
    document.getElementById('sellVideoModal').style.display = 'none';
}

function showTermsModal() {
    document.getElementById('termsModal').style.display = 'flex';
}

function hideTermsModal() {
    document.getElementById('termsModal').style.display = 'none';
}


// --- User Profile Display ---
function updateUserProfileDisplay() {
    if (currentUserData) {
        document.getElementById('displayUserName').textContent = currentUserData.name || 'Member';
        document.getElementById('displayUserCountry').textContent = currentUserData.country || 'N/A';
        document.getElementById('displayUserEmail').textContent = currentUserData.email || 'N/A';
        document.getElementById('displayUserPhone').textContent = currentUserData.phone || 'N/A';
    }
}

// --- Country Dropdown Population ---
function populateCountries() {
    const regCountrySelect = document.getElementById('regCountry');
    const matchCountrySelect = document.getElementById('matchCountry');

    // Clear existing options
    regCountrySelect.innerHTML = '<option value="">Select your country</option>';
    matchCountrySelect.innerHTML = '<option value="">Select your country</option>';

    // Get countries from the Flutterwave map for consistent options
    const countries = Object.keys(FLUTTERWAVE_COUNTRIES_MAP).sort();

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        regCountrySelect.appendChild(option.cloneNode(true));
        matchCountrySelect.appendChild(option);
    });
}


// --- Registration Logic ---
function validateRegistrationForm() {
    const form = document.getElementById('registrationForm');
    let isValid = true;
    const regMessage = document.getElementById('registrationMessage');
    regMessage.textContent = '';
    regMessage.classList.remove('error', 'success');

    const regName = document.getElementById('regName');
    const regEmail = document.getElementById('regEmail');
    const regPhone = document.getElementById('regPhone');
    const regCountry = document.getElementById('regCountry');
    const regAge = document.getElementById('regAge');
    const regPassword = document.getElementById('regPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    // Clear previous invalid states
    [regName, regEmail, regPhone, regCountry, regAge, regPassword, confirmPassword].forEach(input => input.classList.remove('invalid'));

    if (!regName.value.trim()) { regName.classList.add('invalid'); isValid = false; }
    if (!/\S+@\S+\.\S+/.test(regEmail.value)) { regEmail.classList.add('invalid'); isValid = false; }
    if (!regPhone.value.trim()) { regPhone.classList.add('invalid'); isValid = false; }
    if (!regCountry.value) { regCountry.classList.add('invalid'); isValid = false; }
    if (regAge.value !== 'yes') { regAge.classList.add('invalid'); isValid = false; regMessage.textContent = 'You must be 18 or older to register.'; regMessage.classList.add('error'); return false; }

    const passwordRegex = /^\d{4}[A-Za-z]{3}$/; // 4 digits, 3 letters
    if (!passwordRegex.test(regPassword.value)) {
        regPassword.classList.add('invalid');
        isValid = false;
        regMessage.textContent = 'Access code must be 4 digits followed by 3 letters (e.g., 1234ABC).';
        regMessage.classList.add('error');
    } else if (regPassword.value !== confirmPassword.value) {
        confirmPassword.classList.add('invalid');
        isValid = false;
        regMessage.textContent = 'Access codes do not match.';
        regMessage.classList.add('error');
    }

    // Check if access code already exists
    if (isValid) {
        const existingUser = simulatedUserDatabase.find(u => u.accessCode === regPassword.value.toUpperCase());
        if (existingUser) {
            regPassword.classList.add('invalid');
            regMessage.textContent = 'This access code is already taken. Please choose another.';
            regMessage.classList.add('error');
            isValid = false;
        }
    }

    return isValid;
}

async function initiateRegistrationPayment() { // Make this async
    if (!validateRegistrationForm()) {
        return;
    }

    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const country = document.getElementById('regCountry').value;
    const accessCode = document.getElementById('regPassword').value.toUpperCase();
    const amountInNGN = REGISTRATION_PAYMENT_NGN; // Base amount in NGN

    pendingPaymentDetails = {
        type: 'registration',
        name: name,
        email: email,
        phone: phone,
        country: country,
        accessCode: accessCode,
        amount: amountInNGN // Store base NGN amount
    };

    hideRegistrationModal();

    const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[country];
    const countryCode = countryInfo ? countryInfo.code : null;
    const targetCurrencyCode = countryInfo?.currency || 'NGN'; // Determine target currency

    // Perform conversion for Flutterwave payments if not NGN or if specific channels are needed
    if (countryCode === "NG" || countryCode === "ZA") {
        // For NG and ZA, offer options, conversion happens when Flutterwave is selected
        showPaymentOptionsModal('registration', amountInNGN);
    } else if (
        countryInfo && (
            countryInfo.channels.includes('mobilemoneyfranco') ||
            countryInfo.channels.includes('mobilemoney') ||
            countryInfo.channels.includes('mpesa') ||
            countryInfo.channels.includes('mobilemoneyghana') ||
            countryInfo.channels.includes('mobilemoneyuganda') ||
            countryInfo.channels.includes('mobilemoneyzambia') ||
            countryInfo.channels.includes('mobilemoneyrwanda') ||
            countryInfo.channels.includes('mobilemoneytanzania') ||
            countryInfo.channels.includes('eft') ||
            countryInfo.channels.includes('ussd')
        )
    ) {
        // For other African countries with specific Flutterwave channels, directly go to Flutterwave
        const convertedAmount = await getConvertedAmount(amountInNGN, targetCurrencyCode);
        handleFlutterwavePayment(convertedAmount, email, phone, name, country, 'registration', targetCurrencyCode);
    } else {
        // Default to Paystack for other cases or if Flutterwave channels aren't specifically listed
        // Paystack usually handles its own FX for international cards, so we pass the NGN amount.
        handlePaystackPayment(amountInNGN, email, name, phone, country, 'registration');
    }
}

// --- Payment Handlers ---
function handlePaystackPayment(amount, email, name, phone, country, paymentType) {
    const paystackAmount = amount * 100; // Paystack amount is in kobo (cents)
    // Paystack generally accepts NGN for local and international cards and handles the FX.
    // The 'currency' field here indicates the currency you are charging IN (which is NGN from your setup).
    const chargeCurrency = 'NGN'; // Always charge in NGN for Paystack as per your constants

    let reference = `ref_${Date.now()}`;
    if (paymentType === 'registration') {
        reference = `reg_${pendingPaymentDetails.accessCode}_${Date.now()}`;
    } else if (paymentType === 'video') {
        reference = `vid_${pendingPaymentDetails.videoId}_${Date.now()}`;
    } else if (paymentType === 'matchmaker') {
        reference = `match_${pendingPaymentDetails.email.split('@')[0]}_${Date.now()}`;
    } else if (paymentType === 'renewal') {
        reference = `renewal_${currentUserData.accessCode}_${Date.now()}`;
    }

    // ADDED: Store payment gateway for Formspree
    if (pendingPaymentDetails) {
        pendingPaymentDetails.paymentGatewayUsed = 'Paystack';
    }

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: paystackAmount,
        ref: reference,
        currency: chargeCurrency, // Always NGN for Paystack
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: name
                },
                {
                    display_name: "Customer Phone",
                    variable_name: "customer_phone",
                    value: phone
                },
                {
                    display_name: "Payment Type",
                    variable_name: "payment_type",
                    value: paymentType
                },
                {
                    display_name: "Country",
                    variable_name: "country",
                    value: country
                },
                {
                    display_name: "Access Code (if applicable)",
                    variable_name: "access_code",
                    value: paymentType === 'registration' || paymentType === 'renewal' ? (pendingPaymentDetails.accessCode || currentUserData.accessCode) : 'N/A'
                },
                {
                    display_name: "Video ID (if applicable)",
                    variable_name: "video_id",
                    value: paymentType === 'video' ? pendingPaymentDetails.videoId : 'N/A'
                }
            ]
        },
        callback: function(response) {
            // response.reference is the transaction reference
            console.log('Paystack callback:', response);
            if (response.status === 'success') {
                handlePaymentSuccess(paymentType, response.reference);
            } else {
                alert('Payment not completed. Please try again or contact support.');
                console.error('Paystack Payment failed or cancelled:', response);
            }
        },
        onClose: function() {
            alert('Payment window closed.');
        }
    });
    handler.openIframe();
}

// Added targetCurrencyCode parameter to handleFlutterwavePayment
function handleFlutterwavePayment(amount, email, phone, name, country, paymentType, targetCurrencyCode = 'NGN') {
    const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[country];
    if (!countryInfo) {
        alert('Flutterwave payment not supported for your country yet. Please try another method if available.');
        return;
    }

    let reference = `ref_${Date.now()}`;
    if (paymentType === 'registration') {
        reference = `reg_fw_${pendingPaymentDetails.accessCode}_${Date.now()}`;
    } else if (paymentType === 'video') {
        reference = `vid_fw_${pendingPaymentDetails.videoId}_${Date.now()}`;
    } else if (paymentType === 'matchmaker') {
        reference = `match_fw_${pendingPaymentDetails.email.split('@')[0]}_${Date.now()}`;
    } else if (paymentType === 'renewal') {
        reference = `renewal_fw_${currentUserData.accessCode}_${Date.now()}`;
    }

    // Determine channels based on country, prioritize mobile money if applicable
    let channelsToUse = countryInfo.channels;
    if (paymentType === 'renewal' || paymentType === 'registration' || paymentType === 'matchmaker') {
        // For membership/matchmaker/renewal, allow all channels
        // This logic can be refined further if certain payment types ONLY allow specific channels
    }

    // ADDED: Store payment gateway for Formspree
    if (pendingPaymentDetails) {
        pendingPaymentDetails.paymentGatewayUsed = 'Flutterwave';
    }

    // --- START: NEW ADDITIONS/CHANGES FOR FLUTTERWAVE METADATA ---
    let accessCodeForMeta = 'N/A';
    if (paymentType === 'registration' && pendingPaymentDetails && pendingPaymentDetails.accessCode) {
        accessCodeForMeta = pendingPaymentDetails.accessCode;
    } else if (paymentType === 'renewal' && currentUserData && currentUserData.accessCode) {
        accessCodeForMeta = currentUserData.accessCode;
    }

    let videoIdForMeta = 'N/A';
    if (paymentType === 'video' && pendingPaymentDetails && pendingPaymentDetails.videoId) {
        videoIdForMeta = pendingPaymentDetails.videoId;
    }
    // --- END: NEW ADDITIONS/CHANGES FOR FLUTTERWAVE METADATA ---

    FlutterwaveCheckout({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: reference,
        amount: amount, // THIS IS THE CONVERTED AMOUNT IN THE TARGET CURRENCY
        currency: targetCurrencyCode, // THIS IS THE TARGET CURRENCY CODE
        country: countryInfo.code,
        payment_options: channelsToUse.join(','), // Comma separated string
        customer: {
            email: email,
            phone_number: phone,
            name: name,
        },
        // --- START: NEW ADDED 'meta' OBJECT ---
        meta: {
            payment_type: paymentType,
            customer_country: country,
            access_code: accessCodeForMeta,
            video_id: videoIdForMeta,
            // You can add more custom fields here if needed
        },
        // --- END: NEW ADDED 'meta' OBJECT ---
        customizations: {
            title: "ICE Consort Privilege",
            description: `Payment for ${paymentType === 'registration' ? 'Membership' : paymentType === 'video' ? 'Video Unlock' : paymentType === 'matchmaker' ? 'Bio Submission' : 'Subscription Renewal'}`,
            logo: "https://your-logo-url.com/logo.png", // Replace with your actual logo
        },
        callback: function(data) { // payment_callback
            console.log('Flutterwave callback:', data);
            if (data.status === 'successful' || data.status === 'completed') {
                handlePaymentSuccess(paymentType, data.transaction_id || data.flw_ref);
            } else {
                alert('Payment not completed. Please try again or contact support.');
                console.error('Flutterwave Payment failed or cancelled:', data);
            }
        },
        onclose: function() {
            alert('Payment window closed.');
        },
    });
}


function handlePaymentSuccess(paymentType, transactionReference) {
    const regMessage = document.getElementById('registrationMessage'); // For registration modal
    console.log(`Payment successful for type: ${paymentType}, Ref: ${transactionReference}`);

    let formspreeData = {};
    let formspreeSent = false; // Flag to ensure data is prepared for Formspree

    if (paymentType === 'registration') {
        const newUser = registerNewUser(
            pendingPaymentDetails.name,
            pendingPaymentDetails.email,
            pendingPaymentDetails.phone,
            pendingPaymentDetails.country,
            pendingPaymentDetails.accessCode
        );
        
        localStorage.setItem('activeAccessCodeSession', pendingPaymentDetails.accessCode); // Set first
        currentUserData = newUser; // Use newUser, not just 'user'
        localStorage.setItem('currentUserData', JSON.stringify(currentUserData));

        hideRegistrationModal();
        hidePaymentOptionsModal();
        document.getElementById('mainContent').style.display = 'flex';
        document.getElementById('logoutIcon').style.display = 'flex';
        updateUserProfileDisplay();
        renderVideos(0, videosPerPage, videosData);
        updateLoadMoreButtonVisibility();
        alert('Registration successful! Welcome to ICE Consort Privilege.');

        // Prepare data for Formspree
        formspreeData = {
            _form_type: 'Registration', // Added this field to differentiate submissions
            fullName: pendingPaymentDetails.name,
            email: pendingPaymentDetails.email,
            phone: pendingPaymentDetails.phone,
            country: pendingPaymentDetails.country,
            accessCode: pendingPaymentDetails.accessCode,
            paymentGateway: pendingPaymentDetails.paymentGatewayUsed,
            transactionReference: transactionReference,
            timestamp: new Date().toISOString()
        };
        formspreeSent = true;

    } else if (paymentType === 'video') {
        if (currentUserData && pendingPaymentDetails.videoId) {
            unlockVideo(pendingPaymentDetails.videoId); // This updates currentUserData and localStorage
        } else {
            alert('Error: Could not unlock video. User data or video ID missing.');
        }

        // Prepare data for Formspree
        formspreeData = {
            _form_type: 'VideoUnlock', // Added this field
            email: currentUserData.email,
            accessCode: currentUserData.accessCode,
            videoId: pendingPaymentDetails.videoId,
            videoTitle: videosData.find(v => v.id === pendingPaymentDetails.videoId)?.title || 'Unknown Video',
            paymentGateway: pendingPaymentDetails.paymentGatewayUsed,
            transactionReference: transactionReference,
            timestamp: new Date().toISOString()
        };
        formspreeSent = true;

    } else if (paymentType === 'matchmaker') {
        // Assume pendingPaymentDetails holds the form data submitted for matchmaker
        simulateMatchmakerSuccess(
            pendingPaymentDetails.realName,
            pendingPaymentDetails.age,
            pendingPaymentDetails.role,
            pendingPaymentDetails.country,
            pendingPaymentDetails.city,
            pendingPaymentDetails.phone,
            pendingPaymentDetails.email
        );
        hideMatchmakerModal(); // Hide the matchmaker form modal
        hidePaymentOptionsModal(); // Hide payment options if shown

        // Prepare data for Formspree (assuming you have a matchmaker form data in pendingPaymentDetails)
        formspreeData = {
            _form_type: 'MatchmakerBioSubmission', // Added this field
            realName: pendingPaymentDetails.realName,
            age: pendingPaymentDetails.age,
            role: pendingPaymentDetails.role,
            country: pendingPaymentDetails.country,
            city: pendingPaymentDetails.city,
            phone: pendingPaymentDetails.phone,
            email: pendingPaymentDetails.email,
            paymentGateway: pendingPaymentDetails.paymentGatewayUsed,
            transactionReference: transactionReference,
            timestamp: new Date().toISOString()
        };
        formspreeSent = true;

    } else if (paymentType === 'renewal') {
        if (currentUserData) {
            const newExpiry = new Date();
            newExpiry.setMonth(newExpiry.getMonth() + 1); // Extend by one month
            updateUserSubscription(currentUserData.accessCode, newExpiry);
            hideExpiredSubscriptionModal();
            // Re-check access (which will now be valid) and log in
            checkAccessCode();
            alert('Subscription successfully renewed for another month!');
        } else {
            alert('Error: Could not renew subscription. User data missing.');
        }

        // Prepare data for Formspree
        formspreeData = {
            _form_type: 'SubscriptionRenewal', // Added this field
            email: currentUserData.email,
            accessCode: currentUserData.accessCode,
            oldExpiry: new Date(currentUserData.subscriptionExpiry).toISOString(), // Capture old expiry for record
            newExpiry: newExpiry.toISOString(), // The new expiry date
            paymentGateway: pendingPaymentDetails.paymentGatewayUsed,
            transactionReference: transactionReference,
            timestamp: new Date().toISOString()
        };
        formspreeSent = true;
    }

    // Send data to Formspree only if it was prepared
    if (formspreeSent) {
        sendDataToFormspree(FORMSPREE_SINGLE_ENDPOINT_ID, formspreeData);
    }

    pendingPaymentDetails = null; // Clear pending payment details
}


// --- Video Grid & Playback Logic ---
function renderVideos(startIndex, count, videosArray) {
    const videoGrid = document.getElementById('videoGrid');
    const videosToDisplay = videosArray.slice(startIndex, startIndex + count);

    videosToDisplay.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail-img">
                ${video.locked ? '<i class="fas fa-lock lock-icon"></i>' : ''}
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <div class="video-meta">
                    <span class="views-count">${video.views}</span>
                    <span>ID: ${video.id}</span>
                </div>
            </div>
        `;
        videoItem.onclick = () => handleVideoClick(video);
        videoGrid.appendChild(videoItem);
    });
    currentVideoIndex = startIndex + videosToDisplay.length;
}

function loadMoreVideos() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.style.display = 'none'; // Hide button while loading
    document.querySelector('.loading-spinner').style.display = 'block'; // Show spinner (if you add one)

    setTimeout(() => { // Simulate loading time
        renderVideos(currentVideoIndex, videosPerPage, videosData);
        document.querySelector('.loading-spinner').style.display = 'none'; // Hide spinner
        updateLoadMoreButtonVisibility();
    }, 500);
}

function updateLoadMoreButtonVisibility() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const remainingVideos = videosData.length - currentVideoIndex;
    if (remainingVideos > 0) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

function handleVideoClick(video) {
    if (!currentUserData) {
        showAccessCodeModal('Please log in to view content.');
        return;
    }

    // Check subscription expiry again on video click
    const subscriptionStatus = isAccessValid();
    if (subscriptionStatus === '#expired') {
        showExpiredSubscriptionModal();
        return;
    }

    // Check if video is locked and not unlocked by current user
    const isVideoUnlocked = currentUserData.unlockedVideos.includes(video.id);

    if (video.locked && !isVideoUnlocked) {
        showBuyVideoModal(video);
    } else {
        playVideo(video);
    }
}

function playVideo(video) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPlaybackOverlay = document.getElementById('videoPlaybackOverlay');
    const playingVideoTitle = document.getElementById('playingVideoTitle');
    const playingVideoDescription = document.getElementById('playingVideoDescription');
    const playingVideoViews = document.getElementById('playingVideoViews');
    const videoUnlockDuration = document.getElementById('videoUnlockDuration');

    videoPlayer.src = video.videoUrl;
    playingVideoTitle.textContent = video.title;
    playingVideoDescription.textContent = video.description;
    playingVideoViews.textContent = video.views;

    // Display unlock duration if applicable
    if (currentUserData && currentUserData.unlockedVideos.includes(video.id)) {
        const unlockedTimestamp = currentUserData.unlockedVideosTimestamp?.[video.id];
        if (unlockedTimestamp) {
            const unlockDate = new Date(unlockedTimestamp);
            const expiryDate = new Date(unlockDate);
            expiryDate.setMonth(expiryDate.getMonth() + 1);
            const timeLeft = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            if (timeLeft > 0) {
                videoUnlockDuration.textContent = `Expires in ${timeLeft} days`;
            } else {
                videoUnlockDuration.textContent = 'Access Expired. Please re-purchase if needed.';
                // Potentially re-lock the video here if it's past due.
                // For simplicity, we'll rely on next purchase to update timestamp.
            }
        } else {
            videoUnlockDuration.textContent = ''; // No duration if not recorded
        }
    } else {
        videoUnlockDuration.textContent = ''; // Clear if video is free or not yet unlocked
    }


    videoPlaybackOverlay.style.display = 'flex';
    videoPlayer.play();
}

function closeVideoPlayer() {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause();
    videoPlayer.src = ''; // Clear video source
    document.getElementById('videoPlaybackOverlay').style.display = 'none';
}

async function initiateVideoPayment() { // Make this async
    const buyVideoModal = document.getElementById('buyVideoModal');
    const videoId = buyVideoModal.dataset.videoId;
    const videoPriceInNGN = parseFloat(buyVideoModal.dataset.videoPrice); // Base price in NGN

    if (!videoId || isNaN(videoPriceInNGN) || !currentUserData) {
        alert('Error: Video details missing or user not logged in.');
        return;
    }

    pendingPaymentDetails = {
        type: 'video',
        videoId: videoId,
        amount: videoPriceInNGN, // Store base NGN amount
        email: currentUserData.email,
        name: currentUserData.name,
        phone: currentUserData.phone,
        country: currentUserData.country
    };

    hideBuyVideoModal(); // Hide the buy video modal

    const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[currentUserData.country];
    const countryCode = countryInfo ? countryInfo.code : null;
    const targetCurrencyCode = countryInfo?.currency || 'NGN'; // Determine target currency

    if (countryCode === "NG") {
        // For NG, offer payment options. Conversion happens on Flutterwave selection.
        showPaymentOptionsModal('video', videoPriceInNGN);
    } else if (countryInfo && (countryInfo.channels.includes('mobilemoneyfranco') || countryInfo.channels.includes('mobilemoney') || countryInfo.channels.includes('mpesa'))) {
        // For other African countries with mobile money, directly go to Flutterwave
        const convertedAmount = await getConvertedAmount(videoPriceInNGN, targetCurrencyCode);
        handleFlutterwavePayment(convertedAmount, currentUserData.email, currentUserData.phone, currentUserData.name, currentUserData.country, 'video', targetCurrencyCode);
    } else {
        // Default to Paystack for other cases or if Flutterwave channels aren't specifically listed
        // Paystack usually handles its own FX for international cards, so we pass the NGN amount.
        handlePaystackPayment(videoPriceInNGN, currentUserData.email, currentUserData.name, currentUserData.phone, currentUserData.country, 'video');
    }
}

function unlockVideo(videoId) {
    if (currentUserData) {
        if (!currentUserData.unlockedVideos.includes(videoId)) {
            currentUserData.unlockedVideos.push(videoId);
            if (!currentUserData.unlockedVideosTimestamp) {
                currentUserData.unlockedVideosTimestamp = {};
            }
            currentUserData.unlockedVideosTimestamp[videoId] = new Date().toISOString(); // Store unlock timestamp
        }

        // Update the user in the simulated database
        const userIndex = simulatedUserDatabase.findIndex(user => user.accessCode === currentUserData.accessCode);
        if (userIndex !== -1) {
            simulatedUserDatabase[userIndex] = currentUserData;
            localStorage.setItem('simulatedUserDatabase', JSON.stringify(simulatedUserDatabase)); // Persist the updated database
        }
        localStorage.setItem('currentUserData', JSON.stringify(currentUserData)); // Update current user session

        alert(`Successfully unlocked "${videosData.find(v => v.id === videoId).title}" for 1 month!`);
        hideBuyVideoModal();
        currentVideoIndex = 0; // Reset index to ensure re-render from start
        document.getElementById('videoGrid').innerHTML = ''; // Clear existing videos
        renderVideos(0, videosPerPage, videosData); // Re-render initial set
        updateLoadMoreButtonVisibility(); // Update load more button
        playVideo(videosData.find(v => v.id === videoId)); // Play the video immediately
    }
}

function handleVideoSearch() {
    const searchInput = document.getElementById('videoSearchInput').value.trim();
    const searchResultsMessage = document.getElementById('searchResultsMessage');
    const videoGrid = document.getElementById('videoGrid');
    const showAllBtn = document.getElementById('showAllVideosBtn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (!searchInput) {
        searchResultsMessage.textContent = 'Please enter a video ID to search.';
        searchResultsMessage.style.display = 'block';
        showAllBtn.style.display = 'none';
        return;
    }

    const foundVideo = videosData.find(video => video.id.toLowerCase() === searchInput.toLowerCase());

    videoGrid.innerHTML = ''; // Clear current videos
    loadMoreBtn.style.display = 'none'; // Hide load more button

    if (foundVideo) {
        searchResultsMessage.textContent = `Video found: ${foundVideo.title}`;
        searchResultsMessage.classList.remove('error');
        searchResultsMessage.classList.add('success');
        searchResultsMessage.style.display = 'block';
        renderVideos(0, 1, [foundVideo]); // Render only the found video
        showAllBtn.style.display = 'block'; // Show "Show All Videos" button
    } else {
        searchResultsMessage.textContent = `No video found with ID "${searchInput}".`;
        searchResultsMessage.classList.remove('success');
        searchResultsMessage.classList.add('error');
        searchResultsMessage.style.display = 'block';
        showAllBtn.style.display = 'block'; // Still show "Show All Videos" button
    }
}

function showAllVideos() {
    document.getElementById('videoSearchInput').value = ''; // Clear search input
    document.getElementById('searchResultsMessage').style.display = 'none'; // Hide message
    document.getElementById('showAllVideosBtn').style.display = 'none'; // Hide this button
    document.getElementById('videoGrid').innerHTML = ''; // Clear grid
    currentVideoIndex = 0; // Reset index
    renderVideos(0, videosPerPage, videosData); // Render initial set
    updateLoadMoreButtonVisibility(); // Show load more button if needed
}

// --- Expired Subscription Renewal Logic ---
async function handleExpiredSubscriptionPayment() { // Make this async
    if (!currentUserData) {
        alert('Error: No active user session found for renewal.');
        return;
    }

    const amountInNGN = SUBSCRIPTION_RENEWAL_NGN; // Base amount in NGN

    pendingPaymentDetails = {
        type: 'renewal',
        amount: amountInNGN, // Store base NGN amount
        email: currentUserData.email,
        name: currentUserData.name,
        phone: currentUserData.phone,
        country: currentUserData.country,
        accessCode: currentUserData.accessCode // Essential for renewal
    };

    hideExpiredSubscriptionModal(); // Hide the renewal modal

    const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[currentUserData.country];
    const countryCode = countryInfo ? countryInfo.code : null;
    const targetCurrencyCode = countryInfo?.currency || 'NGN'; // Determine target currency

    if (countryCode === "NG") {
        // For NG, offer payment options. Conversion happens on Flutterwave selection.
        showPaymentOptionsModal('renewal', amountInNGN);
    } else if (countryInfo && (countryInfo.channels.includes('mobilemoneyfranco') || countryInfo.channels.includes('mobilemoney') || countryInfo.channels.includes('mpesa'))) {
        // For other African countries with mobile money, directly go to Flutterwave
        const convertedAmount = await getConvertedAmount(amountInNGN, targetCurrencyCode);
        handleFlutterwavePayment(convertedAmount, currentUserData.email, currentUserData.phone, currentUserData.name, currentUserData.country, 'renewal', targetCurrencyCode);
    } else {
        // Default to Paystack for other cases or if Flutterwave channels aren't specifically listed
        // Paystack usually handles its own FX for international cards, so we pass the NGN amount.
        handlePaystackPayment(amountInNGN, currentUserData.email, currentUserData.name, currentUserData.phone, currentUserData.country, 'renewal');
    }
}

// --- Initialization on Load ---
document.addEventListener('DOMContentLoaded', () => {
    populateCountries(); // Populate country dropdown for registration and matchmaker

    // Attempt to restore session
    const storedUserData = localStorage.getItem('currentUserData');
    const storedActiveSessionCode = localStorage.getItem('activeAccessCodeSession');

    if (storedUserData) {
        currentUserData = JSON.parse(storedUserData);
        activeAccessCodeSession = storedActiveSessionCode; // Restore active session marker

        const validUser = simulatedUserDatabase.find(user => user.accessCode === currentUserData.accessCode);

        // Crucial: Only show main content if access is valid AND user data exists and matches simulated DB
        // AND the stored session code matches the currently active session code (for one user per code)
        if (validUser && validUser.accessCode === activeAccessCodeSession) {
            currentUserData = validUser; // Use the stored valid user data

            const subscriptionStatus = isAccessValid();
            if (subscriptionStatus === '#expired') {
                document.getElementById('mainContent').style.display = 'none'; // Keep main content hidden
                showExpiredSubscriptionModal();
            } else if (subscriptionStatus === true) {
                document.getElementById('mainContent').style.display = 'flex';
                document.getElementById('logoutIcon').style.display = 'flex'; // Show logout icon
                updateUserProfileDisplay();
                currentVideoIndex = 0; // Reset index for fresh load
                renderVideos(0, videosPerPage, videosData); // Load initial videos
                updateLoadMoreButtonVisibility(); // Check and show load more button
                hideAccessCodeModal(); // Hide access code modal if user is logged in
            } else {
                // If isAccessValid returns false (e.g., user not found or active session mismatch)
                localStorage.removeItem('currentUserData'); // Clear invalid stored data
                localStorage.removeItem('activeAccessCodeSession'); // Clear active session marker
                currentUserData = null;
                activeAccessCodeSession = null;
                document.getElementById('mainContent').style.display = 'none'; // Ensure main content is hidden
                showAccessCodeModal('Your session expired or access code is invalid/in use. Please enter your access code to view content.');
            }
        } else {
            // If user data doesn't match/another session is active or user not in current DB (e.g., DB reset)
            localStorage.removeItem('currentUserData'); // Clear invalid stored data
            localStorage.removeItem('activeAccessCodeSession'); // Clear active session marker
            currentUserData = null;
            activeAccessCodeSession = null;
            document.getElementById('mainContent').style.display = 'none'; // Ensure main content is hidden
            showAccessCodeModal('Your session expired or access code is invalid/in use. Please enter your access code to view content.');
        }
    } else {
        // Default: If no valid session, always show access code modal
        document.getElementById('mainContent').style.display = 'none'; // Ensure main content is hidden
        showAccessCodeModal('Please enter your access code to view content.');
    }

    // Add input event listeners for real-time validation feedback for all forms
    const allFormElements = document.querySelectorAll(
        '#registrationForm input, #registrationForm select,' +
        '#matchmakerForm input, #matchmakerForm select,' +
        '#accessCodeModal input' // Also for access code input
    );
    allFormElements.forEach(input => {
        input.addEventListener('input', () => {
            // Clear invalid class on input, re-validate on form submission
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
            }
        });
    });
});
