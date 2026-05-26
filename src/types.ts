export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  date: string;
  coverImage: string;
  likes: number;
  commentsCount: number;
  tags: string[];
  featured?: boolean;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole?: string;
  text: string;
  time: string;
  likes: number;
  replies?: Comment[];
}

export interface User {
  email: string;
  fullName: string;
  avatar: string;
}
