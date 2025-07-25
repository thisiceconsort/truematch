// Existing users - added subscriptionExpires for testing
const hardcodedUsers = [
  {
        name: 'Abdallah Afaridjan',
        email: 'abdallahafaridjan@gmail.com',
        phone: '0242023867',
        country: 'Ghana',
        accessCode: '3487ABD',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Marvin Hush',
        email: 'marvinhush@yahoo.com',
        phone: '+2348160791600',
        country: 'Nigeria',
        accessCode: '1983ABC',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+2348012345678',
        country: 'Nigeria',
        accessCode: '3214JOH',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Sam Esom',
        email: 'orjisamuel19@gmail.com',
        phone: '+2347067411418',
        country: 'Nigeria',
        accessCode: '2559SOM',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Chinetu Emmanuel',
        email: 'chinetuemmanuel@gmail.com',
        phone: '+2349071375250',
        country: 'Nigeria',
        accessCode: '1058CHI',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Micah Samuel',
        email: 'micahblaq1@gmail.com',
        phone: '+31652560594',
        country: 'Netherlands',
        accessCode: '5442BLA',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Barnabas Chidindu',
        email: 'chidindubarnabasiwuafor@gmail.com',
        phone: '+2348066448413',
        country: 'Nigeria',
        accessCode: '1234BAN',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Emsley Izunna',
        email: 'emsleyizunna@gmail.com',
        phone: '+2348081848198',
        country: 'Nigeria',
        accessCode: '1234IZU',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Ezumaibe Kelechiukwu',
        email: 'sunshineworldcomputers@yahoo.com',
        phone: '+2349079244440',
        country: 'Nigeria',
        accessCode: '2025ABC',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Peter obiakonwa',
        email: 'peterobiakonwa@gmail.com',
        phone: '+2347048711326',
        country: 'Nigeria',
        accessCode: '2001SHE',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Agalee Ifeanyi',
        email: 'agaleeifeanyi@gmail.com',
        phone: '+2349057014199',
        country: 'Nigeria',
        accessCode: '5555OKA',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Denrele Philips',
        email: 'dphilips1122@gmail.com',
        phone: '+2349076621945',
        country: 'Nigeria',
        accessCode: '1414ABC',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Franklin Afola',
        email: 'pe6970172@gmail.com',
        phone: '+2349038116390',
        country: 'Nigeria',
        accessCode: '1997FRA',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Chidinma Iheanachor',
        email: 'lightsolomon210eli@gmail.com',
        phone: '+2348128678246',
        country: 'Nigeria',
        accessCode: '6754IKE',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Onyeka Arimonu',
        email: 'omegachris@gmail.com',
        phone: '+23481342..725',
        country: 'Nigeria',
        accessCode: '1345ADC',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Osmond Echezona',
        email: 'echezonaosmond@gmail.com',
        phone: '+2348061452349',
        country: 'Nigeria',
        accessCode: '5602ECH',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Modestus Chukwudalu',
        email: 'echezonaosmond@gmail.com',
        phone: '+2348061452349',
        country: 'Nigeria',
        accessCode: '2349ECH',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        name: 'Emmanuel Edet',
        email: 'okoney12@gmail.com',
        phone: '+2348121272626',
        country: 'Nigeria',
        accessCode: '1234OKO',
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }

    // Add more here
];


const storedUsers = JSON.parse(localStorage.getItem('simulatedUserDatabase')) || [];

const simulatedUserDatabase = [
    ...hardcodedUsers,
    ...storedUsers.filter(
        user => !hardcodedUsers.some(base => base.accessCode === user.accessCode)
    )
];

let currentUserData = null; // Stores currently logged-in user's data
let activeAccessCodeSession = null; // Stores the access code of the currently active session

// Constants for payment amounts
const REGISTRATION_PAYMENT_NGN = 1100;
const VIDEO_UNLOCK_BASE_NGN = 500; // Base, but specific video prices override
const MATCHMAKER_PAYMENT_NGN = 500;
const SUBSCRIPTION_RENEWAL_NGN = 550; // New constant for renewal

// Formspree URL for Matchmaker form submission
const FORMSPREE_MATCHMAKER_URL = 'https://formspree.io/f/xovdrlby'; // REPLACE WITH YOUR ACTUAL FORMSPREE URL

// Dummy Payment Gateway Keys (REPLACE WITH YOUR ACTUAL LIVE KEYS!)
const PAYSTACK_PUBLIC_KEY = 'pk_live_6b671064b6a716c1ceffe82bf20a28c317a69584'; // Replace with your Paystack Public Key
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-55e5d0e754e7da9baacac6e2cb4e04ac-X'; // Replace with your Flutterwave Public Key

// Flutterwave Country Channels Map (simplified)
const FLUTTERWAVE_COUNTRIES_MAP = {
    "Nigeria": { code: "NG", currency: "NGN", channels: ["card", "banktransfer", "ussd", "mobilemoney"] },
    "Ghana": { code: "GH", currency: "GHS", channels: ["mobilemoneyghana"] },
    "Kenya": { code: "KE", currency: "KES", channels: ["mpesa"] },
    "South Africa": { code: "ZA", currency: "ZAR", channels: ["ussd", "card"] }, // Example for ZA, might need more specific channels
    "Uganda": { code: "UG", currency: "UGX", channels: ["mobilemoneyuganda"] },
    "Tanzania": { code: "TZ", currency: "TZS", channels: ["mobilemoneytanzania"] },
    "Cameroon": { code: "CM", currency: "XAF", channels: ["mobilemoneyfranco"] },
    "Rwanda": { code: "RW", currency: "RWF", channels: ["mobilemoneyrwanda"] },
    "Zambia": { code: "ZM", currency: "ZMW", channels: ["mobilemoneyzambia"] },
    "Ivory Coast": { code: "CI", currency: "XOF", channels: ["mobilemoneyfranco"] },
    "Senegal": { code: "SN", currency: "XOF", channels: ["mobilemoneyfranco"] },
    "Benin": { code: "BJ", currency: "XOF", channels: ["mobilemoneyfranco"] },
    "Burkina Faso": { code: "BF", currency: "XOF", channels: ["mobilemoneyfranco"] },
    "Mali": { code: "ML", currency: "XOF", channels: ["mobilemoneyfranco"] },
    "Niger": { code: "NE", currency: "XOF", channels: ["mobilemoneyfranco"] },
    "Togo": { code: "TG", currency: "XOF", channels: ["mobilemoneyfranco"] },
    // Add other African countries as needed
    "United States": { code: "US", currency: "USD", channels: ["card"] },
    "United Kingdom": { code: "GB", currency: "GBP", channels: ["card"] },
    "Canada": { code: "CA", currency: "CAD", channels: ["card"] },
    "Australia": { code: "AU", currency: "AUD", channels: ["card"] },
    "Germany": { code: "DE", currency: "EUR", channels: ["card"] },
    // Add more countries as supported by Paystack/Flutterwave
};


function isAccessValid() {
    if (!currentUserData || !currentUserData.accessCode) {
        return false;
    }
    const userInDb = simulatedUserDatabase.find(user => user.accessCode === currentUserData.accessCode);

    // Check if user exists in DB and the active session code matches (prevents multiple active sessions with one code)
    if (!userInDb || userInDb.accessCode !== activeAccessCodeSession) {
        return false;
    }

    // Check subscription expiry
    if (userInDb.subscriptionExpires) {
        const expiryDate = new Date(userInDb.subscriptionExpires);
        if (expiryDate < new Date()) {
            // Subscription has expired
            console.log(`User ${userInDb.accessCode} subscription expired.`);
            return '#expired'; // Return a special flag for expired
        }
    }
    return true; // Access is valid and subscription is active/not set
}


function checkAccessCode() {
    const accessCodeInput = document.getElementById('accessCode');
    const accessMessage = document.getElementById('accessMessage');
    const accessCode = accessCodeInput.value.trim().toUpperCase();

    accessCodeInput.classList.remove('invalid');
    accessMessage.textContent = '';

    const user = simulatedUserDatabase.find(u => u.accessCode === accessCode);

    if (user) {
        // Check if this access code is already active in another session (simple local storage check)
        const storedActiveSessionCode = localStorage.getItem('activeAccessCodeSession');
        if (storedActiveSessionCode && storedActiveSessionCode !== accessCode) {
            accessMessage.textContent = 'This access code is currently active on another device/browser. Please log out there first.';
            accessMessage.classList.add('error');
            accessCodeInput.classList.add('invalid');
            return;
        }

        currentUserData = user;
        localStorage.setItem('currentUserData', JSON.stringify(currentUserData)); // Store current user session
        localStorage.setItem('activeAccessCodeSession', accessCode); // Mark this code as active

        // Check for subscription expiry
        const subscriptionStatus = isAccessValid();
        if (subscriptionStatus === '#expired') {
            showExpiredSubscriptionModal();
            return; // Stop login process, prompt for renewal
        }

        // Valid access and not expired
        document.getElementById('accessCodeModal').style.display = 'none';
        document.getElementById('mainContent').style.display = 'flex';
        document.getElementById('logoutIcon').style.display = 'flex'; // Show logout icon
        updateUserProfileDisplay();
        renderVideos(0, videosPerPage, videosData); // Load initial videos
        updateLoadMoreButtonVisibility();
        accessMessage.classList.remove('error');
        accessMessage.textContent = ''; // Clear message on success
    } else {
        accessMessage.textContent = 'Invalid Access Code. Please try again or create an account.';
        accessMessage.classList.add('error');
        accessCodeInput.classList.add('invalid');
    }
}

function logoutUser() {
    currentUserData = null;
    localStorage.removeItem('currentUserData');
    localStorage.removeItem('activeAccessCodeSession'); // Clear active session marker
    localStorage.removeItem('accessTimestamp'); // Clear any old timestamp

    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('logoutIcon').style.display = 'none';
    document.getElementById('videoPlayer').pause();
    document.getElementById('videoPlayer').src = '';
    document.getElementById('videoPlaybackOverlay').style.display = 'none';

    // Reset modals and show access code modal
    hideRegistrationModal();
    hidePaymentOptionsModal();
    hideExpiredSubscriptionModal();
    hideBuyVideoModal();
    hideSellVideoModal();
    hideMatchDisplayModal();
    hideMatchmakerModal();
    hideTermsModal();

    showAccessCodeModal('You have been logged out. Please enter your access code to view content.');
}

function registerNewUser(name, email, phone, country, accessCode) {
    const newUser = {
        name: name,
        email: email,
        phone: phone,
        country: country,
        accessCode: accessCode,
        unlockedVideos: [],
        subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 1 month subscription
    };
    simulatedUserDatabase.push(newUser);
    localStorage.setItem('simulatedUserDatabase', JSON.stringify(simulatedUserDatabase));
    return newUser;
}

// Function to update a user's subscription expiry in the database
function updateUserSubscription(accessCode, newExpiryDate) {
    const userIndex = simulatedUserDatabase.findIndex(user => user.accessCode === accessCode);
    if (userIndex !== -1) {
        simulatedUserDatabase[userIndex].subscriptionExpires = newExpiryDate.toISOString();
        localStorage.setItem('simulatedUserDatabase', JSON.stringify(simulatedUserDatabase));
        // Also update currentUserData if it's the active user
        if (currentUserData && currentUserData.accessCode === accessCode) {
            currentUserData.subscriptionExpires = newExpiryDate.toISOString();
            localStorage.setItem('currentUserData', JSON.stringify(currentUserData));
        }
        console.log(`User ${accessCode} subscription updated to: ${newExpiryDate.toISOString()}`);
    }
}
