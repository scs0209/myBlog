import { useUser } from 'apis/auth';
import { useScrollDirection } from 'hooks/useScrollDirection';
import { useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const { data: userData, isError } = useUser();
  const scrollDirection = useScrollDirection();
  const navigate = useNavigate();

  const handleGoCategoryPage = () => {
    navigate('/main/side-bar');
  };

  const handleGoHomePage = () => {
    navigate('/');
  };

  const handleGoMyPage = () => {
    if (userData) {
      navigate(`/main/my/${userData?.id}`);
    } else {
      navigate('/main/login');
    }
  };

  return (
    <div
      className={`sticky min-w-[345px] bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 sm:hidden dark:bg-gray-700 dark:border-gray-600 ${
        scrollDirection === 'down' ? 'hidden' : ''
      }`}
    >
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <button
          type="button"
          onClick={handleGoCategoryPage}
          className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Category
          </span>
        </button>

        <button
          type="button"
          className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={handleGoHomePage}
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Home
          </span>
        </button>
        <button
          type="button"
          onClick={handleGoMyPage}
          className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            My
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
