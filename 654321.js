// --- Video Data (Placeholder - replace with real Dropbox links and details) ---
// In a real application, this would come from a backend database.
// The `isLocked` property determines if a video requires payment.
const videosData = [
       
       {
        id: 'v56',
        title: 'Hot Dog',
        description:" Travelled all the way to kenya to receive the almighty injection from the kenyan boy",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/1717906b-a24d-4f36-90f4-c6ae3f5d4921/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/1717906b-a24d-4f36-90f4-c6ae3f5d4921/thumbnail.jpg',
        views: 1042,
        isLocked: false
    },
        {
        id: 'v55',
        title: 'Body Builder',
        description:"He applied for a private training with the gym instructor, and now he is instructing inside him",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/6c61c035-8ce5-42fc-bbc9-5193d87d2b26/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/6c61c035-8ce5-42fc-bbc9-5193d87d2b26/thumbnail.jpg',
        views: 427,
        isLocked: false
    },
        {
        id: 'v54',
        title: 'Sleeping Already?',
        description:"He travelled all the way to his friends house and he won't allow him sleep until he test his donut.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/1fff1432-f249-48bc-aab6-1a7e3fcaa453/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/1fff1432-f249-48bc-aab6-1a7e3fcaa453/thumbnail.jpg',
        views: 738,
        isLocked: false
    },
        {
        id: 'v53',
        title: 'Just The Tip',
        description:"After inviting him for a meal, he tries to advance and won.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/e526c651-ee64-4f7b-ab2a-5fee210c683e/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/e526c651-ee64-4f7b-ab2a-5fee210c683e/thumbnail.jpg',
        views: 217,
        isLocked: false
    },   
          
           {
        id: 'v52',
        title: 'Busting',
        description:"Roomate so excited, called one of  his guy friend and ask for a video.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/11717b72-0ce4-4822-b3f9-2bc750aac628/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/11717b72-0ce4-4822-b3f9-2bc750aac628/thumbnail.jpg',
        views: 173,
        isLocked: false
    },   

           {
        id: 'v51',
        title: 'Straight Boy Secret',
        description:"He has a girlfriend and a gay best friend. best friends with benefits.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/36f3c78d-fa65-441a-bef1-0941ef262250/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/36f3c78d-fa65-441a-bef1-0941ef262250/thumbnail.jpg',
        views: 375,
        isLocked: false
    },   
  {
        id: 'v50',
        title: 'Biggie',
        description:" Watch has this suger daddy gave his boy a nice creamy afternoon, what are you doing today?.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/c6041bed-ea24-4e8e-ac90-b83f7853c160/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/c6041bed-ea24-4e8e-ac90-b83f7853c160/thumbnail_ce0ac330.jpg',
        views: 494,
        isLocked: false
    },
        {
        id: 'v49',
        title: 'Fisher Man',
        description:" After sighting a very young fish in the street, gave him money, so he followed him home.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/87dc24b7-7ee1-45ae-bac5-347e951976cf/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/87dc24b7-7ee1-45ae-bac5-347e951976cf/thumbnail_b241129c.jpg',
        views: 364,
        isLocked: false
    },
        {
        id: 'v48',
        title: 'A baloon Landing',
        description:" 18 years old see's a very feminine boy on the street, he asked him to come visit that he doesn't leave far.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/3a8dfb5c-138c-40c8-8e66-8c6196b720bd/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/3a8dfb5c-138c-40c8-8e66-8c6196b720bd/thumbnail.jpg',
        views: 1804,
        isLocked: false
    },
        {
        id: 'v47',
        title: 'Land lords Son',
        description:"fter staying for one year, his house rent his due abd he doesn't have $ to pay, so his landlord son gave him a better option.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/3e51fa71-e6e2-4e5d-b142-300a10521994/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/3e51fa71-e6e2-4e5d-b142-300a10521994/thumbnail.jpg',
        views: 604,
        isLocked: false
    },
        {
        id: 'v46',
        title: 'Cream Bender',
        description: 'Two straight guys went on a creamy journey for $$$.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/aab33e94-4f8c-4779-9f36-5eb5b7c6c22b/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/aab33e94-4f8c-4779-9f36-5eb5b7c6c22b/preview.webp?v=1751817890',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 950
    },
        {
        id: 'v45',
        title: 'Boyfriend',
        description:"A whole six days without seeing his boyfriend, he nearly fainted. finally his heaven has arrived.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/6fc24b06-84e5-4f1c-9667-6d288e290e27/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/6fc24b06-84e5-4f1c-9667-6d288e290e27/thumbnail.jpg',
        views: 3326,
        isLocked: false
    },
        {
        id: 'v44',
        title: 'Army Barracks',
        description:"He was walking on the street on environmental day, the soldier saw him and took him home to punish.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/9d2adaf5-1881-418b-be0d-849b89bd2e34/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/9d2adaf5-1881-418b-be0d-849b89bd2e34/thumbnail.jpg',
        views: 4269,
        isLocked: false
    },
        {
        id: 'v43',
        title: 'HK Lashing',
        description:"Because his girlfriend traveled, he asked the youngest boy in the HK(office) to come and chase the others outside.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/a1786457-0ba3-40f5-9bdd-bfc4fbdc6796/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/a1786457-0ba3-40f5-9bdd-bfc4fbdc6796/thumbnail.jpg',
        views: 104,
        isLocked: false
    },
        {
        id: 'v42',
        title: 'In The kitchen',
        description:"He couldn't hold it in any longer, so he went to the kitchen to release the monster that spits ice cream.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/e9ed1e70-cf3b-4258-9dcb-06c514a1ea12/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/e9ed1e70-cf3b-4258-9dcb-06c514a1ea12/thumbnail.jpg',
        views: 527,
        isLocked: false
    },
        {
        id: 'v41',
        title: 'Milking The Meat',
        description:"After a long day at work 27:years old mante, decided to milk his 23 years old roommates meat for dinner.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/404b44b5-85ad-41c4-bc11-be76d966bedc/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/404b44b5-85ad-41c4-bc11-be76d966bedc/thumbnail.jpg',
        views: 264,
        isLocked: false
    },
{
        id: 'v40',
        title: 'Teacher × Student',
        description:"After sport, teacher asked one his his students to come to his office to teach him so new moves.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/1e984351-de21-4726-b2ca-4cabdd3c9aa1/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/1e984351-de21-4726-b2ca-4cabdd3c9aa1/thumbnail_63cf1977.jpg',
        views: 183,
        isLocked: false
    },
        {
        id: 'v39',
        title: 'Masked',
        description:"Two masked boys have fun on camera for money and they certainly enjoyed the experience.",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/88edf6d6-e270-4bb6-90f0-00e40e792098/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/88edf6d6-e270-4bb6-90f0-00e40e792098/thumbnail.jpg',
        views: 362,
        isLocked: false
    },
        {
        id: 'v38',
        title: 'Feelings',
        description:"After locking eyes several times, he went to visit his new friend. Dearest viewer, they are more than friends!",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/de5cd89f-b907-4c8c-a111-2cfe22c75e4e/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/de5cd89f-b907-4c8c-a111-2cfe22c75e4e/thumbnail.jpg',
        views: 4729,
        isLocked: false
    },
        {
        id: 'v37',
        title: 'Straight Boy Play',
        description:"From dancing to getting the boy pussy cat leeked, two straight boys had fun in school hostel",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/5858a6e8-ebd0-42c2-bfe1-64c983627c33/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/5858a6e8-ebd0-42c2-bfe1-64c983627c33/thumbnail.jpg',
        views: 197,
        isLocked: false
    },
        {
        id: 'v36',
        title: 'Straight boy for cash',
        description:" straight boys got an offer they can't refuse, the aftermath is creamy, very creamy!!",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/c0b7b33f-0199-47c2-9718-f160955b0cc4/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/c0b7b33f-0199-47c2-9718-f160955b0cc4/preview.webp?v=1751557626',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 550
    },
        {
        id: 'v35',
        title: 'Why are you running?',
        description:"You went to deliver food at the guys house but things got out of hand and now you know you are cooked!",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/04d4caae-8be9-4b8d-9e4b-eef550f643c0/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/04d4caae-8be9-4b8d-9e4b-eef550f643c0/thumbnail.jpg',
        views: 573,
        isLocked: false
    },
        {
        id: 'v34',
        title: 'Gold Digging',
        description:"Have you ever being in a situation where you are being pinned by a muscular guy that digs?",
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/d76c1ae8-f068-4428-b3ec-3bcc4b967439/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/d76c1ae8-f068-4428-b3ec-3bcc4b967439/thumbnail.jpg',
        views: 3727,
        isLocked: false
    },
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
        priceNGN: 750
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
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/e74fc443-6e0d-4ed4-aa3e-94b15dac1395/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/e74fc443-6e0d-4ed4-aa3e-94b15dac1395/preview.webp?v=1751791124',
        views: getRandomViews(),
        isLocked: true,
        priceNGN: 2500
    },
    {
        id: 'v9',
        title: 'Encrypted Passion',
        description: 'Deciphering the language of touch.',
        videoUrl: 'https://vz-28eb4f33-914.b-cdn.net/f8ea44c7-843e-4e8f-b610-34ebfba9a4ed/playlist.m3u8',
        thumbnailUrl: 'https://vz-28eb4f33-914.b-cdn.net/f8ea44c7-843e-4e8f-b610-34ebfba9a4ed/preview.webp?v=1751757774',
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
