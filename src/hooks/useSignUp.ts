import { signUp } from 'apis/auth';
import { useCallback, useState } from 'react';

type Form = {
  email: string;
  name: string;
  password: string;
  mismatchError: boolean;
};

const useSignUp = () => {
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = useCallback(async (formData: Form) => {
    const { email, name, password, mismatchError } = formData;

    if (!mismatchError && name) {
      setSignUpError('');
      setSignUpSuccess(false);
      try {
        await signUp(email, name, password);
        setSignUpSuccess(true);
      } catch (err: any) {
        if (err.response.status === 409) {
          alert(err.response.data.message);
        } else {
          setSignUpError(err.response.data);
        }
      }
    }
  }, []);

  return { handleSubmit, signUpError, setSignUpError, signUpSuccess };
};

export default useSignUp;
