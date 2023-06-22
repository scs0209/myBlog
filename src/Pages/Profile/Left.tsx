import { Badge, Card } from "flowbite-react";

const Left = () => {
  const skills = [
    "Logo Design",
    "React",
    "Web Design",
    "UI Design",
    "Javascript",
    "HTML",
    "CSS",
    "Next.js",
    "Tailwind",
  ];
  const hobbies = ["table tennis", "workout", "shopping", "movies", "swimming"];

  return (
    <>
      <Card className="max-w-sm mb-2">
        <div className="flex flex-col items-center pb-10">
          <img
            alt="Bonnie image"
            className="mb-3 rounded-full shadow-lg"
            height="96"
            src={require("../../images/이력서사진.jpg")}
            width="96"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Changsu Seong
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Frontend Developer
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Email: tjdckdtn2463@naver.com
            </span>
          </div>
        </div>
      </Card>
      <Card className="max-w-sm mb-2">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Skills
        </h5>
        <div className="flex flex-wrap">
          {skills.map((skill) => {
            return <Badge className="mt-2 mr-2">{skill}</Badge>;
          })}
        </div>
      </Card>
      <Card className="max-w-sm">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Hobbies
        </h5>
        <div className="flex flex-wrap">
          {hobbies.map((hobby) => {
            return (
              <Badge color="indigo" className="mt-2 mr-2">
                {hobby}
              </Badge>
            );
          })}
        </div>
      </Card>
    </>
  );
}

export default Left