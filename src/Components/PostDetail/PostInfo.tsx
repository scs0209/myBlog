import MDEditor from '@uiw/react-md-editor';
import React, { VFC } from 'react';

import styles from '../../styles/PostDetail.module.css';

interface Props {
  title: string;
  content: string;
  createdAt: string;
}

const PostInfo: VFC<Props> = ({ title, content, createdAt }) => {
  return (
    <div data-color-mode="light">
      <div className="pb-3 dark:bg-slate-700">
        <h5 className={`${styles.title} dark:text-white`}>{title}</h5>
        <span className={styles.date}>{createdAt}</span>
      </div>
      <MDEditor.Markdown
        className="rounded-lg text-black line-height-4 list-disc list-inside bg-white dark:bg-slate-700 dark:text-gray-300"
        source={content}
      />
    </div>
  );
};

export default PostInfo;
