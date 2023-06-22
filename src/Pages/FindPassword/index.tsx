import axios from "axios";
import React, { FormEvent, useCallback, useState } from "react";
import useInput from "../../utils/useInput";
import { backUrl } from "../../config";

const FindPassword = () => {
  const [email, onChangeEmail, setEmail] = useInput("");
  const [receiveEmail, onChangeReceiveEmail, setReceiveEmail] = useInput("");
  const [message, setMessage] = useState("");

  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${backUrl}/api/users/findPassword`, { email, receiveEmail }, {
        withCredentials: true,
      })
      .then((res) => {
        setMessage(res.data.message);
        setEmail("");
        setReceiveEmail("");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setEmail("");
        setReceiveEmail("");
      })
  }, [email, receiveEmail]);

  return (
    <div className="flex flex-col items-center h-screen px-6 py-8 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Find Password
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmitForm}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={email}
                onChange={onChangeEmail}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Receive email
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={receiveEmail}
                onChange={onChangeReceiveEmail}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              submit
            </button>
          </form>
          {message && <div className="mt-1 text-blue-600 text-xs text-center">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default FindPassword;