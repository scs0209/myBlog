import { client } from 'apis';

export const login = async (email: string, password: string) => {
  const { data } = await client.post('/api/users/login', { email, password });

  return data;
};

export const signUp = async (email: string, name: string, password: string) => {
  const { data } = await client.post('/api/users', { email, name, password });

  return data;
};

export const deleteUser = (userId: number) => {
  return client.delete(`/api/users/${userId}`);
};

export const logout = () => {
  return client.post('/api/users/logout');
};
