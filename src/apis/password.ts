import { client } from 'apis';

export const findPassword = (email: string, receiveEmail: string) => {
  return client.post('/api/users/findPassword', { email, receiveEmail });
};

export const updatePassword = (currentPassword: string, newPassword: string) => {
  return client.put('/api/users/password', { currentPassword, newPassword });
};
