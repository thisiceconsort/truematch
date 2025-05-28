// reviews.js

// Global Variables for Review Management
// IMPORTANT: Replace these placeholder values with your actual Formspree Form ID
// and your moderation email.
const REVIEW_FORMSPREE_FORM_ID = 'YOUR_REVIEW_FORMSPREE_FORM_ID'; // Dedicated Formspree ID for reviews
const YOUR_MODERATION_EMAIL = 'iceconsort@gmail.com'; // Your email for receiving review submissions

// Simulated review data for demonstration purposes.
// In a real application, this data would come from a backend database.
const reviewsData = [
    {
        name: "Aisha M.",
        date: "May 20, 2025",
        rating: 5,
        text: "Mìlàájé's 'Digital Security' course was a game-changer! I feel so much safer online now. The content was clear and practical, highly recommended for everyone!",
        identity: '<a href="https://twitter.com/aisha_m" target="_blank">@aisha_m (Twitter)</a>'
    },
    {
        name: "David N.",
        date: "May 15, 2025",
        rating: 5,
        text: "The 'Social Media for Advocacy' session was incredibly insightful. It gave me practical tools to amplify my voice for causes I care about. Thank to Mìlàájé!",
        identity: "Email Address"
    },
    {
        name: "Chika O.",
        date: "May 10, 2025",
        rating: 4,
        text: "The 'Basic Website Creation' module was really good for a beginner like me. Sometimes the pace was a bit fast, but overall, very helpful. I managed to get my blog up!",
        identity: "LinkedIn Profile"
    },
    {
        name: "Benard K.",
        date: "April 28, 2025",
        rating: 3,
        text: "The content for 'Remote Work & Online Communication' was comprehensive, but I wish there were more interactive exercises. Still, it covered important ground.",
        identity: "Phone Number"
    },
    {
        name: "Nonso A.",
        date: "April 25, 2025",
        rating: 2,
        text: "The course had some good points but felt a bit outdated in parts. Needs an update.",
        identity: "Email Address"
    },
    {
        name: "Grace E.",
        date: "April 22, 2025",
        rating: 1,
        text: "Disappointing. The audio quality was poor and made it hard to follow. I hope they fix this.",
        identity: "Social Media"
    },
    {
        name: "Emeka T.",
        date: "April 18, 2025",
        rating: 5,
        text: "Fantastic customer support! Had an issue and it was resolved quickly and efficiently. The skills learned are genuinely useful.",
        identity: "Email Verified"
    },
    {
        name: "Sarah P.",
        date: "April 12, 2025",
        rating: 4,
        text: "Good value for money. The 'Financial Literacy' course was easy to understand, though I'd love more advanced topics in the future.",
        identity: "Email Verified"
    }
];

// Helper function to show a modal
function showModal(modalElement) {
    modalElement.classList.add('show-modal');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

// Helper function to hide a modal
function hideModal(modalElement) {
    modalElement.classList.remove('show-modal');
    document.body.style.overflow = ''; // Restore scrolling background
}

// Function to create star icons HTML
function getStarIcons(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="material-icons ${i <= rating ? '' : 'empty'}">star</span>`;
    }
    return starsHtml;
}

// Function to render review cards dynamically into a target element
function renderReviewCards(reviewsToRender, targetElement) {
    targetElement.innerHTML = ''; // Clear existing cards
    if (reviewsToRender.length === 0) {
        targetElement.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 30px;">No reviews found for this rating yet.</p>';
        return;
    }

    reviewsToRender.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        reviewCard.classList.add(`${review.rating}-star`); // Add class for specific star styling if needed

        reviewCard.innerHTML = `
            <div class="review-header">
                <span class="reviewer-info">${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="star-rating-display">
                ${getStarIcons(review.rating)}
            </div>
            <p class="review-text">"${review.text}"</p>
            <div class="reviewer-identity">
                Verified by: ${review.identity}
            </div>
        `;
        targetElement.appendChild(reviewCard);
    });
}

// Function to calculate and update overall ratings summary
function updateOverallRatings() {
    const totalReviews = reviewsData.length;
    let sumRatings = 0;
    const ratingCounts = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };

    reviewsData.forEach(review => {
        sumRatings += review.rating;
        ratingCounts[review.rating]++;
    });

    const averageRating = totalReviews > 0 ? (sumRatings / totalReviews).toFixed(1) : '0.0';
    document.getElementById('overall-average-rating').textContent = averageRating;
    document.getElementById('overall-total-reviews').textContent = `${totalReviews} total reviews`;

    // Update overall stars display
    const overallStarsDisplay = document.getElementById('overall-stars-display');
    overallStarsDisplay.innerHTML = getStarIcons(Math.round(parseFloat(averageRating))); // Round to nearest whole star

    // Update rating breakdown bars
    for (let i = 5; i >= 1; i--) {
        const count = ratingCounts[i.toString()];
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        document.getElementById(`count-${i}-star`).textContent = count;
        document.getElementById(`fill-${i}-star`).style.width = `${percentage}%`;
    }
}

// Function to display reviews based on filter rating
function displayReviews(rating) {
    const mainReviewGrid = document.getElementById('all-reviews-grid');
    const reviewSectionTitle = document.querySelector('.review-section h2');

    mainReviewGrid.innerHTML = ''; // Clear existing cards from the main grid

    let filteredReviews = [];
    let sectionTitleHtml = 'All Reviews'; // Default for 'all'

    if (rating === 'all') {
        filteredReviews = reviewsData;
    } else {
        const numericRating = parseInt(rating);
        filteredReviews = reviewsData.filter(review => review.rating === numericRating);
        // Generate dynamic title with stars for specific ratings
        sectionTitleHtml = '';
        for (let i = 1; i <= 5; i++) {
            sectionTitleHtml += `<span class="material-icons ${i <= numericRating ? '' : 'empty'}">star</span>`;
        }
        sectionTitleHtml += ` ${numericRating}-Star Reviews`;
    }

    // Update the section title
    reviewSectionTitle.innerHTML = sectionTitleHtml;

    // Render reviews into the single main grid
    renderReviewCards(filteredReviews, mainReviewGrid);

    // Update active button state
    const reviewFilterButtons = document.querySelectorAll('.review-filter-button');
    reviewFilterButtons.forEach(button => {
        if (button.dataset.rating === rating) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Main function to initialize review features
function initializeReviews() {
    // NEW: Review Form Modal elements
    const reviewFormModal = document.getElementById('reviewFormModal');
    const reviewFormCloseButton = reviewFormModal.querySelector('.close-button');
    const openReviewFormButton = document.getElementById('openReviewFormButton');
    const reviewForm = document.getElementById('reviewForm');
    const reviewerNameInput = document.getElementById('reviewerName');
    const reviewDateInput = document.getElementById('reviewDate');
    const ratingStars = document.querySelectorAll('.rating-stars input[name="rating"]');
    const reviewTextInput = document.getElementById('reviewText');
    const socialMediaInput = document.getElementById('socialMedia');
    const agreeTermsCheckbox = document.getElementById('agreeTerms');
    const reviewFilterButtons = document.querySelectorAll('.review-filter-button');


    if (openReviewFormButton) {
        openReviewFormButton.addEventListener('click', () => {
            // Pre-fill date
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            reviewDateInput.value = today.toLocaleDateString('en-US', options);
            showModal(reviewFormModal);
        });
    }

    if (reviewFormCloseButton) {
        reviewFormCloseButton.addEventListener('click', () => {
            hideModal(reviewFormModal);
        });
    }

    if (reviewFormModal) {
        reviewFormModal.addEventListener('click', (e) => {
            if (e.target === reviewFormModal) {
                hideModal(reviewFormModal);
            }
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            if (!agreeTermsCheckbox.checked) {
                alert("Please agree to the Terms of Review before submitting.");
                return;
            }

            const reviewerName = reviewerNameInput.value;
            const reviewDate = reviewDateInput.value;
            let rating = 0;
            for (const star of ratingStars) {
                if (star.checked) {
                    rating = parseInt(star.value);
                    break;
                }
            }
            const reviewText = reviewTextInput.value;
            const socialMedia = socialMediaInput.value;

            // In a real application, you would send this 'newReview' object
            // to your backend server via an API call (e.g., fetch or axios).
            // For this demonstration, we'll add it to our in-memory reviewsData array.
            const newReview = {
                name: reviewerName,
                date: reviewDate,
                rating: rating,
                text: reviewText,
                identity: socialMedia || 'Email Verified' // Default if not provided
            };

            // This line simulates adding the review to your data.
            // In a real scenario, this would happen after a successful backend submission.
            reviewsData.push(newReview);

            // Re-render reviews and update overall ratings
            updateOverallRatings(); // Update overall stats
            displayReviews('all'); // Show all reviews including the new one

            // Construct email subject and body for moderation
            const subject = `New Review Submission: ${rating} Stars from ${reviewerName}`;
            let body = `
                Name: ${reviewerName}
                Date Posted: ${reviewDate}
                Rating: ${rating} out of 5 stars
                Review:
                ${reviewText}
            `;
            if (socialMedia) {
                body += `\nSocial Media / Identity: ${socialMedia}`;
            }
            body = body.trim(); // Remove leading/trailing whitespace

            const mailtoLink = `mailto:${YOUR_MODERATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink; // Open default email client

            // After opening email client, clear form and hide modal
            setTimeout(() => {
                hideModal(reviewFormModal);
                reviewForm.reset();
                // Uncheck stars after reset
                ratingStars.forEach(star => star.checked = false);
                agreeTermsCheckbox.checked = false; // Uncheck terms
            }, 500); // A small delay to allow mailto to trigger
        });
    }

    // Add click listeners to filter buttons
    reviewFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const rating = button.dataset.rating;
            displayReviews(rating);
        });
    });

    // Initial render of reviews and overall stats on page load
    updateOverallRatings();
    displayReviews('all');
}

// Initialize review functionalities when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeReviews);
