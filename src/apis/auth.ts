import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const useUser = () =>
  useQuery('user', async () => {
    const { data } = await client.get('/api/users');

    return data;
  });

export const useUserById = (id: string | undefined) =>
  useQuery(['userById', id], async () => {
    const { data } = await client.get(`/api/users/${id}`);

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
        toast.success('로그인에 성공했습니다.');
      },
      onError: (error: any) => {
        toast.error(`${error.response.data}`);
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
    {
      onSuccess: () => {
        toast.success('회원가입이 완료되었습니다.');
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

  return signUpMutation;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (userId: string | undefined) => {
      await client.delete(`/api/users/${userId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
        toast.success('계정이 삭제되었습니다.');
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
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
        toast.success('로그아웃되었습니다.');
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

  return logoutMutation;
};
