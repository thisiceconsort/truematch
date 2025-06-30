// This file contains JavaScript code for user data access, registration, and payment.

// IMPORTANT: Replace with your actual Paystack Public Key
const PAYSTACK_PUBLIC_KEY = 'pk_test_b85b46e300ef65774a38753234d7d6f519597371'; // Replace with your actual LIVE key!
// IMPORTANT: Replace with your actual Formspree URL for registration
const FORMSPREE_REGISTRATION_URL = 'https://formspree.io/f/xovdrlby'; // Replace with your actual Formspree endpoint
const FORMSPREE_MATCHMAKER_URL = 'https://formspree.io/f/YOUR_MATCHMAKER_FORMSPREE_ID'; // **IMPORTANT: Replace with your Matchmaker Formspree URL**

const ACCESS_CODE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds for session validity
const VIDEO_UNLOCK_DURATION = 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds for video unlock
const FIRST_TIME_PAYMENT_NGN = 1100;
const MATCHMAKER_PAYMENT_NGN = 3200;

let currentUserData = null; // Stores user data after successful access/registration
let currentVideoToUnlock = null; // Stores the video object for which payment is being initiated

// --- Simulated User Database (for demonstration of password array) ---
// In a real application, these would be stored and managed on a secure backend.
// This array holds objects of registered users and their access codes.
let simulatedUserDatabase = [
    { name: "John Doe", email: "john.doe@example.com", phone: "+2348012345678", country: "Nigeria", accessCode: "1234JOH", unlockedVideos: {} },
    { name: "Jane Smith", email: "jane.smith@example.com", phone: "+15551234567", country: "United States", accessCode: "5678JAS", unlockedVideos: {} },
    { name: "Demo User", email: "demo@example.com", phone: "+1234567890", country: "United States", accessCode: "DEMOABC", unlockedVideos: {} }, // Special demo user
    { name: "Sam Esom", email: "orjisamuel19@gmail.com", phone: "+2347067411418", country: "Nigeria", accessCode: "2559SOM", unlockedVideos: {} },// Special demo user
    { name: "Chinetu Emmanuel", email: "chinetuemmanuel@gmail.com", phone: "+2349071375250", country: "Nigeria", accessCode: "1058CHI", unlockedVideos: {} } // Special demo user


];

// Initialize simulatedUserDatabase from localStorage if available
const storedSimulatedUsers = localStorage.getItem('simulatedUserDatabase');
if (storedSimulatedUsers) {
    simulatedUserDatabase = JSON.parse(storedSimulatedUsers);
}

// --- Country Data ---
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

function populateCountries() {
    const countrySelects = document.querySelectorAll('#regCountry, #matchCountry');
    countrySelects.forEach(select => {
        // Clear existing options except the first "Select..." option
        while (select.options.length > 1) {
            select.remove(1);
        }
        countries.sort().forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            select.appendChild(option);
        });
    });
}


// --- Access Code Logic ---
function showAccessCodeModal(message = '', isError = false) {
    document.getElementById('accessCodeModal').style.display = 'flex';
    const msgElem = document.getElementById('accessMessage');
    msgElem.textContent = message;
    msgElem.className = 'message ' + (isError ? 'error' : '');
}

function hideAccessCodeModal() {
    document.getElementById('accessCodeModal').style.display = 'none';
    document.getElementById('accessMessage').textContent = ''; // Clear message on hide
}

function checkAccessCode() {
    const accessCodeInput = document.getElementById('accessCode');
    const code = accessCodeInput.value.trim().toUpperCase();

    if (!/^\d{4}[A-Z]{3}$/.test(code)) {
        showAccessCodeModal('Invalid code format. Must be 4 digits followed by 3 letters.', true);
        return;
    }

    const foundUser = simulatedUserDatabase.find(user => user.accessCode === code);

    if (foundUser) {
        currentUserData = foundUser;
        localStorage.setItem('currentUserData', JSON.stringify(currentUserData)); // Store current user session
        storeAccessTimestamp(); // Set session validity timestamp
        updateUserProfileDisplay();
        // No message needed here, directly transition to content
        hideAccessCodeModal(); // Hide the access modal immediately
        document.getElementById('mainContent').style.display = 'flex';
        currentVideoIndex = 0; // Reset index for fresh load
        renderVideos(0, videosPerPage, videosData); // Load initial videos
        setupInfiniteScroll(); // Setup scroll listener
    } else {
        showAccessCodeModal('Access code not found. Please check your code or create a new account.', true);
    }
}

function storeAccessTimestamp() {
    localStorage.setItem('accessTimestamp', Date.now());
}

function isAccessValid() {
    const timestamp = localStorage.getItem('accessTimestamp');
    if (!timestamp) {
        return false;
    }
    return (Date.now() - parseInt(timestamp, 10)) < ACCESS_CODE_DURATION;
}

// --- Registration Logic ---
function showRegistrationModal(message = '', isError = false) {
    hideAccessCodeModal(); // Hide access modal if visible
    document.getElementById('registrationModal').style.display = 'flex';
    const msgElem = document.getElementById('registrationMessage');
    msgElem.textContent = message;
    msgElem.className = 'message ' + (isError ? 'error' : '');
}

function hideRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'none';
    document.getElementById('registrationMessage').textContent = ''; // Clear message on hide
    document.getElementById('registrationForm').reset(); // Clear form fields
    document.querySelectorAll('#registrationForm .invalid').forEach(el => el.classList.remove('invalid')); // Clear validation styles
    showAccessCodeModal('Please enter your access code to view content.'); // Always return to access code modal
}

function validateRegistrationForm() {
    const form = document.getElementById('registrationForm');
    let isValid = true;
    const fields = ['regName', 'regEmail', 'regPhone', 'regCountry', 'regAge', 'regPassword', 'confirmPassword'];

    fields.forEach(id => {
        const input = document.getElementById(id);
        if (!input.value || (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) || (input.id === 'regAge' && input.value === 'no')) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });

    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmPassword').classList.add('invalid');
        isValid = false;
    } else {
        document.getElementById('confirmPassword').classList.remove('invalid');
    }

    // Validate password format: 4 digits + 3 letters
    if (!/^\d{4}[A-Za-z]{3}$/.test(password)) {
        document.getElementById('regPassword').classList.add('invalid');
        showRegistrationModal('Code must be 4 digits followed by 3 letters.', true);
        isValid = false;
    } else {
         document.getElementById('regPassword').classList.remove('invalid');
    }

    return isValid;
}

function togglePasswordVisibility(fieldId, iconElement) {
    const field = document.getElementById(fieldId);
    const icon = iconElement.querySelector('i');
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}


function handleRegistration() {
    if (!validateRegistrationForm()) {
        showRegistrationModal('Please correct the highlighted fields.', true);
        return;
    }

    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const country = document.getElementById('regCountry').value;
    const accessCode = document.getElementById('regPassword').value.toUpperCase(); // Store the generated code

    // Check if access code already exists in simulated database
    if (simulatedUserDatabase.some(user => user.accessCode === accessCode)) {
        showRegistrationModal('This access code is already taken. Please choose a different one.', true);
        return;
    }

    // Initiate Paystack Payment for registration
    const amountInKobo = FIRST_TIME_PAYMENT_NGN * 100;

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_b85b46e300ef65774a38753234d7d6f519597371') {
        alert('Warning: Paystack Public Key is still set to the placeholder value. Please replace it with your actual live Paystack public key to enable real payments. Simulating payment...');
        // Simulate successful payment and registration for demo
        simulateRegistrationSuccess(name, email, phone, country, accessCode);
        return;
    }

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amountInKobo,
        currency: 'NGN',
        channels: ['card', 'bank_transfer', 'ussd'], // Recommended channels for Nigeria
        metadata: {
            custom_fields: [
                { display_name: "Full Name", variable_name: "full_name", value: name },
                { display_name: "Phone Number", variable_name: "phone_number", value: phone },
                { display_name: "Country", variable_name: "country", value: country },
                { display_name: "Access Code", variable_name: "access_code", value: accessCode } // Store generated code
            ]
        },
        callback: function(response) {
            if (response.status === 'success') {
                simulateRegistrationSuccess(name, email, phone, country, accessCode);
            } else {
                showRegistrationModal('Payment was not successful. Please try again.', true);
            }
        },
        onClose: function() {
            showRegistrationModal('Payment cancelled. You need to complete payment to become a member.', true);
        },
    });
    handler.openIframe();
}

function simulateRegistrationSuccess(name, email, phone, country, accessCode) {
    // Here, you would typically make an AJAX call to your backend
    // to record the successful payment and user registration.
    // For this client-side demo, we'll send it to Formspree and update local "database".
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('access_code', accessCode); // Sending the generated code to Formspree

    fetch(FORMSPREE_REGISTRATION_URL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Add new user to our simulated database
            const newUser = { name, email, phone, country, accessCode, unlockedVideos: {} };
            simulatedUserDatabase.push(newUser);
            localStorage.setItem('simulatedUserDatabase', JSON.stringify(simulatedUserDatabase)); // Persist the updated database

            // IMPORTANT: Do NOT set currentUserData or show mainContent directly here.
            // The user MUST go through the access code modal.

            hideRegistrationModal(); // Hide registration modal
            showAccessCodeModal(`Payment successful! Your access code is: ${accessCode}. Please use it to log in.`, false);
            document.getElementById('accessCode').value = accessCode; // Pre-fill the code for convenience
        } else {
            showAccessCodeModal('Payment successful, but registration data submission failed. Please contact support with your payment details.', true);
        }
    }).catch(error => {
        console.error('Error submitting registration to Formspree:', error);
        showAccessCodeModal('Payment successful, but there was an issue with registration. Please contact support.', true);
    });
}

// --- User Profile Display ---
function updateUserProfileDisplay() {
    if (currentUserData) {
        document.getElementById('displayUserName').textContent = currentUserData.name;
        document.getElementById('displayUserCountry').textContent = currentUserData.country;
        document.getElementById('displayUserEmail').textContent = currentUserData.email;
        document.getElementById('displayUserPhone').textContent = currentUserData.phone;
    }
}

// --- Buy Video Modal Logic ---
function showBuyVideoModal(video) {
    currentVideoToUnlock = video; // Store which video to unlock
    document.getElementById('buyVideoPrice').textContent = video.priceNGN.toLocaleString();
    document.getElementById('buyVideoModal').style.display = 'flex';
}

function hideBuyVideoModal() {
    document.getElementById('buyVideoModal').style.display = 'none';
    currentVideoToUnlock = null;
}

function initiateVideoPayment() {
    if (!currentVideoToUnlock) return;
    if (!currentUserData || !currentUserData.email) {
        alert('Please log in or register to unlock videos.');
        hideBuyVideoModal();
        showAccessCodeModal('Please log in or register to unlock videos.', true);
        return;
    }

    const email = currentUserData.email;
    const amountInKobo = currentVideoToUnlock.priceNGN * 100;

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_b85b46e300ef65774a38753234d7d6f519597371') {
        alert('Warning: Paystack Public Key is still set to the placeholder value. Simulating video unlock...');
        simulateVideoUnlockSuccess(currentVideoToUnlock);
        return;
    }

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email, // Use the user's email for payment
        amount: amountInKobo,
        currency: 'NGN',
        metadata: {
            video_id: currentVideoToUnlock.id,
            video_title: currentVideoToUnlock.title
        },
        callback: function(response) {
            if (response.status === 'success') {
                simulateVideoUnlockSuccess(currentVideoToUnlock);
            } else {
                alert('Video unlock payment failed. Please try again.');
            }
        },
        onClose: function() {
            alert('Video unlock payment cancelled.');
        },
    });
    handler.openIframe();
}

function simulateVideoUnlockSuccess(video) {
    const expiryTime = Date.now() + VIDEO_UNLOCK_DURATION;
    if (!currentUserData.unlockedVideos) {
        currentUserData.unlockedVideos = {}; // Initialize if not present
    }
    currentUserData.unlockedVideos[video.id] = expiryTime; // Store expiry timestamp

    // Find the user in the simulated database and update their unlocked videos
    const userInDb = simulatedUserDatabase.find(user => user.accessCode === currentUserData.accessCode);
    if (userInDb) {
        userInDb.unlockedVideos = currentUserData.unlockedVideos;
        localStorage.setItem('simulatedUserDatabase', JSON.stringify(simulatedUserDatabase)); // Persist changes
    }
    localStorage.setItem('currentUserData', JSON.stringify(currentUserData)); // Update current user session

    alert(`Successfully unlocked "${video.title}" for 1 month!`);
    hideBuyVideoModal();
    // Re-render the video grid to update the lock icon
    currentVideoIndex = 0; // Reset index
    renderVideos(0, videosPerPage, videosData); // Re-render initial set
    loadMoreVideos(); // Load more if needed
    playVideo(video); // Play the video immediately
}

// --- Matchmaker Modal Logic ---
function showMatchmakerModal(message = '', isError = false) {
    document.getElementById('matchmakerModal').style.display = 'flex';
    const msgElem = document.getElementById('matchmakerMessage');
    msgElem.textContent = message;
    msgElem.className = 'message ' + (isError ? 'error' : '');
    // Pre-fill email and phone if user is logged in
    if (currentUserData) {
        document.getElementById('matchEmail').value = currentUserData.email || '';
        document.getElementById('matchPhone').value = currentUserData.phone || '';
        document.getElementById('matchCountry').value = currentUserData.country || '';
    }
}

function hideMatchmakerModal() {
    document.getElementById('matchmakerModal').style.display = 'none';
    document.getElementById('matchmakerForm').reset(); // Clear form
    document.getElementById('matchmakerMessage').textContent = ''; // Clear message
    document.querySelectorAll('#matchmakerForm .invalid').forEach(el => el.classList.remove('invalid')); // Clear validation styles
}

function validateMatchmakerForm() {
    const form = document.getElementById('matchmakerForm');
    let isValid = true;
    const fields = [
        'matchRealName', 'matchAge', 'matchBodySize', 'matchFatSlim', 'matchHeight',
        'matchSkinColor', 'matchCity', 'matchEmail',
            'matchRole',
            'matchPhone', 'matchExactLocation', 'matchCountry'
    ];

    fields.forEach(id => {
        const input = document.getElementById(id);
        if (!input.value || (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) || (input.type === 'number' && parseInt(input.value) < 18)) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });
    return isValid;
}

function handleMatchmakerRegistration() {
    if (!validateMatchmakerForm()) {
        showMatchmakerModal('Please correct the highlighted fields.', true);
        return;
    }

    const realName = document.getElementById('matchRealName').value;
    const age = document.getElementById('matchAge').value;
    const bodySize = document.getElementById('matchBodySize').value;
    const fatSlim = document.getElementById('matchFatSlim').value;
    const height = document.getElementById('matchHeight').value;
    const skinColor = document.getElementById('matchSkinColor').value;
    const city = document.getElementById('matchCity').value;
    const email = document.getElementById('matchEmail').value;
    const phone = document.getElementById('matchPhone').value;
    const exactLocation = document.getElementById('matchExactLocation').value;
    const country = document.getElementById('matchCountry').value;

    const amountInKobo = MATCHMAKER_PAYMENT_NGN * 100;

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_b85b46e300ef65774a38753234d7d6f519597371') {
        alert('Warning: Paystack Public Key is still set to the placeholder value. Simulating matchmaker payment...');
        simulateMatchmakerSuccess(realName, age, bodySize, fatSlim, height, skinColor, city, email, phone, exactLocation, country);
        return;
    }

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amountInKobo,
        currency: 'NGN',
        metadata: {
            custom_fields: [
                { display_name: "Matchmaker Real Name", variable_name: "match_real_name", value: realName },
                { display_name: "Matchmaker Age", variable_name: "match_age", value: age },
                { display_name: "Matchmaker Body Size", variable_name: "match_body_size", value: bodySize },
                { display_name: "Matchmaker Fat/Slim", variable_name: "match_fat_slim", value: fatSlim },
                { display_name: "Matchmaker Height", variable_name: "match_height", value: height },
                { display_name: "Matchmaker Skin Color", variable_name: "match_skin_color", value: skinColor },
                { display_name: "Matchmaker City", variable_name: "match_city", value: city },
                { display_name: "Matchmaker Exact Location", variable_name: "match_exact_location", value: exactLocation },
                { display_name: "Matchmaker Country", variable_name: "match_country", value: country }
            ]
        },
        callback: function(response) {
            if (response.status === 'success') {
                simulateMatchmakerSuccess(realName, age, bodySize, fatSlim, height, skinColor, city, email, phone, exactLocation, country);
            } else {
                showMatchmakerModal('Matchmaker payment was not successful. Please try again.', true);
            }
        },
        onClose: function() {
            showMatchmakerModal('Matchmaker payment cancelled.', true);
        },
    });
    handler.openIframe();
}

function simulateMatchmakerSuccess(realName, age, bodySize, fatSlim, height, skinColor, city, email, phone, exactLocation, country) {
    // Send data to Formspree
    const formData = new FormData();
    formData.append('real_name', realName);
    formData.append('age', age);
    formData.append('body_size', bodySize);
    formData.append('fat_slim', fatSlim);
    formData.append('height', height);
    formData.append('skin_color', skinColor);
    formData.append('city', city);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('exact_location', exactLocation);
    formData.append('country', country);

    fetch(FORMSPREE_MATCHMAKER_URL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showMatchmakerModal(`Payment successful! Our robust matchmaker is now crawling through ${city}, ${country} to find a match for you. You will receive emails occasionally for new matches.`, false);
            document.getElementById('matchmakerForm').reset(); // Clear form on success
        } else {
            showMatchmakerModal('Payment successful, but matchmaker data submission failed. Please contact support with your payment details.', true);
        }
    }).catch(error => {
        console.error('Error submitting matchmaker data to Formspree:', error);
        showMatchmakerModal('Payment successful, but there was an issue with matchmaker registration. Please contact support.', true);
    });
}
