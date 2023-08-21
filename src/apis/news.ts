import { client } from 'apis';
import { useQuery } from 'react-query';

export const useNews = () =>
  useQuery('news', async () => {
    const { data } = await client.get('/api/news/latest');

    return data;
  });
