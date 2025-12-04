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
const MIN_WITHDRAWAL_NGN = 1000;
const WITHDRAWAL_FEE_NGN = 500;
const REGISTRATION_PAYMENT_NGN = 3000;
const RENEWAL_PAYMENT_NGN = 250;
const REFERRAL_BONUS_NGN = 0;



fetch('/version.txt')
  .then(response => response.text())
  .then(serverVersion => {
    const storedVersion = localStorage.getItem('script_version');

    if (storedVersion !== serverVersion) {
      console.log("New version detected. Resetting.");
      localStorage.clear();  // or selectively clear what you want
      localStorage.setItem('script_version', serverVersion);
    } else {
      console.log("Same version. No reset.");
    }
  })
  .catch(err => console.error('Version check failed:', err));



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
async function getConvertedAmount(amountInNGN, targetCurrencyCode) {
    // ...
}

// --- Video Sorting Function ---
// --- Video Sorting Function ---
function sortVideosByNumericalId(videos) {
    return videos.sort((a, b) => {
        const idA = parseInt(a.id.replace('video', ''), 10);
        const idB = parseInt(b.id.replace('video', ''), 10);
        
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


async function getConvertedAmount(amountInNGN, targetCurrencyCode) {
    if (targetCurrencyCode === 'NGN') {
        return amountInNGN;
    }

    const apiUrl = `https://v6.exchangerate-api.com/v6/${EXCHANGERATE_API_KEY}/latest/NGN`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error('Failed to fetch exchange rates from API.');
        }
        const data = await response.json();

        if (data.result === 'success' && data.conversion_rates && data.conversion_rates[targetCurrencyCode]) {
            const rateNGNToTarget = data.conversion_rates[targetCurrencyCode];
            const convertedValue = amountInNGN * rateNGNToTarget;
            return Math.round(convertedValue); // Round to nearest whole number
        } else {
            console.error('Invalid API response or currency not supported by API:', data);
            throw new Error('Invalid API response or currency not supported by API.');
        }
    } catch (error) {
        console.error('Error fetching conversion rate:', error);
        alert(`Failed to convert currency to ${targetCurrencyCode}. Proceeding with NGN payment as fallback. Error: ${error.message}`);
        return amountInNGN; // Fallback to NGN if conversion fails
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
    localStorage.setItem('currentUserData', JSON.stringify(currentUserData));
    localStorage.setItem('simulatedUserDatabase', JSON.stringify(simulatedUserDatabase));
    localStorage.setItem('allVideos', JSON.stringify(allVideos)); // Save videos
    localStorage.setItem('allProfiles', JSON.stringify(allProfiles)); // Save profiles
}

function loadUserData() {
    const storedUserData = localStorage.getItem('currentUserData');
    const storedDb = localStorage.getItem('simulatedUserDatabase');
    const storedVideos = localStorage.getItem('allVideos');
    const storedProfiles = localStorage.getItem('allProfiles');

    // Load simulatedUserDatabase
    if (storedDb) {
        simulatedUserDatabase = JSON.parse(storedDb);
    } else {
        // If no stored DB, use hardcoded users as initial
        simulatedUserDatabase = [...hardcodedUsers];
    }

    // Load currentUserData
    if (storedUserData) {
        currentUserData = JSON.parse(storedUserData);
        // Ensure unlockedVideos timestamps are Date objects for proper comparison if needed
        if (currentUserData.unlockedVideos) {
            currentUserData.unlockedVideos.forEach(v => {
                if (typeof v.timestamp === 'string') {
                    v.timestamp = new Date(v.timestamp);
                }
            });
        }
        // Check if subscription has actually expired based on stored date
        if (currentUserData.subscription === 'T' && new Date(currentUserData.subscriptionExpiry) < new Date()) {
            currentUserData.subscription = 'F';
            updateUserSubscription(currentUserData.accessCode, false, currentUserData.subscriptionExpiry);
            console.log('User subscription expired, setting to F');
        }
    } else {
        currentUserData = null;
    }

    // Load allVideos
    if (storedVideos) {
        allVideos = JSON.parse(storedVideos);
    } else {
        allVideos = [...initialVideos];
    }
allVideos = sortVideosByNumericalId(allVideos);
    // Load allProfiles
    if (storedProfiles) {
        allProfiles = JSON.parse(storedProfiles);
    } else {
        allProfiles = [...initialProfiles];
    }
}

function updateUIForUser() {
    if (currentUserData && !isGuestMode) {
        userAvatar.src = currentUserData.avatar || 'https://via.placeholder.com/150/CCCCCC/999999?text=User';
        userName.textContent = currentUserData.name;
        userHandle.textContent = `@${currentUserData.handle}`;
        userEmail.textContent = currentUserData.email;
        userPhone.textContent = currentUserData.phone;
        availableBalance.textContent = currentUserData.availableBalance.toFixed(2);
        referralBalance.textContent = currentUserData.referralBalance.toFixed(2);
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
        availableBalance.textContent = '0.00';
        referralBalance.textContent = '0.00';
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

function renderWithdrawalModal() {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    modalTitle.textContent = 'Withdrawal';
    modalBody.innerHTML = `
        <p class="note-text">Minimum withdrawal is ${MIN_WITHDRAWAL_NGN.toLocaleString('en-NG')} naira and will be converted and delivered to your account within 48 hours. A ${WITHDRAWAL_FEE_NGN.toLocaleString('en-NG')} naira fee applies per withdrawal.</p>
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
                <label for="withdrawalAmount">Amount to Withdraw (NGN)</label>
                <input type="number" id="withdrawalAmount" name="withdrawalAmount" min="${MIN_WITHDRAWAL_NGN}" required>
            </div>
            <button type="submit" class="form-submit-btn">Request Withdrawal</button>
        </form>
    `;
    showModal(genericModalOverlay);

    const withdrawalForm = document.getElementById('withdrawalForm');
    withdrawalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('withdrawalAmount').value);
        if (amount < MIN_WITHDRAWAL_NGN) {
            alert(`Minimum withdrawal is ${MIN_WITHDRAWAL_NGN.toLocaleString('en-NG')} naira.`);
            return;
        }
        if (currentUserData.availableBalance < amount + WITHDRAWAL_FEE_NGN) {
            alert(`Insufficient balance. You need at least ${amount + WITHDRAWAL_FEE_NGN} NGN to withdraw ${amount.toLocaleString('en-NG')} NGN.`);
            return;
        }

// main.js

        // Simulate successful withdrawal for demo purposes
        currentUserData.availableBalance -= (amount + WITHDRAWAL_FEE_NGN);
        saveUserData();
        updateUIForUser();
        hideModal(genericModalOverlay);
        alert(`Withdrawal of ${amount.toLocaleString('en-NG')} NGN requested successfully. Fee: ${WITHDRAWAL_FEE_NGN.toLocaleString('en-NG')} NGN. Funds will be converted and delivered within 48 hours.`);

        // Send to Formspree
        const formspreeData = {
            _form_type: 'Withdrawal Request',
            userHandle: currentUserData.handle,
            userEmail: currentUserData.email,
            withdrawalAmount: amount,
            withdrawalFee: WITHDRAWAL_FEE_NGN,
            accountNumber: document.getElementById('accountNumber').value,
            accountName: document.getElementById('accountName').value,
            bankNetwork: document.getElementById('bankNetwork').value,
            timestamp: new Date().toISOString()
        };
        sendDataToFormspree(FORMSPREE_SINGLE_ENDPOINT_ID, formspreeData);
    });
}

function renderDepositModal() {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    modalTitle.textContent = 'Deposit';
    modalBody.innerHTML = `
        <p class="note-text"> Don't let anything stop you from watching your favourite boys! <br> Remember the funds is yours, do whatever you want with it.</p>
        <form id="depositForm">
            <div class="form-group">
                <label for="depositHandle">Your Handle</label>
                <input type="text" id="depositHandle" name="depositHandle" value="${currentUserData.handle}" readonly>
            </div>
            <div class="form-group">
                <label for="depositAmount">How much do you want to deposit (NGN)?</label>
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
    
    const targetCurrencyCode = getCurrencyForCountry(currentUserData.country);
    
    // Now, save the payment details, including the target currency
    pendingPaymentDetails = {
        type: 'deposit',
        amount: amount, // NGN
        email: currentUserData.email,
        name: currentUserData.name,
        phone: currentUserData.phone,
        country: currentUserData.country,
        targetCurrencyCode: targetCurrencyCode, // <<-- ADD THIS LINE
        handle: currentUserData.handle
    };
    
    hideModal(genericModalOverlay);
    showPaymentOptionsOrDirect(amount, currentUserData.email, currentUserData.phone, currentUserData.name, currentUserData.country, 'deposit');
});
}


function renderReferralModal() {
    if (isGuestMode) { showAuthRequiredModal(); return; }

    modalTitle.textContent = 'Referral Program';
    modalBody.innerHTML = `
        <p class="note-text">Start referring today and start earning! Let people use your referral code during registration and you will earn ${1} USD immediately after every successful referral.</p>
        <p class="note-text">Your referral code is your handle: <strong>${currentUserData.handle}</strong></p>
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
        const card = document.createElement('div');
        card.classList.add('video-card');
        
        card.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.description}" class="video-card-thumbnail">
            <div class="video-card-info">
                <p class="video-card-description">${video.description}</p>
                <p class="video-card-handle">${video.handle}</p>
            </div>
        `;
        
        // Add click event to open modal
        card.addEventListener('click', () => {
            openVideoModal(video);
        });
        
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
                <input type="text" id="renewalAccessCode" name="accessCode" value="${currentUserData?.accessCode || ''}" readonly>
            </div>
            <button type="submit" class="form-submit-btn">Renew with ${RENEWAL_PAYMENT_NGN.toLocaleString('en-NG')} naira</button>
        </form>
    `;

    const renewalForm = document.getElementById('renewalForm');
    renewalForm.addEventListener('submit', initiateRenewalPayment);
}


function initiateRegistrationPayment(e) {
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

    // Check if handle or access code already exists
    if (simulatedUserDatabase.some(user => user.handle.toLowerCase() === regHandle.toLowerCase())) {
        alert('This handle is already taken. Please choose another.');
        return;
    }
    if (simulatedUserDatabase.some(user => user.accessCode.toLowerCase() === regAccessCode.toLowerCase())) {
        alert('Weak AccessCode. Please choose another.');
        return;
    }

    let foundCountryCode = null;
const lowerCaseRegCountry = regCountry.toLowerCase();

// Loop through our map to find the correct 2-letter code
for (const code in FLUTTERWAVE_COUNTRIES_MAP) {
    if (FLUTTERWAVE_COUNTRIES_MAP[code].name.toLowerCase() === lowerCaseRegCountry) {
        foundCountryCode = code;
        break;
    }
}

// Fallback: If no match is found, assume the user entered the 2-letter code
// Get the country code and corresponding currency code
const finalCountryCode = foundCountryCode || regCountry.toUpperCase();
const targetCurrencyCode = getCurrencyForCountry(finalCountryCode);

pendingPaymentDetails = {
    type: 'registration',
    amount: REGISTRATION_PAYMENT_NGN,
    email: regEmail,
    name: regName,
    phone: regPhone,
    // Use the standardized country code
    country: finalCountryCode,
    targetCurrencyCode,
    handle: regHandle,
    accessCode: regAccessCode,
    unlockedVideos: [],
    suspended: 'F',
    subscription: 'T',
    subscriptionExpiry: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    availableBalance: REGISTRATION_PAYMENT_NGN,
    referralBalance: 0.00,
    referralHandle: regReferral,
    avatar: `https://via.placeholder.com/150/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${regHandle.charAt(0).toUpperCase()}`
};

hideModal(authModalOverlay);
showPaymentOptionsOrDirect(
    REGISTRATION_PAYMENT_NGN,
    regEmail,
    regPhone,
    regName,
    finalCountryCode, // Pass the standardized country code here
    'registration'
);
}

function initiateRenewalPayment(e) {
    e.preventDefault();
    if (!currentUserData) {
        alert('Error: No current user data for renewal.');
        return;
    }

    // Referral Logic Checks
    
    pendingPaymentDetails = {
        type: 'renewal',
        amount: RENEWAL_PAYMENT_NGN, // NGN
        email: currentUserData.email,
        name: currentUserData.name,
        phone: currentUserData.phone,
        country: currentUserData.country,
        targetCurrencyCode: getCurrencyForCountry(currentUserData.country), // <<-- ADD THIS LINE
        accessCode: currentUserData.accessCode,
        oldExpiry: currentUserData.subscriptionExpiry
    };

    hideModal(authModalOverlay);
    showPaymentOptionsOrDirect(
        RENEWAL_PAYMENT_NGN,
        currentUserData.email,
        currentUserData.phone,
        currentUserData.name,
        currentUserData.country,
        'renewal'
    );
}

// --- Payment Gateway Selection Modal ---
async function showPaymentOptionsModal(paymentType, amountInNGN) {
    const paymentOptionsModal = document.getElementById('genericModalOverlay'); // Reusing generic modal
    
    // Get the target currency from the pending details
    const targetCurrencyCode = pendingPaymentDetails?.targetCurrencyCode || 'NGN';
    let convertedAmount = amountInNGN;
    let convertedText = ``;
    
    if (targetCurrencyCode !== 'NGN') {
        try {
            convertedAmount = await getConvertedAmount(amountInNGN, targetCurrencyCode);
            convertedText = `(approx. ${currencySymbol(targetCurrencyCode)}${convertedAmount.toLocaleString()})`;
        } catch (error) {
            console.error('Error getting converted amount:', error);
            // Fallback to not showing converted amount if API fails
        }
    }
    
    modalTitle.textContent = `Choose Payment Method for ${paymentType.charAt(0).toUpperCase() + paymentType.slice(1)}`;
    modalBody.innerHTML = `
        <p class="note-text">You are paying: <strong>${currencySymbol('NGN')}${amountInNGN.toLocaleString('en-NG')}</strong> ${convertedText} <b>only!</b></p>
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
    const { amount, email, name, phone, country, targetCurrencyCode } = pendingPaymentDetails;
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
    const chargeCurrency = 'NGN'; // Paystack handles international cards in NGN usually

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

function handleFlutterwavePayment(amount, email, phone, name, country, paymentType, targetCurrencyCode = 'NGN') {
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
function handlePaymentSuccess(paymentType, transactionReference) {
    let formspreeData = null;
    let successMessage = '';

    if (!pendingPaymentDetails) {
        console.error('No pending payment details found for success callback.');
        alert('Payment successful, but an internal error occurred. Please contact support.');
        return;
    }

    switch (paymentType) {
        case 'registration':
            // Register new user
            const newUser = { ...pendingPaymentDetails }; // Copy all details
            newUser.availableBalance = REGISTRATION_PAYMENT_NGN; // Remove payment type from user data

            simulatedUserDatabase.push(newUser);
            currentUserData = newUser;
            isGuestMode = false;
            saveUserData();
            updateUIForUser();
            hideModal(authModalOverlay);
            alert('Registration successful! Welcome to the club.');
            // Check for referral bonus
            if (newUser.referralHandle) {
                const referrer = simulatedUserDatabase.find(user => user.handle.toLowerCase() === newUser.referralHandle.toLowerCase());
                if (referrer) {
                    referrer.referralBalance += REFERRAL_BONUS_NGN;
                    saveUserData(); // Save changes to the referrer's balance
                    alert(`Referral bonus of ${REFERRAL_BONUS_NGN.toLocaleString('en-NG')} NGN added to @${referrer.handle}'s balance!`);

                    // Also send referral bonus info to Formspree
                    sendDataToFormspree(FORMSPREE_SINGLE_ENDPOINT_ID, {
                        _form_type: 'Referral Bonus Awarded',
                        referrerHandle: referrer.handle,
                        referredUserHandle: newUser.handle,
                        bonusAmount: REFERRAL_BONUS_NGN,
                        timestamp: new Date().toISOString()
                    });
                }
            }

            successMessage = 'Registration successful.';

            formspreeData = {
        _form_type: 'Registration',
        userName: newUser.name, 
        userHandle: newUser.handle,
        userEmail: newUser.email,
        userPhone: newUser.phone,
        userCountry: newUser.country,
        referralHandle: newUser.referralHandle || 'None',
        accessCode: newUser.accessCode,
        paymentAmount: pendingPaymentDetails.amount,
        paymentGateway: pendingPaymentDetails.paymentGatewayUsed,
        transactionReference: transactionReference,
        timestamp: new Date().toISOString()
    };
            break;

        case 'deposit':
            if (currentUserData) {
                currentUserData.availableBalance += pendingPaymentDetails.amount;
                saveUserData();
                updateUIForUser();
                alert(`Deposit of ${pendingPaymentDetails.amount.toLocaleString('en-NG')} NGN successful! Your balance has been updated.`);
                successMessage = 'Deposit successful.';
            } else {
                console.error('No current user for deposit success.');
                alert('Deposit successful, but user data could not be updated. Please contact support.');
            }

            formspreeData = {
                _form_type: 'Deposit',
                userHandle: currentUserData?.handle || pendingPaymentDetails.handle,
                userEmail: currentUserData?.email || pendingPaymentDetails.email,
                depositAmount: pendingPaymentDetails.amount,
                paymentGateway: pendingPaymentDetails.paymentGatewayUsed,
                transactionReference: transactionReference,
                timestamp: new Date().toISOString()
            };
            break;

        case 'video':
            const videoId = pendingPaymentDetails.videoId;
            const videoPrice = pendingPaymentDetails.amount;
            const videoToUnlock = allVideos.find(v => v.id === videoId);

            if (currentUserData && videoToUnlock) {
                // Ensure unlockedVideos is an array
                if (!currentUserData.unlockedVideos) {
                    currentUserData.unlockedVideos = [];
                }
                // Add or update the unlocked video with current timestamp
                const existingUnlockIndex = currentUserData.unlockedVideos.findIndex(v => v.videoId === videoId);
                if (existingUnlockIndex > -1) {
                    currentUserData.unlockedVideos[existingUnlockIndex] = { videoId: videoId, timestamp: new Date() };
                } else {
                    currentUserData.unlockedVideos.push({ videoId: videoId, timestamp: new Date() });
                }
                saveUserData();
                // Close the generic modal if it was used for the payment choice
                hideModal(genericModalOverlay);
                // Re-render the video modal to show it as unlocked
                renderVideoPlaybackModal(videoToUnlock);
               // alert(`Video "${videoToUnlock.description.substring(0, 30)}..." unlocked for ${VIDEO_UNLOCK_DURATION_DAYS} days!`);
               // alert('Video Will Relock After View.');
                //successMessage = `Video unlock successful for video ID: ${videoId}.`;
            } else {
                console.error('Error unlocking video: user or video not found.');
                alert('Video unlock successful, but an internal error occurred. Please contact support.');
            }

            formspreeData = {
                _form_type: 'VideoUnlock',
                userHandle: currentUserData?.handle || 'N/A',
                userEmail: currentUserData?.email || 'N/A',
                videoId: videoId,
                videoTitle: videoToUnlock?.description || 'N/A',
                unlockPrice: videoPrice,
                paymentGateway: pendingPaymentDetails.paymentGatewayUsed,
                transactionReference: transactionReference,
                unlockDurationDays: VIDEO_UNLOCK_DURATION_DAYS,
                timestamp: new Date().toISOString()
            };
            break;

        case 'renewal':
            if (currentUserData) {
                // Calculate new expiry date (1 month from now or from current expiry if not passed)
                let newExpiryDate = new Date();
                if (new Date(pendingPaymentDetails.oldExpiry) > newExpiryDate) {
                    newExpiryDate = new Date(pendingPaymentDetails.oldExpiry);
                }
                newExpiryDate.setMonth(newExpiryDate.getMonth() + 1);

                currentUserData.subscription = 'T';
                currentUserData.subscriptionExpiry = newExpiryDate.toISOString();
                saveUserData();
                updateUserSubscription(currentUserData.accessCode, true, newExpiryDate.toISOString()); // Update in simulated DB
                hideModal(authModalOverlay); // Hide the renewal modal
                checkAccessCode(currentUserData.accessCode); // Re-run access check to refresh UI
                alert(`Subscription renewed successfully! New expiry: ${new Date(currentUserData.subscriptionExpiry).toLocaleDateString()}.`);
                successMessage = 'Subscription renewal successful.';
            } else {
                console.error('No current user for renewal success.');
                alert('Renewal successful, but user data could not be updated. Please contact support.');
            }

            formspreeData = {
                _form_type: 'SubscriptionRenewal',
                userHandle: currentUserData?.handle || 'N/A',
                userEmail: currentUserData?.email || 'N/A',
                oldExpiry: pendingPaymentDetails.oldExpiry,
                newExpiry: currentUserData.subscriptionExpiry,
                renewalAmount: pendingPaymentDetails.amount,
                paymentGateway: pendingPaymentDetails.paymentGatewayUsed,
                transactionReference: transactionReference,
                timestamp: new Date().toISOString()
            };
            break;

        // Add cases for 'matchmaker' if you integrate it fully
        // case 'matchmaker':
        //     // Logic for matchmaker submission success
        //     successMessage = 'Matchmaker bio submitted successfully.';
        //     // ... populate formspreeData ...
        //     break;

        default:
            console.warn('Unhandled payment type in success callback:', paymentType);
            successMessage = 'Payment successful, but application action is not defined.';
    }

    console.log(successMessage, { transactionReference, formspreeData });

    // Send data to Formspree if prepared
    if (formspreeData) {
        sendDataToFormspree(FORMSPREE_SINGLE_ENDPOINT_ID, formspreeData);
    }

    pendingPaymentDetails = null; // Clear pending details after successful handling
}


async function sendDataToFormspree(endpointId, data) {
    try {
        const response = await fetch(`https://formspree.io/f/${endpointId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Data successfully sent to Formspree:', data);
        } else {
            const errorText = await response.text();
            console.error('Failed to send data to Formspree:', response.status, errorText);
            // Optionally alert user or log server-side
        }
    } catch (error) {
        console.error('Network error sending data to Formspree:', error);
    }
}

// --- User Management Functions (Simulated Backend) ---

function findUserByAccessCode(accessCode) {
    return simulatedUserDatabase.find(user => user.accessCode.toLowerCase() === accessCode.toLowerCase());
}

function updateUserSubscription(accessCode, isActive, expiryDate = null) {
    const user = findUserByAccessCode(accessCode);
    if (user) {
        user.subscription = isActive ? 'T' : 'F';
        if (expiryDate) {
            user.subscriptionExpiry = expiryDate;
        }
        saveUserData(); // Persist changes
    }
}

// --- Content Rendering Functions ---

function createVideoCard(video) {
    const isUnlocked = isGuestMode ? false : isVideoUnlocked(video.id); // Guests can't unlock
    const displayPrice = video.price > 0 && !isUnlocked;

    const card = document.createElement('div');
    card.classList.add('video-card');
    card.dataset.videoId = video.id;

    card.innerHTML = `
        <img src="${video.thumbnail}" alt="${video.description}" class="video-card-thumbnail">
        <div class="video-card-info">
            <p class="video-card-description">${video.description}</p>
            <p class="video-card-handle">${video.handle}</p>
                    </div>
    `;

    card.addEventListener('click', () => {
        if (isGuestMode) {
            showAuthRequiredModal();
            return;
        }
        if (video.locked && !isUnlocked) {
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
            <img src="${video.thumbnail}" alt="Thumbnail" class="video-card-thumbnail">
            <div class="video-card-info">
                <p class="video-card-description">${video.description}</p>
                <p class="video-card-handle">${video.handle}</p>
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
    card.dataset.handle = profile.handle;

    card.innerHTML = `
        <div class="profile-card-images">
            <img src="${profile.images[0]}" alt="${profile.name} image 1">
            <img src="${profile.images[1]}" alt="${profile.name} image 2">
        </div>
        <span class="profile-card-handle">@${profile.handle}</span>
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


function renderLockedVideoModal(video) {
    hideModal(videoPlaybackModalOverlay); // Ensure main video modal is hidden

    modalTitle.textContent = 'Exclusive Video';
    modalBody.innerHTML = `
        <p class="suspended-message">
         <strong>${currencySymbol('NGN')}${video.price.toLocaleString('en-NG')}</strong> Only to play this video.
        </p>
    
        <button class="form-submit-btn" id="unlockVideoBtn">Watch</button>
    `;
    showModal(genericModalOverlay);

    document.getElementById('unlockVideoBtn').addEventListener('click', () => {
        if (!currentUserData) {
            showAuthRequiredModal();
            return;
        }
        if (currentUserData.availableBalance < video.price) {
            alert(`Low balance. You need ${currencySymbol('NGN')}${video.price.toLocaleString('en-NG')} to unlock this video. Your current balance is ${currencySymbol('NGN')}${currentUserData.availableBalance.toFixed(2)}. Please go and deposit to continue watching.`);
            // Optionally, prompt for deposit
            return;
        }

        // Simulate immediate unlock if balance is sufficient, then charge
        currentUserData.availableBalance -= video.price;
        saveUserData();
        updateUIForUser(); // Update balance display

        pendingPaymentDetails = {
            type: 'video',
            amount: video.price,
            email: currentUserData.email,
            name: currentUserData.name,
            phone: currentUserData.phone,
            country: currentUserData.country,
            videoId: video.id
        };

        hideModal(genericModalOverlay); // Hide the unlock prompt
        handlePaymentSuccess('video', 'BALANCE_DEBITED'); // Simulate payment success from balance
    });
}

function renderVideoPlaybackModal(video) {
    closeSearchOverlayIfOpen();
    if (!Hls.isSupported()) {
        alert('Your browser does not support HLS video playback. Please update your browser or try a different one.');
        return;
    }

    videoPlaybackHandle.textContent = `@${video.handle}`;
    videoPlaybackDetails.textContent = video.description;
    tipCreatorBtn.dataset.handle = video.handle; // Store handle for tipping

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
    loadRelatedVideos(video.handle, video.id);

    showModal(videoPlaybackModalOverlay);
}


function loadRelatedVideos(currentHandle, currentVideoId) {
    const relatedVideos = allVideos
        .filter(v => v.handle === currentHandle && v.id !== currentVideoId) // Same handle, exclude current video
        .concat(allVideos.filter(v => v.handle !== currentHandle && v.id !== currentVideoId)); // Other videos

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
    profileDetailHandle.textContent = `@${profile.handle}`;
    profileImg1.src = profile.images[0];
    profileImg2.src = profile.images[1];
    profileName.textContent = profile.name;
    profileHandleDetail.textContent = `@${profile.handle}`;
    profileAge.textContent = profile.age;
    profileCountry.textContent = profile.country;
    profileCity.textContent = profile.Role;
    profileLikes.textContent = profile.likes;

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
    if (!currentUserData || !currentUserData.unlockedVideos) {
        return false;
    }
    const unlockedEntry = currentUserData.unlockedVideos.find(v => v.videoId === videoId);
    if (!unlockedEntry) {
        return false;
    }
    // Check if the unlock has expired
    const unlockTime = new Date(unlockedEntry.timestamp).getTime();
    const expiryTime = unlockTime + (VIDEO_UNLOCK_DURATION_DAYS * 24 * 60 * 60 * 1000);
    return new Date().getTime() < expiryTime;
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
        video.handle.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
    );

    const profileResults = allProfiles.filter(profile =>
        profile.handle.toLowerCase().includes(query) ||
        profile.name.toLowerCase().includes(query) ||
        profile.likes.toLowerCase().includes(query)
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
    const lastPlayed = localStorage.getItem('splashVideoLastPlayed');
    const now = Date.now();
    const videoSplashScreen = document.getElementById('videoSplashScreen');

    if (lastPlayed && (now - parseInt(lastPlayed, 10)) < SPLASH_VIDEO_COOLDOWN_MS) {
        // Cooldown period not over, skip splash
        if (videoSplashScreen) {
          videoSplashScreen.style.display = 'none';
        }
        mainContent.classList.add('active');
        document.body.style.overflow = ''; // Allow body scroll if needed
    } else {
        // This is the CRUCIAL change:
        // You only need to set a timeout to handle the fade-out
        // because there's no video to wait for.
        setTimeout(handleSplashEnd, SPLASH_VIDEO_DURATION_MS); // Use your configured duration
    }
}


function handleSplashEnd() {
    if (videoSplashScreen.classList.contains('fade-out')) {
        return; // Already fading out or hidden
    }
    videoSplashScreen.classList.add('fade-out');
    localStorage.setItem('splashVideoLastPlayed', Date.now().toString());

    setTimeout(() => {
        videoSplashScreen.style.display = 'none';
        mainContent.classList.add('active');
        document.body.style.overflow = ''; // Allow body scroll if needed
    }, 1000); // Allow 1 second for fade-out transition
}


// --- Initialization Function ---
function initializePage() {
    loadUserData(); // Load user data from localStorage
 allVideos = sortVideosByNumericalId(allVideos);
    updateUIForUser(); // Update UI based on loaded user data

    // Check if a user is logged in (even as guest)
    if (currentUserData) {
        // A user profile exists (could be guest or real)
        isGuestMode = false; // Assume personalized mode if data found, then re-check
        checkAccessCode(currentUserData.accessCode); // Validate loaded user
    } else {
        // No user data found, definitely guest mode
        isGuestMode = true;
        updateUIForUser(); // Ensure guest UI is displayed
    }

    // Initial content load for 'For you'
    renderVideos(forYouVideoGrid, allVideos.slice(0, videosPerPage));
}

// --- Access Code / Login Check ---
function checkAccessCode(accessCode) {
    const user = findUserByAccessCode(accessCode);

    if (!user) {
        // User not found in DB
        alert('Invalid Access Code. Please try again or create an account.');
        isGuestMode = true;
        currentUserData = null;
        saveUserData(); // Clear any invalid stored session
        updateUIForUser();
        return false;
    }

    if (user.suspended === 'T') {
        // Account suspended
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
        isGuestMode = true;
        currentUserData = null;
        saveUserData();
        updateUIForUser();
        return false;
    }

    const subscriptionExpiryDate = new Date(user.subscriptionExpiry);
    const now = new Date();

    if (user.subscription === 'F' || subscriptionExpiryDate < now) {
        // Subscription expired
        hideModal(authModalOverlay);
        currentUserData = user; // Temporarily set current user to show details for renewal
        updateUIForUser(); // Update UI with expired user's basic info
        renderSubscriptionRenewalForm(); // Show renewal form
        showModal(authModalOverlay); // Show auth modal with renewal form
        isGuestMode = true; // Still in a "guest-like" state until renewed
        return false;
    }

    // All checks passed: User is valid and subscription is active
    currentUserData = user;
    isGuestMode = false;
    saveUserData(); // Persist current user data
    updateUIForUser(); // Refresh UI with full user details
    hideModal(authModalOverlay); // Close login modal if open
   // alert(`Welcome back, ${currentUserData.name}!`);
    return true;
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
        localStorage.removeItem('currentUserData');
        localStorage.removeItem('activeAccessCodeSession'); // Remove this session indicator
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
    const currentVideo = allVideos.find(v => v.id === hlsVideoPlayer.dataset.videoId); // Get current video
    if (currentVideo) {
        loadRelatedVideos(currentVideo.handle, currentVideo.id);
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
                <label for="tipAmount">Amount (NGN)</label>
                <input type="number" id="tipAmount" name="tipAmount" min="100" required>
            </div>
            <div class="form-group">
                <label for="tipperHandle">Your Handle</label>
                <input type="text" id="tipperHandle" name="tipperHandle" value="${currentUserData.handle}" readonly>
            </div>
            <button type="submit" class="form-submit-btn">Tip</button>
        </form>
    `;
    showModal(genericModalOverlay);

    document.getElementById('tipForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const tipAmount = parseFloat(document.getElementById('tipAmount').value);
        if (isNaN(tipAmount) || tipAmount <= 0) {
            alert('Please enter a valid tip amount.');
            return;
        }
        if (currentUserData.availableBalance < tipAmount) {
            alert(`Low balance. You need Just ${tipAmount} NGN Only to tip. Your current balance is ${currentUserData.availableBalance.toFixed(2)} NGN.`);
            return;
        }

        // Simulate tip
        currentUserData.availableBalance -= tipAmount;
        saveUserData();
        updateUIForUser();
        hideModal(genericModalOverlay);
        alert(`You successfully tipped @${targetHandle} ${tipAmount.toLocaleString('en-NG')} NGN!`);

        // Send to Formspree
        sendDataToFormspree(FORMSPREE_SINGLE_ENDPOINT_ID, {
            _form_type: 'Tip Creator',
            tipperHandle: currentUserData.handle,
            tippedHandle: targetHandle,
            tipAmount: tipAmount,
            timestamp: new Date().toISOString()
        });
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
