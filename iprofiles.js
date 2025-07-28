


const initialProfiles = [
  {
    handle: 'khar_mah',
    name: 'Khar Mah',
    age: 24,
    country: 'Uganda',
    Role: '...',
    likes: '🏳️‍🌈',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/b4f1448iwaz7uxk86qbtu/20250724_175136.jpg?rlkey=ywa0ulyvvknh0ru67yqduh5m2&st=6n0xa2iq',
      'https://www.dl.dropboxusercontent.com/scl/fi/xiyd7nl00owpvkrxvifpe/20250724_175150.jpg?rlkey=aaaywzl87f0ejhu9kpgbchpaa&st=sgtk7jmt'
    ],
    whatsapp: 'https://x.com/khar_mah', // Replace with actual WhatsApp/Telegram links
    telegram: ''
  },
  {
    handle: '__clinteen',
    name: 'Clinteen',
    age: 21,
    country: 'Uganda',
    Role: '...',
    likes: 'Trying to figure out myself and open for relationship.',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/67qsywfp92hcjuk291tmd/20250724_175904.jpg?rlkey=yoq0uld1aei6t964svnp6goj2&st=raqf2876',
      'https://www.dl.dropboxusercontent.com/scl/fi/5cq0sokgs9qt1qgbw3036/20250725_183138.jpg?rlkey=4sgn1rtwyw9bikelkbi4n4hfo&st=jyqt5cz2'
    ],
    whatsapp: '',
    telegram: 'x.com/__clinteen'
  },
  {
    handle: '@TechieGuy',
    name: 'Ben Carter',
    age: 25,
    country: 'Kenya',
    Role: 'Nairobi',
    likes: 'Coding, gaming, sci-fi movies, building smart home tech.',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/u156ewwuiuiz4yfp14xw6/20250724_180924.jpg?rlkey=gsagf8a1iowsp5g9a9yontloj&raw=1',
      'https://www.dl.dropboxusercontent.com/scl/fi/iuey1fcjx0ct0yu7p45h0/20250724_180908.jpg?rlkey=z3xjkjydm59madmgzilj2rux8&raw=1'
    ],
    whatsapp: 'https://wa.me/254712345678',
    telegram: ''
  },
  {
    handle: '@ArtLover',
    name: 'Chris White',
    age: 30,
    country: 'South Africa',
    Role: 'Cape Town',
    likes: 'Museums, painting, jazz music, coffee dates.',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/g6qhfqmtyyowhmubwysn1/20250724_175410.jpg?rlkey=8vpgfx03pgulaoeh9t1aq9yo8&raw=1',
      'https://www.dl.dropboxusercontent.com/scl/fi/kpi8eqbj2ucnab0ks7wcf/20250724_175431.jpg?rlkey=f4ik00u3ge0nkbj4uuo5sw0yp&raw=1'
    ],
    whatsapp: '',
    telegram: 'https://t.me/chriswhite'
  },
  {
    handle: 'devinlevell',
    name: 'actionpackdevo',
    age: 25,
    country: 'California',
    Role: '...',
    likes: 'Hit me up!.',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/yzd7fda4n8ujk5ni9paas/20250726_154047.jpg?rlkey=ppfpu93tg0jpz62hatgccu1qd&raw=1',
      'https://www.dl.dropboxusercontent.com/scl/fi/fdqhrk87luhmvewzsaf07/20250726_154043.jpg?rlkey=tplq20gj8iw4e4jup81ulr8fh&raw=1'
    ],
    whatsapp: 'https://www.x.com/devinlevell',
    telegram: ''
  },
  {
    handle: 'twitter',
    name: 'Ethan Blue',
    age: 27,
    country: 'Ghana',
    Role: '...',
    likes: '🏳️‍🌈',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/59clx86ihg3h39jx66hdi/20250724_175037.jpg?rlkey=qv4f8xbbbj4rth35l4ad3mnk4&raw=1',
      'https://www.dl.dropboxusercontent.com/scl/fi/fv5ape9ts1ujxonilv0t5/20250724_174943.jpg?rlkey=rqom8zxvz6i622ehqnuz7a82g&raw=1'
    ],
    whatsapp: '',
    telegram: ''
  },
  {
    handle: 'twitter',
    name: 'Frank Ocean',
    age: 24,
    country: 'Kenya',
    Role: '...',
    likes: 'I like boys',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/99aozz2zujvngu7vxi2tg/20250724_181549.jpg?rlkey=5oohsokv63cg0lcqx8xh9hevi&raw=1',
      'https://www.dl.dropboxusercontent.com/scl/fi/7gpupwuw01beuum09wrke/20250724_181619.jpg?rlkey=hhe8p7vn3t1lrj8m0f0k3po4n&raw=1'
    ],
    whatsapp: '',
    telegram: ''
  },
  {
    handle: 'twitter',
    name: 'Grace Kelly',
    age: 35,
    country: 'South Africa',
    Role: '...',
    likes: 'Fun to chat with',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/gt77nt1mrfb738f37q5tg/20250726_224243.jpg?rlkey=ng9h183ibwn1tdh1uqlrhdyum&st=7rlb6lzm',
      'https://www.dl.dropboxusercontent.com/scl/fi/q4x786ru0wculem2wev1b/20250726_224254.jpg?rlkey=e524gb8pfg98mdj336t849lzk&st=h33l8n6c'
    ],
    whatsapp: '',
    telegram: ''
  },
  {
    handle: 'twitter',
    name: 'Henry Lewis',
    age: 30,
    country: 'Nigeria',
    Role: '...',
    likes: 'Gym.',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/wyq6atfbihsijul7mc6qn/1753558670914.jpg?rlkey=p88zymlh1aj6c3ufsx1r5h97u&st=lz7ha71n',
      'https://www.dl.dropboxusercontent.com/scl/fi/48ccnq110gynyyvz3lb61/Screenshot_2025-07-26-20-37-58-433_com.facebook.lite.jpg?rlkey=scmq2eoc29xppmn5yzwamb99d&st=3aijr4dz'
    ],
    whatsapp: '',
    telegram: ''
  },
  {
    handle: 'twitter',
    name: 'Ivy Queen',
    age: 26,
    country: 'Ghana',
    Role: '...',
    likes: 'Fashion design.',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/i5scl72u20dg9s5k5smrx/20250726_224045.jpg?rlkey=38rst0q7o65r9z62okb62f8zq&st=2imlssu9',
      'https://www.dl.dropboxusercontent.com/scl/fi/rf7ufsqm30pot10x4t2vn/20250726_224110.jpg?rlkey=erwkp23ghneqtv6z6vjrjsafe&st=a1i0or4e'
    ],
    whatsapp: '',
    telegram: ''
  },
{
    handle: 'twitter',
    name: 'Ivy Queen',
    age: 26,
    country: 'Ghana',
    Role: '...',
    likes: 'modeling.',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/4xvad9ccbcdw4gg9wkmbx/20250726_223245.jpg?rlkey=s1slqhqbdjr2me7ywgccuwpg1&st=j265lcrb',
      'https://www.dl.dropboxusercontent.com/scl/fi/u9vnynmbrjx1qlvi3yw87/20250726_223159.jpg?rlkey=0sgzvadvloa0sgi9l17qk07ww&st=fpgzmy6n'
    ],
    whatsapp: '',
    telegram: ''
  },
  
{
    handle: 'twitter',
    name: 'Ivy Queen',
    age: 26,
    country: 'Ghana',
    Role: 'Tamale',
    likes: 'boys.',
    images: [
      'https://www.dl.dropboxusercontent.com/scl/fi/v3h9q5j7h96wqzzswj9lz/20250726_222919.jpg?rlkey=t27tc25uoha2rmds3pdl8blwm&st=22911mln',
      'https://www.dl.dropboxusercontent.com/scl/fi/g2rml38bef4hvhq7707v7/20250726_222908.jpg?rlkey=5yi8tzwx1bmvpvcw5wxxbl587&st=zdv0x1qj'
    ],
    whatsapp: '',
    telegram: ''
  }
  // Add more profile data as needed
];

allProfiles = [...initialProfiles]; //
