let encoded = [
    "aXVzZXJzLmpz",
    "aXZpZGVvcy5qcw==",
    "aXByb2ZpbGVzLmpz",
];

function loadScript(index) {
    if (index >= encoded.length) {
        console.log("load");
        // This is the CRITICAL change:
        // We call the initialization function only after all scripts are loaded.
        initializePage();
        return;
    }

    const scriptName = atob(encoded[index]);

    const s = document.createElement("script");
    s.src = scriptName;
    s.onload = () => {
        console.log(`✅ Loaded: ${scriptName}`);
        loadScript(index + 1);
    };
    s.onerror = () => {
        console.error(`❌ Failed to load: ${scriptName}`);
    };

    document.head.appendChild(s);
}

loadScript(0);

let isDragging = false;
let dragStartY = 0;
let dragCurrentY = 0;
let dragThreshold = 7; // px threshold to differentiate click vs drag
// --- Configuration Constants ---
// Place these at the very top for easy access and modification
const CURRENT_SCRIPT_VERSION = "v1.0.3";  // Change this when you update the file
const SPLASH_VIDEO_DURATION_MS = 6000; // 6 seconds
const SPLASH_VIDEO_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes in milliseconds
const VIDEO_UNLOCK_DURATION_DAYS =0; // Videos unlock for 30 days
const MIN_WITHDRAWAL_USD = 1;
const WITHDRAWAL_FEE_USD = 0.50;
const REGISTRATION_PAYMENT_USD = 1;
const RENEWAL_PAYMENT_USD = 250;
const REFERRAL_BONUS_USD = 0;

// The Apps Script web app URL for the backend

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcgNIP4cbGdizn4RVlqfZkVa6Kq9777bVtAYinn1KpsXi_Q0EZRX1CsdRKvFZGxNOT/exec'; // Replace with your actual deployment URL

// https://script.google.com/macros/s/AKfycbzcgNIP4cbGdizn4RVlqfZkVa6Kq9777bVtAYinn1KpsXi_Q0EZRX1CsdRKvFZGxNOT/exec
// --- Polling Logic ---
let pollingIntervalId = null;

function startPolling() {
    if (pollingIntervalId) {
        clearInterval(pollingIntervalId);
    }

    pollingIntervalId = setInterval(async () => {
        try {
            console.log('Polling for updates...');
            // Fetch the latest data for the current user to update balances
            if (currentUserData && currentUserData.accessCode) {
                const response = await fetch(`${APPS_SCRIPT_URL}?action=getUserByAccessCode&accessCode=${currentUserData.accessCode}`);
                const data = await response.json();
                if (data.success && data.user) {
                    currentUserData = data.user;
                    updateUIForUser();
                } else {
                    console.warn('Polling failed to find user data.');
                    // Consider logging out the user if the account disappears
                }
            }

            // Optionally, poll for new videos and profiles if UI is on home screen
            // For this implementation, we will assume videos/profiles are fetched once on init
            // and only user data is polled for real-time balance updates.
        } catch (error) {
            console.error('Polling failed:', error);
            // Implement exponential backoff if needed, but for this task,
            // a simple error log is sufficient as per the prompt's minimal logic requirement.
        }
    }, 8000); // Poll every 8 seconds
}
// --- END Polling Logic ---
// --- END Version Check Logic ---

if (window.innerWidth > 430) {
    document.body.innerHTML = ""; // blank
    // or show a message:
     document.body.innerHTML = "<h1>App Is Not Yet Available On Tablets, Laptops & Tv. Make Sure You Are Using A Phone!</h1>";
  }
function closeSearchOverlayIfOpen() {
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
    }
}

function playHLS(videoElement, videoUrl) {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = videoUrl;
    } else {
        alert("Your browser does not support HLS playback.");
    }
}
// Paystack and Flutterwave Public Keys (REPLACE WITH YOUR ACTUAL KEYS)
const PAYSTACK_PUBLIC_KEY = 'pk_live_6b671064b6a716c1ceffe82bf20a28c317a69584'; // Replace with your actual LIVE key!
// Replace with your Paystack Public Key
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-55e5d0e754e7da9baacac6e2cb4e04ac-X'; // Replace with your Flutterwave Public Key

// Formspree Endpoint IDs (REPLACE WITH YOUR ACTUAL ENDPOINT IDs)
// You might want different endpoints for different form submissions
const FORMSPREE_SINGLE_ENDPOINT_ID = 'xpwjdjld'; // A single Formspree endpoint ID for all submissions

// Exchange Rate API (REPLACE WITH YOUR ACTUAL KEY)
// Note: This API key should ideally be used on a backend for security.
// For client-side demos, it's often included, but be aware of the security implications for production.
const EXCHANGERATE_API_KEY = 'd852fe1a5c2d4ef9a40400ed';

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
    XAF: 'FCFA',
    USD: '$'// Central African CFA franc
    // Add more African currencies as needed
};

// Flutterwave Country-Channel Mapping for direct payment routing
// This map helps determine which Flutterwave channels are preferred for a given country
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
    'MW': { name: 'Malawi' , currency: 'MWK' ,  channels: ['card' , 'mobilemoney'] },
    // You can add the United States, UK, and EU if you plan to support them
    'US': { name: 'United States', currency: 'USD', channels: ['card', 'account', 'googlepay', 'applepay'] },
    'GB': { name: 'United Kingdom', currency: 'GBP', channels: ['card', 'account', 'googlepay', 'applepay'] }
    // ... all other countries
};

// --- Payment Related Utility Functions ---
function currencySymbol(code) {
    // ...
}
// NEW FUNCTION: Get the currency code from the country code
function getCurrencyForCountry(countryCode) {
    const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[countryCode.toUpperCase()];
    return countryInfo ? countryInfo.currency : 'NGN'; // Default to NGN if not found
}
async function getConvertedAmount(amountInUSD, targetCurrencyCode) {
    if (targetCurrencyCode === 'USD') {
        return amountInUSD;
    }
    const apiUrl = `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/USD`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error('Failed to fetch exchange rates from API.');
        }
        const data = await response.json();

        if (data.result === 'success' && data.conversion_rates && data.conversion_rates[targetCurrencyCode]) {
            const rateUSDToTarget = data.conversion_rates[targetCurrencyCode];
            const convertedValue = amountInUSD * rateUSDToTarget;
            return Math.round(convertedValue); // Round to nearest whole number
        } else {
            console.error('Invalid API response or currency not supported by API:', data);
            throw new Error('Invalid API response or currency not supported by API.');
        }
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
        alert(`Failed to convert currency to ${targetCurrencyCode}. Proceeding with USD payment as fallback. Error: ${error.message}`);
        return amountInUSD; // Fallback to USD if conversion fails
    }
}

// --- Video Sorting Function ---
// --- Video Sorting Function ---
function sortVideosByNumericalId(videos) {
    return videos.sort((a, b) => {
        const idA = parseInt(a.VideoID.replace('vid-', ''), 10);
        const idB = parseInt(b.VideoID.replace('vid-', ''), 10);

        return idB - idA;
    });
}


// --- DOM Elements ---
const videoSplashScreen = document.getElementById('videoSplashScreen');
const splashVideo = document.getElementById('splashVideo');
const mainContent = document.getElementById('mainContent');
const lowerLayer = document.getElementById('lowerLayer');
const upperLayer = document.getElementById('upperLayer');
const upperLayerHead = document.getElementById('upperLayerHead');

const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userHandle = document.getElementById('userHandle');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const availableBalance = document.getElementById('availableBalance');
const referralBalance = document.getElementById('referralBalance');
const moreOptionsDots = document.getElementById('moreOptionsDots');

const withdrawBtn = document.getElementById('withdrawBtn');
const depositBtn = document.getElementById('depositBtn');
const referralBtn = document.getElementById('referralBtn');
const notificationBtn = document.getElementById('notificationBtn');

const forYouTag = document.getElementById('forYouTag');
const profilesTag = document.getElementById('profilesTag');
const searchIcon = document.getElementById('searchIcon');
const forYouContent = document.getElementById('forYouContent');
const profilesContent = document.getElementById('profilesContent');
const forYouVideoGrid = document.getElementById('forYouVideoGrid');
const loadMoreVideosBtn = document.getElementById('loadMoreVideosBtn');
const profileGrid = document.getElementById('profileGrid');
const loadMoreProfilesBtn = document.getElementById('loadMoreProfilesBtn');

const floatingPlusBtn = document.getElementById('floatingPlusBtn');

// Generic Modal Elements
const genericModalOverlay = document.getElementById('genericModalOverlay');
const genericModalContent = document.getElementById('genericModalContent');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalBackBtn = document.getElementById('modalBackBtn');

// More Options Modal Elements
const moreOptionsModalOverlay = document.getElementById('moreOptionsModalOverlay');
const moreOptionsBackBtn = document.getElementById('moreOptionsBackBtn');
const aboutUsBtn = document.getElementById('aboutUsBtn');
const termsBtn = document.getElementById('termsBtn');
const contactUsBtn = document.getElementById('contactUsBtn');
const authBtn = document.getElementById('authBtn'); // Log In / Log Out button

// Auth Modals Elements
const authModalOverlay = document.getElementById('authModalOverlay');
const authModalTitle = document.getElementById('authModalTitle');
const authModalBody = document.getElementById('authModalBody');
const authBackBtn = document.getElementById('authBackBtn');
const loginForm = document.getElementById('loginForm');
const accessCodeInput = document.getElementById('accessCodeInput');
const enterClubBtn = document.getElementById('enterClubBtn');
const createAccountLink = document.getElementById('createAccountLink');
const registrationFormContainer = document.getElementById('registrationForm');
const subscriptionRenewalFormContainer = document.getElementById('subscriptionRenewalForm');

// Video Playback Modal Elements
const videoPlaybackModalOverlay = document.getElementById('videoPlaybackModalOverlay');
const videoPlaybackBackBtn = document.getElementById('videoPlaybackBackBtn');
const videoPlaybackHandle = document.getElementById('videoPlaybackHandle');
const hlsVideoPlayer = document.getElementById('hlsVideoPlayer');
const videoPlaybackDetails = document.getElementById('videoPlaybackDetails');
const tipCreatorBtn = document.getElementById('tipCreatorBtn');
const moreVideosGrid = document.getElementById('moreVideosGrid');
const loadMoreRelatedVideosBtn = document.getElementById('loadMoreRelatedVideosBtn');
//
videoPlaybackBackBtn.addEventListener('click', () => {
    videoPlaybackModalOverlay.classList.remove('active');

    // Reset modal scroll position to top on close
    const modalBody = videoPlaybackModalOverlay.querySelector('.modal-body');
    modalBody.scrollTop = 0;

    // Optional: Pause the video if still playing
    hlsVideoPlayer.pause();
    hlsVideoPlayer.currentTime = 0;
});

// Profile Detail Modal Elements
const profileDetailModalOverlay = document.getElementById('profileDetailModalOverlay');
const profileDetailBackBtn = document.getElementById('profileDetailBackBtn');
const profileDetailHandle = document.getElementById('profileDetailHandle');
const profileImg1 = document.getElementById('profileImg1');
const profileImg2 = document.getElementById('profileImg2');
const profileName = document.getElementById('profileName');
const profileHandleDetail = document.getElementById('profileHandleDetail');
const profileAge = document.getElementById('profileAge');
const profileCountry = document.getElementById('profileCountry');
const profileRole = document.getElementById('profileRole');
const profileLikes = document.getElementById('profileLikes');
const chatWithMeBtn = document.getElementById('chatWithMeBtn');
//
document.getElementById('videoPlaybackBackBtn').addEventListener('click', () => {
    const modal = document.getElementById('videoPlaybackModalOverlay');
    const videoPlayer = document.getElementById('hlsVideoPlayer');

    // ✅ Pause the video
    videoPlayer.pause();

    // ✅ Clear the video src to stop buffering
    videoPlayer.src = '';

    // ✅ Close the modal visually
    modal.classList.remove('active');
});

// Search Overlay Elements
const searchOverlay = document.getElementById('searchOverlay');
const searchBar = document.getElementById('searchBar');
const cancelSearchBtn = document.getElementById('cancelSearchBtn');
const searchVideoResults = document.getElementById('searchVideoResults');
const searchProfileResults = document.getElementById('searchProfileResults');
const noSearchResults = document.getElementById('noSearchResults');

// Plus Button Modal Elements
const plusBtnModalOverlay = document.getElementById('plusBtnModalOverlay');
const plusBtnBackBtn = document.getElementById('plusBtnBackBtn');
const plusBtnModalTitle = document.getElementById('plusBtnModalTitle');
const plusBtnModalRules = document.getElementById('plusBtnModalRules');
const whatsappSendBtn = document.querySelector('#plusBtnModalOverlay .whatsapp-send-btn');

// --- Global Variables / State ---
let currentUserData = null; // Stores currently logged-in user's data
let simulatedUserDatabase = []; // Simulates a backend user database
let allVideos = []; // All available videos
let allProfiles = []; // All available profiles

let currentVideoPage = 0;
const videosPerPage = 6;
let currentProfilePage = 0;
const profilesPerPage = 10;
let currentRelatedVideoPage = 0;
const relatedVideosPerPage = 6;

let isGuestMode = true; // True if no user is logged in
let isUpperLayerExpanded = false; // Tracks if upper layer is fully expanded
let startY; // For drag functionality
let initialTop; // For drag functionality

let pendingPaymentDetails = null;



function currencySymbol(code) {
    return currencySymbols[code] || code;
}


async function getConvertedAmount(amountInUSD, targetCurrencyCode) {
    if (targetCurrencyCode === 'USD') {
        return amountInUSD;
    }

    const apiUrl = `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/USD`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error('Failed to fetch exchange rates from API.');
        }
        const data = await response.json();

        if (data.result === 'success' && data.conversion_rates && data.conversion_rates[targetCurrencyCode]) {
            const rateUSDToTarget = data.conversion_rates[targetCurrencyCode];
            const convertedValue = amountInUSD * rateUSDToTarget;
            return Math.round(convertedValue); // Round to nearest whole number
        } else {
            console.error('Invalid API response or currency not supported by API:', data);
            throw new Error('Invalid API response or currency not supported by API.');
        }
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
        alert(`Failed to convert currency to ${targetCurrencyCode}. Proceeding with USD payment as fallback. Error: ${error.message}`);
        return amountInUSD; // Fallback to USD if conversion fails
    }
}

// --- Data & Initialization ---

// Hardcoded Users for testing (simulating a database)

// Initialize simulated database with hardcoded users
//simulatedUserDatabase = [...hardcodedUsers];

// Hardcoded Videos


// Call this after loading videos dynamically

//allVideos = [...initialVideos]; // Populate allVideos array

// Hardcoded Profiles

//allProfiles = [...initialProfiles]; // Populate allProfiles array

// --- Local Storage Management ---
// --- Local Storage Management ---
function saveUserData() {
    // No more localStorage, backend is authoritative
    console.log("Save function disabled, backend is authoritative.");
}

async function loadUserData() {
    try {
        const videosResponse = await fetch(`${APPS_SCRIPT_URL}?action=getVideos`);
        const videosData = await videosResponse.json();
    if (videosData.success) {
    allVideos = videosData.data.map(v => ({
        ...v,
        videoUrl: v.VideoUrl // normalize property name
    }));
    allVideos = sortVideosByNumericalId(allVideos);
} else {
    console.error('Failed to load videos from backend:', videosData.error);
}
        const profilesResponse = await fetch(`${APPS_SCRIPT_URL}?action=getProfiles`);
        const profilesData = await profilesResponse.json();
        if (profilesData.success) {
            allProfiles = profilesData.data;
        } else {
            console.error('Failed to load profiles from backend:', profilesData.error);
        }
    } catch (error) {
        console.error('Error fetching initial data from backend:', error);
    }
}

async function updateUIForUser() {
    if (currentUserData && currentUserData.Handle) {
        // Fetch real-time balances
        try {
            const response = await fetch(`${APPS_SCRIPT_URL}?action=getUserBalances&handle=${currentUserData.Handle}`);
            const data = await response.json();
            if (data.success && data.balances) {
                currentUserData.AvailableBalance = data.balances.AvailableBalance;
                currentUserData.ReferralBalance = data.balances.ReferralBalance;
            } else {
                console.error('Failed to get user balances:', data.error);
            }
        } catch (error) {
            console.error('Error fetching user balances:', error);
        }

        userAvatar.src = currentUserData.avatar || 'https://via.placeholder.com/150/CCCCCC/999999?text=User';
        userName.textContent = currentUserData.Name;
        userHandle.textContent = `@${currentUserData.Handle}`;
        userEmail.textContent = currentUserData.Email;
        userPhone.textContent = currentUserData.Phone;

        const targetCurrencyCode = getCurrencyForCountry(currentUserData.Country);
        const convertedAvailableBalance = await getConvertedAmount(currentUserData.AvailableBalance, targetCurrencyCode);
        const convertedReferralBalance = await getConvertedAmount(currentUserData.ReferralBalance, targetCurrencyCode);

        availableBalance.textContent = `${currencySymbol(targetCurrencyCode)}${convertedAvailableBalance.toLocaleString()}`;
        referralBalance.textContent = `${currencySymbol(targetCurrencyCode)}${convertedReferralBalance.toLocaleString()}`;

        authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Log Out';
        // Enable buttons that require login
        enableLoginRequiredButtons(true);
    } else {
        // Guest Mode UI
        userAvatar.src = 'https://i.imgur.com/ba9qC0y.jpeg';
        userName.textContent = 'Guest User';
        userHandle.textContent = '@guest';
        userEmail.textContent = 'guest@example.com';
        userPhone.textContent = '+2340000000000';
        availableBalance.textContent = '$0.00';
        referralBalance.textContent = '$0.00';
        authBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Log In';
        // Disable buttons that require login
        enableLoginRequiredButtons(false);
    }
}

function enableLoginRequiredButtons(enable) {
    const buttons = [
        withdrawBtn, depositBtn, referralBtn, notificationBtn,
        floatingPlusBtn,
        // Add other buttons that require login here
    ];
    buttons.forEach(btn => {
        if (btn) { // Check if element exists
            btn.disabled = !enable;
            btn.style.opacity = enable ? '1' : '0.5';
            btn.style.cursor = enable ? 'pointer' : 'not-allowed';
        }
    });
}

// --- Modal Handling ---
function showModal(overlayElement) {
    overlayElement.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function hideModal(overlayElement) {
    overlayElement.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Attach hide event to all back buttons
[
    modalBackBtn,
    moreOptionsBackBtn,
    authBackBtn,
    videoPlaybackBackBtn,
    profileDetailBackBtn,
    cancelSearchBtn,
    plusBtnBackBtn
].forEach(btn => {
    if (btn) { // Check if element exists
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent clicks from bubbling up to overlay
            hideModal(btn.closest('.modal-overlay'));
        });
    }
});

// Hide modal if clicking outside content (only for generic ones if applicable)
// For specific modals like search, we don't want this behavior
genericModalOverlay.addEventListener('click', (e) => {
    if (e.target === genericModalOverlay) {
        hideModal(genericModalOverlay);
    }
});

// --- Specific Modal Content Renderers ---

async function renderWithdrawalModal() {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    const targetCurrencyCode = getCurrencyForCountry(currentUserData.Country);
    const convertedMinWithdrawal = await getConvertedAmount(MIN_WITHDRAWAL_USD, targetCurrencyCode);
    const convertedWithdrawalFee = await getConvertedAmount(WITHDRAWAL_FEE_USD, targetCurrencyCode);

    modalTitle.textContent = 'Withdrawal';
    modalBody.innerHTML = `
        <p class="note-text">Minimum withdrawal is ${currencySymbol(targetCurrencyCode)}${convertedMinWithdrawal.toLocaleString()} and will be converted and delivered to your account within 48 hours. A ${currencySymbol(targetCurrencyCode)}${convertedWithdrawalFee.toLocaleString()} fee applies per withdrawal.</p>
        <form id="withdrawalForm">
            <div class="form-group">
                <label for="accountNumber">Account/Mobile Money Number</label>
                <input type="text" id="accountNumber" name="accountNumber" required>
            </div>
            <div class="form-group">
                <label for="accountName">Name on Account</label>
                <input type="text" id="accountName" name="accountName" required>
            </div>
            <div class="form-group">
                <label for="bankNetwork">Bank/Network Name</label>
                <input type="text" id="bankNetwork" name="bankNetwork" required>
            </div>
            <div class="form-group">
                <label for="withdrawalAmount">Amount to Withdraw (USD)</label>
                <input type="number" id="withdrawalAmount" name="withdrawalAmount" min="${MIN_WITHDRAWAL_USD}" required>
            </div>
            <button type="submit" class="form-submit-btn">Request Withdrawal</button>
        </form>
    `;
    showModal(genericModalOverlay);

    const withdrawalForm = document.getElementById('withdrawalForm');
    withdrawalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('withdrawalAmount').value);
        if (amount < MIN_WITHDRAWAL_USD) {
            alert(`Minimum withdrawal is $${MIN_WITHDRAWAL_USD.toLocaleString()}.`);
            return;
        }
        if (currentUserData.AvailableBalance < amount + WITHDRAWAL_FEE_USD) {
            alert(`Insufficient balance. You need at least $${(amount + WITHDRAWAL_FEE_USD).toLocaleString()} to withdraw $${amount.toLocaleString()}.`);
            return;
        }

        const withdrawalPayload = {
            action: 'withdrawal',
            payload: {
                name: document.getElementById('accountName').value,
                bankName: document.getElementById('bankNetwork').value,
                accountNumber: document.getElementById('accountNumber').value,
                handle: currentUserData.Handle,
                amount: amount,
                fee: WITHDRAWAL_FEE_USD
            }
        };

        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(withdrawalPayload)
            });
            const result = await response.json();

            if (result.success) {
                hideModal(genericModalOverlay);
                alert(`Withdrawal of $${amount.toLocaleString()} requested successfully. Fee: $${WITHDRAWAL_FEE_USD.toLocaleString()}. Funds will be converted and delivered within 48 hours.`);
                updateUIForUser(); // Refresh UI with new balance
            } else {
                alert(`Withdrawal failed: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Withdrawal request failed:', error);
            alert('Failed to request withdrawal. Please try again.');
        }
    });
}

async function renderDepositModal() {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    modalTitle.textContent = 'Deposit';
    modalBody.innerHTML = `
        <p class="note-text"> Don't let anything stop you from watching your favourite boys! <br> Remember the funds is yours, do whatever you want with it.</p>
        <form id="depositForm">
            <div class="form-group">
                <label for="depositHandle">Your Handle</label>
                <input type="text" id="depositHandle" name="depositHandle" value="${currentUserData.Handle}" readonly>
            </div>
            <div class="form-group">
                <label for="depositAmount">How much do you want to deposit (USD)?</label>
                <input type="number" id="depositAmount" name="depositAmount" min="1800" required>
            </div>
            <button type="submit" class="form-submit-btn">Deposit</button>
        </form>
    `;
    showModal(genericModalOverlay);

    const depositForm = document.getElementById('depositForm');
    // Inside renderDepositModal, find this block and replace it
depositForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('depositAmount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid deposit amount.');
        return;
    }

    const targetCurrencyCode = getCurrencyForCountry(currentUserData.Country);

    // Now, save the payment details, including the target currency
    pendingPaymentDetails = {
        type: 'deposit',
        amount: amount, // USD
        email: currentUserData.Email,
        name: currentUserData.Name,
        phone: currentUserData.Phone,
        country: currentUserData.Country,
        targetCurrencyCode: targetCurrencyCode, // <<-- ADD THIS LINE
        handle: currentUserData.Handle
    };

    hideModal(genericModalOverlay);
    showPaymentOptionsOrDirect(amount, currentUserData.Email, currentUserData.Phone, currentUserData.Name, currentUserData.Country, 'deposit');
});
}


function renderReferralModal() {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    modalTitle.textContent = 'Referral Program';
    modalBody.innerHTML = `
        <p class="note-text">Start referring today and start earning! Let people use your referral code during registration and you will earn ${0} USD immediately after every successful referral.</p>
        <p class="note-text">Your referral code is your handle: <strong>${currentUserData.Handle}</strong></p>
        <p class="note-text">You will see when you have a successful referral in your Referral Balance.</p>
    `;
    showModal(genericModalOverlay);
}

function renderNotificationModal() {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    modalTitle.textContent = 'Notifications';
    // Assuming 'notif' is a field in currentUserData, e.g., currentUserData.notif = "Welcome to ICP!";
    const notificationText = currentUserData.notif && currentUserData.notif.trim() !== ''
        ? currentUserData.notif
        : 'Submit a video and start earning from ad revenue!!.';
    modalBody.innerHTML = `<p class="note-text">${notificationText}</p>`;
    showModal(genericModalOverlay);
}

function renderAboutUsModal() {
    modalTitle.textContent = 'About Us';
    modalBody.innerHTML = `
       <div class="atcl">
        <br>
<h1>About Us</h1>
<p>Welcome to <strong>Ice Consort Privilege (ICP)</strong>, a unique digital solera system for gay adult content. Like a carefully aged cask, our platform is not a trend—it's a living system of spirit and survival, constantly enriched by every member who joins.</p>

<br>
<h2>The Maro Akpovwovwo Erubasa Philosophy</h2>
<p>Our platform is built on a name that is more than a label; it's a philosophy: <strong>Maro Akpovwovwo Erubasa</strong>.</p>
<ul>
  <li><strong>Maro</strong>: A season's diamond, a rare spark. This is the moment a user finds our platform and decides to join our community.</li>
  <li><strong>Akpovwovwo</strong>: The golden hour, the sweetness earned. This represents the rewarding experience of exploring and connecting with the content and creators on our platform.</li>
  <li><strong>Erubasa</strong>: Where we have reached, yet the distance remains. The eternal becoming. This is the ongoing journey of growth, community, and connection that defines us.</li>
</ul>
<p>This is the solera of queerness. It will never, ever run dry.</p>

<br>
<h2>Our Service</h2>
<p>Our main goal is simple: to connect gay adult content creators with viewers who love watching them. We are a sacred cask, aged in rebellion, and bottled with truth. In our blend, you'll find:</p>
<ul>
  <li>The spice of courage</li>
  <li>The sweetness of authenticity</li>
  <li>The strength of survival</li>
  <li>The velvet complexity of unfiltered truth</li>
</ul>
<p>We are not just a platform; we are a community. We also have a growing community where users can mingle and connect with like-minded individuals.</p>

<br>
<h2>Getting Started</h2>
<ol>
  <li><strong>Join Us</strong>: When you visit, you'll be prompted to create a free account.</li>
  <li><strong>Starter Deposit</strong>: To get started, a small, mandatory deposit is required during registration. This deposit is immediately available on your dashboard.</li>
  <li><strong>Unlock & Explore</strong>: Use your starter deposit to unlock videos, tip your favorite creators, and purchase other features on the platform.</li>
</ol>

<br>
<h2>Our Referral Logic</h2>
<p>We believe in rewarding our community. When you invite a new user, you will receive 5% of every purchase they make for the first 30 days. It's our way of thanking you for helping our solera system grow.</p>
<p>From men who loved in silence to those who speak in light—from the caves, to the courts, to this screen—Ice Consort Privilege was born.</p>

</div>
    `;
    showModal(genericModalOverlay);
}

function renderTermsModal() {
    modalTitle.textContent = 'Terms and Legals';
    modalBody.innerHTML = `
        <div class="atcl">
        <h3>Terms of Use</h3>
        <p>Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

<br>
<h1>Terms of Service</h1>
<p>Welcome to Ice Consort Privilege (ICP). By accessing or using our platform, you agree to comply with the following terms. This document outlines your rights, responsibilities, and our commitment to maintaining a secure and trustworthy community for all users.</p>

<br>
<h2>Content and Community Standards</h2>
<p>Our platform is a dedicated space for adult gay content. To ensure the integrity and safety of our community, we enforce a strict <strong>zero-tolerance policy</strong> for the following:</p>
<ul>
  <li><strong>Minors:</strong> Any content depicting individuals under the age of 18 is strictly prohibited.</li>
  <li><strong>Non-Gay Content:</strong> This is an exclusively gay space. Straight or bisexual content is not permitted.</li>
  <li><strong>Non-Explicit Content:</strong> To maintain a focused experience, we do not accept films that are less than 30% explicit.</li>
  <li><strong>Stolen Content:</strong> You must be the sole creator and owner of any content you upload. Using or sharing content that you do not own is a serious violation.</li>
</ul>

<br>
<h2>Information for Creators</h2>
<p>Creators are the core of our platform. We offer a direct-to-viewer model designed to empower you with control and freedom.</p>
<ul>
  <li><strong>Ownership:</strong> You retain full and perpetual ownership of your content. ICP does not claim any rights to your intellectual property.</li>
  <li><strong>Verification:</strong> To ensure authenticity and build trust, all individual creators must complete a video verification process before their content can be published.</li>
  <li><strong>Your Earnings:</strong>
    <ul>
      <li><strong>Pay-Per-View:</strong> Earn income directly when viewers purchase your content.</li>
      <li><strong>Tipping:</strong> Receive tips from viewers who appreciate your work.</li>
      <li><strong>Revenue Distribution:</strong> All revenue generated from content sales is split as follows:
        <ul>
          <li><strong>65%</strong> goes directly to the <strong>creator</strong>.</li>
          <li><strong>30%</strong> is retained by the <strong>platform</strong>.</li>
          <li><strong>5%</strong> is paid to the <strong>referrer</strong> who brought the user to the platform. This commission is valid for the first 30 days only.</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><strong>Freedom:</strong> You are free to remove your content or leave the platform at any time without explanation.</li>
</ul>

<br>
<h2>For All Users</h2>
<p>We have made it simple and transparent for you to support your favorite creators and enjoy our content.</p>
<ul>
  <li><strong>Easy Access:</strong> We provide a seamless and easy way for you to unlock content and tip creators.</li>
  <li><strong>Commissions:</strong> Referral commissions are processed as micropayments and will be deposited into your account periodically.</li>
</ul>

<br>
<h2>Privacy and Community Contribution</h2>
<ul>
  <li><strong>Privacy:</strong> We use cookies to monitor user activity on the platform. This data is used exclusively to improve our services and enhance your overall experience.</li>
  <li><strong>Community Contribution:</strong> We are committed to supporting the LGBTQ+ community. <strong>5% of the platform's revenue</strong> is donated to Milaaje to support gay empowerment initiatives.</li>
</ul>
   </div>
    `;
    showModal(genericModalOverlay);
}

function renderContactUsModal() {
    modalTitle.textContent = 'Contact Us';
    modalBody.innerHTML = `
        <div class="atcl">
        <p><strong>Email:</strong> team.milaaje@gmail.com, iceconsort@gmail.com</p>
        <p><strong>Phone:</strong> +2348027350284</p>
        </div>
           `;
    showModal(genericModalOverlay)
}



function renderVideoCards() {
    forYouVideoGrid.innerHTML = ''; // Clear existing

    allVideos.forEach(video => {
        const card = createVideoCard(video); // ✅ uses correct handler
        forYouVideoGrid.appendChild(card);
    });
}

function showAuthRequiredModal() {
    modalTitle.textContent = 'Login Required';
    modalBody.innerHTML = `
        <p class="suspended-message">
         please Login or Create an account to proceed.
        </p>
        <button class="form-submit-btn" id="goToLoginFromAuthRequired">Log In / Join</button>
    `;
    showModal(genericModalOverlay);

    document.getElementById('goToLoginFromAuthRequired').addEventListener('click', () => {
        hideModal(genericModalOverlay);
        showModal(authModalOverlay);
        authModalTitle.textContent = 'Enter Access Code to enter club';
        loginForm.classList.remove('hidden');
        registrationFormContainer.classList.add('hidden');
        subscriptionRenewalFormContainer.classList.add('hidden');
    });
}


function renderLoginModal() {
    hideModal(moreOptionsModalOverlay); // Hide more options modal first
    showModal(authModalOverlay);
    authModalTitle.textContent = 'Enter Access Code to enter club';
    loginForm.classList.remove('hidden');
    registrationFormContainer.classList.add('hidden');
    subscriptionRenewalFormContainer.classList.add('hidden');
    accessCodeInput.value = ''; // Clear input
}

function renderRegistrationForm() {
    authModalTitle.textContent = 'Join the community';
    loginForm.classList.add('hidden');
    registrationFormContainer.classList.remove('hidden');
    subscriptionRenewalFormContainer.classList.add('hidden');

    registrationFormContainer.innerHTML = `
        <form id="registrationFormContent">
            <div class="form-group">
                <label for="regName">Name</label>
                <input type="text" id="regName" name="name" required>
            </div>
            <div class="form-group">
                <label for="regEmail">Email</label>
                <input type="email" id="regEmail" name="email" required>
            </div>
            <div class="form-group">
                <label for="regPhone">Phone Number</label>
                <input type="tel" id="regPhone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="regCountry">Country</label>
                <input type="text" id="regCountry" name="country" required>
            </div>
            <div class="form-group">
                <label for="regHandle">Create Handle (max 8 words)</label>
                <input type="text" id="regHandle" name="handle" maxlength="8" required pattern="^[a-zA-Z0-9]{1,8}$" title="Handle must be 1-8 alphanumeric characters">
            </div>
            <div class="form-group">
                <label for="regAccessCode">Create Access Code (4 digits, 3 letters, e.g., 1234ABC)</label>
                <div style="position:relative;">
                    <input type="password" id="regAccessCode" name="accessCode" maxlength="7" required pattern="^[0-9]{4}[a-zA-Z]{3}$" title="Format: 4 digits then 3 letters">
                    <span class="password-toggle" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); cursor:pointer; color: var(--text-color-muted);"><i class="fas fa-eye"></i></span>
                </div>
            </div>
            <div class="form-group">
                <label for="regConfirmAccessCode">Confirm Access Code</label>
                <div style="position:relative;">
                    <input type="password" id="regConfirmAccessCode" name="confirmAccessCode" maxlength="7" required>
                    <span class="password-toggle" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); cursor:pointer; color: var(--text-color-muted);"><i class="fas fa-eye"></i></span>
                </div>
            </div>
            <div class="form-group">
                <label for="regReferral">Who invited you? (optional)</label>
                <input type="text" id="regReferral" name="referralHandle" maxlength="8">
            </div>
             <div class="Reminder">
             <p>
             *Step inside only if you’re <b>18+</b> and ready for what’s waiting.


             </div>
            <button type="submit" class="form-submit-btn">Experience Pleasure!</button>
        </form>
    `;

    // Add toggle password visibility listeners
    registrationFormContainer.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            toggle.querySelector('i').classList.toggle('fa-eye');
            toggle.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    const registrationFormContent = document.getElementById('registrationFormContent');
    registrationFormContent.addEventListener('submit', initiateRegistrationPayment);
}

function renderSubscriptionRenewalForm() {
    authModalTitle.textContent = 'Renew Your Subscription';
    loginForm.classList.add('hidden');
    registrationFormContainer.classList.add('hidden');
    subscriptionRenewalFormContainer.classList.remove('hidden');

    subscriptionRenewalFormContainer.innerHTML = `
        <p class="suspended-message expired-subscription-message">
            Your subscription has expired. Please renew to regain full access.
        </p>
        <form id="renewalForm">
            <div class="form-group">
                <label for="renewalAccessCode">Your Access Code</label>
                <input type="text" id="renewalAccessCode" name="accessCode" value="${currentUserData?.AccessCode || ''}" readonly>
            </div>
            <button type="submit" class="form-submit-btn">Renew with $${RENEWAL_PAYMENT_USD.toLocaleString()}</button>
        </form>
    `;

    const renewalForm = document.getElementById('renewalForm');
    renewalForm.addEventListener('submit', initiateRenewalPayment);
}


async function initiateRegistrationPayment(e) {
    e.preventDefault();
    const regName = document.getElementById('regName').value.trim();
    const regEmail = document.getElementById('regEmail').value.trim();
    const regPhone = document.getElementById('regPhone').value.trim();
    const regCountry = document.getElementById('regCountry').value.trim();
    const regHandle = document.getElementById('regHandle').value.trim();
    const regAccessCode = document.getElementById('regAccessCode').value.trim();
    const regConfirmAccessCode = document.getElementById('regConfirmAccessCode').value.trim();
    const regReferral = document.getElementById('regReferral').value.trim();


    // Basic Validation
    if (!regName || !regEmail || !regPhone || !regCountry || !regHandle || !regAccessCode || !regConfirmAccessCode) {
        alert('Please fill in all fields.');
        return;
    }
    if (regAccessCode !== regConfirmAccessCode) {
        alert('Access Code and Confirm Access Code do not match.');
        return;
    }
    if (!/^[0-9]{4}[a-zA-Z]{3}$/.test(regAccessCode)) {
        alert('Access Code must be 4 digits followed by 3 letters (e.g., 1234ABC).');
        return;
    }
    if (!/^[a-zA-Z0-9]{1,8}$/.test(regHandle)) {
        alert('Handle must be 1-8 alphanumeric characters.');
        return;
    }

    const registrationPayload = {
        action: 'register',
        payload: {
            accessCode: regAccessCode,
            name: regName,
            handle: regHandle,
            email: regEmail,
            country: regCountry,
            phone: regPhone,
            referralHandle: regReferral
        }
    };

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationPayload)
        });
        const result = await response.json();

        if (result.success) {
            hideModal(authModalOverlay);
            alert('Registration successful! Welcome to the club.');
            await checkAccessCode(regAccessCode);
        } else {
            alert(`Registration failed: ${result.error || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Registration failed:', error);
        alert('Failed to register. Please check your internet connection and try again.');
    }
}

async function initiateRenewalPayment(e) {
    e.preventDefault();
    if (!currentUserData) {
        alert('Error: No current user data for renewal.');
        return;
    }

    // Referral Logic Checks

    pendingPaymentDetails = {
        type: 'renewal',
        amount: RENEWAL_PAYMENT_USD, // USD
        email: currentUserData.Email,
        name: currentUserData.Name,
        phone: currentUserData.Phone,
        country: currentUserData.Country,
        targetCurrencyCode: getCurrencyForCountry(currentUserData.Country), // <<-- ADD THIS LINE
        accessCode: currentUserData.AccessCode,
        oldExpiry: currentUserData.subscriptionExpiry
    };

    hideModal(authModalOverlay);
    showPaymentOptionsOrDirect(
        RENEWAL_PAYMENT_USD,
        currentUserData.Email,
        currentUserData.Phone,
        currentUserData.Name,
        currentUserData.Country,
        'renewal'
    );
}

// --- Payment Gateway Selection Modal ---
async function showPaymentOptionsModal(paymentType, amountInUSD) {
    const paymentOptionsModal = document.getElementById('genericModalOverlay'); // Reusing generic modal

    // Get the target currency from the pending details
    const targetCurrencyCode = pendingPaymentDetails?.targetCurrencyCode || 'USD';
    let convertedAmount = amountInUSD;
    let convertedText = ``;

    if (targetCurrencyCode !== 'USD') {
        try {
            convertedAmount = await getConvertedAmount(amountInUSD, targetCurrencyCode);
            convertedText = `(approx. ${currencySymbol(targetCurrencyCode)}${convertedAmount.toLocaleString()})`;
        } catch (error) {
            console.error('Error getting converted amount:', error);
            // Fallback to not showing converted amount if API fails
        }
    }

    modalTitle.textContent = `Choose Payment Method for ${paymentType.charAt(0).toUpperCase() + paymentType.slice(1)}`;
    modalBody.innerHTML = `
        <p class="note-text">You are paying: <strong>${currencySymbol('USD')}${amountInUSD.toLocaleString()}</strong> ${convertedText} <b>only!</b></p>
         <div class="action-buttons" style="flex-direction:column; gap:15px; margin-top:20px;">
            <button class="form-submit-btn" id="payWithPaystackBtn" style="background: linear-gradient(90deg, #FFD700, #FFA500); color: #333;">
                <img src="" alt="" style="height:24px; margin-right:10px;"> Not Available[Down]
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
    showModal(paymentOptionsModal);

    // IMPORTANT: Re-attach event listeners to prevent multiple triggers
    const payWithPaystackBtn = document.getElementById('payWithPaystackBtn');
    const newPaystackBtn = payWithPaystackBtn.cloneNode(true);
    payWithPaystackBtn.parentNode.replaceChild(newPaystackBtn, payWithPaystackBtn);

    const payWithFlutterwaveBtn = document.getElementById('payWithFlutterwaveBtn');
    const newFlutterwaveBtn = payWithFlutterwaveBtn.cloneNode(true);
    payWithFlutterwaveBtn.parentNode.replaceChild(newFlutterwaveBtn, payWithFlutterwaveBtn);

    newPaystackBtn.onclick = () => {
        hideModal(paymentOptionsModal);
        const { amount, email, name, phone, country } = pendingPaymentDetails;
        handlePaystackPayment(amount, email, name, phone, country, paymentType);
    };

    newFlutterwaveBtn.onclick = async () => {
    hideModal(paymentOptionsModal);
    const { amount, email, phone, name, country, targetCurrencyCode } = pendingPaymentDetails;
    const convertedAmount = await getConvertedAmount(amount, targetCurrencyCode);
    handleFlutterwavePayment(convertedAmount, email, phone, name, country, paymentType, targetCurrencyCode);
};
}
// This is the correct, simplified function
async function showPaymentOptionsOrDirect(amount, email, phone, name, country, paymentType) {
    // This line will now ALWAYS be executed, regardless of the user's country.
    showPaymentOptionsModal(paymentType, amount);
}


function handlePaystackPayment(amount, email, name, phone, country, paymentType) {
    const paystackAmount = amount * 100; // Paystack requires amount in kobo (lowest denomination)
    const chargeCurrency = 'USD'; // Paystack handles international cards in USD usually

    let reference = `${paymentType.toUpperCase()}_${new Date().getTime()}`;
    if (pendingPaymentDetails?.accessCode) {
        reference += `_${pendingPaymentDetails.accessCode}`;
    }
    if (pendingPaymentDetails?.videoId) {
        reference += `_${pendingPaymentDetails.videoId}`;
    }

    pendingPaymentDetails.paymentGatewayUsed = 'Paystack';

    // Ensure PaystackPop is loaded
    if (typeof PaystackPop === 'undefined') {
        alert('Paystack SDK not loaded. Please try again or check your internet connection.');
        console.error('Paystack SDK (PaystackPop) is not defined.');
        return;
    }

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: paystackAmount,
        ref: reference,
        currency: chargeCurrency,
        metadata: {
            customer_name: name,
            customer_phone: phone,
            payment_type: paymentType,
            country: country,
            access_code: pendingPaymentDetails?.accessCode || 'N/A',
            video_id: pendingPaymentDetails?.videoId || 'N/A'
        },
        callback: function(response) {
            if (response.status === 'success') {
                handlePaymentSuccess(paymentType, response.reference);
            } else {
                alert('Payment not completed or failed. Please try again.');
                console.error('Paystack Payment Failure:', response);
                pendingPaymentDetails = null; // Clear pending details
            }
        },
        onClose: function() {
            alert('Payment window closed.');
            pendingPaymentDetails = null; // Clear pending details
        }
    });
    handler.openIframe();
}

function handleFlutterwavePayment(amount, email, phone, name, country, paymentType, targetCurrencyCode = 'USD') {
    // Ensure FlutterwaveCheckout is loaded
    if (typeof FlutterwaveCheckout === 'undefined') {
        alert('Flutterwave SDK not loaded. Please try again or check your internet connection.');
        console.error('Flutterwave SDK (FlutterwaveCheckout) is not defined.');
        return;
    }

    const countryInfo = FLUTTERWAVE_COUNTRIES_MAP[country];
    if (!countryInfo) {
        alert('Payment via Flutterwave not supported for your country yet. Please try Paystack.');
        console.error('Flutterwave country info not found for:', country);
        pendingPaymentDetails = null;
        return;
    }

    let txRef = `${paymentType.toUpperCase()}_FLW_${new Date().getTime()}`;
    if (pendingPaymentDetails?.accessCode) {
        txRef += `_${pendingPaymentDetails.accessCode}`;
    }
    if (pendingPaymentDetails?.videoId) {
        txRef += `_${pendingPaymentDetails.videoId}`;
    }

    pendingPaymentDetails.paymentGatewayUsed = 'Flutterwave';

    // Clear any hash/query parameters Flutterwave might add for cleaner UX
    window.history.pushState({}, '', '/');

    FlutterwaveCheckout({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: txRef,
        amount: amount,
        currency: targetCurrencyCode,
        country: country, // ISO 2-letter code
        payment_options: countryInfo.channels.join(','), // e.g., "card,mobilemoneyghana"
        customer: {
            email: email,
            phone_number: phone,
            name: name,
        },
        meta: {
            payment_type: paymentType,
            customer_country: country,
            customer_uniqueness: pendingPaymentDetails?.accessCode || 'N/A',
            video_id: pendingPaymentDetails?.videoId || 'N/A'
        },
        customizations: {
            title: 'Ice Consort Privilege Payment',
            description: `Payment for ${paymentType}`,
            logo: 'https://via.placeholder.com/100/1a1a2e/00ffbf?text=ICP', // Replace with your logo URL
        },
        callback: function(data) {
            console.log('Flutterwave Callback Data:', data);
            if (data.status === 'successful' || data.status === 'completed') {
                handlePaymentSuccess(paymentType, data.transaction_id || data.flw_ref);
            } else {
                alert('Payment not completed or failed. Please try again.');
                console.error('Flutterwave Payment Failure:', data);
                pendingPaymentDetails = null; // Clear pending details
            }
        },
        onclose: function() {
            alert('Payment window closed.');
            pendingPaymentDetails = null; // Clear pending details
        },
    });
}

// --- Post-Payment Success Handling ---
async function handlePaymentSuccess(paymentType, transactionReference) {
    if (!pendingPaymentDetails) {
        console.error('No pending payment details found for success callback.');
        alert('Payment successful, but an internal error occurred. Please contact support.');
        return;
    }

    // Now, we will assume the Apps Script backend handles all
    // the business logic, including balance updates, and logging.
    // The client's job is just to call the right endpoint and then refresh the UI.

    switch (paymentType) {
        case 'registration':
        case 'deposit':
        case 'renewal':
        case 'video':
            // These are handled by the forms themselves, which now call Apps Script
            // directly. This function is for handling the payment gateway callback.
            // After a successful payment, we simply need to refresh the user's data.
            await checkAccessCode(currentUserData.AccessCode);
            break;
        default:
            console.warn('Unhandled payment type in success callback:', paymentType);
            break;
    }

    pendingPaymentDetails = null; // Clear pending details after successful handling
}

// --- User Management Functions (Simulated Backend) ---

function findUserByAccessCode(accessCode) {
    // This function is no longer needed as the backend is the source of truth.
    // The new checkAccessCode will perform this role via a fetch call.
    return null;
}

function updateUserSubscription(accessCode, isActive, expiryDate = null) {
    // No longer a local function. This is handled by the backend.
    console.log("Subscription update delegated to backend.");
}

// --- Content Rendering Functions ---

function createVideoCard(video) {
    const isUnlocked = false; // Video unlock check will be done on play button click
    const displayPrice = video.Price > 0;

    const card = document.createElement('div');
    card.classList.add('video-card');
    card.dataset.videoId = video.VideoID;

    card.innerHTML = `
        <img src="${video.Thumbnail}" alt="${video.Description}" class="video-card-thumbnail">
        <div class="video-card-info">
            <p class="video-card-description">${video.Description}</p>
            <p class="video-card-handle">${video.Handle}</p>
                    </div>
    `;

    card.addEventListener('click', () => {
        if (isGuestMode) {
            showAuthRequiredModal();
            return;
        }
        // This is the CRITICAL change:
        // We now check if the video has a price. If it does, show the "unlock" modal.
        // If it doesn't, show the video playback modal directly.
        if (video.Price > 0) {
            renderLockedVideoModal(video);
        } else {
            renderVideoPlaybackModal(video);
        }
    });
    return card;
}


loadMoreRelatedVideosBtn.addEventListener('click', () => {
    loadMoreRelatedVideos();
});

function loadMoreRelatedVideos() {
    const startIndex = currentRelatedVideoPage * relatedVideosPerPage;
    const endIndex = startIndex + relatedVideosPerPage;
    const videosToLoad = allVideos.slice(startIndex, endIndex);

    videosToLoad.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
            <img src="${video.Thumbnail}" alt="Thumbnail" class="video-card-thumbnail">
            <div class="video-card-info">
                <p class="video-card-description">${video.Description}</p>
                <p class="video-card-handle">${video.Handle}</p>
            </div>
        `;
        videoCard.addEventListener('click', () => {
            openVideoPlaybackModal(video); // your existing modal opening logic
        });
        moreVideosGrid.appendChild(videoCard);
    });

    currentRelatedVideoPage++;

    // Optional: hide the button if all videos are loaded
    if (endIndex >= allVideos.length) {
        loadMoreRelatedVideosBtn.style.display = 'none';
    }
}

function renderVideos(container, videosToRender, append = false) {
    if (!append) {
        container.innerHTML = ''; // Clear previous videos if not appending
    }
    videosToRender.forEach(video => {
        container.appendChild(createVideoCard(video));
    });

    // Handle Load More button visibility
    const loadMoreBtn = container.id === 'forYouVideoGrid' ? loadMoreVideosBtn : loadMoreRelatedVideosBtn;
    if (container.children.length >= allVideos.length) { // Assuming allVideos is the source
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
    }
}

function createProfileCard(profile) {
    const card = document.createElement('div');
    card.classList.add('profile-card');
    card.dataset.handle = profile.Handle;

    card.innerHTML = `
        <div class="profile-card-images">
            <img src="${profile.Image1}" alt="${profile.Name} image 1">
            <img src="${profile.Image2}" alt="${profile.Name} image 2">
        </div>
        <span class="profile-card-handle">@${profile.Handle}</span>
    `;

    card.addEventListener('click', () => {
        if (isGuestMode) {
            showAuthRequiredModal();
            return;
        }
        renderProfileDetailModal(profile);
    });
    return card;
}

function renderProfiles(container, profilesToRender, append = false) {
    if (!append) {
        container.innerHTML = '';
    }
    profilesToRender.forEach(profile => {
        container.appendChild(createProfileCard(profile));
    });

    // Handle Load More button visibility
    if (container.children.length >= allProfiles.length) {
        loadMoreProfilesBtn.classList.add('hidden');
    } else {
        loadMoreProfilesBtn.classList.remove('hidden');
    }
}


async function renderLockedVideoModal(video) {
    hideModal(videoPlaybackModalOverlay); // Ensure main video modal is hidden

    modalTitle.textContent = 'Exclusive Video';
    modalBody.innerHTML = `
        <p class="suspended-message">
         <strong>$${video.Price.toLocaleString()}</strong> Only to play this video.
        </p>

        <button class="form-submit-btn" id="unlockVideoBtn">Watch</button>
    `;
    showModal(genericModalOverlay);

    document.getElementById('unlockVideoBtn').addEventListener('click', async () => {
    if (!currentUserData) {
        showAuthRequiredModal();
        return;
    }

    const unlockPayload = {
        action: 'unlockVideo',
        payload: {
            userHandle: currentUserData.Handle,
            videoID: video.VideoID
        }
    };

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unlockPayload)
        });

        // Check if the response is OK (HTTP status 200)
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const result = await response.json();

        // Check for the 'success' property in the JSON response
        if (result && result.success) {
            hideModal(genericModalOverlay);

            // Re-render the playback modal now that the video is "unlocked"
            // The `video` object already contains the `VideoUrl` because it was
            // fetched by getAllVideos earlier.
            renderVideoPlaybackModal(video);

            // Update UI with new balance from server
            updateUIForUser();
        } else {
            // Display the specific error message from the backend
            alert(`Video unlock failed: ${result.error || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Video unlock request failed:', error);
        alert(`Failed to unlock video. Please try again. Details: ${error.message}`);
    }
});

}

function renderVideoPlaybackModal(video) {
    closeSearchOverlayIfOpen();
    if (!Hls.isSupported()) {
        alert('Your browser does not support HLS video playback. Please update your browser or try a different one.');
        return;
    }

    videoPlaybackHandle.textContent = `@${video.Handle}`;
    videoPlaybackDetails.textContent = video.Description;
    tipCreatorBtn.dataset.handle = video.Handle; // Store handle for tipping

    // Ensure the video player is clean before loading new source
    if (hlsVideoPlayer.hls) {
        hlsVideoPlayer.hls.destroy();
    }
    hlsVideoPlayer.src = '';
    hlsVideoPlayer.load();

    const hls = new Hls();
    hls.loadSource(video.videoUrl);
    hls.attachMedia(hlsVideoPlayer);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        hlsVideoPlayer.play();
    });
    hlsVideoPlayer.hls = hls; // Attach hls instance to video element for later cleanup

    // Populate "More from this handle and others"
    currentRelatedVideoPage = 0;
    loadRelatedVideos(video.Handle, video.VideoID);

    showModal(videoPlaybackModalOverlay);
}


function loadRelatedVideos(currentHandle, currentVideoID) {
    const relatedVideos = allVideos
        .filter(v => v.Handle === currentHandle && v.VideoID !== currentVideoID) // Same handle, exclude current video
        .concat(allVideos.filter(v => v.Handle !== currentHandle && v.VideoID !== currentVideoID)); // Other videos

    const startIndex = currentRelatedVideoPage * relatedVideosPerPage;
    const endIndex = startIndex + relatedVideosPerPage;
    const videosToDisplay = relatedVideos.slice(startIndex, endIndex);

    renderVideos(moreVideosGrid, videosToDisplay, currentRelatedVideoPage > 0);
    currentRelatedVideoPage++;

    if (endIndex >= relatedVideos.length) {
        loadMoreRelatedVideosBtn.classList.add('hidden');
    } else {
        loadMoreRelatedVideosBtn.classList.remove('hidden');
    }
}




function renderProfileDetailModal(profile) {
    profileDetailHandle.textContent = `@${profile.Handle}`;
    profileImg1.src = profile.Image1;
    profileImg2.src = profile.Image2;
    profileName.textContent = profile.Name;
    profileHandleDetail.textContent = `@${profile.Handle}`;
    profileAge.textContent = profile.Age;
    profileCountry.textContent = profile.Country;
    profileCity.textContent = profile.Role;
    profileLikes.textContent = profile.Likes;

closeSearchOverlayIfOpen();
    // Set chat button link
    if (profile.whatsapp) {
        chatWithMeBtn.href = profile.whatsapp;
        chatWithMeBtn.style.display = 'block';
        chatWithMeBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Chat with me now (WhatsApp)';
    } else if (profile.telegram) {
        chatWithMeBtn.href = profile.telegram;
        chatWithMeBtn.style.display = 'block';
        chatWithMeBtn.innerHTML = '<i class="fab fa-telegram-plane"></i> Chat with me now (Telegram)';
    } else {
        chatWithMeBtn.style.display = 'none'; // Hide if no chat link
    }

    showModal(profileDetailModalOverlay);
}

function isVideoUnlocked(videoId) {
    // This logic is now handled by the backend. We assume a video is unlocked if
    // the backend successfully processes the unlock request and allows playback.
    return false; // A placeholder for now. The unlock flow is simplified to a single payment check.
}


// --- Search Functionality ---

function performSearch() {

    const query = searchBar.value.toLowerCase().trim();
    if (query.length < 2) {
        searchVideoResults.querySelector('.video-grid').innerHTML = '';
        searchProfileResults.querySelector('.profile-grid').innerHTML = '';
        noSearchResults.classList.add('hidden');
        return;
    }

    const videoResults = allVideos.filter(video =>
        video.Handle.toLowerCase().includes(query) ||
        video.Description.toLowerCase().includes(query)
    );

    const profileResults = allProfiles.filter(profile =>
        profile.Handle.toLowerCase().includes(query) ||
        profile.Name.toLowerCase().includes(query) ||
        profile.Likes.toLowerCase().includes(query)
    );

    searchVideoResults.querySelector('.video-grid').innerHTML = '';
    searchProfileResults.querySelector('.profile-grid').innerHTML = '';

    if (videoResults.length === 0 && profileResults.length === 0) {
        noSearchResults.classList.remove('hidden');
    } else {
        noSearchResults.classList.add('hidden');
        renderVideos(searchVideoResults.querySelector('.video-grid'), videoResults);
        renderProfiles(searchProfileResults.querySelector('.profile-grid'), profileResults);
    }
}

// --- Drag Functionality for Upper Layer ---
function startDrag(e) {
    dragStartY = e.touches ? e.touches[0].clientY : e.clientY;
    dragCurrentY = dragStartY;
    isDragging = true;

    upperLayerHead.classList.add('grabbing');

    document.addEventListener('mousemove', duringDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', duringDrag);
    document.addEventListener('touchend', stopDrag);
}

function duringDrag(e) {
    if (!isDragging) return;
    dragCurrentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = dragCurrentY - dragStartY;

    // Update your upperLayer position accordingly (slide up/down)
    if (Math.abs(deltaY) > dragThreshold) {
        if (deltaY < 0) {
            // drag up to expand
            upperLayer.classList.add('expanded');
        } else {
            // drag down to collapse
            upperLayer.classList.remove('expanded');
        }
    }
}

function stopDrag() {
    isDragging = false;
    upperLayerHead.classList.remove('grabbing');

    document.removeEventListener('mousemove', duringDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', duringDrag);
    document.removeEventListener('touchend', stopDrag);
}
// --- Splash Screen Logic ---
function showSplashScreen() {
    const videoSplashScreen = document.getElementById('videoSplashScreen');

    // Remove localStorage logic for splash screen cooldown
    // For this implementation, we will always show the splash screen
    // on app load as there is no backend check for it.
    setTimeout(handleSplashEnd, SPLASH_VIDEO_DURATION_MS);
}


function handleSplashEnd() {
    if (videoSplashScreen.classList.contains('fade-out')) {
        return; // Already fading out or hidden
    }
    videoSplashScreen.classList.add('fade-out');

    setTimeout(() => {
        videoSplashScreen.style.display = 'none';
        mainContent.classList.add('active');
        document.body.style.overflow = ''; // Allow body scroll if needed
    }, 1000); // Allow 1 second for fade-out transition
}


// --- Initialization Function ---
async function initializePage() {
    await loadUserData(); // Load user data from backend
    allVideos = sortVideosByNumericalId(allVideos);

    // Initial check for a logged-in user session.
    // We can use a query parameter or simple state check.
    // For this task, we will assume no previous session and require login.
    currentUserData = null;
    isGuestMode = true;
    updateUIForUser(); // Update UI based on guest data

    // Initial content load for 'For you'
    renderVideos(forYouVideoGrid, allVideos.slice(0, videosPerPage));

    // Start polling for real-time balance updates
    startPolling();
}

// --- Access Code / Login Check ---
async function checkAccessCode(accessCode) {
    if (!accessCode) {
        alert('Access Code cannot be empty.');
        return;
    }

    try {
        const response = await fetch(`${APPS_SCRIPT_URL}?action=getUserByAccessCode&accessCode=${accessCode.toUpperCase()}`);
        const result = await response.json();

        if (result.success) {
            const user = result.user;
            if (user.suspended === 'T') {
                hideModal(authModalOverlay);
                modalTitle.textContent = 'Account Suspended';
                modalBody.innerHTML = `
                    <p class="suspended-message">
                        <i class="fas fa-exclamation-triangle"></i> Your account has been suspended.
                        If you believe this was a mistake, kindly send a message to team.milaaje.org |
                        You will be told why your account was suspended and what you can do to remove this ban.
                    </p>
                `;
                showModal(genericModalOverlay);
                currentUserData = null;
                isGuestMode = true;
                updateUIForUser();
                return false;
            }

            // Check subscription expiry (backend should handle this, but client can pre-check)
            const subscriptionExpiryDate = new Date(user.subscriptionExpiry);
            const now = new Date();

            if (user.subscription === 'F' || subscriptionExpiryDate < now) {
                hideModal(authModalOverlay);
                currentUserData = user;
                updateUIForUser();
                renderSubscriptionRenewalForm();
                showModal(authModalOverlay);
                isGuestMode = true;
                return false;
            }

            currentUserData = user;
            isGuestMode = false;
            updateUIForUser();
            hideModal(authModalOverlay);
            // alert(`Welcome back, ${currentUserData.Name}!`);
            return true;
        } else {
            alert(result.error || 'Invalid Access Code. Please try again or create an account.');
            currentUserData = null;
            isGuestMode = true;
            updateUIForUser();
            return false;
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your internet connection and try again.');
        return false;
    }
}


// --- Event Listeners ---

// Splash Screen Event
window.addEventListener('load', showSplashScreen);

// --- Lower Layer Button Events ---
withdrawBtn.addEventListener('click', renderWithdrawalModal);
depositBtn.addEventListener('click', renderDepositModal);
referralBtn.addEventListener('click', renderReferralModal);
notificationBtn.addEventListener('click', renderNotificationModal);

// More Options Dots
moreOptionsDots.addEventListener('click', () => {
    showModal(moreOptionsModalOverlay);
});

// More Options Modal Buttons
aboutUsBtn.addEventListener('click', () => { hideModal(moreOptionsModalOverlay); renderAboutUsModal(); });
termsBtn.addEventListener('click', () => { hideModal(moreOptionsModalOverlay); renderTermsModal(); });
contactUsBtn.addEventListener('click', () => { hideModal(moreOptionsModalOverlay); renderContactUsModal(); });
authBtn.addEventListener('click', () => {
    if (isGuestMode) {
        renderLoginModal();
    } else {
        // LOG OUT logic
        currentUserData = null;
        isGuestMode = true;
        updateUIForUser();
        hideModal(moreOptionsModalOverlay);
        //alert('You have been logged out.');
    }
});

// Auth Modal Login/Registration Switch
createAccountLink.addEventListener('click', renderRegistrationForm);

enterClubBtn.addEventListener('click', () => {
    const enteredCode = accessCodeInput.value.trim();
    if (enteredCode) {
        checkAccessCode(enteredCode);
    } else {
        alert('Please enter your Access Code.');
    }
});


// --- Upper Layer Tag Events ---
forYouTag.addEventListener('click', () => {
    forYouTag.classList.add('active');
    profilesTag.classList.remove('active');
    forYouContent.classList.remove('hidden');
    profilesContent.classList.add('hidden');
    // Ensure videos are loaded if not already
    if (forYouVideoGrid.children.length === 0) {
        currentVideoPage = 0;
        renderVideos(forYouVideoGrid, allVideos.slice(currentVideoPage * videosPerPage, (currentVideoPage + 1) * videosPerPage));
    }
});

profilesTag.addEventListener('click', () => {
    profilesTag.classList.add('active');
    forYouTag.classList.remove('active');
    profilesContent.classList.remove('hidden');
    forYouContent.classList.add('hidden');
    // Ensure profiles are loaded if not already
    if (profileGrid.children.length === 0) {
        currentProfilePage = 0;
        renderProfiles(profileGrid, allProfiles.slice(currentProfilePage * profilesPerPage, (currentProfilePage + 1) * profilesPerPage));
    }
});

searchIcon.addEventListener('click', () => {
    showModal(searchOverlay);
    searchBar.value = ''; // Clear previous search
    searchVideoResults.querySelector('.video-grid').innerHTML = '';
    searchProfileResults.querySelector('.profile-grid').innerHTML = '';
    noSearchResults.classList.add('hidden');
    searchBar.focus();
});

searchBar.addEventListener('input', performSearch);


// --- Load More Buttons ---
loadMoreVideosBtn.addEventListener('click', () => {
    currentVideoPage++;
    const startIndex = currentVideoPage * videosPerPage;
    const videosToLoad = allVideos.slice(startIndex, startIndex + videosPerPage);
    renderVideos(forYouVideoGrid, videosToLoad, true); // Append
});

loadMoreProfilesBtn.addEventListener('click', () => {
    currentProfilePage++;
    const startIndex = currentProfilePage * profilesPerPage;
    const profilesToLoad = allProfiles.slice(startIndex, startIndex + profilesPerPage);
    renderProfiles(profileGrid, profilesToLoad, true); // Append
});

loadMoreRelatedVideosBtn.addEventListener('click', () => {
    const currentVideo = allVideos.find(v => v.VideoID === hlsVideoPlayer.dataset.videoId); // Get current video
    if (currentVideo) {
        loadRelatedVideos(currentVideo.Handle, currentVideo.VideoID);
    }
});


// --- Tip Creator Button ---
tipCreatorBtn.addEventListener('click', () => {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    const targetHandle = tipCreatorBtn.dataset.handle;
    if (!targetHandle) {
        alert('Error: No creator handle found to tip.');
        return;
    }

    // Hide video modal
    hideModal(videoPlaybackModalOverlay);

    modalTitle.textContent = `Tip @${targetHandle}`;
    modalBody.innerHTML = `
        <form id="tipForm">
            <div class="form-group">
                <label for="tipAmount">Amount (USD)</label>
                <input type="number" id="tipAmount" name="tipAmount" min="1" required>
            </div>
            <div class="form-group">
                <label for="tipperHandle">Your Handle</label>
                <input type="text" id="tipperHandle" name="tipperHandle" value="${currentUserData.Handle}" readonly>
            </div>
            <button type="submit" class="form-submit-btn">Tip</button>
        </form>
    `;
    showModal(genericModalOverlay);

    document.getElementById('tipForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const tipAmount = parseFloat(document.getElementById('tipAmount').value);
        if (isNaN(tipAmount) || tipAmount <= 0) {
            alert('Please enter a valid tip amount.');
            return;
        }

        const tipPayload = {
            action: 'tip',
            payload: {
                tipperHandle: currentUserData.Handle,
                tippedHandle: targetHandle,
                amount: tipAmount
            }
        };

        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tipPayload)
            });
            const result = await response.json();

            if (result.success) {
                hideModal(genericModalOverlay);
                alert(`You successfully tipped @${targetHandle} $${tipAmount.toLocaleString()}!`);
                updateUIForUser();
            } else {
                alert(`Tipping failed: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Tipping request failed:', error);
            alert('Failed to send tip. Please try again.');
        }
    });
});


// --- Floating Plus Button Logic ---
floatingPlusBtn.addEventListener('click', () => {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    showModal(plusBtnModalOverlay);
    if (forYouTag.classList.contains('active')) {
        plusBtnModalTitle.textContent = 'Upload Your Videos';
        plusBtnModalRules.innerHTML = 'Please ensure your videos adhere to our <a href="#" id="videoRulesLink">video rules</a> found in our Terms of Use. Videos will be reviewed before publishing.';
        document.getElementById('videoRulesLink').addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(plusBtnModalOverlay);
            renderTermsModal(); // Show terms modal
        });
    } else if (profilesTag.classList.contains('active')) {
        plusBtnModalTitle.textContent = 'Upload Your Profile';
        plusBtnModalRules.innerHTML = 'Please ensure your profile information and images adhere to our <a href="#" id="profileRulesLink">profile rules</a> found in our Terms of Use. Profiles will be reviewed before publishing.';
        document.getElementById('profileRulesLink').addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(plusBtnModalOverlay);
            renderTermsModal(); // Show terms modal
        });
    }
});


// --- Drag Events for Upper Layer Head ---
upperLayerHead.addEventListener('mousedown', startDrag);
upperLayerHead.addEventListener('touchstart', startDrag, { passive: false }); // Passive: false for preventDefault


// --- Initial Page Load Call ---
//document.addEventListener('DOMContentLoaded', initializePage);


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    // Block Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+U
    if ((e.ctrlKey || e.metaKey) && ['c', 'x', 's', 'u', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
});
