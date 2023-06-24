import axios from "axios";
import { backUrl } from "config";
import { Card, Dropdown } from "flowbite-react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import useSWR from 'swr';
import fetcher from "utils/fetcher";

const MyPage = () => {
  const { id } = useParams();
  const { data: userData, error, mutate } = useSWR(`${backUrl}/api/users/${id}`, fetcher);
  const navigate = useNavigate();

  const handleWithdraw = useCallback(() => {
    axios
      .delete(`${backUrl}/api/users/${userData.id}`, {
        withCredentials: true,
      })
      .then(() => {
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.error("회원 탈퇴 중 에러 발생:", error);
        alert(error.message);
      });
  }, [navigate, userData]);

  console.log(userData)
  if(!userData) return <div className="h-screen">데이터를 불러오는 중입니다...</div>

  return (
    <Card className="h-screen">
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <Dropdown.Item>
            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <p>Edit</p>
            </span>
          </Dropdown.Item>
          <Dropdown.Item>
            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <p>Export Data</p>
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
        <img
          alt="Bonnie image"
          className="mb-3 rounded-full shadow-lg"
          height="96"
          src=""
          width="96"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userData.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userData.email}
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <button className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" onClick={handleWithdraw}>
            <p>Withdrawal</p>
          </button>
          <button
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <p>Message</p>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default MyPage;