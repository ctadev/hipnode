import groupType1 from '../assets/groupType1.png'
import groupType2 from '../assets/groupType2.png'
import groupType3 from '../assets/groupType3.png'
import groupType4 from '../assets/groupType4.png'
import groupType5 from '../assets/groupType5.png'
import groupType6 from '../assets/groupType6.png'
import groupType7 from '../assets/groupType7.png'
import groupType8 from '../assets/groupType8.png'
import groupType9 from '../assets/groupType9.png'
import { user1, groupPost1, groupPost2, groupPost3, tag1, tag2, tag3, tag4, tag5, tag6 } from '../assets'

export const groups = [
    {
        type: 'Looking to Partner Up',
        organizer: 'Sayem Ahmed',
        avatar: user1,
        image: groupPost1,
        title: 'Meeting Cofounders: 27 places to find them - James Fleischmann',
        description: 'Hoping to meet your cofounder? As a followup to my post about getting a techni...',
        date: 'wed, 15 Fabruary 2022'
    },
    {
        type: 'Somebody Make This',
        organizer: 'Foysal Ahmed',
        avatar: user1,
        image: groupPost2,
        title: 'Roast My Landing Page. Passed $10,000+ revenue.',
        description: 'Our project https://www.bumpy.app has now generated $10,000 revenue just with one App Store page. In addition, we got 190,000 registered users after 1.5 years only using App Store Optimization...',
        date: 'wed, 15 Fabruary 2022'
    },
    {
        type: 'Looking to Partner Up',
        organizer: 'Mahfuzul Nabil',
        avatar: user1,
        image: groupPost3,
        title: 'SPF/DMARC/DKIM configuration tool for newsletters',
        description: 'Properly configuring a newsletter for email authentication is an arcane process few master. Which can be an opportunity for startups and entrepreneurs...',
        date: 'wed, 15 Fabruary 2022'
    },
]

export const groupTypes = [
    {
        type: 'Fastest Growing',
        bg: 'bg-orange-200',
        groups: [
            {
                type: 'Looking to Partner Up',
                title: 'Share how to succeed and w...',
                image: groupType1,
            },
            {
                type: 'Somebody Make This',
                title: 'Hers with product needs ca...',
                image: groupType2,
            },
            {
                type: 'Paid Virtual Coworking',
                title: 'Tips about how to start, run...',
                image: groupType3,
            }
        ]
    }, 
    {
        type: 'Most Popular',
        bg: 'bg-yellow-200',
        groups: [
            {
                type: 'Building in Public',
                title: 'Hipnode building their prod...',
                image: groupType4,
            },
            {
                type: 'Digital Nomads',
                title: 'Traveling while building your...',
                image: groupType5,
            },
            {
                type: 'Landing Page UIHUT',
                title: 'Share and receive tips for im...',
                image: groupType6,
            }
        ]
    },
    {
        type: 'Newly Launched',
        bg: 'bg-teal-200',
        groups: [
            {
                type: 'Eurpoean Hipnoder',
                title: 'Everything related to the sta...',
                image: groupType7,
            },
            {
                type: 'Browser Extension Ma...',
                title: 'All browser addon things. hi...',
                image: groupType8,
            },
            {
                type: 'Ideas and Validation',
                title: 'Get help with defining, valida...',
                image: groupType9,
            }
        ]
    }
]

export const popularTags = [
    {
      type: "Javascript",
      image: tag1,
      count: 82645,
      group: '/assets/group1.png'
    },
    {
      type: "bitcoin",
      image: tag2,
      count: 65523,
      group: '/assets/group2.png'
    },
    {
      type: "design",
      image: tag3,
      count: 51354,
      group: '/assets/group3.png'
    },
    {
      type: "blogging",
      image: tag4,
      count: 48029,
      group: '/assets/group4.png'
    },
    {
      type: "tutorial",
      image: tag5,
      count: 51354,
      group: '/assets/group1.png'
    },
    {
      type: "seo",
      image: tag6,
      count: 82645,
      group: '/assets/group2.png'
    },
  ];