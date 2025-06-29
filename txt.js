// This file contains the remaining JavaScript logic, including video playback,
// general modal handling, and page initialization.

let videosPerPage = 10; // Number of videos to load per scroll
let currentVideoIndex = 0;
let isLoadingVideos = false;
let currentSearchQuery = ''; // To manage search state
let intersectionObserver = null; // To hold the IntersectionObserver instance

// Modified: `videosToRender` now accepts an array to render specific videos (e.g., search results)
function renderVideos(startIndex, count, videosArray) {
    const videoGrid = document.getElementById('videoGrid');
    const videosSubset = videosArray.slice(startIndex, startIndex + count);

    if (startIndex === 0) { // If it's a fresh render (not infinite scroll)
        videoGrid.innerHTML = ''; // Clear existing videos
    }

    videosSubset.forEach(video => {
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
                <video preload="metadata" src="${video.videoUrl}#t=0.5" muted playsinline></video>
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

    currentVideoIndex += videosSubset.length;
}

// `loadMoreVideos` now implicitly uses `videosData` unless a search is active
function loadMoreVideos() {
    if (isLoadingVideos || currentVideoIndex >= videosData.length || currentSearchQuery !== '') {
        return; // Don't load more if loading, no more videos, or a search is active
    }

    isLoadingVideos = true;
    document.getElementById('loadingSpinner').style.display = 'block';

    setTimeout(() => { // Simulate network delay
        renderVideos(currentVideoIndex, videosPerPage, videosData);
        document.getElementById('loadingSpinner').style.display = 'none';
        isLoadingVideos = false;
    }, 500);
}

// --- Infinite Scroll Logic ---
function setupInfiniteScroll() {
    // Disconnect existing observer if any
    if (intersectionObserver) {
        intersectionObserver.disconnect();
    }

    const loadingSpinner = document.getElementById('loadingSpinner');
    intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoadingVideos && currentSearchQuery === '') { // Only load if no search is active
            loadMoreVideos();
        }
    }, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of spinner is visible
    });

    intersectionObserver.observe(loadingSpinner);
}

function disableInfiniteScroll() {
    if (intersectionObserver) {
        intersectionObserver.disconnect();
    }
}

// --- ADDED FOR USER REQUEST: Video Search Functionality ---
function handleVideoSearch() {
    const searchInput = document.getElementById('videoSearchInput');
    const query = searchInput.value.trim().toLowerCase();
    const searchResultsMessage = document.getElementById('searchResultsMessage');
    const showAllVideosBtn = document.getElementById('showAllVideosBtn');

    currentSearchQuery = query; // Update search state
    disableInfiniteScroll(); // Disable infinite scroll during search
    document.getElementById('loadingSpinner').style.display = 'none'; // Hide spinner

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
}

function showAllVideos() {
    currentSearchQuery = ''; // Clear search state
    document.getElementById('videoSearchInput').value = ''; // Clear search input
    document.getElementById('searchResultsMessage').style.display = 'none';
    document.getElementById('showAllVideosBtn').style.display = 'none';

    currentVideoIndex = 0; // Reset index for full video list
    renderVideos(0, videosPerPage, videosData); // Re-render initial set of all videos
    setupInfiniteScroll(); // Re-enable infinite scroll
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

    videoPlayer.src = video.videoUrl;
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
    videoPlayer.load(); // Load the new video source
    videoPlayer.play().catch(e => console.error("Video auto-play prevented:", e));
}

function closeVideoPlayer() {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause();
    videoPlayer.currentTime = 0; // Reset video to beginning
    document.getElementById('videoPlaybackOverlay').style.display = 'none';
    videoPlayer.src = ''; // Clear source to prevent background loading/memory use
}

// --- Sell Video Modal Logic ---
function showSellVideoModal() {
    document.getElementById('sellVideoModal').style.display = 'flex';
}

function hideSellVideoModal() {
    document.getElementById('sellVideoModal').style.display = 'none';
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

    // Check if on mobile or show message
    if (window.innerWidth <= 768) {
        document.getElementById('mobileOnlyMessage').style.display = 'none'; // Hide if on mobile
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
                 setupInfiniteScroll(); // Setup scroll listener
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
    } else {
         // If on desktop, the mobile-only-message will be displayed by CSS,
         // and the main content and modals will remain hidden.
         return;
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
