import { client } from 'apis';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export const findPassword = (email: string, receiveEmail: string) => {
  return client.post('/api/users/findPassword', { email, receiveEmail });
};

export const updatePassword = (currentPassword: string, newPassword: string) => {
  return client.put('/api/users/password', { currentPassword, newPassword });
};

export const useFindPassword = () => {
  const findPasswordMutation = useMutation(
    async ({ email, receiveEmail }: { email: string; receiveEmail: string }) => {
      const { data } = await client.post('/api/users/findPassword', { email, receiveEmail });

      return data;
    },
    {
      onError: (error: any) => {
        toast.error(`Failed to find password: ${error.message}`);
      },
    },
  );

  return findPasswordMutation;
};

export const useUpdatePassword = () => {
  const updatePasswordMutation = useMutation(
    async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
      const { data } = await client.put('/api/users/password', { currentPassword, newPassword });

      return data;
    },
    {
      onError: (error: any) => {
        toast.error(`Failed to update password: ${error.message}`);
      },
    },
  );

  return updatePasswordMutation;
};
