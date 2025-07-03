// IMPORTANT: Replace with your actual Paystack Public Key
const PAYSTACK_PUBLIC_KEY = 'pk_live_6b671064b6a716c1ceffe82bf20a28c317a69584'; // Replace with your actual LIVE key!
// IMPORTANT: Replace with your actual Formspree URL for registration
const FORMSPREE_REGISTRATION_URL = 'https://formspree.io/f/xovdrlby'; // Replace with your actual Formspree endpoint
const FORMSPREE_MATCHMAKER_URL = 'https://formspree.io/f/xovdrlby'; // **IMPORTANT: Replace with your Matchmaker Formspree URL**

const ACCESS_CODE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds for session validity
const VIDEO_UNLOCK_DURATION = 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds for video unlock
const FIRST_TIME_PAYMENT_NGN = 1100;
const MATCHMAKER_PAYMENT_NGN = 3200;

let currentUserData = null; // Stores user data after successful access/registration
let currentVideoToUnlock = null; // Stores the video object for which payment is being initiated
let hlsPlayer = null; // Global HLS.js instance

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
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Zambia", "Zimbabwe"
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
        updateLoadMoreButtonVisibility(); // Check and show load more button
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
        showRegistrationModal('Weak Access Code. Please choose a stronger one.', true);
        return;
    }

    // Initiate Paystack Payment for registration
    const amountInKobo = FIRST_TIME_PAYMENT_NGN * 100;

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_b85b46e300ef65774a3877073234d7d6f519597371') {
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


// --- Video Grid & Manual Loading ---
let videosPerPage = 10; // Number of videos to load per click
let currentVideoIndex = 0;
let isLoadingVideos = false; // Still useful to prevent multiple clicks
let currentSearchQuery = ''; // To manage search state

// Modified: `videosToRender` now accepts an array to render specific videos (e.g., search results)
function renderVideos(startIndex, count, videosArray) {
    const videoGrid = document.getElementById('videoGrid');
    const videosToDisplay = videosArray.slice(startIndex, startIndex + count);

    if (startIndex === 0) { // If it's a fresh render (initial load or search)
        videoGrid.innerHTML = ''; // Clear existing videos
    }

    videosToDisplay.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.dataset.videoId = video.id; // Store ID for click handling

        // Check if video is unlocked based on currentUserData's unlockedVideos and expiry
        const isVideoUnlocked = currentUserData &&
                                currentUserData.unlockedVideos &&
                                currentUserData.unlockedVideos[video.id] &&
                                Date.now() < currentUserData.unlockedVideos[video.id]; // Check expiry

        videoItem.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnailUrl}" alt="${video.title} Thumbnail" class="video-thumbnail-img">
                ${video.isLocked && !isVideoUnlocked ? '<i class="fas fa-lock lock-icon"></i>' : ''}
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <div class="video-meta">
                    <span class="views-count">${video.views.toLocaleString()} views</span>
                    ${video.isLocked && !isVideoUnlocked ? `<span style="color:#FF00FF;">₦${video.priceNGN.toLocaleString()}</span>` : ''}
                </div>
            </div>
        `;
        videoItem.addEventListener('click', () => handleVideoClick(video));
        videoGrid.appendChild(videoItem);
    });

    // Update the currentVideoIndex to reflect how many videos are currently displayed
    currentVideoIndex = startIndex + videosToDisplay.length;

    // After rendering, update the button visibility
    updateLoadMoreButtonVisibility(videosArray);
}

// New: `loadMoreVideos` function for the button
function loadMoreVideos() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.style.display = 'none'; // Hide button immediately on click
    isLoadingVideos = true;

    // Simulate network delay for loading
    setTimeout(() => {
        const videosToLoad = currentSearchQuery === '' ? videosData : videosData.filter(video => video.id.toLowerCase().includes(currentSearchQuery));
        renderVideos(currentVideoIndex, videosPerPage, videosToLoad);
        isLoadingVideos = false;
    }, 500);
}

// New: Function to control the visibility of the "Load More" button
function updateLoadMoreButtonVisibility(currentVideosArray = videosData) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const remainingVideos = currentVideosArray.length - currentVideoIndex;

    if (remainingVideos > 0 && currentSearchQuery === '') { // Only show if there are videos left AND not in search mode
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// --- ADDED FOR USER REQUEST: Video Search Functionality ---
function handleVideoSearch() {
    const searchInput = document.getElementById('videoSearchInput');
    const query = searchInput.value.trim().toLowerCase();
    const searchResultsMessage = document.getElementById('searchResultsMessage');
    const showAllVideosBtn = document.getElementById('showAllVideosBtn');
    const loadMoreBtn = document.getElementById('loadMoreBtn'); // Get the load more button

    currentSearchQuery = query; // Update search state
    loadMoreBtn.style.display = 'none'; // Hide load more button during search

    if (query === '') {
        showAllVideos();
        return;
    }

    const filteredVideos = videosData.filter(video => video.id.toLowerCase().includes(query));

    currentVideoIndex = 0; // Reset index for displaying search results
    if (filteredVideos.length > 0) {
        renderVideos(0, filteredVideos.length, filteredVideos); // Render all filtered videos
        searchResultsMessage.textContent = `Found ${filteredVideos.length} video(s) matching "${query}".`;
        searchResultsMessage.style.display = 'block';
        showAllVideosBtn.style.display = 'block';
    } else {
        document.getElementById('videoGrid').innerHTML = ''; // Clear grid
        searchResultsMessage.textContent = `No videos found with ID "${query}".`;
        searchResultsMessage.style.display = 'block';
        showAllVideosBtn.style.display = 'block';
    }
    updateLoadMoreButtonVisibility(filteredVideos); // Update button visibility based on search results
}

function showAllVideos() {
    currentSearchQuery = ''; // Clear search state
    document.getElementById('videoSearchInput').value = ''; // Clear search input
    document.getElementById('searchResultsMessage').style.display = 'none';
    document.getElementById('showAllVideosBtn').style.display = 'none';

    currentVideoIndex = 0; // Reset index for full video list
    renderVideos(0, videosPerPage, videosData); // Re-render initial set of all videos
    updateLoadMoreButtonVisibility(); // Update button visibility for all videos
}
// -----------------------------------------------------------

// --- Video Playback Logic ---
function handleVideoClick(video) {
    const isVideoUnlocked = currentUserData &&
                            currentUserData.unlockedVideos &&
                            currentUserData.unlockedVideos[video.id] &&
                            Date.now() < currentUserData.unlockedVideos[video.id];

    if (video.isLocked && !isVideoUnlocked) {
        showBuyVideoModal(video);
    } else {
        playVideo(video);
    }
}

function playVideo(video) {
    const videoPlayer = document.getElementById('videoPlayer');
    const playbackOverlay = document.getElementById('videoPlaybackOverlay');
    const playingVideoTitle = document.getElementById('playingVideoTitle');
    const playingVideoDescription = document.getElementById('playingVideoDescription');
    const playingVideoViews = document.getElementById('playingVideoViews');
    const videoUnlockDuration = document.getElementById('videoUnlockDuration');

    // Increment views for the displayed video object (local update)
    // In a real app, this would be handled on the backend.
    video.views++;

    // Stop any existing HLS.js instance
    if (hlsPlayer) {
        hlsPlayer.destroy();
        hlsPlayer = null;
    }

    // Check if the video URL is an HLS manifest (.m3u8)
    if (video.videoUrl.endsWith('.m3u8') && Hls.isSupported()) {
        hlsPlayer = new Hls();
        hlsPlayer.loadSource(video.videoUrl);
        hlsPlayer.attachMedia(videoPlayer);
        hlsPlayer.on(Hls.Events.MANIFEST_PARSED, function() {
            videoPlayer.play();
        });
        hlsPlayer.on(Hls.Events.ERROR, function (event, data) {
            console.error('HLS.js error:', data);
            if (data.fatal) {
                switch(data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.error("fatal network error encountered, trying to recover...");
                        hlsPlayer.recoverMediaError();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.error("fatal media error encountered, trying to recover...");
                        hlsPlayer.recoverMediaError();
                        break;
                    default:
                        // cannot recover
                        hlsPlayer.destroy();
                        alert("Error playing video. Please try again or try a different video.");
                        closeVideoPlayer();
                        break;
                }
            }
        });
    } else {
        // For direct MP4 or other formats, or if HLS is not supported
        videoPlayer.src = video.videoUrl;
        videoPlayer.play();
    }
    
    playingVideoTitle.textContent = video.title;
    playingVideoDescription.textContent = video.description;
    playingVideoViews.textContent = `${video.views.toLocaleString()} views`;

    // Display unlock duration if applicable
    if (video.isLocked && currentUserData && currentUserData.unlockedVideos && currentUserData.unlockedVideos[video.id]) {
        const expiryTimestamp = currentUserData.unlockedVideos[video.id];
        const timeLeft = expiryTimestamp - Date.now();
        if (timeLeft > 0) {
            const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
            videoUnlockDuration.textContent = `This video is unlocked for ${daysLeft} more day(s).`;
            if (daysLeft === 0) videoUnlockDuration.textContent = `This video will relock today.`;
        } else {
            videoUnlockDuration.textContent = `This video has expired and will relock soon. Clearing browser data will relock it immediately.`;
        }
    } else {
        videoUnlockDuration.textContent = ''; // Clear message for free videos
    }


    playbackOverlay.style.display = 'flex';
}

function closeVideoPlayer() {
    const videoPlayer = document.getElementById('videoPlayer');
    // Stop the video
    videoPlayer.pause();
    videoPlayer.removeAttribute('src'); // Clear the src
    videoPlayer.load(); // Load to reset the player

    // Exit fullscreen if currently in fullscreen
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }

    // Destroy HLS.js instance if it exists
    if (hlsPlayer) {
        hlsPlayer.destroy();
        hlsPlayer = null;
    }

    document.getElementById('videoPlaybackOverlay').style.display = 'none';
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

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_b85b46e300ef65774a3877073234d7d6f519597371') {
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
    loadMoreVideos(); // Load more if needed (will show the button again if applicable)
    playVideo(video); // Play the video immediately
}

// --- Sell Video Modal Logic ---
function showSellVideoModal() {
    document.getElementById('sellVideoModal').style.display = 'flex';
}

function hideSellVideoModal() {
    document.getElementById('sellVideoModal').style.display = 'none';
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
            'matchrole',
        'matchSkinColor', 'matchCity', 'matchEmail', 'matchPhone', 'matchExactLocation', 'matchCountry'
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
    const role = document.getElementById('matchrole').value; // Corrected variable name
    const skinColor = document.getElementById('matchSkinColor').value;
    const city = document.getElementById('matchCity').value;
    const email = document.getElementById('matchEmail').value;
    const phone = document.getElementById('matchPhone').value;
    const exactLocation = document.getElementById('matchExactLocation').value;
    const country = document.getElementById('matchCountry').value;

    const amountInKobo = MATCHMAKER_PAYMENT_NGN * 100;

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_b85b46e300ef65774a3877073234d7d6f519597371') {
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
                { display_name: "Matchmaker Role", variable_name: "match_role", value: role }, // Corrected metadata
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

// --- Terms and Conditions Modal Logic ---
function showTermsModal() {
    document.getElementById('termsModal').style.display = 'flex';
}

function hideTermsModal() {
    document.getElementById('termsModal').style.display = 'none';
}


// --- Initialization on Load ---
document.addEventListener('DOMContentLoaded', () => {
    populateCountries(); // Populate country dropdown for registration and matchmaker

    // Check access code validity
    const storedUserData = localStorage.getItem('currentUserData');
    if (storedUserData) {
        currentUserData = JSON.parse(storedUserData);
    }

    // Crucial: Only show main content if access is valid AND user data exists and matches simulated DB
    if (isAccessValid() && currentUserData && simulatedUserDatabase.some(user => user.accessCode === currentUserData.accessCode)) {
        const validUser = simulatedUserDatabase.find(user => user.accessCode === currentUserData.accessCode);
        if (validUser) {
             currentUserData = validUser; // Use the stored valid user data
             document.getElementById('mainContent').style.display = 'flex';
             updateUserProfileDisplay();
             currentVideoIndex = 0; // Reset index for fresh load
             renderVideos(0, videosPerPage, videosData); // Load initial videos
        } else {
            // If user data in localStorage doesn't match a user in simulated DB (e.g., deleted)
            localStorage.removeItem('currentUserData'); // Clear invalid stored data
            localStorage.removeItem('accessTimestamp'); // Clear invalid timestamp
            showAccessCodeModal('Your session expired or access code is invalid. Please enter your access code to view content.');
        }
    } else {
        // Default: If no valid session, always show access code modal
        document.getElementById('mainContent').style.display = 'none'; // Ensure main content is hidden
        showAccessCodeModal('Please enter your access code to view content.');
    }

    // Add input event listeners for real-time validation feedback for all forms
    const allFormElements = document.querySelectorAll('#registrationForm input, #registrationForm select, #matchmakerForm input, #matchmakerForm select');
    allFormElements.forEach(input => {
        input.addEventListener('input', () => {
            // Clear invalid class on input, re-validate on form submission
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
            }
        });
    });
});
