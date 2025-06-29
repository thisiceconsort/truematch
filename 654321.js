// This file contains the main video data array.
// In a real application, this would typically be fetched from a backend database.

function getRandomViews() {
    return Math.floor(Math.random() * (300000 - 50 + 1)) + 50;
}

const videosData = [
    // FREE VIDEOS
    {
        id: 'v13',
        title: 'Young & Ready To Burst ',
        description: "Young, eager, and aching for release—he's hard, hot, and ready to explode with raw desire.",
        videoUrl: 'https://www.dropbox.com/scl/fi/qiunjxes7wezdigy8j3lq/Video.Guru_20250628_104927992.mp4?rlkey=xecio42lbo811vmfdnqxyf9xu&st=zvau7pjv&dl=1',
        views: 5000,
        isLocked: false
    },
    { id: 'v2', title: 'Friendly Fire', description: 'After talking online for 2 months,he finally goes to visit and they had the best time.', videoUrl: 'https://dl.dropboxusercontent.com/scl/fi/d54zs3v83f89c0v8boiiy/Video.Guru_20250629_110957347.mp4', views: 1280, isLocked: false },
    { id: 'v3', title: 'Neon Night Passion', description: 'Two souls finding comfort in the dark.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/video3.mp4?rlkey=abcdefg123456&dl=1', views: 23456, isLocked: false },
    { id: 'v4', title: 'Whispers in the Void', description: 'Intimate moments in a silent space.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/video4.mp4?rlkey=abcdefg123456&dl=1', views: 34567, isLocked: false },
    { id: 'v5', title: 'Electric Dreams', description: 'A vivid exploration of shared fantasies.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/video5.mp4?rlkey=abcdefg123456&dl=1', views: 9876, isLocked: false },
    // LOCKED VIDEOS (Prices are examples)
    { id: 'v6', title: 'Forbidden Protocol', description: 'Unlocking hidden desires.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video1.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 2000 },
    { id: 'v7', title: 'System Override', description: 'Pushing boundaries, breaking codes.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video2.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 1500 },
    { id: 'v8', title: 'Data Stream Desire', description: 'Flowing into pure sensation.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video3.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 2500 },
    { id: 'v9', title: 'Encrypted Passion', description: 'Deciphering the language of touch.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video4.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 1800 },
    { id: 'v10', title: 'Quantum Connection', description: 'Entangled in an intimate bond.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video5.mpkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 2200 },
    { id: 'v11', title: 'Glitch in the System', description: 'A beautiful disruption of reality.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video6.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 1700 },
    { id: 'v12', title: 'Virtual Serenity', description: 'Finding peace in simulated pleasure.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video7.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 2100 },
    // Add more videos here...
];
