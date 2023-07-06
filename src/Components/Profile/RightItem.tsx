import React, { VFC } from 'react';

interface Props {
  title: string;
  content: string;
}

const RightItem: VFC<Props> = ({ title, content }) => {
  return (
    <div className={'col-span-1 font-bold mt-6'}>
      <h5 className="text-gray-400 dark:text-gray-300">{title}</h5>
      <p className="text-xs dark:text-white">{content}</p>
    </div>
  );
};

export default RightItem;
