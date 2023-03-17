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
