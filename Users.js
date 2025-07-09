// Existing users - added subscriptionExpires for testing
const hardcodedUsers = [
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
];

const storedUsers = JSON.parse(localStorage.getItem('simulatedUserDatabase')) || [span_0](start_span)[];[span_0](end_span)

const simulatedUserDatabase = [
    [span_1](start_span)...hardcodedUsers,[span_1](end_span)
    [span_2](start_span)...storedUsers.filter([span_2](end_span)
        user => !hardcodedUsers.some(base => base.accessCode === user.accessCode)
    )
];

let currentUserData = null; [span_3](start_span)// Stores currently logged-in user's data[span_3](end_span)
let activeAccessCodeSession = null; [span_4](start_span)// Stores the access code of the currently active session[span_4](end_span)

// Constants for payment amounts
[span_5](start_span)const REGISTRATION_PAYMENT_NGN = 1500;[span_5](end_span)
const VIDEO_UNLOCK_BASE_NGN = 500; [span_6](start_span)// Base, but specific video prices override[span_6](end_span)
[span_7](start_span)const MATCHMAKER_PAYMENT_NGN = 500;[span_7](end_span)
const SUBSCRIPTION_RENEWAL_NGN = 1100; [span_8](start_span)// New constant for renewal[span_8](end_span)

// Formspree URL for Matchmaker form submission
const FORMSPREE_MATCHMAKER_URL = 'https://formspree.io/f/xovdrlby'; [span_9](start_span)// REPLACE WITH YOUR ACTUAL FORMSPREE URL[span_9](end_span)

// Dummy Payment Gateway Keys (REPLACE WITH YOUR ACTUAL LIVE KEYS!)
const PAYSTACK_PUBLIC_KEY = 'pk_live_6b671064b6a716c1ceffe82bf20a28c317a69584'; [span_10](start_span)// Replace with your Paystack Public Key[span_10](end_span)
const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-55e5d0e754e7da9baacac6e2cb4e04ac-X'; [span_11](start_span)// Replace with your Flutterwave Public Key[span_11](end_span)

// Flutterwave Country Channels Map (simplified)
const FLUTTERWAVE_COUNTRIES_MAP = {
    [span_12](start_span)"Nigeria": { code: "NG", currency: "NGN", channels: ["card", "banktransfer", "ussd", "mobilemoney"] },[span_12](end_span)
    [span_13](start_span)"Ghana": { code: "GH", currency: "GHS", channels: ["mobilemoneyghana"] },[span_13](end_span)
    [span_14](start_span)"Kenya": { code: "KE", currency: "KES", channels: ["mpesa"] },[span_14](end_span)
    [span_15](start_span)"South Africa": { code: "ZA", currency: "ZAR", channels: ["ussd", "card"] }, // Example for ZA, might need more specific channels[span_15](end_span)
    [span_16](start_span)"Uganda": { code: "UG", currency: "UGX", channels: ["mobilemoneyuganda"] },[span_16](end_span)
    [span_17](start_span)"Tanzania": { code: "TZ", currency: "TZS", channels: ["mobilemoneytanzania"] },[span_17](end_span)
    [span_18](start_span)"Cameroon": { code: "CM", currency: "XAF", channels: ["mobilemoneyfranco"] },[span_18](end_span)
    [span_19](start_span)"Rwanda": { code: "RW", currency: "RWF", channels: ["mobilemoneyrwanda"] },[span_19](end_span)
    [span_20](start_span)"Zambia": { code: "ZM", currency: "ZMW", channels: ["mobilemoneyzambia"] },[span_20](end_span)
    [span_21](start_span)"Ivory Coast": { code: "CI", currency: "XOF", channels: ["mobilemoneyfranco"] },[span_21](end_span)
    [span_22](start_span)"Senegal": { code: "SN", currency: "XOF", channels: ["mobilemoneyfranco"] },[span_22](end_span)
    [span_23](start_span)"Benin": { code: "BJ", currency: "XOF", channels: ["mobilemoneyfranco"] },[span_23](end_span)
    [span_24](start_span)"Burkina Faso": { code: "BF", currency: "XOF", channels: ["mobilemoneyfranco"] },[span_24](end_span)
    [span_25](start_span)"Mali": { code: "ML", currency: "XOF", channels: ["mobilemoneyfranco"] },[span_25](end_span)
    [span_26](start_span)"Niger": { code: "NE", currency: "XOF", channels: ["mobilemoneyfranco"] },[span_26](end_span)
    [span_27](start_span)"Togo": { code: "TG", currency: "XOF", channels: ["mobilemoneyfranco"] },[span_27](end_span)
    // Add other African countries as needed
    [span_28](start_span)"United States": { code: "US", currency: "USD", channels: ["card"] },[span_28](end_span)
    [span_29](start_span)"United Kingdom": { code: "GB", currency: "GBP", channels: ["card"] },[span_29](end_span)
    [span_30](start_span)"Canada": { code: "CA", currency: "CAD", channels: ["card"] },[span_30](end_span)
    [span_31](start_span)"Australia": { code: "AU", currency: "AUD", channels: ["card"] },[span_31](end_span)
    [span_32](start_span)"Germany": { code: "DE", currency: "EUR", channels: ["card"] },[span_32](end_span)
    [span_33](start_span)// Add more countries as supported by Paystack/Flutterwave[span_33](end_span)
};


function isAccessValid() {
    [span_34](start_span)if (!currentUserData || !currentUserData.accessCode) {[span_34](end_span)
        [span_35](start_span)return false;[span_35](end_span)
    }
    [span_36](start_span)const userInDb = simulatedUserDatabase.find(user => user.accessCode === currentUserData.accessCode);[span_36](end_span)
    [span_37](start_span)// Check if user exists in DB and the active session code matches (prevents multiple active sessions with one code)[span_37](end_span)
    [span_38](start_span)if (!userInDb || userInDb.accessCode !== activeAccessCodeSession) {[span_38](end_span)
        [span_39](start_span)return false;[span_39](end_span)
    }

    // Check subscription expiry
    [span_40](start_span)if (userInDb.subscriptionExpires) {[span_40](end_span)
        [span_41](start_span)const expiryDate = new Date(userInDb.subscriptionExpires);[span_41](end_span)
        [span_42](start_span)if (expiryDate < new Date()) {[span_42](end_span)
            // Subscription has expired
            [span_43](start_span)console.log(`User ${userInDb.accessCode} subscription expired.`);[span_43](end_span)
            return '#expired'; [span_44](start_span)// Return a special flag for expired[span_44](end_span)
        }
    }
    return true; [span_45](start_span)// Access is valid and subscription is active/not set[span_45](end_span)
}


function checkAccessCode() {
    [span_46](start_span)const accessCodeInput = document.getElementById('accessCode');[span_46](end_span)
    [span_47](start_span)const accessMessage = document.getElementById('accessMessage');[span_47](end_span)
    [span_48](start_span)const accessCode = accessCodeInput.value.trim().toUpperCase();[span_48](end_span)

    [span_49](start_span)accessCodeInput.classList.remove('invalid');[span_49](end_span)
    [span_50](start_span)accessMessage.textContent = '';[span_50](end_span)

    [span_51](start_span)const user = simulatedUserDatabase.find(u => u.accessCode === accessCode);[span_51](end_span)

    [span_52](start_span)if (user) {[span_52](end_span)
        [span_53](start_span)// Check if this access code is already active in another session (simple local storage check)[span_53](end_span)
        [span_54](start_span)const storedActiveSessionCode = localStorage.getItem('activeAccessCodeSession');[span_54](end_span)
        [span_55](start_span)if (storedActiveSessionCode && storedActiveSessionCode !== accessCode) {[span_55](end_span)
            accessMessage.textContent = 'This access code is currently active on another device/browser. [span_56](start_span)Please log out there first.';[span_56](end_span)
            [span_57](start_span)accessMessage.classList.add('error');[span_57](end_span)
            [span_58](start_span)accessCodeInput.classList.add('invalid');[span_58](end_span)
            return;
        }

        [span_59](start_span)currentUserData = user;[span_59](end_span)
        localStorage.setItem('currentUserData', JSON.stringify(currentUserData)); [span_60](start_span)// Store current user session[span_60](end_span)
        localStorage.setItem('activeAccessCodeSession', accessCode); [span_61](start_span)// Mark this code as active[span_61](end_span)

        // Check for subscription expiry
        [span_62](start_span)const subscriptionStatus = isAccessValid();[span_62](end_span)
        [span_63](start_span)if (subscriptionStatus === '#expired') {[span_63](end_span)
            [span_64](start_span)showExpiredSubscriptionModal();[span_64](end_span)
            return; [span_65](start_span)// Stop login process, prompt for renewal[span_65](end_span)
        }

        // Valid access and not expired
        [span_66](start_span)document.getElementById('accessCodeModal').style.display = 'none';[span_66](end_span)
        [span_67](start_span)document.getElementById('mainContent').style.display = 'flex';[span_67](end_span)
        document.getElementById('logoutIcon').style.display = 'flex'; [span_68](start_span)// Show logout icon[span_68](end_span)
        [span_69](start_span)updateUserProfileDisplay();[span_69](end_span)
        renderVideos(0, videosPerPage, videosData); [span_70](start_span)// Load initial videos[span_70](end_span)
        [span_71](start_span)updateLoadMoreButtonVisibility();[span_71](end_span)
        [span_72](start_span)accessMessage.classList.remove('error');[span_72](end_span)
        accessMessage.textContent = ''; [span_73](start_span)// Clear message on success[span_73](end_span)
    } else {
        accessMessage.textContent = 'Invalid Access Code. [span_74](start_span)Please try again or create an account.';[span_74](end_span)
        [span_75](start_span)accessMessage.classList.add('error');[span_75](end_span)
        [span_76](start_span)accessCodeInput.classList.add('invalid');[span_76](end_span)
    }
}

function logoutUser() {
    currentUserData = null;
    [span_77](start_span)localStorage.removeItem('currentUserData');[span_77](end_span)
    localStorage.removeItem('activeAccessCodeSession'); [span_78](start_span)// Clear active session marker[span_78](end_span)
    localStorage.removeItem('accessTimestamp'); [span_79](start_span)// Clear any old timestamp[span_79](end_span)

    [span_80](start_span)document.getElementById('mainContent').style.display = 'none';[span_80](end_span)
    [span_81](start_span)document.getElementById('logoutIcon').style.display = 'none';[span_81](end_span)
    [span_82](start_span)document.getElementById('videoPlayer').pause();[span_82](end_span)
    [span_83](start_span)document.getElementById('videoPlayer').src = '';[span_83](end_span)
    [span_84](start_span)document.getElementById('videoPlaybackOverlay').style.display = 'none';[span_84](end_span)

    // Reset modals and show access code modal
    [span_85](start_span)hideRegistrationModal();[span_85](end_span)
    [span_86](start_span)hidePaymentOptionsModal();[span_86](end_span)
    [span_87](start_span)hideExpiredSubscriptionModal();[span_87](end_span)
    [span_88](start_span)hideBuyVideoModal();[span_88](end_span)
    [span_89](start_span)hideSellVideoModal();[span_89](end_span)
    [span_90](start_span)hideMatchDisplayModal();[span_90](end_span)
    [span_91](start_span)hideMatchmakerModal();[span_91](end_span)
    [span_92](start_span)hideTermsModal();[span_92](end_span)

    [span_93](start_span)showAccessCodeModal('You have been logged out. Please enter your access code to view content.');[span_93](end_span)
}

function registerNewUser(name, email, phone, country, accessCode) {
    const newUser = {
        [span_94](start_span)name: name,[span_94](end_span)
        [span_95](start_span)email: email,[span_95](end_span)
        [span_96](start_span)phone: phone,[span_96](end_span)
        [span_97](start_span)country: country,[span_97](end_span)
        [span_98](start_span)accessCode: accessCode,[span_98](end_span)
        [span_99](start_span)unlockedVideos: [],[span_99](end_span)
        [span_100](start_span)subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 1 month subscription[span_100](end_span)
    };
    [span_101](start_span)simulatedUserDatabase.push(newUser);[span_101](end_span)
    [span_102](start_span)localStorage.setItem('simulatedUserDatabase', JSON.stringify(simulatedUserDatabase));[span_102](end_span)
    [span_103](start_span)return newUser;[span_103](end_span)
}

// Function to update a user's subscription expiry in the database
function updateUserSubscription(accessCode, newExpiryDate) {
    [span_104](start_span)const userIndex = simulatedUserDatabase.findIndex(user => user.accessCode === accessCode);[span_104](end_span)
    [span_105](start_span)if (userIndex !== -1) {[span_105](end_span)
        [span_106](start_span)simulatedUserDatabase[userIndex].subscriptionExpires = newExpiryDate.toISOString();[span_106](end_span)
        [span_107](start_span)localStorage.setItem('simulatedUserDatabase', JSON.stringify(simulatedUserDatabase));[span_107](end_span)
        [span_108](start_span)// Also update currentUserData if it's the active user[span_108](end_span)
        [span_109](start_span)if (currentUserData && currentUserData.accessCode === accessCode) {[span_109](end_span)
            [span_110](start_span)currentUserData.subscriptionExpires = newExpiryDate.toISOString();[span_110](end_span)
            [span_111](start_span)localStorage.setItem('currentUserData', JSON.stringify(currentUserData));[span_111](end_span)
        }
        [span_112](start_span)console.log(`User ${accessCode} subscription updated to: ${newExpiryDate.toISOString()}`);[span_112](end_span)
    }
}
