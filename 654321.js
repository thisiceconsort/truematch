// --- Video Data (Placeholder - replace with real Dropbox links and details) ---
// In a real application, this would come from a backend database.
// The `isLocked` property determines if a video requires payment.
const videosData = [
{
        id: 'v33',
        title: 'At Last',
        description:"Kio from kenya finally found a match, no just any, the one that can service him well..",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/a8dcbd8b-4c80-4424-8339-875ef2e84652/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/a8dcbd8b-4c80-4424-8339-875ef2e84652/thumbnail.jpg',
        views: 451,
        isLocked: false
    },
        {
        id: 'v32',
        title: 'Kissing Meat',
        description:"What a good day to find a boy that truly appreciate my big meat.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/6985c48d-7830-4b9b-950b-0690e8d30571/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/6985c48d-7830-4b9b-950b-0690e8d30571/thumbnail.jpg',
        views: 1945,
        isLocked: false
    },
      {
        id: 'v31',
        title: 'Three Wise Boys',
        description:"After the electricity went off and the boys decided to entertain their self another way, no doubt, lots of creams and screams .",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/2e3cb92e-2242-4881-87e7-d776d5c68e19/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/2e3cb92e-2242-4881-87e7-d776d5c68e19/preview.webp?v=1751556512',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 7546
    },


    {
        id: 'v30',
        title: 'Hungry',
        description:"After being hungry for so long, straight friend allow me eat it.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/f778a010-c983-44ee-bd37-2f4bc7bffa1d/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/f778a010-c983-44ee-bd37-2f4bc7bffa1d/thumbnail.jpg',
        views: 238,
        isLocked: false
    },
    {
        id: 'v29',
        title: 'Under 21',
        description:"Creamy things happens, when two boys under the age of 21 realized that they were the only one in the compound.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/35551f04-c6a0-43b9-ae6c-b33e05e342ca/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/35551f04-c6a0-43b9-ae6c-b33e05e342ca/thumbnail_02fa10c0.jpg',
        views: 117,
        isLocked: false
    },

    {
        id: 'v28',
        title: 'Boys doing boys things',
        description:"After finding out he likes boys, the curious boy went to his room to confirm and he didn't disappoint.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/2b662aed-e310-419d-8163-4961a2e5e649/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/2b662aed-e310-419d-8163-4961a2e5e649/thumbnail_15da44f9.jpg',
        views: 68,
        isLocked: false
    },
    {
        id: 'v27',
        title: 'Toilet Banging',
        description: "At a club in kenya a waiter showed the customer to the toilet, he also showed him his butt.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/9d55c27a-2e62-4b91-a5e0-3316c8aea2e1/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/9d55c27a-2e62-4b91-a5e0-3316c8aea2e1/thumbnail.jpg',
        views: 228,
        isLocked: false
    },       
    {
        id: 'v26',
        title: 'Top Boy',
        description: "All he wanted was just 10 cedis , but his roommate tells him he will give him only if he does one round of mikrimor.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/e1ef6af5-d8df-4375-930b-0beaaa3ead19/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/e1ef6af5-d8df-4375-930b-0beaaa3ead19/thumbnail.jpg',
        views: 731,
        isLocked: false
    },       
    {
        id: 'v25',
        title: 'Good Evening',
        description: "Straight Boy can't help but take this boy home to do some homework.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/51f1d9dd-17c5-408a-9199-64e6a6232f1b/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/51f1d9dd-17c5-408a-9199-64e6a6232f1b/thumbnail_2106f0f8.jpg',
        views: 392,
        isLocked: false
    },       
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
