import { client } from 'apis';

export const login = async (email: string, password: string) => {
  const { data } = await client.post(
    '/api/users/login',
    { email, password },
    { withCredentials: true },
  );

  return data;
};

export const signUp = async (email: string, name: string, password: string) => {
  const { data } = await client.post(
    '/api/users',
    { email, name, password },
    { withCredentials: true },
  );

  return data;
};
