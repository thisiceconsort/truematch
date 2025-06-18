
const products = [
    {
        id: '001',
        name: 'Hastings (Part. 1)',
        category: 'BL Books',
        price: 500, // ₦25.00
        imageUrl: 'https://i.imgur.com/eFLVTdU.jpeg',
        heroImageUrl: 'https://i.imgur.com/eFLVTdU.jpeg',
        description: 'When rich, reckless Maro is sent to Hastings—a brutal school for the world’s elite—he never expects to fall for Toju, the quiet exchange student from nowhere. One stolen kiss turns into a dangerous obsession, a secret too risky to keep. But when their night together is caught on camera and leaked to the world, the scandal explodes—destroying Maro’s powerful family, dragging Hastings into chaos, and turning their love into a weapon. Fame, betrayal, blackmail—now it’s survival.',
        type: 'shoppable'
    },
    {
        id: '002',
        name: 'Chasing Shadows (Thriller)',
        category: 'BL Books',
        price: 250, // Corrected price from 280000 to 2800 based on your comment "₦28.00"
        imageUrl: 'https://i.imgur.com/Nk5VmBP.jpeg',
        description: 'Kenzo and Elias have always been enemies, but when they wake up chained in a dark basement, their rivalry becomes the least of their worries as a masked figure presents them with a cruel ultimatum—one must die so the other can go free. Trapped in a deadly game, emotions twist between hatred, fear, and something far more dangerous, forcing them to confront not only their past but the horrifying reality of their present. As the walls close in and time runs out, they must decide if survival comes at the cost of sacrifice or if the price was set long before they woke up, because not all endings are meant to be happy.',
        type: 'shoppable'
    },
    {
        id: '007',
        name: 'Heirs & Lies',
        category: 'BL Books',
        price: 2600, // ₦26.00
        imageUrl: 'https://i.imgur.com/4fQVQ5w.jpeg',
        description: 'At eighteen, Luca and Finley have everything—wealth, privilege, and power—but not freedom, caught between two of the richest families in the country whose polished rivalry hides behind charity galas and luxury vacations. In secret, the boys are in love, building a fragile world of late-night meetings and stolen kisses, but everything spirals when they discover their forbidden romance isn’t the only betrayal between their families—each of their fathers has been secretly sleeping with the other’s son. As desire and betrayal collide, Luca and Finley are forced to confront the twisted layers of love, loyalty, and power, questioning whether their bond will survive the scandal—or if it was always destined to break.',
        type: 'shoppable'
    },
    
    //girlsbook004
//boytoy
    {
        id: 'aff-001',
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
        id: 'aff-011',
        name: 'Safe Penis Pump',
        category: 'Adult Boy Toys',
        affiliateLink: 'https://a.aliexpress.com/_EJxEjJM',
        imageUrl: 'https://i.imgur.com/SoyNyMt.jpeg',
        description: 'Sex Machine Men Masturbation Cup Manual Penis Enlarger Masturbation Equipment Machine Sex Toys Simulation.',
        type: 'affiliate'
    },
    {
        id: 'aff-012',
        name: 'Safe Temporary Enlargement For Tops',
        category: 'Adult Boy Toys',
        affiliateLink: 'https://a.aliexpress.com/_EQcgba2',
        imageUrl: 'https://i.imgur.com/pqcGeHX.jpeg',
        description: 'Long-lasting 60-minute penis enlargement oil, male external use sexual delay spray, anti-premature ejaculation sexual spray.',
        type: 'affiliate'
    },
    //girls toy
    {
        id: 'aff-002',
        name: 'Potable Trusting Vibrator',
        category: 'Adult Girl Toys',
        affiliateLink: 'https://a.aliexpress.com/_EGURCt4',
        imageUrl: 'https://i.imgur.com/IYSUTAp.jpeg',
        description: 'APP Thrusting Anal Vibrator for Adult Butt Plug with Cock Ring for Men Prostate Massager Ass Anal Dildo Buttplug Adult Goods',
        type: 'affiliate'
    },
    {
        id: 'aff-013',
        name: 'Clit Vibrator For Ladies',
        category: 'Adult Girl Toys',
        affiliateLink: 'https://a.aliexpress.com/_EHyvq9U',
        imageUrl: 'https://i.imgur.com/inPbELM.jpeg',
        description: 'Powerful Clit Vibrators for Women Dildo AV Magic Wand Vibrator Massager Adult Sex Machine Female Sex Shop for Couple',
        type: 'affiliate'
    },
    {
        id: 'aff-014',
        name: 'Lingerie For Ladies, Fetish Bodysuit',
        category: 'Adult Girl Toys',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EJjTkRU',
        imageUrl: 'https://i.imgur.com/oGtqNfi.jpeg',
        description: 'hollowed out underwire top push up ladies bra triangle lingerie set leopard print underwear female embroidery bralette',
        type: 'affiliate'
    },
    {
        id: 'aff-015',
        name: 'Butt Engagement Cream',
        category: 'Adult Girl Toys',
        affiliateLink: 'https://a.aliexpress.com/_EJ6dI42',
        imageUrl: 'https://i.imgur.com/TAItdhV.jpeg',
        description: 'Natural Buttock Augmentation Cream Effective Butt Enlargement Growth Lift Up Ass Firm Breast Bigger Sexy Body Lotion For Women',
        type: 'affiliate'
    },
    {
        id: 'aff-018',
        name: 'Graffiti Printed Baggy Jeans',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EyKoFSi',
        imageUrl: 'https://i.imgur.com/PvChCb1.jpeg',
        description: 'New Graffiti Printed Baggy Jeans For Men Y2K Vintage Distressed Blue Harajuku Denim Pants High Street Straight-leg Jean Trousers',
        type: 'affiliate'
    },
    {
        id: 'aff-019',
        name: 'Vintage Flame Printed Jeans',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EzrcMRo',
        imageUrl: 'https://i.imgur.com/ennsvUj.jpeg',
        description: 'Y2K Vintage Flame Printed Jeans For Men Baggy Streetwear Wide Leg Denim Trousers 2024 New Hip Hop Fashion Straight Pantalones',
        type: 'affiliate'
    },
    {
        id: 'aff-020',
        name: 'Gothic Retro Oversized Baggy',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EQZSTcA',
        imageUrl: 'https://i.imgur.com/aaSCGUu.jpeg',
        description: 'Gothic Retro Oversized Baggy Fit Unisex Mopping Pants Y2K Phantom Jeans High Street Spider Embroidered Patch Hip Hop Streetwear',
        type: 'affiliate'
    },
    {
        id: 'aff-021',
        name: 'Male Classic America Hip Hop Rap Jeans',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EQCv2js',
        imageUrl: 'https://i.imgur.com/OoMqstL.jpeg',
        description: 'Male Classic America Hip Hop Rap Jeans Wide Leg Youth Popular Jeans Men Straight Leg Retro Loose Trousers Oversized Denim Pants',
        type: 'affiliate'
    },
    {
        id: 'aff-022',
        name: 'Distressed Vintage Blue Jeans',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_Eu7elWE',
        imageUrl: 'https://i.imgur.com/c4GoK2b.jpeg',
        description: 'Distressed Vintage Blue Jeans Pants Men Wide-leg Denim Trousers Male Oversize Streetwear Fashion Casual Baggy Straight Jeans',
        type: 'affiliate'
    },
    {
        id: 'aff-023',
        name: 'Denim Seven-Five Shorts',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_Eu6fYJu',
        imageUrl: 'https://i.imgur.com/bs0rYEl.jpeg',
        description: 'Mens Non-Elastic Denim Seven-Five Shorts Loose Wide Leg Fit Versatile Simple Style Casual Shorts',
        type: 'affiliate'
    },
    {
        id: 'aff-024',
        name: 'Wide-Leg Denim Jeans',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EupS3lg',
        imageUrl: 'https://i.imgur.com/enhyMqz.jpeg',
        description: 'Men Stylish Wide-Leg Denim Jeans - Loose Fit, Perfect for Casual Weekends, Casual Jeans|Stylish Wideleg Jeans y2k streetwear',
        type: 'affiliate'
    },
    {
        id: '025',
        name: 'Baggy Jeans Men Harajuku Street Hip Hop',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EQcbW5y',
        imageUrl: 'https://i.imgur.com/GgqBWc1.jpeg',
        description: 'Baggy Jeans Men Harajuku Street Hip Hop Washed and Distressed High Waisted Jeans Man Casual Wide Leg Pants men Jeans',
        type: 'affiliate'
    },
    {
        id: 'aff-026',
        name: 'Streetwear Loose Jeans',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_Ew3ln8I',
        imageUrl: 'https://i.imgur.com/petqfcm.jpeg',
        description: 'New Streetwear Loose Jeans Men Korean Style Fashion Loose Straight Wide Leg Pants Mens Brand Clothing Black Light Blue',
        type: 'affiliate'
    },
    {
        id: 'aff-027',
        name: 'Hop Retro Skull Embroidery Washed Baggy',
        category: 'Jeans|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EyTnjF4',
        imageUrl: 'https://i.imgur.com/uGqRdKI.jpeg',
        description: 'Y2K Jeans Mens Hip Hop Retro Skull Embroidery Washed Baggy Denim Pants New Straight Casual Loose Wide Leg Trouser Streetwear',
        type: 'affiliate'
    },
    {
        id: "aff-040",
        name: "Ice Silk Man !Underwear Boxer Metal Fiber Antistatic Men Underpants.",
        category: "Boys Underwear",
        affiliateLink: "https://s.click.aliexpress.com/e/_Ez5xp9g",
        imageUrl: "https://i.imgur.com/DQUalXt.jpeg",
        description: "Experience ultimate comfort with MIIOW 3Pcs Ice Silk boxers. Featuring metal fiber for antistatic properties, seamless cut hems, and breathable design.",
        type: "affiliate"
    },
    {
        id: "aff-041",
        name: " Mesh Boxers Seamless Breathable Underpants",
        category: "Boys Underwear",
        affiliateLink: "https://s.click.aliexpress.com/e/_EHnRTom",
        imageUrl: "https://i.imgur.com/sY9XlJO.jpeg",
        description: "Stay cool and fresh with MiiOW 4Pcs Cool Ice Silk men's panties. These 10A antibacterial mesh boxers offer seamless, breathable comfort.",
        type: "affiliate"
    },
    {
        id: "aff-042",
        name: "Crotch G-strings Thongs Gay Bikini Underwear.",
        category: "Boys Underwear",
        affiliateLink: "https://s.click.aliexpress.com/e/_EGbHpVg",
        imageUrl: "https://i.imgur.com/GPK6poh.jpeg",
        description: "Bold and alluring, these sexy men's sissy panties feature an open backless crotch, g-string design, and thong style for unique appeal.",
        type: "affiliate"
    },
    {
        id: "aff-043",
        name: "Shorts Cotton Plus Size Breathable Underwear.",
        category: "Boys Underwear",
        affiliateLink: "https://s.click.aliexpress.com/e/_Ey7mWdc",
        imageUrl: "https://i.imgur.com/i1SaRul.jpeg",
        description: "A 6-piece lot of comfortable men's cotton boxer shorts. Plus size, loose fit, breathable, and mid-waist with various prints, perfect for middle-aged men.",
        type: "affiliate"
    },
    {
        id: "aff-044",
        name: "Summer Breathable Intimate Underpants",
        category: "Boys Underwear",
        affiliateLink: "https://s.click.aliexpress.com/e/_EGWPEFs",
        imageUrl: "https://i.imgur.com/PeDNlHZ.jpeg",
        description: "Enjoy the coolness of ice silk mesh with this 4-piece set of men's boxer shorts. Plus size, solid colors, and breathable for summer comfort.",
        type: "affiliate"
    },
    {
        id: 'aff-058',
        name: 'Love Graffiti Wide Leg Pants',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EzqHdZu',
        imageUrl: 'https://i.imgur.com/ur3fDB8.jpeg',
        description: 'Love Graffiti Wide Leg Pants Women Y2K Elastic High Waist Streetwear Loose Drawstring Jogging Trousers Korean Casual Sweatpants',
        type: 'affiliate'
    },
    {
        id: 'aff-059',
        name: 'VGH Crisscross Hit Color Streetwear Denim Trousers',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EGl18M2',
        imageUrl: 'https://i.imgur.com/yVcEMRY.jpeg',
        description: 'VGH Crisscross Hit Color Streetwear Denim Trousers For Women High Waist Patchwork Pockets Hollow Out Split Pants Female 2024',
        type: 'affiliate'
    },
    {
        id: 'aff-060',
        name: 'SUCHCUTE Low Waist Baggy Jeans',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EQUjjmK',
        imageUrl: 'https://i.imgur.com/2fyJmDs.jpeg',
        description: 'SUCHCUTE Low Waist Jeans for Women Goth Y2k Style Baggy Jeans Punk New Jeans Wide Leg Denim Pants Kpop Casual Loose Streetwear',
        type: 'affiliate'
    },
    {
        id: 'aff-061',
        name: 'Women Flare Stretch Moustache Jeans',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EJblGXC',
        imageUrl: 'https://i.imgur.com/gt8HF6D.jpeg',
        description: 'Women Flare Stretch Moustache Jeans Fashion Skinny Bell Bottom High Waist Gray Denim Pants Lady Classic Y2K Punk Long Trousers',
        type: 'affiliate'
    },
    {
        id: 'aff-062',
        name: 'Kids Tracksuit with Wide Leg Cargo Pants',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_Eyg1TPk',
        imageUrl: 'https://i.imgur.com/lnrTxuu.jpeg',
        description: 'spring summer Kids tracksuit Children set Girls Clothes crop top T-Shirt + wide leg Cargo Pants Teens 10-21 years old',
        type: 'affiliate'
    },
    {
        id: 'aff-063',
        name: 'Designer Womens Jeans with Sheer Mesh Knee Panels',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EJKzHiE',
        imageUrl: 'https://i.imgur.com/CGbmg7G.jpeg',
        description: 'Designer Women\'s Jeans Pant Blue Denim With Sheer Mesh Knee Panels Hip Hop Style Distressed High Waist Streetwear Trousers',
        type: 'affiliate'
    },
    {
        id: 'aff-064',
        name: 'Beachapche Big Hole Rhinestone Chain Pearls Street Jeans',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EvnLfIE',
        imageUrl: 'https://i.imgur.com/jX5JcO0.jpeg',
        description: 'Beachapche New Fashion Big Hole Rhinestone Chain Pearls Street Jeans Female Washing Denim Trousers Women Vintage Pocket Straig',
        type: 'affiliate'
    },
    {
        id: 'aff-065',
        name: 'Crystal Chain Wide Leg Baggy Jeans',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EQKnQM6',
        imageUrl: 'https://i.imgur.com/KHS7KTm.jpeg',
        description: 'Crystal Chain Women Wide Leg Baggy Jeans High Waist Hollow Out Summer Pants Denim Trousers Y2K Streetwear Side Split Loose Jeans',
        type: 'affiliate'
    },
    {
        id: 'aff-066',
        name: 'Women‘s Fashion Straight Jeans',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EJ8TxYA',
        imageUrl: 'https://i.imgur.com/R8KCgGT.jpeg',
        description: 'Women‘s Fashion Straight Jeans Casual High Waisted Washed Skinny Trousers Ripped Slim Pants For Lady Commuter 2025 Fashion Trend',
        type: 'affiliate'
    },
    {
        id: 'aff-067',
        name: 'Sexy High Waist Ripped Womens Skinny Jeans',
        category: 'Girls Jeans',
        affiliateLink: 'https://s.click.aliexpress.com/e/_Euc9p4Q',
        imageUrl: 'https://i.imgur.com/B07DBqq.jpeg',
        description: 'Sexy High Waist Ripped Women\'s Skinny Jeans Black White Hole Hip Package Bodycon Stretch Denim Pants Female Trendy Streetwear',
        type: 'affiliate'
    },
    {
        id: "aff-060",
        name: "Spring /Autumn Men's Retro Mock Two-Piece Hooded Sweatshirt",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_EvpFohy",
        imageUrl: "https://i.imgur.com/17culCY.jpeg",
        description: "Spring /Autumn Men's Sweater Retro Mock Two-Piece Hooded Korean Hip Hop Print Sweatshirt Loose Hoodie Male Fleece Padded Jacket",
        type: "affiliate"
    },
    {
        id: "aff-061",
        name: "New Autumn Men's 3D Ethnic Pattern Patchwork Print Hoodie",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_EJdjJMq",
        imageUrl: "https://i.imgur.com/a87yIBc.jpeg",
        description: "New Autumn Hoodie For Men 3d Ethnic Pattern Patchwork Print Long Sleeve Sweatshirt Fashion Street Hoody Pullover Oversized Tops",
        type: "affiliate"
    },
    {
        id: "aff-062",
        name: "Men's Spring/Autumn Fashion 3D Poker Printed Hoodie",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_EyBCVTG",
        imageUrl: "https://i.imgur.com/yVoULvb.jpeg",
        description: "Men's Spring and Autumn Fashion Trendy Hoodie 3D Poker Printed Hoodie Retro High Street Hip Hop Casual Comfortable Sweatshirt",
        type: "affiliate"
    },
    {
        id: "aff-063",
        name: "2025 Street Men's 3D Printed Japanese Art Sweatshirt",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_Ezgb60i",
        imageUrl: "https://i.imgur.com/ubvCWH9.jpeg",
        description: "2025 Street Men's Animal Sweatshirts Long Sleeved Sweatshirt Crew Neck Fashion 3D Printed Japanese Art Prints Casual Sweatshirt",
        type: "affiliate"
    },
    {
        id: "aff-064",
        name: "Vintage Compass Print Hoodies for Men",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_EzQote6",
        imageUrl: "https://i.imgur.com/D7VzNkl.jpeg",
        description: "Vintage Compass Print Hoodies for Men High Quality Hooded Long Sleeve Pullover All Season Daily Casual Sports Tops Men's Clothes",
        type: "affiliate"
    },
    {
        id: "aff-065",
        name: "Labubu Cartoon Print Hoodie for Women",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_EGnmqOq",
        imageUrl: "https://i.imgur.com/eGuKZAW.jpeg",
        description: "Labubu Cartoon Print Hoodie for Women Casual Polyester Pullover with Slight Stretch Alphabet Pattern Hooded Sweatshirt",
        type: "affiliate"
    },
    {
        id: "aff-066",
        name: "2024 Spring Autumn Women's Fleece-lined Zip-up Hooded Sweatshirt",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_EHm5oaO",
        imageUrl: "https://i.imgur.com/6jiaODY.jpeg",
        description: "2024 Spring Autumn New Insfleece-lined Versatile Cropped Slims Smooths Silhouette Zip-up Warm Navy Blue Hooded Sweatshirt Women",
        type: "affiliate"
    },
    {
        id: "aff-067",
        name: "Do What Makes You Happy Letter Printing Sweatshirt Women",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_EvP5SOQ",
        imageUrl: "https://i.imgur.com/joUUHe8.jpeg",
        description: "Do What Makes You Happy Letter Printing Sweatshirt Women Street Pullover Warm Soft Hoodies Loose Crewneck Fleece Female Clothing",
        type: "affiliate"
    },
    {
        id: "aff-068",
        name: "Autumn Women Solid O-Neck Slim Crop Top Lantern Sleeve Sweatshirt",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_ExNJu30",
        imageUrl: "https://i.imgur.com/X8LyCwZ.jpeg",
        description: "Autumn Women Solid O-Neck Slim Crop Top Lantern Sleeve With Button Sweat Casual Hip-Hop Sporty Pullover Sweet Chic Street Wear",
        type: "affiliate"
    },
    {
        id: "aff-069",
        name: "New 2023 Winter Letter Printed Zip Up Hoodie Women",
        category: "Hoodies",
        affiliateLink: "https://s.click.aliexpress.com/e/_EJ9t7n8",
        imageUrl: "https://i.imgur.com/wcKdMDS.jpeg",
        description: "New 2023 Winter Letter Printed Zip Up Hoodie Streetwear Women Cyber Y2k Jackets Cardigan Gothic Punk Clothes Sweatshirts",
        type: "affiliate"
    },
    {
        id: 'aff-070',
        name: 'PrecisionPro Hair Carver',
        category: 'Grooming',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EwBMNhY',
        imageUrl: 'https://i.imgur.com/ReRx1TX.jpeg',
        description: 'Professional-grade rechargeable hair clipper and trimmer for precise hair cutting and intricate carving, ideal for barbers and home use.',
        type: 'affiliate'
    },
    {
        id: 'aff-071',
        name: '24K Gold Snail Peel-Off Mask',
        category: 'Grooming',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EIWqINy',
        imageUrl: 'https://i.imgur.com/h6I0Dh7.jpeg',
        description: 'Deep cleansing peel-off face mask with 24K gold and snail collagen to remove blackheads and promote clear, radiant skin.',
        type: 'affiliate'
    },
    {
        id: 'aff-072',
        name: 'Afro Dreadlock Toupee',
        category: 'Grooming',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EuEXQ4S',
        imageUrl: 'https://i.imgur.com/CCkEaxb.jpeg',
        description: '6-inch synthetic kinky curly hair topper, perfect for adding volume and styling dreadlocks or afro-inspired looks for men and women.',
        type: 'affiliate'
    },
    {
        id: 'aff-073',
        name: 'Pinkish Glow Lip Balm',
        category: 'Grooming',
        affiliateLink: 'https://s.click.aliexpress.com/e/_Eurhmam',
        imageUrl: 'https://i.imgur.com/Yd84KdR.jpeg',
        description: 'Moisturizing and lightening lip balm designed to remove dark pigmentation, whiten, plump, and give lips an extreme glossy pink finish.',
        type: 'affiliate'
    },
    {
        id: 'aff-074',
        name: 'Natural Elegance Colored Contacts',
        category: 'Grooming',
        affiliateLink: 'https://s.click.aliexpress.com/e/_Exw3F4m',
        imageUrl: 'https://i.imgur.com/k8O8Lpy.jpeg',
        description: 'High-quality cosmetic colored contact lenses in brown, gray, blue, and green for both men and women, enhancing natural eye color.',
        type: 'affiliate'
    },
    {
        id: 'aff-028',
        name: 'Summer Time Sadness',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EHiSlHY',
        imageUrl: 'https://i.imgur.com/JpliKwN.jpeg',
        description: 'Summer mens 100% pure cotton casual sports loose and fashionable cartoon bear pattern printed round neck short sleeved T-shirt',
        type: 'affiliate'
    },
    {
        id: 'aff-029',
        name: 'Better Days Ahead Letter Graphic Men T-Shirt',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_Evgtdea',
        imageUrl: 'https://i.imgur.com/m0Km7mC.jpeg',
        description: 'Better Days Ahead Letter Graphic Men T-Shirt O-Neck Casual Oversize T-Shirt Fashion Cotton Tee Clothes Summer Loose Tshirt',
        type: 'affiliate'
    },
    {
        id: 'aff-030',
        name: 'Short Sleeved T-shirt',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EH9N0wm',
        imageUrl: 'https://i.imgur.com/mnzRKpO.jpeg',
        description: 'T Shirt for Men Set Summer Hot Selling Mens Short Sleeved T-shirt Casual Versatile Half Sleeved Trend Color Blocking Top Tshirt',
        type: 'affiliate'
    },
    {
        id: 'aff-031',
        name: 'Morning Rose',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EuzJvSa',
        imageUrl: 'https://i.imgur.com/ljy7lC0.jpeg',
        description: 'Loose Size 100% Cotton Rose Print Casual Slim Fit Round Neck Short Sleeve T-shirt Top',
        type: 'affiliate'
    },
    {
        id: 'aff-032',
        name: 'Be A Kind King!',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EuRekBu',
        imageUrl: 'https://i.imgur.com/V7sGBZi.jpeg',
        description: 'summer loose size BE KIND letter cartoon print casual comfortable round neck short sleeved T-shirt top',
        type: 'affiliate'
    },
    {
        id: 'aff-033',
        name: 'Vacation Undisputed!',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_ExelCbY',
        imageUrl: 'https://i.imgur.com/7PI392V.jpeg',
        description: 'Hawaiian Shirt Man Print Casual Thin Beach Slim Fashion Shirt High Quality Luxury Black Social Vintage Funny Oversized Clothes',
        type: 'affiliate'
    },
    {
        id: '034',
        name: 'Smile Face T-shirt',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EQUrZsO',
        imageUrl: 'https://i.imgur.com/w2rAvrT.jpeg',
        description: 'Minimalist Smile Face Style Graphic Print Tops Men Hip Hop Tee Clothes T Shirt Summer Breathable T-Shirt Street Cotton Tshirt',
        type: 'affiliate'
    },
    {
        id: '035',
        name: 'Stand Collar T-shirt',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EIwYhXU',
        imageUrl: 'https://i.imgur.com/Bc8Lhon.jpeg',
        description: 'Spring and Summer Stand Collar Five-point Mid-sleeve Fashionable Mens Short-sleeved Shirt Seven-point Sleeve Large Size Mens',
        type: 'affiliate'
    },
    {
        id: '036',
        name: 'Vintage Men T-Shirts',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EJjvQXC',
        imageUrl: 'https://i.imgur.com/FAigqhc.jpeg',
        description: 'Washed Vintage Men T-Shirts Street Hip Hop Retro Punk T Shirt Harajuku Casual Cotton Short Sleeve Acid Wash TShirts Tops',
        type: 'affiliate'
    },
    {
        id: '037',
        name: 'Samurai X T-Shirt',
        category: 'Tshirt|Boys Fashion',
        affiliateLink: 'https://s.click.aliexpress.com/e/_EyfNowq',
        imageUrl: 'https://i.imgur.com/qXfQtwn.jpeg',
        description: 'Japanese Samurai Cat 3d Printed T Shirts For Casual Fashion Funny Shirt Top Tee Men Clothing',
        type: 'affiliate'
    }
];

