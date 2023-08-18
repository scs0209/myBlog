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
    <div>
      <div className="mb-3">
        <h5 className={`${styles.title} dark:text-white`}>{title}</h5>
        <span className={styles.date}>{createdAt}</span>
      </div>
      <MDEditor.Markdown
        className="rounded-lg list-disc list-inside bg-gray-400"
        style={{ padding: 10 }}
        source={content}
      />
    </div>
  );
};

export default PostInfo;
