import { boolean } from 'zod';

import { boolean } from 'zod';

export interface IUser {
  id?: number;
  username: string;
  email: string;
  password?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  avatar?: string | null;
  occupation?: string | null;
  website?: string | null;
  twitter_url?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  current_stage?: string | null;
  coding_ability?: string | null;
  state?: string | null;
  country?: string | null;
  joined_date?: Date;
}

export interface IGroup {
  id?: number;
  name: string;
  about: string;
  description: string;
  image_url: string;
  logo_url: string;
  user_id: number;
  view_count?: number;
  member_count?: number;
  created_at?: Date;
  updated_at?: Date | null;
}

export interface IPost {
  id?: number;
  title: string;
  content: string;
  image_url: string;
  group_id: number;
  user_id: number;
  view_count?: number | null;
  like_count?: number | null;
  created_at?: Date;
  updated_at?: Date | null;
}

export interface IMeetup {
  id?: number;
  name: string;
  content: string;
  image_url: string;
  location: string;
  date: Date;
  user_id: number;
  is_fulltime?: boolean;
  is_parttime?: boolean;
  is_internship?: boolean;
  is_remote?: boolean;
  is_contract?: boolean;
  is_free?: boolean;
  created_at?: Date;
  updated_at?: Date | null;
}

export interface IUserGroup {
  id?: number;
  user_id: number;
  group_id: number;
  is_admin?: boolean;
}

export interface IPodcast {
  id?: number;
  title: string;
  content: string;
  artist: string;
  image_url: string;
  audio_url: string;
  episode_number: number;
  user_id: number;
  is_indie_bites?: boolean;
  is_software_social?: boolean;
  is_hipnode?: boolean;
  is_free?: boolean;
  created_at?: Date;
  updated_at?: Date | null;
}

export interface ITag {
  id?: number;
  name: string;
}

export interface IPostTag {
  id?: number;
  post_id: number;
  tag_id: number;
}

export interface IComment {
  id: number;
  content?: string | undefined;
  user_id: number;
  post_id: number;
  reply_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IPostReport {
  id?: number;
  post_id: number;
  report_id: number;
}

export interface IReport {
  id?: number;
  reason: string;
  username: string;
}

export interface IFollow {
  id?: number;
  follower_id: number;
  following_id: number;
}
