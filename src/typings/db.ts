export interface Comment {
  id: number;
  content: string;
  User: {
    id: number;
    name: string;
  };
}
