import { useDeleteUser, useUserById } from 'apis/auth';
import HeadInfo from 'Components/common/HeadInfo';
import { Card, Dropdown } from 'flowbite-react';
import Avatar from 'react-avatar';
import { useNavigate, useParams } from 'react-router';

const MyPage = () => {
  const { id } = useParams();
  const { data: userData } = useUserById(id);
  const { mutateAsync: deleteUser } = useDeleteUser();
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    await deleteUser(userData.id);
    alert('회원 탈퇴가 완료되었습니다.');
    navigate('/');
  };

  return (
    <>
      <HeadInfo title="My Page" />
      <Card className="h-screen">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="">
            <Dropdown.Item>
              <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                <p>Edit</p>
              </span>
            </Dropdown.Item>
            <Dropdown.Item>
              <span className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                <p>Delete</p>
              </span>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <Avatar
            name={userData?.name}
            src={userData?.avatar_url}
            size="96"
            round
            className="w-8 h-8 mb-3 rounded-full"
            alt={userData?.name}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userData.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</span>
          <div className="flex mt-4 space-x-3 lg:mt-6">
            <button
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-cyan-800"
              onClick={handleWithdraw}
            >
              <p>Withdrawal</p>
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MyPage;
