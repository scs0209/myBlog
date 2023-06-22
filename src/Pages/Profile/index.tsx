import Right from "./Right";
import Left from "./Left";

const Profile = () => {
  
  return (
    <div className="flex flex-col gap-1 md:grid md:grid-cols-3">
      <div className="col-start-1 col-end-4 mb-4">
        <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
          Profile
        </h1>
      </div>
      {/* 왼쪽 */}
      <div className="col-auto">
        <Left />
      </div>
      {/* 오른쪽 */}
      <div className="col-span-2">
        <Right />
      </div>
    </div>
  );
}

export default Profile;