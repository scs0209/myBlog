import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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

export const useUser = () =>
  useQuery('user', async () => {
    const { data } = await client.get('/api/users');

    return data;
  });

export const useLogin = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const { data } = await client.post('/api/users/login', { email, password });

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user'); // 로그인 성공 시 사용자 쿼리를 무효화합니다.
      },
    },
  );

  return loginMutation;
};

export const useSignUp = () => {
  const signUpMutation = useMutation(
    async ({ email, name, password }: { email: string; name: string; password: string }) => {
      const { data } = await client.post('/api/users', {
        email,
        name,
        password,
      });

      return data;
    },
  );

  return signUpMutation;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (userId: number) => {
      await client.delete(`/api/users/${userId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    },
  );

  return deleteMutation;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation(
    async () => {
      await client.post('/api/users/logout');
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    },
  );

  return logoutMutation;
};
