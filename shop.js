// --- IMPORTANT: REPLACE THESE PLACEHOLDERS ---
// You'll need to get your actual public key from Paystack and your Formspree endpoint.
const PAYSTACK_PUBLIC_KEY = 'pk_live_6b671064b6a716c1ceffe82bf20a28c317a69584'; // Replace with your actual Paystack Public Key
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xovdrlby'; // Replace with your actual Formspree endpoint
// --- END IMPORTANT ---

// Product Data (JavaScript based)
const products = [
    // Shoppable Products (BL Books, GL Books, BL Movies, GL Books - with 3-digit codes)
    {
        id: '001',
        name: 'Whispers of boyhood',
        category: 'BL Books',
        price: 25000, // Price in kobo (NGN 25.00)
        imageUrl: 'https://i.imgur.com/6P1OqYy.jpeg', /* Changed placeholder color to match theme */
        heroImageUrl: 'https://via.placeholder.com/600x400/483D8B/FFFFFF?text=Whispers+of+Love+Hero', /* Hero specific image, theme color */
        description: 'A captivating romance novel that explores the depths of connection and unspoken desires.',
        type: 'shoppable'
    },
    {
        id: '002',
        name: 'Crimson Promise (BL Book Vol. 2)',
        category: 'BL Books',
        price: 2800,
        imageUrl: 'https://via.placeholder.com/200x200/483D8B/FFFFFF?text=BL+Book+002', /* Changed placeholder color to match theme */
        description: 'The highly anticipated sequel, delving deeper into the interwoven destinies of its characters.',
        type: 'shoppable'
    },
    {
        id: '003',
        name: 'Sapphire Dreams (GL Book Vol. 1)',
        category: 'GL Books',
        price: 2700,
        imageUrl: 'https://via.placeholder.com/200x200/6A5ACD/FFFFFF?text=GL+Book+003', /* Changed placeholder color to match theme */
        description: 'An enchanting tale of self-discovery and enduring love, set against a magical backdrop.',
        type: 'shoppable'
    },
    {
        id: '004',
        name: 'Emerald Whispers (GL Book Vol. 2)',
        category: 'GL Books',
        price: 2900,
        imageUrl: 'https://via.placeholder.com/200x200/6A5ACD/FFFFFF?text=GL+Book+004', /* Changed placeholder color to match theme */
        description: 'The continuation of the beloved GL story, filled with courage and heartwarming moments.',
        type: 'shoppable'
    },
    {
        id: '005',
        name: 'Starlight Embrace (BL Movie)',
        category: 'BL Movies',
        price: 3500,
        imageUrl: 'https://via.placeholder.com/200x200/483D8B/FFFFFF?text=BL+Movie+005', /* Changed placeholder color to match theme */
        description: 'A visually stunning movie with a poignant BL storyline and unforgettable performances.',
        type: 'shoppable'
    },
     {
        id: '006',
        name: 'Celestial Bonds (GL Movie)',
        category: 'GL Movies',
        price: 3200,
        imageUrl: 'https://via.placeholder.com/200x200/6A5ACD/FFFFFF?text=GL+Movie+006', /* Changed placeholder color to match theme */
        description: 'Experience a powerful GL film that touches on themes of destiny and true partnership.',
        type: 'shoppable'
    },
     {
        id: '007',
        name: 'The BL Book Vol. 3: Echoes',
        category: 'BL Books',
        price: 2600,
        imageUrl: 'https://via.placeholder.com/200x200/483D8B/FFFFFF?text=BL+Book+007', /* Changed placeholder color to match theme */
        description: 'The thrilling conclusion to the BL book series, bringing all mysteries to light.',
        type: 'shoppable'
    },
    {
        id: '008',
        name: 'GL Movie: Rainbow Horizon',
        category: 'GL Movies',
        price: 3300,
        imageUrl: 'https://via.placeholder.com/200x200/6A5ACD/FFFFFF?text=GL+Movie+008', /* Changed placeholder color to match theme */
        description: 'A vibrant and inspiring GL movie about finding hope and new beginnings.',
        type: 'shoppable'
    },
    // Affiliated Products (placeholders updated to match theme colors)
    {
        id: 'aff-001',
        name: 'Futuristic Robot Companion',
        category: 'Adult Boy Toys',
        affiliateLink: 'https://www.aliexpress.com/item/10050012345.html',
        imageUrl: 'https://via.placeholder.com/200x200/888888/FFFFFF?text=Boy+Toy',
        description: 'An advanced robot designed for companionship and entertainment.',
        type: 'affiliate'
    },
    {
        id: 'aff-002',
        name: 'Sparkle Unicorn Plushie',
        category: 'Adult Girl Toys',
        affiliateLink: 'https://www.aliexpress.com/item/10050067890.html',
        imageUrl: 'https://via.placeholder.com/200x200/888888/FFFFFF?text=Girl+Toy',
        description: 'A super soft and cuddly plushie with magical sparkling features.',
        type: 'affiliate'
    },
    {
        id: 'aff-003',
        name: 'Smart Home Hub X',
        category: 'Gadgets',
        affiliateLink: 'https://www.aliexpress.com/item/10050011223.html',
        imageUrl: 'https://via.placeholder.com/200x200/888888/FFFFFF?text=Gadget',
        description: 'Control all your smart devices from one central, easy-to-use hub.',
        type: 'affiliate'
    },
    {
        id: 'aff-004',
        name: 'Quantum 5G Smartphone',
        category: 'Phones and Laptops',
        affiliateLink: 'https://www.aliexpress.com/item/10050044556.html',
        imageUrl: 'https://via.placeholder.com/200x200/888888/FFFFFF?text=Phone',
        description: 'Experience blazing-fast 5G speeds and an incredible camera system.',
        type: 'affiliate'
    },
    {
        id: 'aff-005',
        name: 'Zenith UltraBook Pro',
        category: 'Phones and Laptops',
        affiliateLink: 'https://www.aliexpress.com/item/10050077889.html',
        imageUrl: 'https://via.placeholder.com/200x200/888888/FFFFFF?text=Laptop',
        description: 'Ultra-thin, ultra-powerful. Perfect for work and entertainment on the go.',
        type: 'affiliate'
    },
    {
        id: 'aff-006',
        name: 'Electric City Cruiser',
        category: 'Cars',
        affiliateLink: 'https://www.aliexpress.com/item/10050099001.html',
        imageUrl: 'https://via.placeholder.com/200x200/888888/FFFFFF?text=Car',
        description: 'Eco-friendly and stylish, navigate the city with ease and zero emissions.',
        type: 'affiliate'
    }
];

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
const payNowButton = document.getElementById('pay-now-button');
const paymentMessage = document.getElementById('payment-message');

// Hero Product DOM elements
const heroProductSection = document.getElementById('hero-product-section');
const heroProductImage = document.getElementById('hero-product-image');
const heroProductTag = document.getElementById('hero-product-tag');
const heroProductTitle = document.getElementById('hero-product-title');
const heroProductDescription = document.getElementById('hero-product-description');
const heroProductPrice = document.getElementById('hero-product-price');
const heroAddToCartButton = document.getElementById('hero-add-to-cart');

// --- Utility Functions ---

/**
 * Formats a number as Nigerian Naira (NGN).
 * @param {number} amount - The amount in kobo (smallest currency unit).
 * @returns {string} Formatted NGN string.
 */
function formatNaira(amount) {
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
    productCard.setAttribute('data-id', product.id);
    productCard.setAttribute('data-category', product.category);

    productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="info">
            <h3>${product.name}</h3>
            <p class="category-text">${product.category}</p>
            ${product.type === 'shoppable' ?
                `<p class="price">${formatNaira(product.price)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>` :
                `<button class="view-affiliate" onclick="window.open('${product.affiliateLink}', '_blank')">View Product</button>`
            }
        </div>
    `;
    return productCard;
}

/**
 * Renders products into category sliders.
 * @param {Array<object>} productsToRender - An array of product objects to display.
 */
function renderCategorySliders(productsToRender) {
    categorySectionsContainer.innerHTML = ''; // Clear existing sections

    const uniqueCategories = [
        'BL Books', 'GL Books', 'BL Movies', 'GL Movies',
        'Adult Boy Toys', 'Adult Girl Toys', 'Gadgets', 'Phones and Laptops', 'Cars', 'Wearable Tech' // Added 'Wearable Tech'
    ].filter(cat => productsToRender.some(p => p.category === cat));

    if (productsToRender.length === 0) {
        categorySectionsContainer.innerHTML = '<p style="color: var(--text-light); text-align: center; margin-top: 50px;">No products found matching your search.</p>';
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
             const noProductsMessage = document.createElement('p');
             noProductsMessage.textContent = `No products found in this category.`;
             noProductsMessage.style.color = 'var(--text-muted)';
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
        searchResultsSlider.innerHTML = '<p style="color: var(--text-light);">No product found with that 3-digit code.</p>';
    }
}

/**
 * Populates the hero product section.
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

    heroProductImage.src = product.imageUrl;
    heroProductImage.alt = product.name;
    heroProductTag.textContent = `Trending in ${product.category}`;
    heroProductTitle.textContent = product.name;
    heroProductDescription.textContent = product.description || `A top trending item from our ${product.category} collection.`;

    if (product.type === 'shoppable') {
        heroProductPrice.textContent = formatNaira(product.price);
        heroAddToCartButton.textContent = 'Add to Cart';
        heroAddToCartButton.onclick = () => addToCart(product.id);
    } else {
        heroProductPrice.textContent = '';
        heroAddToCartButton.textContent = 'View Affiliate Product';
        heroAddToCartButton.onclick = () => window.open(product.affiliateLink, '_blank');
    }
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
 * Updates the cart display (popup and bottom section).
 */
function updateCartDisplay() {
    cartCount.textContent = cart.length;
    cartPopupList.innerHTML = '';
    cartItemsDisplay.innerHTML = '';

    let total = 0;
    const cartItemsForForm = [];

    if (cart.length === 0) {
        cartPopupList.innerHTML = '<li style="color: var(--text-light);">Your cart is empty.</li>';
        cartItemsDisplay.innerHTML = '<p style="color: var(--text-light);">Your cart is empty.</p>';
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
            cartItemsForForm.push({ id: item.id, name: item.name, price: item.price });
        });
    }

    cartPopupTotal.textContent = formatNaira(total);
    totalPriceDisplay.textContent = `Total: ${formatNaira(total)}`;

    // Update hidden form fields
    formCartItems.value = JSON.stringify(cartItemsForForm);
    formTotalAmount.value = total; // Send total in kobo
}

/**
 * Adds a product to the cart.
 * @param {string} productId - The ID of the product to add.
 */
function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId && p.type === 'shoppable');
    if (productToAdd) {
        cart.push(productToAdd);
        updateCartDisplay();
        showMessage(`${productToAdd.name} added to cart!`, true);
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

// --- Event Listeners ---

// Search functionality
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() !== '') {
        cancelSearchButton.style.display = 'block';
    } else {
        cancelSearchButton.style.display = 'none';
        displayHeroSection(true); // Show hero when search is cleared
        renderCategorySliders(products); // Display all products when search is cleared
    }
});

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

cancelSearchButton.addEventListener('click', () => {
    searchInput.value = ''; // Clear search input
    cancelSearchButton.style.display = 'none'; // Hide cancel button
    displayHeroSection(true); // Show hero when search is cleared
    renderCategorySliders(products); // Display all products
});

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
        // For other general text search (case-insensitive on name/category)
        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderCategorySliders(filteredProducts); // Render filtered products in their categories
    }
}

// Event delegation for Add to Cart / View Affiliate buttons
categorySectionsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = event.target.dataset.id;
        addToCart(productId);
    }
});

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
    const customerPhone = document.getElementById('phone');
    const customerAddress = document.getElementById('address');

    if (!customerEmail || !customerName || !customerPhone.value || !customerAddress.value) {
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
                    value: customerAddress.value
                },
                {
                    display_name: "Phone Number",
                    variable_name: "phone_number",
                    value: customerPhone.value
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
                    showMessage('Thank you! Your items will be delivered shortly.', true);
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

// --- Modal & General UI Logic (Copied from your original HTML) ---
function showModal(modalElement) {
    modalElement.classList.add('show-modal');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}
function hideModal(modalElement) {
    modalElement.classList.remove('show-modal');
    document.body.style.overflow = ''; // Restore scrolling background
}

// Initial setup on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentPagePath = window.location.pathname;
    const currentPageFileName = currentPagePath.split('/').pop();

    // --- Active state for bottom navigation (JavaScript-driven) ---
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    bottomNavItems.forEach(item => {
        item.classList.remove('active');
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPageFileName) {
            item.classList.add('active');
        }
    });

    // --- Modals and their buttons (Copied from original HTML) ---
    const resourcesMenuModal = document.getElementById('resourcesMenuModal');
    const resourcesMenuCloseButton = resourcesMenuModal.querySelector('.close-button');
    const openResourcesMenuModalLink = document.getElementById('openResourcesMenuModalLink');
    const addCreateModal = document.getElementById('addCreateModal');
    const addCreateModalCloseButton = addCreateModal.querySelector('.close-button');
    const openAddCreateModalLink = document.getElementById('openAddCreateModalLink');
    const contactFormModal = document.getElementById('contactFormModal');
    const contactFormCloseButton = contactFormModal.querySelector('.close-button');
    const openContactFormModalLink = document.getElementById('openContactFormModalLink');

    openResourcesMenuModalLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(resourcesMenuModal);
    });
    resourcesMenuCloseButton.addEventListener('click', () => {
        hideModal(resourcesMenuModal);
    });
    resourcesMenuModal.addEventListener('click', (e) => {
        if (e.target === resourcesMenuModal) {
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
        if (e.target === addCreateModal) {
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
            if (e.target === contactFormModal) {
                hideModal(contactFormModal);
            }
        });
    }

    const openLiveLink = document.getElementById('openLiveLink');
    if (openLiveLink) {
        openLiveLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Navigating to Live Content! (This link is a placeholder)');
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            const mailtoLink = `mailto:iceconsort@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;
            hideModal(contactFormModal);
            contactForm.reset();
        });
    }

    // --- Shop Specific Initializations ---
    const trendingProduct = products.find(p => p.type === 'shoppable'); // Finds the first shoppable product for the hero section
    populateHeroProduct(trendingProduct);

    displayHeroSection(true); // Show hero on default view
    renderCategorySliders(products); // Render all products initially
    updateCartDisplay(); // Initialize cart display
});
