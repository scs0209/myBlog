import { client } from 'apis';
import { useQuery } from 'react-query';

export const useTodayVisitors = () =>
  useQuery('todayVisitors', async () => {
    const { data } = await client.get('/api/visitors');

    return data;
  });

export const useTotalVisitors = () =>
  useQuery('totalVisitors', async () => {
    const { data } = await client.get('/api/total-visitors');

    return data;
  });
