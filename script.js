// Consolidated JavaScript for better organization

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded. Starting splash/homepage logic...'); // Debugging log
    const splash = document.getElementById('splash');
    const homepage = document.getElementById('homepage');

    // Crucial: Check if elements exist before trying to manipulate them
    if (!splash) {
        console.error('Error: Splash element (id="splash") not found!');
        // If splash is missing, immediately show homepage as a fallback
        if (homepage) {
            homepage.style.display = 'flex';
            homepage.style.opacity = 1;
        }
        return; // Stop further execution if critical elements are missing
    }
    if (!homepage) {
        console.error('Error: Homepage element (id="homepage") not found!');
        // If homepage is missing, nothing can be done really.
        splash.remove(); // At least remove the splash if it's there
        return;
    }

    const splashShown = sessionStorage.getItem('splashShown');
    console.log('splashShown from sessionStorage:', splashShown); // Debugging log

    if (!splashShown) {
        console.log('Splash not shown before. Displaying splash.'); // Debugging log
        // Show splash screen for 2.4s then fade out
        setTimeout(() => {
            console.log('2.4s timeout complete. Fading out splash.'); // Debugging log
            splash.classList.add('fade-out');
            setTimeout(() => {
                console.log('Splash fade-out complete. Removing splash and showing homepage.'); // Debugging log
                splash.remove();
                homepage.style.display = 'flex'; // This is the crucial line to show the homepage
                // The fadeInHomepage animation defined in CSS will handle opacity from 0 to 1
            }, 600); // Allow fade-out transition to complete
        }, 2400);
        sessionStorage.setItem('splashShown', 'true');
    } else {
        console.log('Returning visit: Skipping splash screen.'); // Debugging log
        // Skip splash screen
        splash.remove();
        homepage.style.display = 'flex'; // This is the crucial line to show the homepage
        homepage.style.opacity = 1; // Immediately set opacity if splash skipped
    }
});

// --- Code Verification Logic ---
// Updated structure for validUsers to include name, age, country, state, lga, and telegram link
const validUsers = {
    '0001': {
        name: 'Ice Consort',
        age: '30', // Example age
        country: 'Nigeria',
        state: 'Delta',
        lga: 'Sapele',
        telegram: 'https://t.me/Ice_consort',
        // image: 'path/to/ice_consort_profile.jpg' // Optional: add a path to a profile image
    },
    '6609': {
        name: 'Celi Bajami',
        age: '28',
        country: 'Nigeria',
        state: 'Lagos',
        lga: 'Ikeja',
        telegram: 'https://example.com/profile/celi-bajami', // Placeholder
    },
    '8421': {
        name: 'James Smith',
        age: '25',
        country: 'Ghana',
        state: 'Greater Accra',
        lga: 'Accra Metropolis',
        telegram: 'https://example.com/profile/james-smith', // Placeholder
    },
    '3098': {
        name: 'Manuel Fernandez',
        age: '35',
        country: 'South Africa',
        state: 'Gauteng',
        lga: 'Johannesburg',
        telegram: 'https://example.com/profile/manuel-fernandez', // Placeholder
    },
    '2745': {
        name: 'Leo Williams',
        age: '22',
        country: 'Kenya',
        state: 'Nairobi',
        lga: 'Nairobi',
        telegram: 'https://example.com/profile/leo-williams', // Placeholder
    }
    // Add more code: user_details_object pairs here
    /*
    'XXXX': {
        name: 'Person Name',
        age: 'XX',
        country: 'Country Name',
        state: 'State Name',
        lga: 'Local Government Area',
        telegram: 'https://telegram.me/username',
        // image: 'path/to/profile_image.jpg' // If you want to show an image
    },
    */
};

function verifyCode() {
    const input = document.getElementById('codeInput').value.trim();
    const resultBox = document.getElementById('result');

    // Clear previous classes and hide, then display
    resultBox.style.display = 'none'; // Hide first to allow re-animation
    resultBox.className = 'result'; // Reset classes for new animation

    // Add a small delay before showing to ensure animation re-triggers
    setTimeout(() => {
        if (input.length !== 4 || !/^\d{4}$/.test(input)) {
            resultBox.style.display = 'block';
            resultBox.classList.add('fail');
            resultBox.innerHTML = 'Please enter a valid 4-digit code.';
            return;
        }

        if (validUsers.hasOwnProperty(input)) {
            const userData = validUsers[input];
            resultBox.style.display = 'block';
            resultBox.classList.add('success');

            // Constructing the detailed message
            let message = `
                <div style="text-align: center;">
                    <h3 style="margin-bottom: 5px; color: var(--color-success); font-size: 1.3rem;">Verified!</h3>
                    <p style="margin-top: 0; margin-bottom: 10px; font-weight: bold; font-size: 1.1rem; color: var(--color-text-light);">
                        ${userData.name}
                    </p>
            `;

            // Optionally add an image if available
            // if (userData.image) {
            //     message += `<img src="${userData.image}" alt="${userData.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 2px solid var(--color-success);">`;
            // }

            message += `
                    <p style="margin-bottom: 5px; color: var(--color-text-medium);">
                        Age: <strong>${userData.age}</strong>
                    </p>
                    <p style="margin-bottom: 5px; color: var(--color-text-medium);">
                        Location: <strong>${userData.lga}, ${userData.state}, ${userData.country}</strong>
                    </p>
                    <a href="${userData.telegram}" target="_blank" rel="noopener noreferrer" style="display: block; margin-top: 15px; font-size: 1rem;">
                        Chat with them now on Telegram
                    </a>
                </div>
            `;
            resultBox.innerHTML = message;

        } else {
            resultBox.style.display = 'block';
            resultBox.classList.add('fail');
            resultBox.textContent = 'Fake Account. This person is not part of the boyhood TrueMatch community.';
        }
    }, 50); // Small delay
}


// --- Modal Logic ---
function openModal(id) {
    document.getElementById(id).style.display = "block";
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    // Get modal for exit animation
    const modal = document.getElementById(id);
    const modalContent = modal.querySelector('.modal-content');

    // Apply exit animations (these refer to the @keyframes in the <style> block)
    modalContent.style.animation = 'slideOutModal 0.3s ease-out forwards';
    modal.style.animation = 'fadeOutModal 0.3s ease-out forwards';

    // Hide modal after animation completes
    setTimeout(() => {
        modal.style.display = "none";
        // Reset animations so they play correctly next time the modal opens
        modalContent.style.animation = '';
        modal.style.animation = '';
        document.body.style.overflow = ''; // Re-enable body scroll
    }, 300); // Match animation duration
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        // Check if the clicked element is the modal itself (the background overlay) and not its content
        if (event.target === modal) {
            closeModal(modal.id); // Use the existing closeModal function
        }
    });
};

// --- Form Submission (Selar/Formspree) Logic ---
// IMPORTANT NOTE: The form with id="requestForm" is currently NOT present in the provided HTML.
// This JavaScript block assumes you will add an HTML <form id="requestForm">...</form> element later.
// Without it, this code will not execute or cause an error.
const form = document.getElementById("requestForm");
const formAction = "https://formspree.io/f/xovdrlby"; // Formspree endpoint
const selarUrl = "https://selar.com/53ea77";
const thankYouHTML = `
    <h2>Thank you for your payment!</h2>
    <p style="color: var(--color-text-medium); margin-bottom: 25px;">You're now verified. Click the button below to join the club.</p>
    <a href="https://t.me/+SH0obsiO2z1mYzg0" target="_blank">
        <button style="
            padding:12px 25px;
            margin-top:20px;
            background: linear-gradient(45deg, var(--color-blue-link), #0088CC);
            box-shadow: 0 5px 15px rgba(0, 175, 240, 0.4);
            border-radius: 8px;
            font-weight: 700;
            font-size: 1rem;
            transition: all 0.3s ease;
        ">Join the Club</button>
    </a>
`;

// Check if form element exists before adding listener to prevent errors
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // prevent normal form submit

        // store form values temporarily in sessionStorage
        const formData = new FormData(form);
        const tempData = {};
        formData.forEach((value, key) => {
            tempData[key] = value;
        });
        sessionStorage.setItem("verificationFormData", JSON.stringify(tempData));

        // redirect to Selar payment with a redirect URL back to this page
        const redirectUrl = window.location.href.split("?")[0] + "?status=success";
        const fullSelarUrl = selarUrl + "?redirect_url=" + encodeURIComponent(redirectUrl);
        window.location.href = fullSelarUrl;
    });
}

// Logic to handle redirect back after payment (checks URL for ?status=success)
const params = new URLSearchParams(window.location.search);
if (params.get("status") === "success") {
    const savedData = sessionStorage.getItem("verificationFormData");
    if (savedData) {
        const data = JSON.parse(savedData);
        sessionStorage.removeItem("verificationFormData"); // Clean up stored data

        // Create a temporary form to submit data to Formspree
        const postForm = document.createElement("form");
        postForm.method = "POST";
        postForm.action = formAction;
        for (const key in data) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = data[key];
            postForm.appendChild(input);
        }
        document.body.appendChild(postForm); // Append to body to submit
        postForm.submit(); // Submit the data

        // Replace the content of the homepage with the thank you message
        // This assumes #homepage is the container you want to modify.
        const homepageDiv = document.getElementById('homepage');
        if (homepageDiv) {
            homepageDiv.innerHTML = thankYouHTML; // Replace entire homepage content
            homepageDiv.style.display = 'flex'; // Ensure it's visible if it was hidden
            homepageDiv.style.opacity = 1; // Ensure it's fully opaque
        }
    }
}
