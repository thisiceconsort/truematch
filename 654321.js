// --- Video Data (Placeholder - replace with real Dropbox links and details) ---
// In a real application, this would come from a backend database.
// The `isLocked` property determines if a video requires payment.
const videosData = [
    // FREE VIDEOS
    {
        id: 'v24',
        title: 'Straight Boy',
        description: "straight Bike boy at the back of an uncompleted building with his passenger that doesn't have money to pay.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/e96f1670-290d-47a1-b574-c8e79c5aa000/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/e96f1670-290d-47a1-b574-c8e79c5aa000/thumbnail.jpg',
        views: 98,
        isLocked: false
    },       
    {
        id: 'v16',
        title: 'Unleashing',
        description: "Suger daddy doing the lord's work.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/5e23df81-f07d-42d7-88de-2192057058a0/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/5e23df81-f07d-42d7-88de-2192057058a0/thumbnail.jpg',
        views: 585,
        isLocked: false
    },       
    {
        id: 'v14',
        title: 'Summer Cream',
        description: "After fighting with his friend, he decided to pay him back with some good lashing.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/2b2f1727-a9bf-415e-b52e-5aa59f965248/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/2b2f1727-a9bf-415e-b52e-5aa59f965248/thumbnail.jpg',
        views: 1201,
        isLocked: false
    },
    {
        id: 'v15',
        title: 'Pump Action',
        description: "Boy doing what he is supposed to be doing to his boyfriend in his room when his mother went out.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/5d8aaf02-0c09-411a-ac4b-bddbf142e416/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/5d8aaf02-0c09-411a-ac4b-bddbf142e416/thumbnail.jpg',
        views: 385,
        isLocked: false
    },
    {
        id: 'v17',
        title: 'Chocolate',
        description: "I bet the inside is so watery, he looks so eatable, it's a must. i insist, watch it .",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/9968a0f6-7ae7-49bc-a2b0-1ab2ebf41aa9/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/9968a0f6-7ae7-49bc-a2b0-1ab2ebf41aa9/thumbnail.jpg',
        views: 1726,
        isLocked: false
    },
    {
        id: 'v13',
        title: 'Young & Ready To Burst ',
        description: "Young, eager, and aching for release—he's hard, hot, and ready to explode with raw desire.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/8809ec78-bcc5-468f-a348-65b1be2e96a6/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/8809ec78-bcc5-468f-a348-65b1be2e96a6/thumbnail.jpg',
        views: 5000,
        isLocked: false
    },
    {
        id: 'v18',
        title: 'Silver Lining',
        description: "When that straight boy finally let you drive him to heaven and you did not disappoint.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/595eadc1-880d-43ed-b0f3-58d67b10d378/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/595eadc1-880d-43ed-b0f3-58d67b10d378/thumbnail.jpg',
        views: 12843,
        isLocked: false
    },
    {
        id: 'v20',
        title: 'Anaconda',
        description: "Young boy playing with his very own snake in the bathroom and the snake his very happy.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/1121bb8d-4921-4cc8-945e-d89b9bb4ad3e/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/1121bb8d-4921-4cc8-945e-d89b9bb4ad3e/thumbnail.jpg',
        views: 3274,
        isLocked: false
    },
    {
        id: 'v19',
        title: 'Next Door',
        description: "Young boy was feeling code, so he went to his neighbour for some hot tea.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/3beff80d-26df-451b-8cb8-9fe362223002/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/3beff80d-26df-451b-8cb8-9fe362223002/thumbnail.jpg',
        views: 12843,
        isLocked: false
    },
    {
        id: 'v2',
        title: 'Friendly Fire',
        description: "After talking online for 2 months,he finally goes to visit and they had the best time.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/1bf9c895-15a5-48b7-8d66-1a6f33b77909/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/1bf9c895-15a5-48b7-8d66-1a6f33b77909/thumbnail.jpg',
        views: 1263,
        isLocked: false
    },
    {
        id: 'v22',
        title: 'Stroke',
        description: "He has refused to pay him back his money because he doesn't have it, he has a better way to payback.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/8c40fcc3-4d68-4995-85b5-46d472186215/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/8c40fcc3-4d68-4995-85b5-46d472186215/thumbnail.jpg',
        views: 592,
        isLocked: false
    },
    {
        id: 'v23',
        title: 'Teaching Math',
        description: "His course mate asked him to come to their house to teach them math as tomorrow is examination.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/99d967de-4638-4430-b31b-0ae2cb2c7fb9/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/99d967de-4638-4430-b31b-0ae2cb2c7fb9/thumbnail.jpg',
        views: 3285,
        isLocked: false
    },
    {
        id: 'v3',
        title: 'Girly & Roommates',
        description: 'Two souls finding comfort under the skirt of their roommate, its warm and lovely.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/17a23e86-2532-4045-bf46-9fbeea1276ad/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/17a23e86-2532-4045-bf46-9fbeea1276ad/thumbnail.jpg',
        views: 23456,
        isLocked: false
    },
    {
        id: 'v4',
        title: 'Whispers',
        description: 'Intimate moments in his friends room after he went to charge his phone.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/aa7d0268-f323-4002-ba90-2e9c87f64ce5/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/aa7d0268-f323-4002-ba90-2e9c87f64ce5/thumbnail_b1f46f68.jpg',
        views: 34567,
        isLocked: false
    },
    {
        id: 'v5',
        title: 'Electric Dreams',
        description: 'A vivid exploration of shared fantasies, They couldnt wait any longer.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/8c07943e-1f8f-4d07-a639-d4dfc748a471/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/8c07943e-1f8f-4d07-a639-d4dfc748a471/thumbnail.jpg',
        views: 9876,
        isLocked: false
    },
    {
        id: 'v14',
        title: 'Almost There',
        description: 'A quick creamy slash on his body before anyone comes around.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/e41fa4e4-068b-44cb-923d-f2e9d6dfcd21/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/e41fa4e4-068b-44cb-923d-f2e9d6dfcd21/thumbnail.jpg',
        views: 567,
        isLocked: false
    },
    {
        id: 'v15',
        title: 'Pinnig him down',
        description: 'For the first time in his life, that boy on top experience what true happiness is.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/7467e320-c9f2-4521-817a-f34ec3cb1784/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/7467e320-c9f2-4521-817a-f34ec3cb1784/thumbnail.jpg',
        views: 98,
        isLocked: false
    },
    {
        id: 'v16',
        title: 'Innocent Aura',
        description: 'I will bet 500 cows that he his calm and smooth but i dont trust that sinister stare, it giving i will fuck you up.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/21df2ffe-3a05-4cdf-81df-ea461241160c/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/21df2ffe-3a05-4cdf-81df-ea461241160c/thumbnail.jpg',
        views: 6000,
        isLocked: false
    },
    {
        id: 'v17',
        title: 'Receive It',
        description: 'I dont know but i feel like boys receive it better, like you can feel heaven looking at him go.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/939f06f0-a4c7-40d5-b2c9-6261e26c6e60/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/939f06f0-a4c7-40d5-b2c9-6261e26c6e60/thumbnail.jpg',
        views: 1700,
        isLocked: false
    },
    {
        id: 'v18',
        title: 'Last Man Standing',
        description: '2 Boys Went to school on Sunday, finding out they were alone, they decided to do a race to finish.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/05bf2911-f556-4671-8834-559b83158d99/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/05bf2911-f556-4671-8834-559b83158d99/thumbnail.jpg',
        views: 910,
        isLocked: false
    },
    {
        id: 'v19',
        title: 'Pipe',
        description: 'The pipe effect. so long and hard, this boy is surely going to need a good sleep after this reset.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/54a77872-2d07-48f4-8e6d-c65355d3dad9/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/54a77872-2d07-48f4-8e6d-c65355d3dad9/thumbnail.jpg',
        views: 910,
        isLocked: false
    },

    // LOCKED VIDEOS (Prices are examples)
    {
        id: 'v6',
        title: 'Forbidden Protocol',
        description: 'Unlocking hidden desires.',
        videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        thumbnailUrl: 'https://cdn.videodelivery.net/LOCKED-VIDEO-UUID-1/thumbnail.jpg',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 2000
    },
    {
        id: 'v7',
        title: 'System Override',
        description: 'Pushing boundaries, breaking codes.',
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        thumbnailUrl: 'https://cdn.videodelivery.net/LOCKED-VIDEO-UUID-2/thumbnail.jpg',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 1500
    },
    {
        id: 'v8',
        title: 'Data Stream Desire',
        description: 'Flowing into pure sensation.',
        videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        thumbnailUrl: 'https://cdn.videodelivery.net/LOCKED-VIDEO-UUID-3/thumbnail.jpg',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 2500
    },
    {
        id: 'v9',
        title: 'Encrypted Passion',
        description: 'Deciphering the language of touch.',
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        thumbnailUrl: 'https://cdn.videodelivery.net/LOCKED-VIDEO-UUID-4/thumbnail.jpg',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 1800
    },
    {
        id: 'v10',
        title: 'Quantum Connection',
        description: 'Entangled in an intimate bond.',
        videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        thumbnailUrl: 'https://cdn.videodelivery.net/LOCKED-VIDEO-UUID-5/thumbnail.jpg',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 2200
    },
    {
        id: 'v11',
        title: 'Glitch in the System',
        description: 'A beautiful disruption of reality.',
        videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        thumbnailUrl: 'https://cdn.videodelivery.net/LOCKED-VIDEO-UUID-6/thumbnail.jpg',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 1700
    },
    {
        id: 'v12',
        title: 'Virtual Serenity',
        description: 'Finding peace in simulated pleasure.',
        videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        thumbnailUrl: 'https://cdn.videodelivery.net/LOCKED-VIDEO-UUID-7/thumbnail.jpg',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 2100
    },
    // Add more videos here...
];

function getRandomViews() {
    return Math.floor(Math.random() * (300000 - 50 + 1)) + 50;
}
