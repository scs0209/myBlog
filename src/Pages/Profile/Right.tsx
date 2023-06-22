import { Card } from "flowbite-react";

const Right = () => {
  return (
    <>
      <Card className="mb-2">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          General Information
        </h5>
        <div className="grid grid-cols-2">
          <div className="col-span-2">
            <h1 className="text-gray-900 dark:text-white">About Me</h1>
            <p className="dark:text-gray-300 mt-2">
              👋 Hello! I'm someone who's currently preparing for a job as a
              frontend developer. I mainly work on projects using React and
              Next.js, striving to create efficient and interactive websites and
              applications. I have build a blog using React and a portfolio site
              using Next, so feel free to stop by and take a look!
            </p>
          </div>
          <div className="col-span-1 font-bold mt-6">
            <h5 className="text-gray-400 dark:text-gray-300">Education</h5>
            <p className="text-xs dark:text-white">Soon Chun Hyang Univ</p>
          </div>
          <div className="col-span-1 font-bold mt-6">
            <h5 className="text-gray-400 dark:text-gray-300">Role</h5>
            <p className="text-xs dark:text-white">Frontend Developer</p>
          </div>
          <div className="col-span-1 font-bold mt-6">
            <h5 className="text-gray-400 dark:text-gray-300">Language</h5>
            <p className="text-xs dark:text-white">Korean, English</p>
          </div>
          <div className="col-span-1 font-bold mt-6">
            <h5 className="text-gray-400 dark:text-gray-300">Birthday</h5>
            <p className="text-xs dark:text-white">1997-02-09</p>
          </div>
        </div>
      </Card>
      <Card>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Blog
        </h5>
        <p className="dark:text-gray-300 mt-2">
          My blog is built with React, TypeScript, MySQL, NodeJS, Express,
          PostCSS, TailwindCSS!
          <br />
          The reason I created a blog is to document my development projects and
          to keep track of how much I've grown.
          <br />
          Additionally, I believe that as a developer, one should be create at
          least personal blog, so I decided to make one.
          <br />I hope those of you who are reading this blog can gain knowledge
          from my articles as well. I welcome sharing knowledge through
          comments.😀
        </p>
      </Card>
    </>
  );
}

export default Right