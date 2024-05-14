import { useLogout, useUserById } from 'apis/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';

const My = () => {
  const { id } = useParams();
  const { data: userData } = useUserById(id);
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-dvh">
      <div className="py-3">
        <span className="block text-5xl font-bold mb-2 text-gray-900 dark:text-white">
          {userData?.name}
        </span>
        <span className="block text-xl text-gray-500 truncate dark:text-gray-400">
          {userData?.email}
        </span>
      </div>
      <ul className="py-2 list-none divide-y" aria-labelledby="user-menu-button">
        <li>
          {userData?.role === 'admin' && (
            <Link
              to="/main/write"
              className="block  py-4 text-2xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              포스트 작성
            </Link>
          )}
        </li>
        <li>
          <Link
            to={`/main/withdrawal/${userData?.id}`}
            className="block  py-4 text-2xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            회원탈퇴
          </Link>
        </li>
        <li>
          <Link
            to="/main/password"
            className="block  py-4 text-2xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            PW Change
          </Link>
        </li>
        <li>
          <button
            onClick={onLogout}
            className="block  py-4 text-2xl text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default My;
