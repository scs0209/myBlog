import { useSignUp, useUser } from 'apis/auth';
import HeadInfo from 'Components/common/HeadInfo';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import styles from '../../styles/SignUp.module.css';

interface FormValue {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
}

const SignUp = () => {
  const { data, isError } = useUser();
  const { mutateAsync: signUp } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValue>({ mode: 'onChange' });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await signUp({ email: formData.email, name: formData.name, password: formData.password });
      alert('회원가입 완료!');
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  });

  if (data) {
    return <Navigate to="/main/posts" />;
  }

  return (
    <>
      <HeadInfo title="Sign Up" />
      <div className={styles.container}>
        <div className={`${styles.card} dark:border dark:bg-gray-800 dark:border-gray-700`}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className={`${styles.title} dark:text-white`}>Create and account</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  {...register('email', {
                    required: '이메일은 필수입니다.',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: '이메일 형식이 올바르지 않습니다.',
                    },
                  })}
                  placeholder="name@company.com"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  {...register('name', {
                    required: '이름은 필수입니다.',
                  })}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  {...register('password', {
                    required: '비밀번호는 필수입니다.',
                    minLength: {
                      value: 8,
                      message: '비밀번호는 최소 8자리 이상이어야 합니다.',
                    },
                  })}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="password-check"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="password-check"
                  placeholder="••••••••"
                  className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  {...register('passwordCheck', {
                    required: '비밀번호 확인은 필수입니다.',
                    minLength: {
                      value: 8,
                      message: '비밀번호 확인은 최소 8자리 이상이어야 합니다.',
                    },
                    validate: (value) =>
                      value === getValues('password') || '비밀번호가 일치하지 않습니다.',
                  })}
                />
                {errors.passwordCheck && (
                  <p className="text-red-500">{errors.passwordCheck.message}</p>
                )}
              </div>
              <button
                type="submit"
                className={`${styles.btn} dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/main/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
