// productsData.js

/**
 * @typedef {Object} Product
 * @property {string} id - A unique identifier for the product (e.g., '001', 'aff-001').
 * @property {string} name - The name of the product.
 * @property {string} category - The category the product belongs to (e.g., 'BL Books', 'Gadgets').
 * @property {number} [price] - The price of the product in kobo (smallest currency unit). Required for 'shoppable' type.
 * @property {string} [affiliateLink] - The URL for affiliate products. Required for 'affiliate' type.
 * @property {string} imageUrl - The URL for the main product image.
 * @property {string} [heroImageUrl] - An optional image URL specifically for the hero section. If not provided, imageUrl will be used.
 * @property {string} description - A brief description of the product.
 * @property {'shoppable' | 'affiliate'} type - The type of product: 'shoppable' for direct purchase, 'affiliate' for external links.
 */

/**
 * Array containing all product data.
 * To add a new product, copy an existing product object, modify its properties, and paste it into this array.
 * Ensure 'id' is unique for each product.
 *
 * @type {Product[]}
 */
const products = [
    // --- Shoppable Products (Direct Purchase via Cart/Paystack) ---
    // Use 'shoppable' type for products you sell directly.
    // Ensure 'price' is set in kobo (e.g., NGN 25.00 = 2500 kobo).
    {
        id: '001', // UNIQUE 3-digit code or custom ID for shoppable products
        name: 'Whispers of Love (BL Book Vol. 1)',
        category: 'BL Books',
        price: 2500, // ₦25.00
        imageUrl: 'https://i.imgur.com/3gVgNH8.jpeg',
        heroImageUrl: 'https://i.imgur.com/3gVgNH8.jpeg', // Optional: Specific image for the hero section
        description: 'A captivating romance novel that explores the depths of connection and unspoken desires.',
        type: 'shoppable'
    },
    {
        id: '002',
        name: 'Crimson Promise (BL Book Vol. 2)',
        category: 'BL Books',
        price: 280000, // ₦28.00
        imageUrl: 'https://i.imgur.com/3gVgNH8.jpeg',
        description: 'The highly anticipated sequel, delving deeper into the interwoven destinies of its characters. New challenges and heart-wrenching moments await, pushing the protagonists to their limits.',
        type: 'shoppable'
    },
    {
        id: '003',
        name: 'Sapphire Dreams (GL Book Vol. 1)',
        category: 'GL Books',
        price: 2700, // ₦27.00
        imageUrl: 'https://images.unsplash.com/photo-1522030299443-4f92d4766f07?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'An enchanting tale of self-discovery and enduring love, set against a magical backdrop. Follow protagonists as they navigate a world of wonders and challenges, forging a bond that defies all odds.',
        type: 'shoppable'
    },
    {
        id: '004',
        name: 'Emerald Whispers (GL Book Vol. 2)',
        category: 'GL Books',
        price: 2900, // ₦29.00
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-830f65ce8843?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The continuation of the beloved GL story, filled with courage and heartwarming moments. A journey of growth, resilience, and the unwavering power of true partnership.',
        type: 'shoppable'
    },
    {
        id: '005',
        name: 'Starlight Embrace (BL Movie)',
        category: 'BL Movies',
        price: 3500, // ₦35.00
        imageUrl: 'https://images.unsplash.com/photo-1542204165-f4ff70034a74?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'A visually stunning movie with a poignant BL storyline and unforgettable performances. Experience a cinematic masterpiece that will leave you breathless and deeply moved.',
        type: 'shoppable'
    },
    {
        id: '006',
        name: 'Celestial Bonds (GL Movie)',
        category: 'GL Movies',
        price: 3200, // ₦32.00
        imageUrl: 'https://images.unsplash.com/photo-1620292723307-889b6574f26b?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Experience a powerful GL film that touches on themes of destiny and true partnership. A compelling narrative beautifully brought to life on screen, inspiring hope and acceptance.',
        type: 'shoppable'
    },
    {
        id: '007',
        name: 'The BL Book Vol. 3: Echoes',
        category: 'BL Books',
        price: 2600, // ₦26.00
        imageUrl: 'https://images.unsplash.com/photo-1621990710185-bc964a7c06c5?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The thrilling conclusion to the BL book series, bringing all mysteries to light. Secrets unravel and new paths emerge in this epic final chapter, leaving a lasting impression.',
        type: 'shoppable'
    },
    {
        id: '008',
        name: 'GL Movie: Rainbow Horizon',
        category: 'GL Movies',
        price: 3300, // ₦33.00
        imageUrl: 'https://images.unsplash.com/photo-1620292723307-889b6574f26b?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'A vibrant and inspiring GL movie about finding hope and new beginnings. A cinematic journey of self-discovery, joy, and the beauty of embracing who you truly are.',
        type: 'shoppable'
    },

    // --- Affiliate Products (Links to External Sites) ---
    // Use 'affiliate' type for products you link to, but don't sell directly.
    // Ensure 'affiliateLink' is set and 'price' is omitted.  
   //boys toy 
    {
        id: 'aff-001', // UNIQUE custom ID for affiliate products
        name: 'Safe Dildo For Bottoms',
        category: 'Adult Boy Toys',
        affiliateLink: 'https://a.aliexpress.com/_EwMyU6m',
        imageUrl: 'https://i.imgur.com/mBgMqWA.jpeg',
        description: 'Realistic Dildo with Suction Cup Huge Dildos Adult Sex Toys for Men, Big Penis Anal Butt Plug Erotic Relaxation toy, Shop 18+.',
        type: 'affiliate'
    },
    {
        id: 'aff-008',
        name: 'Safe ButtPlug For Bottoms',
        category: 'Adult Boy Toys',
        affiliateLink: 'https://a.aliexpress.com/_EIkPig6',
        imageUrl: 'https://i.imgur.com/A1ALhXR.jpeg',
        description: 'Wireless Control Anal Vibrator Butt Plug Men Prostate Massager Stimulator.',
        type: 'affiliate'
    },
    {
        id: 'aff-009',
        name: 'Safe Masturbator For Tops',
        category: 'Adult Boy Toys',
        affiliateLink: 'https://a.aliexpress.com/_Ex8N3Pc',
        imageUrl: 'https://i.imgur.com/2Yq4GWw.jpeg',
        description: 'Transparent Male Masturbator Artificial Pussy Vaginal for Men 18 Glans Sucking Penis Pump Spikes Exerciser Sex Toys Erotic.',
        type: 'affiliate'
    },
    {
        id: 'aff-010',
        name: 'Safe Penis Pump',
        category: 'Adult Boy Toys',
        affiliateLink: 'https://a.aliexpress.com/_EJxEjJM',
        imageUrl: 'https://i.imgur.com/SoyNyMt.jpeg',
        description: 'Sex Machine Men Masturbation Cup Manual Penis Enlarger Masturbation Equipment Machine Sex Toys Simulation.',
        type: 'affiliate'
    },
        
//girls toy 
    {
        id: 'aff-002',
        name: 'Sparkle Unicorn Plushie',
        category: 'Adult Girl Toys',
        affiliateLink: 'https://www.aliexpress.com/item/10050067890.html',
        imageUrl: 'https://images.unsplash.com/photo-1549490192-351829288e6e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'A super soft and cuddly plushie with magical sparkling features. A charming addition to any collection, bringing a touch of whimsy.',
        type: 'affiliate'
    },
    {
        id: 'aff-003',
        name: 'Smart Home Hub X',
        category: 'Gadgets',
        affiliateLink: 'https://www.aliexpress.com/item/10050011223.html',
        imageUrl: 'https://images.unsplash.com/photo-1563829026369-0268ec3b2462?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Control all your smart devices from one central, easy-to-use hub. Streamline your home automation with voice commands and intuitive controls.',
        type: 'affiliate'
    },
    {
        id: 'aff-004',
        name: 'Quantum 5G Smartphone',
        category: 'Phones and Laptops',
        affiliateLink: 'https://www.aliexpress.com/item/10050044556.html',
        imageUrl: 'https://images.unsplash.com/photo-1604533038661-39e80e14c2c5?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Experience blazing-fast 5G speeds and an incredible camera system. Capture stunning photos and videos with unparalleled clarity and detail.',
        type: 'affiliate'
    },
    {
        id: 'aff-005',
        name: 'Zenith UltraBook Pro',
        category: 'Phones and Laptops',
        affiliateLink: 'https://www.aliexpress.com/item/10050077889.html',
        imageUrl: 'https://images.unsplash.com/photo-1593642532454-ce380775a7c5?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Ultra-thin, ultra-powerful. Perfect for work and entertainment on the go. Boasting incredible performance and a sleek design, it\'s the ultimate portable workstation.',
        type: 'affiliate'
    },
    {
        id: 'aff-006',
        name: 'Electric City Cruiser',
        category: 'Cars',
        affiliateLink: 'https://www.aliexpress.com/item/10050099001.html',
        imageUrl: 'https://images.unsplash.com/photo-1620292723307-889b6574f26b?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Eco-friendly and stylish, navigate the city with ease and zero emissions. Enjoy a smooth, quiet ride with advanced safety features and a modern design.',
        type: 'affiliate'
    },
    {
        id: 'aff-007',
        name: 'Smartwatch Elite',
        category: 'Wearable Tech',
        affiliateLink: 'https://www.amazon.com/smartwatch-elite-12345',
        imageUrl: 'https://images.unsplash.com/photo-1549490192-351829288e6e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Track your fitness, receive notifications, and stay connected on the go. Sleek design with advanced health monitoring capabilities.',
        type: 'affiliate'
    }
];
