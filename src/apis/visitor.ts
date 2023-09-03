import { client } from 'apis';
import { useQuery } from 'react-query';

export const useTodayVisitors = () =>
  useQuery('todayVisitors', async () => {
    try {
      const { data } = await client.get('/api/visitors');

      return data;
    } catch (error) {
      console.error('Error in useTodayVisitors:', error);
    }
  });

export const useTotalVisitors = () =>
  useQuery('totalVisitors', async () => {
    try {
      const { data } = await client.get('/api/total-visitors');

      return data;
    } catch (error) {
      console.error('Error in useTotalVisitors:', error);
    }
  });
