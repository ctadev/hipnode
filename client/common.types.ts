
export type FormState = {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    occupation: string;
    avatar: string;
    twitter_url: string;
    website: string;
    facebook_url: string;
    instagram_url: string;
    current_stage: string;
    coding_ability: string;
    joined_date: string;
};

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    occupation: string;
    avatar: string;
    twitter_url: string;
    website: string;
    facebook_url: string;
    instagram_url: string;
    current_stage: string;
    coding_ability: string;
    joined_date: string;

}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export interface ColumnProps {
  title: string;
  links: Array<string>
}