/**
 * @file script.js
 * @description Main JavaScript functionality for the TrueMatch verification page.
 * @author Your Name/Ice Consort
 * @version 1.0.0
 */

// =============================================================================
// == CONFIGURATION & GLOBAL VARIABLES ==
// =============================================================================

// --- API Keys & Endpoints (IMPORTANT: Replace with your actual values) ---
const PAYSTACK_PUBLIC_KEY = 'YOUR_PAYSTACK_PUBLIC_KEY'; // Replace!
const FORMSPREE_ENDPOINT = 'YOUR_FORMSPREE_ENDPOINT';   // Replace!

// --- Links & Amounts ---
const EXTERNAL_JOIN_LINK = 'https://your-external-join-link.com'; // Replace!
const PAYMENT_AMOUNT_NAIRA = 600;

// --- Session Storage Key ---
const HAS_VISITED_KEY = 'hasVisitedTrueMatch';

// --- Simulated User Data (Replace with real backend/API calls) ---
const verifiedUsers = {
    '1234': { name: 'Chukwudi Obi', picture: 'https://via.placeholder.com/120/483D8B/FFFFFF?text=CO', age: 28, country: 'Nigeria', state_province: 'Lagos', city: 'Lagos', sexuality: 'Gay', body_type: 'Athletic', height: 175, interested_in: 'Kind, adventurous, hiking, art.', is_verified: true },
    '5678': { name: 'Kwame Adjei', picture: 'https://via.placeholder.com/120/6A5ACD/000000?text=KA', age: 34, country: 'Ghana', state_province: 'Greater Accra', city: 'Accra', sexuality: 'Bisexual', body_type: 'Bear', height: 180, interested_in: 'Deep conversations, good food, tech.', is_verified: true },
    '9012': { name: 'Thabo Mkhize', picture: 'https://via.placeholder.com/120/8A2BE2/FFFFFF?text=TM', age: 25, country: 'South Africa', state_province: 'Western Cape', city: 'Cape Town', sexuality: 'Lesbian', body_type: 'Slim', height: 165, interested_in: 'Creative, open-minded, art, culture.', is_verified: true },
    '3456': { name: 'Ahmed Bello', picture: 'https://via.placeholder.com/120/483D8B/FFFFFF?text=AB', age: 30, country: 'Nigeria', state_province: 'FCT', city: 'Abuja', sexuality: 'Gay', body_type: 'Muscular', height: 185, interested_in: 'Entrepreneurship, travel, sunsets.', is_verified: true }
};

// =============================================================================
// == DOM ELEMENT SELECTION ==
// =============================================================================

// --- Main Page Elements ---
const splashScreen = document.getElementById('splash-screen');
const mainPageContent = document.getElementById('main-page-content');
const cardCodeInput = document.getElementById('cardCodeInput');
const verifyButton = document.getElementById('verifyButton');
const verificationMessage = document.getElementById('verificationMessage');
const userProfileDisplay = document.getElementById('userProfileDisplay');
const joinCommunitySection = document.getElementById('joinCommunitySection');
const joinCommunityButton = document.getElementById('joinCommunityButton');
const joinSuccessMessage = document.getElementById('joinSuccessMessage');
const faqSectionTitle = document.getElementById('faq-section-title');

// --- Header Elements ---
const openLiveLink = document.getElementById('openLiveLink');
const openResourcesMenuModalLink = document.getElementById('openResourcesMenuModalLink');

// --- Modal Elements ---
const addCreateModal = document.getElementById('addCreateModal');
const addCreateModalCloseButton = addCreateModal.querySelector('.close-button');
const createGayCardLink = document.getElementById('createGayCardLink');
const registrationModal = document.getElementById('registrationModal');
const registrationForm = document.getElementById('registrationForm');
const registrationModalCloseButton = registrationModal.querySelector('.close-button');
const resourcesMenuModal = document.getElementById('resourcesMenuModal');
const resourcesMenuCloseButton = resourcesMenuModal.querySelector('.close-button');

// --- Navigation Elements ---
const homeNavItem = document.getElementById('homeNavItem');
const registerNavItem = document.getElementById('registerNavItem');
const navItems = document.querySelectorAll('.bottom-nav .nav-item');

// =============================================================================
// == INITIALIZATION & EVENT LISTENERS ==
// =============================================================================

/**
 * Executes when the DOM is fully loaded.
 * Handles splash screen logic and initial setup.
 */
document.addEventListener('DOMContentLoaded', () => {
    handleSplashScreen();
    setupInitialState();
    setupEventListeners();
});

/**
 * Sets up all the necessary event listeners for the page.
 */
function setupEventListeners() {
    // --- Verification ---
    verifyButton.addEventListener('click', performVerification);
    cardCodeInput.addEventListener('keypress', handleVerificationKeyPress);

    // --- Header Links ---
    openLiveLink.addEventListener('click', handleLiveLinkClick);
    openResourcesMenuModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(resourcesMenuModal);
    });

    // --- Bottom Navigation ---
    registerNavItem.addEventListener('click', handleRegisterNavClick);
    window.addEventListener('scroll', setActiveNavItemOnScroll); // For nav highlight
    setupSmoothScroll(); // For anchor links

    // --- Modals ---
    addCreateModalCloseButton.addEventListener('click', () => hideModal(addCreateModal));
    addCreateModal.addEventListener('click', (e) => handleModalOverlayClick(e, addCreateModal));
    createGayCardLink.addEventListener('click', handleCreateCardClick);
    registrationModalCloseButton.addEventListener('click', () => hideModal(registrationModal));
    registrationModal.addEventListener('click', (e) => handleModalOverlayClick(e, registrationModal));
    resourcesMenuCloseButton.addEventListener('click', () => hideModal(resourcesMenuModal));
    resourcesMenuModal.addEventListener('click', (e) => handleModalOverlayClick(e, resourcesMenuModal));

    // --- Registration Form ---
    registrationForm.addEventListener('submit', handleRegistrationSubmit);

    // --- FAQ Accordion ---
    setupFaqAccordion();
}

// =============================================================================
// == SPLASH SCREEN LOGIC ==
// =============================================================================

/**
 * Determines whether to show the splash screen or fade in the main content
 * based on session storage.
 */
function handleSplashScreen() {
    if (sessionStorage.getItem(HAS_VISITED_KEY)) {
        // Already visited this session: Hide splash, show content
        splashScreen.style.display = 'none';
        mainPageContent.classList.add('fade-in');
    } else {
        // First visit this session: Show splash, then fade out
        sessionStorage.setItem(HAS_VISITED_KEY, 'true');

        const splashAnimationDuration = 2000; // ms
        const fadeOutDelay = 500;             // ms
        const splashFadeOutDuration = 800;    // ms

        // Start fading out the splash screen after animations + delay
        setTimeout(() => {
            splashScreen.classList.add('fade-out');

            // Hide splash and show content after fade-out transition completes
            setTimeout(() => {
                splashScreen.style.display = 'none';
                mainPageContent.classList.add('fade-in');
            }, splashFadeOutDuration);

        }, splashAnimationDuration + fadeOutDelay);
    }
}

// =============================================================================
// == INITIAL STATE SETUP ==
// =============================================================================

/**
 * Sets up initial states like button links and nav highlights.
 */
function setupInitialState() {
    joinCommunityButton.href = EXTERNAL_JOIN_LINK;
    setActiveNavItemOnScroll(); // Set initial nav state
}

// =============================================================================
// == CARD VERIFICATION LOGIC ==
// =============================================================================

/**
 * Handles key presses in the verification input, specifically Enter key.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
function handleVerificationKeyPress(e) {
    // Allow only numbers and limit length
    if (!/\d/.test(e.key) || cardCodeInput.value.length >= 4) {
        e.preventDefault();
    }
    // Trigger verification on Enter key
    if (e.key === 'Enter') {
        performVerification();
    }
}

/**
 * Performs the card code verification process.
 * Fetches user data (simulated) and updates the UI.
 */
function performVerification() {
    const code = cardCodeInput.value;

    // Reset UI elements
    userProfileDisplay.classList.remove('show');
    verificationMessage.classList.remove('show', 'verified', 'fake');
    verificationMessage.textContent = '';
    userProfileDisplay.innerHTML = '';

    // Validate input length
    if (code.length !== 4) {
        showMessage('Please enter a 4-digit code.', 'fake');
        return;
    }

    // Check if user exists (simulated)
    const user = verifiedUsers[code];

    if (user) {
        showMessage('VERIFIED! This user is safe and registered.', 'verified');
        displayUserProfile(user);
    } else {
        showMessage('FAKE USER! This code is not registered.', 'fake');
        displayFakeUserMessage();
    }

    cardCodeInput.value = ''; // Clear input
}

/**
 * Displays a message in the verification message area.
 * @param {string} text - The message text.
 * @param {string} type - 'verified' or 'fake' for styling.
 */
function showMessage(text, type) {
    verificationMessage.textContent = text;
    verificationMessage.classList.add('show', type);
}

/**
 * Displays the profile information for a verified user.
 * @param {object} user - The user data object.
 */
function displayUserProfile(user) {
    userProfileDisplay.innerHTML = `
        <img src="${user.picture}" alt="${user.name}">
        <h3>${user.name}</h3>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Location:</strong> ${user.city}, ${user.country}</p>
        <p><strong>Sexuality:</strong> ${user.sexuality}</p>
        <p><strong>Body Type:</strong> ${user.body_type}</p>
        <p><strong>Height:</strong> ${user.height}cm</p>
        <p style="color:var(--text-light);"><strong>Interested in:</strong> "${user.interested_in}"</p>
    `;
    userProfileDisplay.classList.add('show');
}

/**
 * Displays a message indicating an unverified/fake user.
 */
function displayFakeUserMessage() {
    userProfileDisplay.innerHTML = `
        <h3 style="color:var(--error-color);">Unregistered User</h3>
        <p>This user's code is not recognized.</p>
        <p>For your safety, avoid engaging with unverified individuals.</p>
        <p>Tell them to join via the "Join Community" button.</p>
    `;
    userProfileDisplay.classList.add('show');
}

// =============================================================================
// == MODAL HANDLING LOGIC ==
// =============================================================================

/**
 * Shows a specified modal overlay.
 * @param {HTMLElement} modalElement - The modal element to show.
 */
function showModal(modalElement) {
    modalElement.classList.add('show-modal');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    // Highlight the 'Add' nav item if relevant
    navItems.forEach(nav => nav.classList.remove('active'));
    if (modalElement === addCreateModal || modalElement === registrationModal) {
        registerNavItem.classList.add('active');
    }
}

/**
 * Hides a specified modal overlay.
 * @param {HTMLElement} modalElement - The modal element to hide.
 */
function hideModal(modalElement) {
    modalElement.classList.remove('show-modal');
    document.body.style.overflow = ''; // Restore background scroll
    setActiveNavItemOnScroll(); // Reset nav highlight
}

/**
 * Hides a modal if the click event occurred on the overlay itself (not content).
 * @param {MouseEvent} e - The click event object.
 * @param {HTMLElement} modalElement - The modal element.
 */
function handleModalOverlayClick(e, modalElement) {
    if (e.target === modalElement) {
        hideModal(modalElement);
    }
}

/**
 * Handles the click on the 'Live' link (currently placeholder).
 * @param {MouseEvent} e - The click event object.
 */
function handleLiveLinkClick(e) {
    e.preventDefault();
    alert('Navigating to Live Content! (This link is a placeholder)');
    // Example: window.location.href = 'live.html';
}

/**
 * Handles the click on the 'Add' navigation item.
 * @param {MouseEvent} e - The click event object.
 */
function handleRegisterNavClick(e) {
    e.preventDefault();
    showModal(addCreateModal);
}

/**
 * Handles the click on the 'Create your Gay Card' button/link.
 * @param {MouseEvent} e - The click event object.
 */
function handleCreateCardClick(e) {
    e.preventDefault();
    hideModal(addCreateModal);
    showModal(registrationModal);
}


// =============================================================================
// == PAYSTACK & REGISTRATION FORM LOGIC ==
// =============================================================================

/**
 * Handles the submission of the registration form.
 * Initiates Paystack payment and then submits data to Formspree.
 * @param {SubmitEvent} e - The form submission event object.
 */
async function handleRegistrationSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    // Generate a dummy email (Paystack requires one)
    const email = `${name.replace(/\s+/g, '').toLowerCase().substring(0, 15)}@truematch.com`;

    // Validate configuration
    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'YOUR_PAYSTACK_PUBLIC_KEY') {
        alert('Paystack Public Key not configured.');
        return;
    }
    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === 'YOUR_FORMSPREE_ENDPOINT') {
        alert('Formspree Endpoint not configured.');
        return;
    }

    // Setup Paystack
    let handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: PAYMENT_AMOUNT_NAIRA * 100, // Paystack requires amount in kobo
        currency: "NGN",
        ref: 'TM_' + Math.floor((Math.random() * 1000000000) + 1), // Unique reference
        metadata: { // Pass form data as metadata
            full_name: name,
            age: formData.get('age'),
            country: formData.get('country'),
            state_province: formData.get('state_province'),
            city: formData.get('city'),
            sexuality: formData.get('sexuality'),
            body_type: formData.get('body_type'),
            height: formData.get('height'),
            interested_in: formData.get('interested_in')
        },
        callback: function(response) {
            // --- Payment Successful ---
            alert('Payment successful! Ref: ' + response.reference);
            submitToFormspree(formData, response.reference, form);
        },
        onClose: function() {
            // --- Payment Closed/Cancelled ---
            alert('Payment process cancelled.');
        }
    });

    handler.openIframe(); // Open Paystack payment modal
}

/**
 * Submits form data to Formspree after successful payment.
 * @param {FormData} formData - The form data to submit.
 * @param {string} paystackRef - The Paystack transaction reference.
 * @param {HTMLFormElement} formElement - The form element to reset.
 */
function submitToFormspree(formData, paystackRef, formElement) {
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });
    data['paystack_reference'] = paystackRef; // Add reference

    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            console.error('Formspree submission failed:', response.statusText);
            alert('Registration data could not be saved. Please contact support.');
        } else {
             console.log('Form data successfully sent to Formspree!');
        }
    })
    .catch(error => {
        console.error('Network error during Formspree submission:', error);
        alert('A network error occurred. Please try again.');
    })
    .finally(() => {
        hideModal(registrationModal);
        showSuccessMessage();
        formElement.reset(); // Clear the form
    });
}

/**
 * Displays the success message after registration.
 */
function showSuccessMessage() {
    joinCommunitySection.style.display = 'none';
    joinSuccessMessage.style.display = 'block';
    setTimeout(() => { // Delay for transition
        joinSuccessMessage.classList.add('show');
    }, 10);
}

// =============================================================================
// == NAVIGATION & SCROLLING LOGIC ==
// =============================================================================

/**
 * Sets the active state on bottom navigation items based on scroll position.
 * Prioritizes modal state if a modal is open.
 */
function setActiveNavItemOnScroll() {
    // If a modal is open, 'Add' should be active
    if (addCreateModal.classList.contains('show-modal') ||
        registrationModal.classList.contains('show-modal') ||
        resourcesMenuModal.classList.contains('show-modal')) {
        navItems.forEach(nav => nav.classList.remove('active'));
        registerNavItem.classList.add('active');
        return;
    }

    // Determine active item by scroll position
    const currentScrollPos = window.scrollY + window.innerHeight / 2;
    let anyActive = false;

    navItems.forEach(nav => {
        nav.classList.remove('active'); // Reset all first
        const href = nav.getAttribute('href');

        // Check anchor links (though none are currently used for main sections)
        if (href && href.startsWith('#')) {
            try {
                const targetElement = document.querySelector(href);
                if (targetElement && currentScrollPos >= targetElement.offsetTop &&
                    currentScrollPos < targetElement.offsetTop + targetElement.offsetHeight) {
                    nav.classList.add('active');
                    anyActive = true;
                }
            } catch (error) {
                console.warn(`Could not find element for nav item: ${href}`);
            }
        }
    });

    // If no specific section is active, default to 'Home' if near the top
    if (!anyActive) {
         homeNavItem.classList.add('active');
    }
}

/**
 * Sets up smooth scrolling for all anchor links (href starting with #).
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Check if it's a valid ID selector and not just '#'
            if (targetId.length > 1) {
                try {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault(); // Prevent default jump
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(setActiveNavItemOnScroll, 600); // Update nav after scroll
                    }
                } catch (error) {
                     console.warn(`Could not scroll to element: ${targetId}`);
                }
            }
        });
    });
}


// =============================================================================
// == FAQ ACCORDION LOGIC ==
// =============================================================================

/**
 * Adds click event listeners to all FAQ questions to toggle answers.
 */
function setupFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');

            // Toggle active classes for styling (icon rotation, padding)
            question.classList.toggle('active');
            faqItem.classList.toggle('active');

            // Toggle max-height to show/hide with transition
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null; // Close
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px"; // Open
            }
        });
    });
}
