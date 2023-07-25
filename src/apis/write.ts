import { client } from 'apis';

export interface PostData {
  title: string;
  content: string | undefined;
  categoryId: string;
  UserId: number;
}

export const createPost = async (postData: PostData) => {
  const response = await client.post('/api/main/posts', postData); // Use client instead of axios

  return response.data;
};
