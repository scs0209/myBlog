import { VFC } from "react";

interface Props {
  mismatchError: boolean;
  name: string;
  signUpError: string;
  signUpSuccess: boolean;
}

const SignUpErr:VFC<Props> = ({ mismatchError, name, signUpError, signUpSuccess }) => {
  return (
    <>
      {mismatchError && (
        <div className="mt-1 text-red-600 text-xs">
          비밀번호가 일치하지 않습니다!
        </div>
      )}
      {!name && (
        <div className="mt-1 text-red-600 text-xs">이름을 입력해주세요!</div>
      )}
      {signUpError && (
        <div className="mt-1 text-red-600 text-xs">{signUpError}</div>
      )}
      {signUpSuccess && (
        <div className="mt-1 text-blue-600 text-xs">
          회원가입이 완료됐습니다. 로그인해주세요.
        </div>
      )}
    </>
  );
};

export default SignUpErr;
