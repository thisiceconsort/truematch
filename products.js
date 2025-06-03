// --- Product Data Definitions (EDIT THIS SECTION TO ADD/REMOVE/UPDATE PRODUCTS) ---

// Hero Section Product - To add a new hero product, copy, paste, and edit this structure.
// The new product will appear as the hero.
const heroProduct = {
    id: 'hero-1', // Unique ID for the product
    image: 'https://via.placeholder.com/1920x1080/8A2BE2/FFFFFF?text=Featured+Discovery', // Image URL
    title: 'Your Ultimate Journey to Discovery', // Main title
    description: 'Dive into exclusive collections of the latest trends, cutting-edge tech, and captivating digital narratives tailored just for you. Explore the extraordinary.', // Description
    price: 'Start Exploring', // Text for price/call to action
    link: '#boys-fashion-section', // Link when button is clicked (can be internal #id or external URL)
    buttonText: 'Explore Now', // Text for the button
};

// Boys' Fashion Products - To add a new product, copy, paste, and edit one of the existing objects.
// Place it at the beginning of the array to display it as the first product in the slider.
const boysFashionProducts = [
    { id: 'bf-1', image: 'https://via.placeholder.com/400x600/708090/FFFFFF?text=Urban+Jacket', title: 'Urban Flex Jacket', description: 'Stylish and comfortable, perfect for city life.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_BF1', type: 'ali' },
    { id: 'bf-2', image: 'https://via.placeholder.com/400x600/B0E0E6/000000?text=Slim+Fit+Jeans', title: 'Slim Fit Denim', description: 'Classic denim with a modern, tailored fit.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_BF2', type: 'ali' },
    { id: 'bf-3', image: 'https://via.placeholder.com/400x600/FFDAB9/000000?text=Casual+Shirt', title: 'Premium Linen Shirt', description: 'Lightweight and breathable for all-day comfort.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_BF3', type: 'ali' },
    { id: 'bf-4', image: 'https://via.placeholder.com/400x600/50C878/FFFFFF?text=Sneakers', title: 'Athletic Lifestyle Sneakers', description: 'Designed for comfort and performance in daily wear.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_BF4', type: 'ali' },
    { id: 'bf-5', image: 'https://via.placeholder.com/400x600/DDA0DD/FFFFFF?text=Hoodie', title: 'Streetwear Graphic Hoodie', description: 'Bold design, soft fabric, ultimate street style.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_BF5', type: 'ali' },
    { id: 'bf-6', image: 'https://via.placeholder.com/400x600/A0522D/FFFFFF?text=Leather+Wallet', title: 'Minimalist Leather Wallet', description: 'Sleek and compact, crafted from genuine leather.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_BF6', type: 'ali' },
];

// Girls' Fashion Products - Add new products here
const girlsFashionProducts = [
    { id: 'gf-1', image: 'https://via.placeholder.com/400x600/FFC0CB/000000?text=Elegant+Floral+Dress', title: 'Elegant Floral Midi Dress', description: 'Lightweight and flowing, perfect for any occasion.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_GF1', type: 'ali' },
    { id: 'gf-2', image: 'https://via.placeholder.com/400x600/ADD8E6/000000?text=High+Waist+Jeans', title: 'High-Waist Skinny Jeans', description: 'Comfortable and stylish, with a perfect fit.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_GF2', type: 'ali' },
    { id: 'gf-3', image: 'https://via.placeholder.com/400x600/D8BFD8/000000?text=Boho+Crop+Top', title: 'Boho Chic Crop Top', description: 'Breathable fabric with intricate embroidery, ideal for summer.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_GF3', type: 'ali' },
    { id: 'gf-4', image: 'https://via.placeholder.com/400x600/F0E68C/000000?text=Oversized+Sweater', title: 'Cozy Oversized Sweater', description: 'Soft knit for warmth and comfort, perfect for chilly evenings.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_GF4', type: 'ali' },
    { id: 'gf-5', image: 'https://via.placeholder.com/400x600/C8A2C8/FFFFFF?text=Pleated+Mini+Skirt', title: 'Pleated Mini Skirt', description: 'Trendy and versatile, can be dressed up or down.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_GF5', type: 'ali' },
];

// Gadget Products - Add new products here
const gadgetProducts = [
    { id: 'g-1', image: 'https://via.placeholder.com/400x600/36454F/FFFFFF?text=Smart+Watch', title: 'Apex Smartwatch Pro', description: 'Track fitness, receive notifications, stay connected.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_G1', type: 'ali' },
    { id: 'g-2', image: 'https://via.placeholder.com/400x600/008B8B/FFFFFF?text=Drone', title: 'Explorer Mini Drone', description: 'Compact and agile, with HD camera for aerial shots.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_G2', type: 'ali' },
    { id: 'g-3', image: 'https://via.placeholder.com/400x600/8B0000/FFFFFF?text=Portable+Speaker', title: 'Acoustic Portable Speaker', description: 'Powerful sound in a compact, durable design.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_G3', type: 'ali' },
    { id: 'g-4', image: 'https://via.placeholder.com/400x600/808000/FFFFFF?text=VR+Headset', title: 'Immersive VR Headset', description: 'Step into virtual worlds with stunning clarity.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_G4', type: 'ali' },
    { id: 'g-5', image: 'https://via.placeholder.com/400x600/BDB76B/000000?text=Powerbank', title: 'Ultra-Slim Power Bank', description: 'Charge devices on the go with this sleek, high-capacity power bank.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_G5', type: 'ali' },
];

// Phone Products - Add new products here
const phoneProducts = [
    { id: 'ph-1', image: 'https://via.placeholder.com/400x600/40E0D0/000000?text=Flagship+Phone', title: 'Zenith Flagship Phone', description: 'Next-gen performance with an incredible camera.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_PH1', type: 'ali' },
    { id: 'ph-2', image: 'https://via.placeholder.com/400x600/87CEEB/000000?text=Gaming+Phone', title: 'Quantum Gaming Phone', description: 'Unleash mobile gaming power with liquid cooling.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_PH2', type: 'ali' },
    { id: 'ph-3', image: 'https://via.placeholder.com/400x600/F08080/000000?text=Budget+Phone', title: 'Value Smart A1', description: 'Essential features and long battery life at an unbeatable price.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_PH3', type: 'ali' },
    { id: 'ph-4', image: 'https://via.placeholder.com/400x600/C0C0C0/000000?text=Foldable+Phone', title: 'Aura Foldable Phone', description: 'Experience the future with a revolutionary foldable display.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_PH4', type: 'ali' },
];

// Car Products - Add new products here
const carProducts = [
    { id: 'c-1', image: 'https://via.placeholder.com/400x600/6A5ACD/FFFFFF?text=Electric+Sedan', title: 'Futuristic Electric Sedan Model', description: 'Sleek design and eco-friendly performance in miniature.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_C1', type: 'ali' },
    { id: 'c-2', image: 'https://via.placeholder.com/400x600/4682B4/FFFFFF?text=Off-Road+Truck', title: 'Rugged Off-Road RC Truck', description: 'Conquer any terrain with this powerful remote control truck.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_C2', type: 'ali' },
    { id: 'c-3', image: 'https://via.placeholder.com/400x600/CD5C5C/FFFFFF?text=Luxury+SUV', title: 'Luxury SUV Diecast Model', description: 'Detailed replica of a high-end luxury sport utility vehicle.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_C3', type: 'ali' },
    { id: 'c-4', image: 'https://via.placeholder.com/400x600/FF7F50/000000?text=Sports+Car', title: 'Velocity Sports Car Model', description: 'Dynamic replica of an iconic high-speed sports car.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_C4', type: 'ali' },
];

// Adult Boys' Products - Add new products here
const adultBoyProducts = [
    { id: 'abp-1', image: 'https://i.imgur.com/mBgMqWA.jpeg', title: 'DISCREET PLEASURE DILDO PRO', description: 'Realistic Dildo with Suction Cup Huge Dildos Adult Sex Toys for Woman Men Fake Dick Big Penis Anal Butt Plug Erotic Sex Shop 18+.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_ABP_1', type: 'ali' },
    { id: 'abp-2', image: 'https://via.placeholder.com/400x600/7A0020/FFFFFF?text=Boy+Intimate+Toy+2', title: 'Ultimate Silicone Massager', description: 'Silky smooth, body-safe silicone for pure, unadulterated pleasure and comfort.', price: 'View on AliExpress', link: 'https://a.aliexpress.com/_EytimzM', type: 'ali' },
    { id: 'abp-3', image: 'https://via.placeholder.com/400x600/9400D3/FFFFFF?text=Boy+Intimate+Toy+3', title: 'Pulse-Wave Stimulator', description: 'Advanced technology for targeted sensations and ultimate satisfaction.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_ABP_3', type: 'ali' },
];

// Adult Girls' Products - Add new products here
const adultGirlProducts = [
    { id: 'agp-1', image: 'https://via.placeholder.com/400x600/F8D7DA/000000?text=Girl+Intimate+Toy+1', title: 'Couples Connection Massager', description: 'Enhance intimacy and shared experiences with this ergonomically designed device for two.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_AGP_1', type: 'ali' },
    { id: 'agp-2', image: 'https://via.placeholder.com/400x600/FF00FF/000000?text=Girl+Intimate+Toy+2', title: 'Sensual Massage Oil Set', description: 'A luxurious blend of essential oils for deep relaxation and heightened sensations.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_AGP_2', type: 'ali' },
    { id: 'agp-3', image: 'https://via.placeholder.com/400x600/DA70D6/FFFFFF?text=Girl+Intimate+Toy+3', title: 'Blissful Vibrator', description: 'Ergonomic design for targeted pleasure and deep relaxation.', price: 'View on AliExpress', link: 'YOUR_ALIEXPRESS_AFFILIATE_LINK_AGP_3', type: 'ali' },
];

// BL Books Products - Add new products here
const blBooksProducts = [
    { id: 'blb-1', productCode: 'A16', image: 'https://via.placeholder.com/400x600/36454F/FFFFFF?text=BL+Novel+Cover+1', title: 'Whispers of Azure Sky (BL)', description: 'A poignant tale of love and self-discovery set against a magical backdrop. (PDF)', price: '$11.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_BOOK_1', type: 'paystack' },
    { id: 'blb-2', productCode: 'B23', image: 'https://via.placeholder.com/400x600/5F9EA0/FFFFFF?text=BL+Novel+Cover+2', title: 'Crimson Bloom Academy (BL)', description: 'Forbidden love flourishes within the hallowed halls of an elite academy. (eBook)', price: '$13.50', link: 'YOUR_PAYSTACK_PRODUCT_LINK_BOOK_2', type: 'paystack' },
    { id: 'blb-3', productCode: 'C45', image: 'https://via.placeholder.com/400x600/8B0000/FFFFFF?text=BL+Manga', title: 'Shadow Bloom (BL Manga Series)', description: 'A beautifully illustrated manga series of growing passion and destiny. (Digital Comic)', price: '$9.50', link: 'YOUR_PAYSTACK_PRODUCT_LINK_MANGA_1', type: 'paystack' },
    { id: 'blb-4', productCode: 'D67', image: 'https://via.placeholder.com/400x600/40E0D0/000000?text=BL+Webtoon', title: 'Starlight Rendezvous (BL Webtoon)', description: 'A vibrant webtoon series about an unexpected connection under the stars. (Digital Comic)', price: '$7.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_WEBTOON_1', type: 'paystack' },
];

// GLG Books Products - Add new products here
const glgBooksProducts = [
    { id: 'glgb-1', productCode: 'E89', image: 'https://via.placeholder.com/400x600/FFB6C1/000000?text=GLG+Novel+Cover+1', title: 'Sapphire Skies (GLG)', description: 'A heartwarming journey of two women finding love in a bustling city. (eBook)', price: '$12.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_GLGBOOK_1', type: 'paystack' },
    { id: 'glgb-2', productCode: 'F12', image: 'https://via.placeholder.com/400x600/98FB98/000000?text=GLG+Manga+Cover+2', title: 'Moonlit Whispers (GLG Manga)', description: 'A romantic manga about a chance encounter under the full moon. (Digital Comic)', price: '$10.50', link: 'YOUR_PAYSTACK_PRODUCT_LINK_GLGBOOK_2', type: 'paystack' },
    { id: 'glgb-3', productCode: 'G34', image: 'https://via.placeholder.com/400x600/DDA0DD/000000?text=GLG+Webtoon+Cover+3', title: 'Beyond the Horizon (GLG Webtoon)', description: 'An adventurous webtoon exploring love and discovery on distant shores. (Digital Comic)', price: '$8.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_GLGBOOK_3', type: 'paystack' },
];

// BL Movies Products - Add new products here
const blMoviesProducts = [
    { id: 'blm-1', productCode: 'H56', image: 'https://via.placeholder.com/400x600/008B8B/FFFFFF?text=BL+Movie+Poster+1', title: 'Crimson Tide (BL Romance Movie)', description: 'An epic, heart-wrenching romance exploring courage and devotion. (HD Video)', price: '$16.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_MOVIE_1', type: 'paystack' },
    { id: 'blm-2', productCode: 'I78', image: 'https://via.placeholder.com/400x600/6B8E23/FFFFFF?text=BL+Movie+Poster+2', title: 'Summer Solstice (BL Drama)', description: 'A bittersweet summer romance that challenges societal norms. (4K Stream)', price: '$18.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_MOVIE_2', type: 'paystack' },
    { id: 'blm-3', productCode: 'J90', image: 'https://via.placeholder.com/400x600/808000/FFFFFF?text=BL+Shorts', title: 'Rainbow Dreams (BL Short Films)', description: 'A collection of heartwarming and diverse short films. (HD Video Bundle)', price: '$19.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_SHORTS_1', type: 'paystack' },
    { id: 'blm-4', productCode: 'K11', image: 'https://via.placeholder.com/400x600/483D8B/FFFFFF?text=BL+Comedy', title: 'Queer Quirks (BL Comedy Series)', description: 'Laugh out loud with this hilarious series about modern queer life. (Web Series)', price: '$24.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_SERIES_1', type: 'paystack' },
];

// GLG Movies Products - Add new products here
const glgMoviesProducts = [
    { id: 'glgm-1', productCode: 'L22', image: 'https://via.placeholder.com/400x600/FF69B4/FFFFFF?text=GLG+Movie+Poster+1', title: 'Lavender Nights (GLG Romance)', description: 'A captivating romance between two artists navigating love and ambition. (HD Video)', price: '$17.50', link: 'YOUR_PAYSTACK_PRODUCT_LINK_GLGMOVIE_1', type: 'paystack' },
    { id: 'glgm-2', productCode: 'M33', image: 'https://via.placeholder.com/400x600/DAA520/FFFFFF?text=GLG+Movie+Poster+2', title: 'Golden Hour (GLG Drama)', description: 'A compelling drama about friendship evolving into deep love. (4K Stream)', price: '$19.50', link: 'YOUR_PAYSTACK_PRODUCT_LINK_GLGMOVIE_2', type: 'paystack' },
    { id: 'glgm-3', productCode: 'N44', image: 'https://via.placeholder.com/400x600/B0C4DE/FFFFFF?text=GLG+Shorts', title: 'Heartstrings (GLG Short Films)', description: 'A collection of endearing short films celebrating female love. (HD Video Bundle)', price: '$21.99', link: 'YOUR_PAYSTACK_PRODUCT_LINK_GLGMOVIE_3', type: 'paystack' },
];


// --- JavaScript for Dynamic Content Loading and Sliders ---

document.addEventListener('DOMContentLoaded', () => {
    // Render Hero Product
    renderHeroProduct(heroProduct);

    // Render Product Rows for each category
    renderProductRow('boys-fashion-slider', boysFashionProducts);
    renderProductRow('girls-fashion-slider', girlsFashionProducts);
    renderProductRow('gadgets-slider', gadgetProducts);
    renderProductRow('phones-slider', phoneProducts);
    renderProductRow('cars-slider', carProducts);
    renderProductRow('adult-boy-products-slider', adultBoyProducts);
    renderProductRow('adult-girl-products-slider', adultGirlProducts);
    renderProductRow('bl-books-slider', blBooksProducts);
    renderProductRow('glg-books-slider', glgBooksProducts);
    renderProductRow('bl-movies-slider', blMoviesProducts);
    renderProductRow('glg-movies-slider', glgMoviesProducts);

    // Initial check for bottom nav active state (assuming setActiveNavItemOnScroll is defined in index.html or another script)
    // It's good practice to ensure this function is available when this script runs.
    if (typeof setActiveNavItemOnScroll === 'function') {
        setActiveNavItemOnScroll();
    } else {
        console.warn('setActiveNavItemOnScroll function not found. Ensure it is loaded before products.js.');
    }
});

/**
 * Renders the hero product section with the provided product data.
 * @param {object} product - The product object for the hero section.
 */
function renderHeroProduct(product) {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) {
        console.error('ERROR: #hero-section not found!');
        return;
    }
    heroSection.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <div class="hero-overlay">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <div class="hero-buttons">
                <a href="${product.link}" target="${product.link.startsWith('#') ? '_self' : '_blank'}" class="hero-button primary">
                    <span>${product.buttonText || 'Shop Now'}</span>
                </a>
            </div>
        </div>
    `;
    // Add smooth scroll behavior for internal links
    if (product.link.startsWith('#')) {
        heroSection.querySelector('.hero-button.primary').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(product.link).scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/**
 * Renders a row of product cards into a specified container.
 * @param {string} containerId - The ID of the HTML element to render products into.
 * @param {Array<object>} productsArray - An array of product objects.
 */
function renderProductRow(containerId, productsArray) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`ERROR: #${containerId} not found!`);
        return;
    }
    container.innerHTML = productsArray.map(product => {
        const buttonClass = product.type === 'ali' ? 'cta-button ali-button' : 'cta-button';
        const buttonText = product.type === 'ali' ? 'Shop Now' : 'Buy Now';
        const priceText = product.type === 'ali' ? 'View on AliExpress' : product.price;
        // Conditionally display product code for 'paystack' type products
        const productCodeDisplay = product.type === 'paystack' && product.productCode ? `<span class="product-code">Code: ${product.productCode}</span>` : '';

        return `
            <a href="${product.link}" target="_blank" class="product-card">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <span class="price">${priceText}</span>
                    ${productCodeDisplay} <span class="${buttonClass}">${buttonText}</span>
                </div>
            </a>
        `;
    }).join('');
}

/**
 * Scrolls the product slider left or right.
 * @param {string} sliderId - The ID of the slider container.
 * @param {number} direction - -1 for left (previous), 1 for right (next).
 */
function scrollSlider(sliderId, direction) {
    const track = document.getElementById(sliderId);
    if (!track) {
        console.error(`ERROR: Slider track #${sliderId} not found!`);
        return;
    }

    const firstCard = track.querySelector('.product-card');
    if (!firstCard) {
        console.warn(`WARN: No product cards found in #${sliderId}. Cannot scroll.`);
        return;
    }

    const cardWidth = firstCard.offsetWidth;
    const gap = 10; // This should match your CSS gap
    const scrollAmount = cardWidth + gap;

    const visibleWidth = track.clientWidth;
    const itemsToScroll = Math.max(1, Math.floor(visibleWidth / scrollAmount)); // Scroll by number of visible items

    track.scrollBy({
        left: direction * itemsToScroll * scrollAmount,
        behavior: 'smooth'
    });
}
