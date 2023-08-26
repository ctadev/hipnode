export interface User {
  avatar: string;
  coding_ability: string;
  email: string;
  facebook_url: string;
  first_name: string;
  id: number;
  instagram_url: string;
  joined_date: string;
  last_name: string;
  occupation: string;
  password: string;
  twitter_url: string;
  username: string;
  website: string;
}

export interface Post {
  title: string;
  tags: string[];
  content: string;
  image_url: string;
  author: string;
  user_id: number;
  view_count: number;
  like_count: number;
  comment_count: number;
  created_at: string;
  id: number;
}

export interface Like {
  id: number;
  user_id: number;
  post_id: number;
  comment_id?: number;
}

export interface ImportMeta {
  env: {
    VITE_DEV_BACKEND_URL: string;
  };
}
