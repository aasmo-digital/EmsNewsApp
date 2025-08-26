export const categories = [
  {
    id: '1',
    name: 'National',
    image: 'https://example.com/images/national.jpg',
  },
  {
    id: '2',
    name: 'International',
    image: 'https://example.com/images/international.jpg',
  },
  {
    id: '3',
    name: 'Politics',
    image: 'https://example.com/images/politics.jpg',
  },
  {
    id: '4',
    name: 'Sports',
    image: 'https://example.com/images/sports.jpg',
  },
  {
    id: '5',
    name: 'Entertainment',
    image: 'https://example.com/images/entertainment.jpg',
  },
];

export const newsData = [
  {
    id: '201',
    title: 'ED ने अनिल अंबानी को 5 अगस्त को पूछताछ के लिए बुलाया',
    description: 'प्रवर्तन निदेशालय (ED) ने कथित ऋण धोखाधड़ी के एक मामले में रिलायंस एडीए समूह के चेयरमैन अनिल अंबानी को 5 अगस्त को पूछताछ के लिए बुलाया है। यह मामला यस बैंक से लिए गए ऋण से संबंधित है, जिसमें आरोप है कि ऋण की राशि का दुरुपयोग किया गया।',
    date: '2025-08-01T09:00:00Z',
    author: 'द हिंदू',
    image: 'https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=',
    categoryId: '1',
    categoryName: 'राष्ट्रीय',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    galleryImages: [
      'https://www.thehindu.com/theme/images/th-online/logo.png',
      'https://www.thehindu.com/static/theme/default/base/img/og-image.png',
    ],
    comments: [
      {
        id: 'c1',
        user: 'विराज सिंह',
        comment: 'यह एक गंभीर मामला है और पूरी जांच होनी चाहिए।',
        timestamp: '2025-08-01T10:00:00Z',
      },
      {
        id: 'c2',
        user: 'नेहा गुप्ता',
        comment: 'देखते हैं इस जांच का क्या नतीजा निकलता है।',
        timestamp: '2025-08-01T10:05:00Z',
      },
    ],
    tags: ['Anil Ambani', 'ED', 'Yes Bank', 'Loan Fraud', 'Business'],
  },
  {
    id: '202',
    title: 'Vivo ने 5,700mAh बैटरी और 50MP कैमरे वाला किफायती स्मार्टफोन लॉन्च किया',
    description: 'Vivo ने भारतीय बाजार में एक नया बजट-फ्रेंडली स्मार्टफोन लॉन्च किया है, जिसमें 5,700mAh की दमदार बैटरी और 50 मेगापिक्सल का मुख्य कैमरा है। कंपनी का लक्ष्य इस फोन के जरिए किफायती सेगमेंट में अपनी पकड़ मजबूत करना है।',
    date: '2025-07-31T11:00:00Z',
    author: 'इंडिया टीवी न्यूज़',
    image: 'https://www.indiatvnews.com/static/images/itv-logo-350.png',
    categoryId: '3',
    categoryName: 'टेक्नोलॉजी',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    galleryImages: [
      'https://www.indiatvnews.com/static/images/itv-logo-350.png',
      'https://resize.indiatvnews.com/en/centered/newbucket/250_141/2025/07/vivo-t4r-5g-1722321072.jpg',
    ],
    comments: [
      {
        id: 'c1',
        user: 'टेक गुरु',
        comment: 'बैटरी लाइफ बहुत प्रभावशाली लग रही है!',
        timestamp: '2025-07-31T12:30:00Z',
      },
      {
        id: 'c2',
        user: 'समीक्षा कुमारी',
        comment: 'इस कीमत में अच्छे फीचर्स हैं।',
        timestamp: '2025-07-31T12:35:00Z',
      },
    ],
    tags: ['Vivo', 'Smartphone', 'New Launch', 'Tech News', 'Gadgets'],
  },
  {
    id: '203',
    title: '"धड़क 2" मूवी रिव्यू: सिद्धांत और तृप्ति की प्रेम कहानी सामाजिक असमानताओं को दर्शाती है',
    description: 'सिद्धांत चतुर्वेदी और तृप्ति डिमरी की मुख्य भूमिकाओं वाली "धड़क 2" आज सिनेमाघरों में रिलीज हो गई है। फिल्म एक युवा जोड़े की प्रेम कहानी के माध्यम से समाज में मौजूद जाति और वर्ग की असमानताओं को उजागर करती है।',
    date: '2025-08-01T08:00:00Z',
    author: 'इंडिया टीवी न्यूज़',
    image: 'https://www.indiatvnews.com/static/images/itv-logo-350.png',
    categoryId: '5',
    categoryName: 'मनोरंजन',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    galleryImages: [
      'https://resize.indiatvnews.com/en/centered/newbucket/250_141/2025/08/dhadak-2-movie-review-1722489243.jpg',
      'https://resize.indiatvnews.com/en/centered/newbucket/250_141/2025/07/dhadak-2-1722339662.jpg',
    ],
    comments: [
      {
        id: 'c1',
        user: 'फिल्म प्रेमी',
        comment: 'कहानी बहुत दमदार लग रही है, वीकेंड पर जरूर देखूंगा।',
        timestamp: '2025-08-01T09:30:00Z',
      },
      {
        id: 'c2',
        user: 'आलोचक',
        comment: 'अभिनय अच्छा है, लेकिन कहानी और बेहतर हो सकती थी।',
        timestamp: '2025-08-01T09:35:00Z',
      },
    ],
    tags: ['Dhadak 2', 'Bollywood', 'Movie Review', 'Siddhant Chaturvedi', 'Triptii Dimri'],
  },
  {
    id: '204',
    title: 'अलेक्जेंडर ज्वेरेव ने टोरंटो में 500वीं एटीपी मैच जीत हासिल की',
    description: 'जर्मनी के टेनिस खिलाड़ी अलेक्जेंडर ज्वेरेव ने टोरंटो में चल रहे एटीपी टूर्नामेंट में एक और उपलब्धि हासिल करते हुए अपने करियर की 500वीं जीत दर्ज की।',
    date: '2025-08-01T05:00:00Z',
    author: 'एनडीटीवी स्पोर्ट्स',
    image: 'https://cdn.ndtv.com/common/images/ogndtv.png',
    categoryId: '4',
    categoryName: 'खेल',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    galleryImages: [
      'https://cdn.ndtv.com/common/images/ogndtv.png',
      'https://c.ndtvimg.com/2025-08/g684j5ag_alexander-zverev-afp_625x300_01_August_25.jpg?im=FaceCrop,algorithm=dnn,width=650,height=400',
    ],
    comments: [
      {
        id: 'c1',
        user: 'टेनिस फैन',
        comment: 'ज्वेरेव को बहुत-बहुत बधाई! यह एक बड़ी उपलब्धि है।',
        timestamp: '2025-08-01T06:00:00Z',
      },
      {
        id: 'c2',
        user: 'स्पोर्ट्स लवर',
        comment: 'शानदार प्रदर्शन!',
        timestamp: '2025-08-01T06:05:00Z',
      },
    ],
    tags: ['Alexander Zverev', 'Tennis', 'ATP Tour', 'Sports News', 'Toronto'],
  },
];

export const newsSections = [
  {
    sectionId: '1',
    sectionTitle: 'Trending',
    news: [
      {
        id: 't1',
        title: 'Heavy Rain Floods Northern India',
        description:
          'Several areas in North India are facing waterlogging as monsoon rains continue. Rescue operations are underway.',
        date: '2025-07-22',
        author: 'Weather Desk',
        categoryId: '1',
        categoryName: 'National',
        image: 'https://via.placeholder.com/300x200.png?text=Floods',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        galleryImages: [
          'https://via.placeholder.com/300x200.png?text=Rescue+Ops',
          'https://via.placeholder.com/300x200.png?text=Flooded+Road',
        ],
        comments: [
          {
            id: 'c1',
            user: 'Aman',
            comment: 'Hope everyone stays safe!',
            timestamp: '2025-07-22T10:00:00Z',
          },
        ],
        tags: ['Monsoon', 'Weather', 'Flood'],
        likes: 100,
      },
      {
        id: 't2',
        title: 'Stock Market Hits Record High',
        description:
          'BSE Sensex and Nifty have touched new records amid positive investor sentiment and strong quarterly earnings.',
        date: '2025-07-21',
        author: 'Finance Reporter',
        categoryId: '3',
        categoryName: 'Business',
        image: 'https://via.placeholder.com/300x200.png?text=Stock+Market',
        videoUrl: '',
        likes: 100,

        galleryImages: [],
        comments: [
          {
            id: 'c2',
            user: 'Investor123',
            comment: 'Time to book profits?',
            timestamp: '2025-07-21T11:00:00Z',
          },
        ],
        tags: ['Stock', 'Sensex', 'Finance'],
      },
    ],
  },
  {
    sectionId: '2',
    sectionTitle: 'Recommended',
    news: [
      {
        id: 'r1',
        title: 'AI to Revolutionize Healthcare',
        description:
          'Experts believe AI diagnostics will cut down human error and speed up treatments in the next decade.',
        date: '2025-07-20',
        author: 'Health Tech',
        categoryId: '6',
        categoryName: 'Technology',
        image: 'https://via.placeholder.com/300x200.png?text=AI+Healthcare',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        galleryImages: [],
        comments: [],
        likes: 100,

        tags: ['AI', 'Healthcare', 'Future'],
      },
      {
        id: 'r2',
        title: 'Top 10 Beaches to Visit in 2025',
        description:
          'Travel influencers have shared their bucket list for beach lovers across the world.',
        date: '2025-07-19',
        author: 'Travel Desk',
        categoryId: '7',
        categoryName: 'Lifestyle',
        image: 'https://via.placeholder.com/300x200.png?text=Beach+Guide',
        videoUrl: '',
        likes: 100,

        galleryImages: [
          'https://via.placeholder.com/300x200.png?text=Goa',
          'https://via.placeholder.com/300x200.png?text=Bali',
        ],
        comments: [],

        tags: ['Travel', 'Beach', 'Explore'],
      },
    ],
  },
  {
    sectionId: '3',
    sectionTitle: 'Newest',
    news: [
      {
        id: 'n1',
        title: 'NASA’s Artemis Mission Prepares for Launch',
        description:
          'The Artemis III mission is scheduled to launch in early August to continue lunar exploration.',
        date: '2025-07-22',
        author: 'Science Editor',
        categoryId: '4',
        categoryName: 'Science',
        image: 'https://via.placeholder.com/300x200.png?text=NASA+Artemis',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        galleryImages: [],
        comments: [],
        likes: 100,

        tags: ['NASA', 'Moon', 'Space'],
      },
    ],
  },
  {
    sectionId: '4',
    sectionTitle: 'Noteworthy',
    news: [
      {
        id: 'nw1',
        title: 'India’s Chess Prodigy Wins Gold',
        description:
          'The 14-year-old chess champion bags a gold medal at the World Youth Championship.',
        date: '2025-07-20',
        author: 'Sports Bureau',
        categoryId: '2',
        categoryName: 'Sports',
        image: 'https://via.placeholder.com/300x200.png?text=Chess+Champion',
        videoUrl: '',
        likes: 100,

        galleryImages: [],
        comments: [],

        tags: ['Chess', 'India', 'Youth'],
      },
      {
        id: 'nw2',
        title: 'Electric Car Revolution in India',
        description:
          'Multiple new EV startups have emerged in 2025, signaling strong industry disruption.',
        date: '2025-07-18',
        author: 'Auto News',
        categoryId: '6',
        categoryName: 'Technology',
        image: 'https://via.placeholder.com/300x200.png?text=EV+India',
        videoUrl: '',
        likes: 100,

        galleryImages: [],
        comments: [],

        tags: ['EV', 'Automobile', 'India'],
      },
    ],
  },
];

 // This will normally come from API
  export const pollData = {
    questionHindi: "क्या आप क्रिकेट पसंद करते हैं?",
    questionEnglish: "Do you like cricket?",
    options: ["Yes", "No", "Sometimes"],
    votes: [60, 30, 10], // match options length
  };