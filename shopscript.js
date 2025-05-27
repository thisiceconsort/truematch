// shopScript.js

// --- IMPORTANT: REPLACE THESE PLACEHOLDERS --- //
// You'll need to get your actual public key from Paystack and your Formspree endpoint.
const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY'; // Replace with your actual Paystack Public Key
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT'; // Replace with your actual Formspree endpoint
// --- END IMPORTANT --- //


// Global state for the cart
let cart = [];

// DOM elements
const categorySectionsContainer = document.getElementById('category-sections');
const searchInput = document.getElementById('search-input');
const cancelSearchButton = document.getElementById('cancel-search-button');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartPopup = document.getElementById('cart-popup');
const cartPopupList = document.getElementById('cart-popup-list');
const cartPopupTotal = document.getElementById('cart-popup-total');
const cartItemsDisplay = document.getElementById('cart-items-display');
const totalPriceDisplay = document.getElementById('total-price-display');
const checkoutForm = document.getElementById('checkout-form');
const formCartItems = document.getElementById('form-cart-items');
const formTotalAmount = document.getElementById('form-total-amount');
const payNowButton = document.getElementById('pay-now-button'); // This is not strictly necessary for the script but kept for reference
const paymentMessage = document.getElementById('payment-message');

// Hero Product DOM elements
const heroProductSection = document.getElementById('hero-product-section');
const heroProductTag = document.getElementById('hero-product-tag');
const heroProductTitle = document.getElementById('hero-product-title');
const heroProductDescription = document.getElementById('hero-product-description');
const heroProductPrice = document.getElementById('hero-product-price');
const heroAddToCartButton = document.getElementById('hero-add-to-cart');

// Product Quick View Modal DOM elements
const productQuickViewModal = document.getElementById('productQuickViewModal');
const quickViewCloseButton = productQuickViewModal.querySelector('.close-button');
const quickViewImage = document.getElementById('quick-view-image');
const quickViewName = document.getElementById('quick-view-name');
const quickViewDescription = document.getElementById('quick-view-description');
const quickViewPrice = document.getElementById('quick-view-price');
const quickViewAddToCartButton = document.getElementById('quick-view-add-to-cart');
const quickViewViewAffiliateButton = document.getElementById('quick-view-view-affiliate');


// --- Utility Functions ---

/**
 * Formats a number as Nigerian Naira (NGN).
 * @param {number} amount - The amount in kobo (smallest currency unit).
 * @returns {string} Formatted NGN string.
 */
function formatNaira(amount) {
    // Check if amount is a valid number, if not, return a default string or throw error
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '₦0.00'; // Or handle as an error
    }
    return `₦${(amount / 100).toFixed(2)}`;
}

/**
 * Displays a temporary message.
 * @param {string} message - The message to display.
 * @param {boolean} isSuccess - True for success message, false for error.
 */
function showMessage(message, isSuccess) {
    paymentMessage.textContent = message;
    paymentMessage.className = `message ${isSuccess ? 'success' : 'error'}`;
    paymentMessage.style.display = 'block';
    setTimeout(() => {
        paymentMessage.style.display = 'none';
    }, 5000); // Hide after 5 seconds
}


// --- Product Rendering Functions ---

/**
 * Creates a product card HTML element.
 * @param {object} product - The product object.
 * @returns {HTMLElement} The created product card div.
 */
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    // Store product ID and type as data attributes for easy access
    productCard.setAttribute('data-id', product.id);
    productCard.setAttribute('data-category', product.category);
    productCard.setAttribute('data-type', product.type); // Add data-type attribute

    // Use a conditional ternary operator for cleaner HTML generation
    productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="info">
            <h3>${product.name}</h3>
            <p class="category-text">${product.category}</p>
            ${product.type === 'shoppable'
                ? `<p class="price">${formatNaira(product.price)}</p>
                   <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>`
                : `<button class="view-affiliate" data-id="${product.id}">View Product</button>`
            }
        </div>
    `;
    return productCard;
}

/**
 * Renders products into category sliders.
 * It clears existing sections and rebuilds them based on the provided products.
 * @param {Array<object>} productsToRender - An array of product objects to display.
 */
function renderCategorySliders(productsToRender) {
    categorySectionsContainer.innerHTML = ''; // Clear existing sections

    // Define preferred category order and filter to include only categories present in productsToRender
    const preferredCategoryOrder = [
        'BL Books', 'GL Books', 'BL Movies', 'GL Movies',
        'Adult Boy Toys', 'Adult Girl Toys', 'Gadgets',
        'Phones and Laptops', 'Cars', 'Wearable Tech'
    ];

    const uniqueCategories = preferredCategoryOrder.filter(cat =>
        productsToRender.some(p => p.category === cat)
    );

    // Message for no search results
    if (productsToRender.length === 0 && searchInput.value.trim() !== '') {
        categorySectionsContainer.innerHTML = '<p style="color: var(--text-primary); text-align: center; margin-top: 50px; font-size: 1.1em;">No products found matching your search.</p>';
        return;
    }
    // Message for no products at all (unlikely if productsData.js is populated)
    else if (productsToRender.length === 0) {
         categorySectionsContainer.innerHTML = '<p style="color: var(--text-primary); text-align: center; margin-top: 50px; font-size: 1.1em;">No products available.</p>';
         return;
    }

    uniqueCategories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);

        const productSlider = document.createElement('div');
        productSlider.className = 'product-slider';

        const productsInCategory = productsToRender.filter(p => p.category === category);

        if (productsInCategory.length === 0) {
            // This case should ideally not happen if uniqueCategories is filtered correctly,
            // but kept as a safeguard for empty categories.
            const noProductsMessage = document.createElement('p');
            noProductsMessage.textContent = `No products found in this category.`;
            noProductsMessage.style.color = 'var(--text-secondary)';
            noProductsMessage.style.textAlign = 'center';
            noProductsMessage.style.marginTop = '20px';
            productSlider.appendChild(noProductsMessage);
        } else {
            productsInCategory.forEach(product => {
                productSlider.appendChild(createProductCard(product));
            });
        }

        categorySection.appendChild(productSlider);
        categorySectionsContainer.appendChild(categorySection);
    });
}

/**
 * Renders a single product search result directly to the main grid area.
 * Used specifically for 3-digit code search.
 * @param {object} product - The single product object to display.
 */
function renderSingleProduct(product) {
    categorySectionsContainer.innerHTML = `
        <div class="category-section" id="search-results-section">
            <h2>Search Results</h2>
            <div class="product-slider"></div>
        </div>
    `;
    const searchResultsSlider = document.querySelector('#search-results-section .product-slider');
    if (product) {
        searchResultsSlider.appendChild(createProductCard(product));
    } else {
        searchResultsSlider.innerHTML = '<p style="color: var(--text-primary); text-align: center; font-size: 1.1em;">No product found with that 3-digit code.</p>';
    }
}

/**
 * Populates the hero product section.
 * It dynamically sets background image, text content, and button action based on product type.
 * @param {object} product - The product to feature in the hero section.
 */
function populateHeroProduct(product) {
    if (!product) {
        heroProductSection.style.display = 'none';
        return;
    }

    const heroBgUrl = product.heroImageUrl || product.imageUrl;
    heroProductSection.style.backgroundImage = `url('${heroBgUrl}')`;
    heroProductSection.style.backgroundSize = 'cover';
    heroProductSection.style.backgroundPosition = 'center';

    heroProductTag.textContent = `Trending in ${product.category}`;
    heroProductTitle.textContent = product.name;
    heroProductDescription.textContent = product.description || `A top trending item from our ${product.category} collection.`;

    if (product.type === 'shoppable') {
        heroProductPrice.textContent = formatNaira(product.price);
        heroAddToCartButton.textContent = 'Add to Cart';
        heroAddToCartButton.onclick = () => addToCart(product.id);
    } else { // Affiliate product
        heroProductPrice.textContent = ''; // Hide price for affiliate
        heroAddToCartButton.textContent = 'View Affiliate Product';
        heroAddToCartButton.onclick = () => window.open(product.affiliateLink, '_blank');
    }
    displayHeroSection(true); // Ensure hero section is visible if a product is populated
}

/**
 * Controls the visibility of the hero section.
 * @param {boolean} show - True to show, false to hide.
 */
function displayHeroSection(show) {
    heroProductSection.style.display = show ? 'flex' : 'none';
}


// --- Cart Functions ---

/**
 * Updates the cart display in the popup and the bottom checkout section.
 * Also updates hidden form fields for submission.
 */
function updateCartDisplay() {
    cartCount.textContent = cart.length;
    cartPopupList.innerHTML = '';
    cartItemsDisplay.innerHTML = '';
    let total = 0;
    const cartItemsForForm = [];

    if (cart.length === 0) {
        cartPopupList.innerHTML = '<li style="color: var(--text-secondary); text-align: center;">Your cart is empty.</li>';
        cartItemsDisplay.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            // For Cart Popup
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-price">${formatNaira(item.price)}</span>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            cartPopupList.appendChild(listItem);

            // For Bottom Cart Section
            cartItemsDisplay.innerHTML += `
                <p><strong>${item.name}</strong> - ${formatNaira(item.price)}</p>
            `;
            total += item.price;
            // Prepare item details for Formspree submission
            cartItemsForForm.push({ id: item.id, name: item.name, price: item.price });
        });
    }

    cartPopupTotal.textContent = formatNaira(total);
    totalPriceDisplay.textContent = `Total: ${formatNaira(total)}`;

    // Update hidden form fields for submission
    formCartItems.value = JSON.stringify(cartItemsForForm);
    formTotalAmount.value = total; // Send total in kobo
}

/**
 * Adds a product to the cart.
 * Only 'shoppable' products can be added to the cart.
 * @param {string} productId - The ID of the product to add.
 */
function addToCart(productId) {
    // Find the product from the global 'products' array
    const productToAdd = products.find(p => p.id === productId && p.type === 'shoppable');
    if (productToAdd) {
        cart.push(productToAdd);
        updateCartDisplay();
        showMessage(`${productToAdd.name} added to cart!`, true);
    } else {
        console.warn(`Attempted to add non-shoppable or non-existent product with ID: ${productId}`);
    }
}

/**
 * Removes an item from the cart.
 * @param {string} productId - The ID of the product to remove.
 */
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        const removedItem = cart.splice(index, 1);
        updateCartDisplay();
        showMessage(`${removedItem[0].name} removed from cart.`, false);
    }
}


// --- MODAL FUNCTIONS ---

/**
 * Shows a given modal overlay.
 * @param {HTMLElement} modalElement - The modal element to show.
 */
function showModal(modalElement) {
    modalElement.classList.add('show-modal');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

/**
 * Hides a given modal overlay.
 * @param {HTMLElement} modalElement - The modal element to hide.
 */
function hideModal(modalElement) {
    modalElement.classList.remove('show-modal');
    document.body.style.overflow = ''; // Restore scrolling background
}

/**
 * Opens the product quick view modal with details of a specific product.
 * @param {string} productId - The ID of the product to display in quick view.
 */
function openProductQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found for quick view:', productId);
        return;
    }

    quickViewImage.src = product.imageUrl;
    quickViewImage.alt = product.name;
    quickViewName.textContent = product.name;
    quickViewDescription.textContent = product.description;

    if (product.type === 'shoppable') {
        quickViewPrice.textContent = formatNaira(product.price);
        quickViewPrice.style.display = 'block';
        quickViewAddToCartButton.style.display = 'block';
        quickViewViewAffiliateButton.style.display = 'none';
        quickViewAddToCartButton.onclick = () => {
            addToCart(product.id);
            hideModal(productQuickViewModal); // Close modal after adding to cart
        };
    } else { // Affiliate product
        quickViewPrice.style.display = 'none';
        quickViewAddToCartButton.style.display = 'none';
        quickViewViewAffiliateButton.style.display = 'block';
        quickViewViewAffiliateButton.onclick = () => {
            window.open(product.affiliateLink, '_blank');
            hideModal(productQuickViewModal); // Close modal
        };
    }

    showModal(productQuickViewModal);
}


// --- Event Handlers ---

// Search functionality handler
function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        displayHeroSection(true); // Show hero if search is empty
        renderCategorySliders(products); // Show all if search is empty
        return;
    }

    displayHeroSection(false); // Hide hero section when a search is performed

    // Check if it's a 3-digit code search for shoppable products
    if (searchTerm.match(/^\d{3}$/)) {
        const foundProduct = products.find(p => p.id === searchTerm && p.type === 'shoppable');
        renderSingleProduct(foundProduct); // Render only that product
    } else {
        // For other general text search (case-insensitive on name/category/id)
        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()) // Also search by ID for partial matches
        );
        renderCategorySliders(filteredProducts); // Render filtered products in their categories
    }
}


// --- Event Listeners ---

// Search input listener
searchInput.addEventListener('input', () => {
    // Show/hide the cancel search button
    cancelSearchButton.style.display = searchInput.value.trim() !== '' ? 'block' : 'none';
    if (searchInput.value.trim() === '') {
        // If search input is cleared, show hero and all products
        displayHeroSection(true);
        renderCategorySliders(products);
    }
});

// Search on Enter key press
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Cancel search button listener
cancelSearchButton.addEventListener('click', () => {
    searchInput.value = ''; // Clear search input
    cancelSearchButton.style.display = 'none'; // Hide cancel button
    displayHeroSection(true); // Show hero when search is cleared
    renderCategorySliders(products); // Display all products
});

// Event delegation for product card interactions (Add to Cart, View Affiliate, Quick View)
categorySectionsContainer.addEventListener('click', (event) => {
    const target = event.target;
    const targetCard = target.closest('.product-card');

    if (target.classList.contains('add-to-cart')) {
        event.stopPropagation(); // Prevent card click event from bubbling
        const productId = target.dataset.id;
        addToCart(productId);
    } else if (target.classList.contains('view-affiliate')) {
        event.stopPropagation(); // Prevent card click event from bubbling
        const productId = target.dataset.id;
        const product = products.find(p => p.id === productId);
        if (product && product.affiliateLink) {
            window.open(product.affiliateLink, '_blank');
        }
    } else if (targetCard) { // If a click occurred anywhere on the product card itself
        const productId = targetCard.dataset.id;
        openProductQuickView(productId);
    }
});


// Event delegation for removing items from the cart popup
cartPopupList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const productId = event.target.dataset.id;
        removeFromCart(productId);
    }
});

// Toggle cart popup visibility and scroll to cart section
cartIcon.addEventListener('click', () => {
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
    if (cartPopup.style.display === 'block') {
        // Scroll to the bottom cart section when cart icon is clicked
        document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Close cart popup if clicked outside
document.addEventListener('click', (event) => {
    if (!cartIcon.contains(event.target) && !cartPopup.contains(event.target) && cartPopup.style.display === 'block') {
        cartPopup.style.display = 'none';
    }
});

// Close product quick view modal if clicked outside or on close button
productQuickViewModal.addEventListener('click', (e) => {
    if (e.target === productQuickViewModal) {
        hideModal(productQuickViewModal);
    }
});
quickViewCloseButton.addEventListener('click', () => {
    hideModal(productQuickViewModal);
});


// Paystack & Formspree Integration on Buy Now button click
checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    if (cart.length === 0) {
        showMessage('Your cart is empty. Please add items before checking out.', false);
        return;
    }

    const emailInput = document.getElementById('email');
    const amountInKobo = parseFloat(formTotalAmount.value); // Already in kobo
    const customerEmail = emailInput.value;
    const customerName = document.getElementById('full-name').value;
    const customerPhone = document.getElementById('phone').value;
    const customerAddress = document.getElementById('address').value;

    if (!customerEmail || !customerName || !customerPhone || !customerAddress) {
        showMessage('Please fill in all your contact and delivery details.', false);
        return;
    }

    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY') {
        showMessage('Paystack Public Key is not configured. Please update the JavaScript code.', false);
        return;
    }
    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT') {
        showMessage('Formspree Endpoint is not configured. Please update the JavaScript code.', false);
        return;
    }

    // Initialize Paystack payment
    let handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: customerEmail,
        amount: amountInKobo, // Amount in kobo
        currency: 'NGN',
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // unique reference
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: customerName
                },
                {
                    display_name: "Delivery Address",
                    variable_name: "delivery_address",
                    value: customerAddress
                },
                {
                    display_name: "Phone Number",
                    variable_name: "phone_number",
                    value: customerPhone
                },
                {
                    display_name: "Cart Details",
                    variable_name: "cart_details",
                    value: formCartItems.value // Send JSON string of cart items
                }
            ]
        },
        callback: function(response) {
            // Payment successful
            const transactionRef = response.reference;
            showMessage(`Payment successful! Transaction Ref: ${transactionRef}`, true);

            // Now submit the form to Formspree
            const formData = new FormData(checkoutForm);
            fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showMessage('Thank you! Your order has been placed successfully!', true);
                    cart = []; // Clear cart
                    updateCartDisplay();
                    checkoutForm.reset(); // Clear form fields
                } else {
                    showMessage('Order submission failed after payment. Please contact support.', false);
                    console.error('Formspree submission failed:', response);
                }
            })
            .catch(error => {
                showMessage('Network error during order submission. Please try again.', false);
                console.error('Network error submitting to Formspree:', error);
            });
        },
        onClose: function() {
            // Payment window closed
            showMessage('Payment window closed. Payment was not completed.', false);
        }
    });
    handler.openIframe(); // Open the Paystack checkout iframe
});


// --- Modal & General UI Logic (Non-Product Related) ---

// Initial setup on page load
document.addEventListener('DOMContentLoaded', () => {
    // Determine current page for bottom nav highlighting
    const currentPagePath = window.location.pathname;
    const currentPageFileName = currentPagePath.split('/').pop();

    // --- Active state for bottom navigation (JavaScript-driven) ---
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    bottomNavItems.forEach(item => {
        item.classList.remove('active'); // Remove active class from all first
        const itemHref = item.getAttribute('href');
        // Check if itemHref matches the current page file name
        if (itemHref === currentPageFileName) {
            item.classList.add('active');
        }
    });

    // --- Modals and their buttons ---
    // Resources Menu Modal
    const resourcesMenuModal = document.getElementById('resourcesMenuModal');
    const resourcesMenuCloseButton = resourcesMenuModal.querySelector('.close-button');
    const openResourcesMenuModalLink = document.getElementById('openResourcesMenuModalLink');

    // Add/Create Modal
    const addCreateModal = document.getElementById('addCreateModal');
    const addCreateModalCloseButton = addCreateModal.querySelector('.close-button');
    const openAddCreateModalLink = document.getElementById('openAddCreateModalLink');

    // Contact Form Modal
    const contactFormModal = document.getElementById('contactFormModal');
    const contactFormCloseButton = contactFormModal.querySelector('.close-button');
    const openContactFormModalLink = document.getElementById('openContactFormModalLink');

    // Event listeners for opening/closing modals
    openResourcesMenuModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(resourcesMenuModal);
    });
    resourcesMenuCloseButton.addEventListener('click', () => {
        hideModal(resourcesMenuModal);
    });
    resourcesMenuModal.addEventListener('click', (e) => {
        if (e.target === resourcesMenuModal) { // Clicked on overlay, not content
            hideModal(resourcesMenuModal);
        }
    });

    openAddCreateModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(addCreateModal);
    });
    addCreateModalCloseButton.addEventListener('click', () => {
        hideModal(addCreateModal);
    });
    addCreateModal.addEventListener('click', (e) => {
        if (e.target === addCreateModal) { // Clicked on overlay, not content
            hideModal(addCreateModal);
        }
    });

    if (openContactFormModalLink) { // Ensure button exists before adding listener
        openContactFormModalLink.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(contactFormModal);
        });
    }
    if (contactFormCloseButton) {
        contactFormCloseButton.addEventListener('click', () => {
            hideModal(contactFormModal);
        });
    }
    if (contactFormModal) {
        contactFormModal.addEventListener('click', (e) => {
            if (e.target === contactFormModal) { // Clicked on overlay, not content
                hideModal(contactFormModal);
            }
        });
    }

    // Live Link placeholder action
    const openLiveLink = document.getElementById('openLiveLink');
    if (openLiveLink) {
        openLiveLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Navigating to Live Content! (This link is a placeholder)');
        });
    }

    // Contact Form email functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            const mailtoLink = `mailto:iceconsort@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink; // This opens the email client
            hideModal(contactFormModal);
            contactForm.reset(); // Clear form fields
        });
    }

    // --- Shop Specific Initializations (Runs once DOM is ready) ---
    // Select a trending product for the hero section.
    // It looks for the first 'shoppable' product that also has a 'heroImageUrl'.
    // If none found, it falls back to the very first product in the 'products' array.
    const trendingProduct = products.find(p => p.type === 'shoppable' && p.heroImageUrl);
    populateHeroProduct(trendingProduct || products[0]); // Populate hero with trending or first product

    renderCategorySliders(products); // Render all products into their respective categories initially
    updateCartDisplay(); // Initialize cart display on page load
});

