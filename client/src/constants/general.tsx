import {
    feature1,
    feature2,
    feature3,
    feature4,
    feature5,
    feature6,
    feature7,
    feature8,
    feature9,
    facebookLight,
    googleLight,
    twitterLight,
    mock1,
    mock2,
    mock3,
    mock4,
    mock5,
    mock6,
    mock7,
    logo1,
    logo2,
    logo3,
    meetup1,
    meetup2,
    meetup3,
    podcast1,
    podcast2,
    podcast3,
    podcast4,
    podcast5,
    memoji1,
    javascriptdev,
    bitcoinlogo,
    designlogo,
    blogginglogo,
    tutoriallogo,
    seologo,
    user1,
    post1,
    post2,
    post3,
    post4,
    UserAvatar,
    UserAvatar2,
    like,
    comment,
    mention,
    edit
} from '../assets';

export const features = [
    {
        icon: feature1,
        text: 'Connect with other indie hackers running online businesses.',
    },
    {
        icon: feature2,
        text: 'Get feedback on your business ideas, landing pages, and more.',
    },
    {
        icon: feature3,
        text: 'Get the best new stories from founders in your inbox.',
    },
    {
        icon: feature4,
        text: 'Help us build the best community for people like you.',
    },
    {
        icon: feature5,
        text: 'See the best content and conversations, tailored to your interests.',
    },
    {
        icon: feature6,
        text: 'Choose your login information to finish signing up.',
    },
    {
        icon: feature7,
        text: 'Dive into the community. Your first days are the most important!',
    },
    {
        icon: feature8,
        text: 'Did you join before February 2017? You need to connect an email address to your username.',
    },
    {
        icon: feature9,
        text: 'Trouble logging in? Reset your password.',
    },
];

export const signupOptions = [
    {
        text: 'Google',
        icon: googleLight,
    },
    {
        text: 'Facebook',
        icon: facebookLight,
    },
    {
        text: 'Twitter',
        icon: twitterLight,
    },
];

type imgProp = {
    src?: string | undefined;
};

const Image = ({ src }: imgProp) => {
    return <img src={src} alt={'side image'} />;
};

export const mockData = [
    {
        title: 'Selling a Business and Scaling Another Amidst Tragedy.',
        tags: ["Business"],
        image: "/src/assets/mock1.png",
        author: 'by Michele Hansen',
        user: "/src/assets/memoji1.png",
        viewCount: 55,
        likeCount: 55,
        commentCount: 55,
    },
    {
        title: 'Mental health as a founder and the importance of community....',
        tags: ["Business"],
        image: "/src/assets/mock2.png",
        author: 'by James McKinven',
        user: "/src/assets/memoji1.png",
        viewCount: 55,
        likeCount: 55,
        commentCount: 55,
    },
    {
        title: 'Growing to $8.5k MRR in 1 year - Marie Martens, Tally.so',
        tags: ["Business"],
        image: "/src/assets/mock4.png",
        author: 'by Mahfuzul Nabil',
        user: "/src/assets/memoji1.png",
        viewCount: 55,
        likeCount: 55,
        commentCount: 55,
    },
    {
        title: 'Mental Health and Bootstrapping in 2022 with Rob Walling of TinySe',
        tags: ["Business"],
        image: "/src/assets/mock5.png",
        author: 'by Dr. Jubed',
        user: "/src/assets/memoji1.png",
        viewCount: 55,
        likeCount: 55,
        commentCount: 55,
    },
    {
        title: 'Money, Happiness, and Productivity as a Solo Founder with Pieter Levels',
        tags: ["Business"],
        image: "/src/assets/mock6.png",
        author: 'by Jesse Hanley',
        user: "/src/assets/memoji1.png",
        viewCount: 55,
        likeCount: 55,
        commentCount: 55,
    },
    {
        title: 'Mental health as a founder and the importance of community',
        tags: ["Business"],
        image: "/src/assets/mock7.png",
        author: 'by Michele Hansen',
        user: "/src/assets/memoji1.png",
        viewCount: 55,
        likeCount: 55,
        commentCount: 55,
    },
    // {
    //     title: 'Selling a Business and Scaling Another Amidst Tragedy.',
    //     img: <Image src={mock7} />,
    //     author: 'by Courtland Allen',
    // },
];

type logoProp = {
    img: string;
};

const Logo = ({ img }: logoProp) => {
    return <img src={img} alt='logo' />;
};

export const meetUpsMockData = [
    {
        title: 'UIHUT - Crunchbase Company Profile...',
        date: 'feb 7',
        logo: <Logo img={logo1} />,
        subtitle: 'UIHUT  •  Sylhet, Bangladesh',
    },
    {
        title: 'UIHUT - Crunchbase Company Profile...',
        date: 'feb 7',
        logo: <Logo img={logo2} />,
        subtitle: 'UIHUT  •  Sylhet, Bangladesh',
    },
    {
        title: 'UIHUT - Crunchbase Company Profile...',
        date: 'feb 7',
        logo: <Logo img={logo3} />,
        subtitle: 'UIHUT  •  Sylhet, Bangladesh',
    },
];

export const meetups = [
    {
        title: "UIHUT - Crunchbase Company Profile...",
        tags: ["Remote", "Part-time", "Worldwide"],
        image: meetup1,
        organizer: "UIHUT",
        location: "Sylhet, Bangladesh",
        date: "Feb 7",
    },
    {
        title: "Design Meetups USA | Dribbble",
        tags: ["Remote", "Part-time"],
        image: meetup2,
        organizer: "Dribbble",
        location: "Austin, Texas, USA",
        date: "Feb 3",
    },
    {
        title: "Meetup Brand Identity Design - Beha...",
        tags: ["Full-time", "Contract", "Worldwide"],
        image: meetup3,
        organizer: "Behance",
        location: "San Jose, California, USA",
        date: "Feb 5",
    },
];

export const descriptions = [
    "Considering or planning to start a business",
    "Actively getting started on something new",
    "No interest in starting a business",
    "Earnings from my business fully support me",
    "Working on a business, no revenue yet",
    "No, coding is totally unfamiliar",
    "No, but I understand a few concepts",
    "Yes, and I'm a beginner",
    "Yes, and I'm an intermediate or a professional",
];

export const businessTypes = [
    "Advertising",
    "Task Management",
    "Crypto",
    "Email Marketing",
    "Design",
    "Finance",
    "Outdoors",
    "Sports",
    "Health & Fitness",
];

export const podcasts = [
    {
        title: "Selling a Business and Scaling Another Amidst Tragedy.",
        image: podcast1,
        author: "Michele Hansen",
    },
    {
        title: "Mental health as a founder and the importance of community...",
        image: podcast2,
        author: "James McKinven",
    },
    {
        title: "Growing to $8.5k MRR in 1 year - Marie Martens, Tally.so",
        image: podcast3,
        author: "Mahfuzul Nabil",
    },
    {
        title: "Mental Health and Bootstrapping in 2022 with Rob Walling of TinySe",
        image: podcast4,
        author: "Dr. Jubed",
    },
    {
        title:
            "Money, Happiness, and Productivity as a Solo Founder with Pieter Levels",
        image: podcast5,
        author: "Jesse Hanley",
    },
];

export const tags = [
    {
        tag: '#javascript',
        image: javascriptdev,
        timesPosted: 1143,
        backgroundColor: '#FFECE6'
    },
    {
        tag: '#bitcoin',
        image: bitcoinlogo,
        timesPosted: 15143,
        backgroundColor: '#FFECE6'
    },
    {
        tag: '#design',
        image: designlogo,
        timesPosted: 135143,
        backgroundColor: '#FFECE6'
    },
    {
        tag: '#blogging',
        image: blogginglogo,
        timesPosted: 5143,
        backgroundColor: '#FFECE6'
    },
    {
        tag: '#tutorial',
        image: tutoriallogo,
        timesPosted: 112143,
        backgroundColor: '#FFECE6'
    },
    {
        tag: '#seo',
        image: bitcoinlogo,
        timesPosted: 1433,
        backgroundColor: '#FFECE6'
    },

]

export const podcastPreviewData = [
    {
        title: "Workshopping Pay-As-You-Go Failed Payments",
        description: "Feb-15th - This episode of Software Social is brought to you by TranslateCl. Translate Cl is a tool for developers that helps you localize applications with high quality, human translations. It supports over 70 language pairs. TranslateCl eliminates the need to work out of spreadsheets, hire translators and manually merge.",
        userImg: <img src={UserAvatar} alt="User Avatar" />,
        userName: "Benjamin Huy Pham",
        city: "Kolkata, Indial"
    },
    {
        title: "Workshopping Pay-As-You-Go Failed Payments",
        description: "Feb-15th - This episode of Software Social is brought to you by TranslateCl. Translate Cl is a tool for developers that helps you localize applications with high quality, human translations. It supports over 70 language pairs. TranslateCl eliminates the need to work out of spreadsheets, hire translators and manually merge.",
        userImg: <img src={UserAvatar} alt="User Avatar" />,
        userName: "Miguel Rodriguez",
        city: "Sylhet, Bangladesh"
    },
    {
        title: "Workshopping Pay-As-You-Go Failed Payments",
        description: "Feb-15th - This episode of Software Social is brought to you by TranslateCl. Translate Cl is a tool for developers that helps you localize applications with high quality, human translations. It supports over 70 language pairs. TranslateCl eliminates the need to work out of spreadsheets, hire translators and manually merge.",
        userImg: <img src={UserAvatar2} alt="User Avatar" />,
        userName: "Derek Prieur",
        city: "Sylhet, Bangladesh"
    },
    {
        title: "Workshopping Pay-As-You-Go Failed Payments",
        description: "Feb-15th - This episode of Software Social is brought to you by TranslateCl. Translate Cl is a tool for developers that helps you localize applications with high quality, human translations. It supports over 70 language pairs. TranslateCl eliminates the need to work out of spreadsheets, hire translators and manually merge.",
        userImg: <img src={UserAvatar2} alt="User Avatar" />,
        userName: "Juan Almonte",
        city: "Kolkata, Indial"
    },
];

export const posts = [
    {
        title:
            "Bitcoin has tumbled from its record high of $58,000 after words from three wise men and women...",
        tags: ["finance", "bitcoin", "crypto"],
        image: post1,
        user: user1,
        viewCount: 651324,
        likeCount: 36654,
        commentCount: 56,
        _id: "1",
    },
    {
        title:
            "The 4-step SEO framework that led to a 1000% increase in traffic. Let’s talk about blogging and SEO...",
        tags: ["seo", "blogging", "traffic"],
        image: post2,
        user: user1,
        viewCount: 244584,
        likeCount: 10920,
        commentCount: 184,
        _id: "2",
    },
    {
        title:
            "OnePay - Online Payment Processing Web App- Download from uihut.com",
        tags: ["payment", "webapp", "uikit"],
        image: post3,
        user: user1,
        viewCount: 601066,
        likeCount: 24753,
        commentCount: 209,
        _id: "3",
    },
    {
        title:
            "Designing User Interfaces - how I sold 1800 copies in a few months by Michal Malewicz",
        tags: ["design", "user interface", "designing"],
        image: post4,
        user: user1,
        viewCount: 964258,
        likeCount: 64755,
        commentCount: 44,
        _id: "4",
    },
];

export const actives: { title: string }[] = [
    {
        title: 'Posts',
    },
    {
        title: 'Meetups',
    },
    {
        title: 'Podcasts',
    },
    {
        title: 'Groups',
    },
]

export const notificationTypes = [
    {
        type: 'All Notifications',
        img: ''
    },
    {
        type: 'Reactions',
        img: like
    },
    {
        type: 'Comments',
        img: comment
    },
    {
        type: 'Mentions',
        img: mention
    },
    {
        type: 'Edited',
        img: edit
    },
]