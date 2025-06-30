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
    {
        id: 'v2',
        title: 'Friendly Fire',
        description: "After talking online for 2 months,he finally goes to visit and they had the best time.",
        videoUrl: 'https://www.dropbox.com/scl/fi/d54zs3v83f89c0v8boiiy/Video.Guru_20250629_110957347.mp4?rlkey=lbjls2j0vk9zy9r9hiwevexmm&st=wbz4vmda&dl=1',
        views: 1263,
        isLocked: false
    },
    { id: 'v3', title: 'Girly & Roommates', description: 'Two souls finding comfort under the skirt of their roommate, its warm and lovely.', videoUrl: 'https://www.dropbox.com/scl/fi/rzs5zsashow5chai6u0z5/Video.Guru_20250628_090304206.mp4?rlkey=ffjidhcdhxhisoxtr3rbq5ajx&st=kbpq7h7v&dl=1', views: 23456, isLocked: false },
    { id: 'v4', title: 'Whispers', description: 'Intimate moments in his friends room after he went to charge his phone.', videoUrl: 'https://www.dropbox.com/scl/fi/f2mu08q57fbkvm6ob0dk6/Video.Guru_20250505_081410202.mp4?rlkey=aq7itbpywt451qg1emy1gxqzl&st=eobgstnu&dl=1', views: 34567, isLocked: false },
    { id: 'v5', title: 'Electric Dreams', description: 'A vivid exploration of shared fantasies, They couldnt wait any longer.', videoUrl: 'https://www.dropbox.com/scl/fi/s50fd01hxmudvas5279s9/Video.Guru_20250501_160935903.mp4?rlkey=hz83zenv9x2lwvcfgfmwsw5f8&st=xechqkrf&dl=1', views: 9876, isLocked: false },
    // LOCKED VIDEOS (Prices are examples)
    { id: 'v6', title: 'Forbidden Protocol', description: 'Unlocking hidden desires.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video1.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 2000 },

   //free video
   { id: 'v14', title: 'Almost There', description: 'A quick creamy slash on his body before anyone comes around.', videoUrl: 'https://www.dropbox.com/scl/fi/33kjw3gfv8vm3mjq0w0sg/Video.Guru_20250503_081950234.mp4?rlkey=e92cvx8616sf50ylghnmjua36&st=taxd5p04&dl=1', views: 567, isLocked: false },
    
    //locked video
    { id: 'v7', title: 'System Override', description: 'Pushing boundaries, breaking codes.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video2.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 1500 },
    { id: 'v8', title: 'Data Stream Desire', description: 'Flowing into pure sensation.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video3.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 2500 },
    { id: 'v9', title: 'Encrypted Passion', description: 'Deciphering the language of touch.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video4.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 1800 },
    { id: 'v10', title: 'Quantum Connection', description: 'Entangled in an intimate bond.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video5.mpkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 2200 },
    //freevideo
{ id: 'v15', title: 'Pinnig him down', description: ' For the first time in his life, that boy on top experience what true happiness is.', videoUrl: 'https://www.dropbox.com/scl/fi/eq11sds4uv7g3o3aezsry/Video.Guru_20250628_164701334.mp4?rlkey=695ga3lzi6dh1xkx8t1e1x8ox&st=y6o7zrnh&dl=1', views: 6000, isLocked: false },
{ id: 'v16', title: 'Innocent Aura', description: 'I will bet 500 cows that he his calm and smooth but i dont trust that sinister stare, it giving i will fuck you up.', videoUrl: 'https://www.dropbox.com/scl/fi/bmwnuef4m38l1pjbrllir/Video.Guru_20250627_180203351.mp4?rlkey=4q60t8pipa3a422g0e3ygzsyf&st=lcliwvlo&dl=1', views: 6000, isLocked: false },
    //locked videos   
    { id: 'v11', title: 'Glitch in the System', description: 'A beautiful disruption of reality.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video6.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 1700 },
   //free video 
{ id: 'v17', title: 'Receive It', description: 'I dont know but i feel like boys receive it better, like you can feel heaven looking at him go.', videoUrl: 'https://www.dropbox.com/scl/fi/bmwnuef4m38l1pjbrllir/Video.Guru_20250627_180203351.mp4?rlkey=4q60t8pipa3a422g0e3ygzsyf&st=lcliwvlo&dl=1', views: 6000, isLocked: false },

    //locked videos 
    { id: 'v12', title: 'Virtual Serenity', description: 'Finding peace in simulated pleasure.', videoUrl: 'https://www.dropbox.com/scl/fi/w9qj90q59i5lq45c12345/locked-video7.mp4?rlkey=abcdefg123456&dl=1', views: getRandomViews(), isLocked: true, priceNGN: 2100 },
    // Add more videos here...
    { id: 'v3', title: 'Girly & Roommates', description: 'Two souls finding comfort under the skirt of their roommate, its warm and lovely.', videoUrl: 'https://www.dropbox.com/scl/fi/rzs5zsashow5chai6u0z5/Video.Guru_20250628_090304206.mp4?rlkey=ffjidhcdhxhisoxtr3rbq5ajx&st=kbpq7h7v&dl=1', views: 23456, isLocked: false },
    
];
