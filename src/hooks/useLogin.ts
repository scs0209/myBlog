import { login } from 'apis/auth';
import { backUrl } from 'config';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const useLogin = () => {
  const { data: userData, error: isError, mutate } = useSWR(`${backUrl}/api/users`, fetcher);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await login(email, password);

      mutate(data, false);
    } catch (err: any) {
      console.log(err);
      const errorMessage = err?.response?.data || '로그인에 실패했습니다.';

      alert(errorMessage);
    }
  };

  return { userData, signIn, isError };
};

export default useLogin;
