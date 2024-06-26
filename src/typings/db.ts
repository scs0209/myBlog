export interface User {
  id: number;
  email: string;
  role: string;
  name: string;
}

export interface Comment {
  id: number;
  content: string;
  User: {
    id: number;
    name: string;
  };
}

export interface Reply {
  id: number;
  content: string;
  User: {
    name: string;
  };
  CommentId: number;
}

export interface Category {
  id: number;
  name: string;
  hidden: boolean;
}

export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface NewsArticle {
  title: string;
  link: string;
  originallink: string;
  description: string;
  pubDate: string;
}
