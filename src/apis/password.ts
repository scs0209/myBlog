import { client } from 'apis';
import { TOAST_MESSAGE } from 'constants/toastMessage';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export const useFindPassword = () => {
  const findPasswordMutation = useMutation(
    async ({ email, receiveEmail }: { email: string; receiveEmail: string }) => {
      const { data } = await client.post('/api/users/findPassword', { email, receiveEmail });

      return data;
    },
    {
      onSuccess: () => {
        toast.success(TOAST_MESSAGE.FIND_PASSWORD_SUCCESS);
      },
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
      onSuccess: () => {
        toast.success(TOAST_MESSAGE.UPDATE_PASSWORD_SUCCESS);
      },
      onError: (error: any) => {
        toast.error(`Failed to update password: ${error.message}`);
      },
    },
  );

  return updatePasswordMutation;
};
