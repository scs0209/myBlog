import { useLogin, useUser } from 'apis/auth';
import HeadInfo from 'Components/common/HeadInfo';
import SocialBtn from 'Components/LogIn/SocialBtn';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import styles from '../../styles/Login.module.css';

interface FormValue {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onChange' });
  const { data: userData, isLoading, isError } = useUser();
  const { mutateAsync: login } = useLogin();

  //Login 버튼 클릭 이벤트
  const onSubmit = handleSubmit(async (formData) => {
    try {
      await login({ email: formData.email, password: formData.password });
    } catch (error) {
      alert('로그인에 실패했습니다.');
    }
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (userData) {
    return <Navigate to="/main/posts" />;
  }

  return (
    <>
      <HeadInfo title="Login" />
      <div className={styles.container}>
        <div className={`${styles.card} dark:bg-gray-800 dark:border-gray-700`}>
          <div className={styles.cardContent}>
            <h1 className={`${styles.title} dark:text-white`}>Sign in to your account</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label htmlFor="email" className={`${styles.label} dark:text-white`}>
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
                <label htmlFor="password" className={`${styles.label} dark:text-white`}>
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5"></div>
                  <div className="text-sm">
                    <Link to="/main/find-id" className="text-gray-500 dark:text-gray-300">
                      Find Email
                    </Link>
                  </div>
                </div>
                <Link
                  to="/main/find-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className={`${styles.signInBtn} dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Sign in
              </button>
              <SocialBtn />
              <p className={`${styles.smallText} dark:text-gray-400`}>
                Don’t have an account yet?{' '}
                <Link to="/main/signup" className={`${styles.signUpLink} dark:text-primary-500`}>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
