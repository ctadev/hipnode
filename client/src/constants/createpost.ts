import {
  growing,
  rocket,
  fire,
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7,
  category8,
  category9,
  post,
  podcasts,
  meetup,
  groupLogo2,
} from '../assets/createpost-asset';

export const data = [
  {
    title: 'Fastest Growing',
    description: 'List updated daily at midnight PST.',
    img: growing,
    bg: '#FDF4EA',
    type: 'growing',
    categorizedGroup: [],
  },
  {
    title: 'Most Popular',
    description: 'List updated daily at midnight PST.',
    img: fire,
    bg: '#FFECE6',
    type: 'popular',
    categorizedGroup: [],
  },
  {
    title: 'Newly Launched',
    description: 'List updated daily at midnight PST.',
    img: rocket,
    bg: '#EBF2FC',
    type: 'new',
    categorizedGroup: [],
  },
];

export const growings = {
  title: 'Fastest Growing',
  description: 'List updated daily at midnight PST.',
  img: growing,
  bg: 'bg-orange-200',
};

export const popular = {
  title: 'Most Popular',
  description: 'List updated daily at midnight PST.',
  img: fire,
  bg: 'bg-yellow-200',
};

export const newly = {
  title: 'Newly Launched',
  description: 'List updated daily at midnight PST.',
  img: rocket,
  bg: 'bg-teal-200',
};

export const groupData = [
  {
    img: category1,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category2,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category3,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category4,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category5,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category6,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category7,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category8,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category9,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category4,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
  {
    img: category2,
    title: 'Looking to Partner Up',
    desc: 'Share how to succeed and w..',
  },
];

export const categories = [
  { title: 'Post', img: post },
  { title: 'Meetup', img: meetup },
  { title: 'Podcasts', img: podcasts },
  { title: 'Groups', img: groupLogo2 },
];
