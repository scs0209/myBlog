import MDEditor from '@uiw/react-md-editor';
import { Select } from 'antd';
import { createPost, PostData } from 'apis/write';
import HeadInfo from 'Components/common/HeadInfo';
import React, { FormEvent, useCallback, useState } from 'react';
import useSWR from 'swr';

import PostSubmit from '../../Components/PostSubmit';
import { backUrl } from '../../config';
import fetcher from '../../utils/fetcher';
import useInput from '../../utils/useInput';

const { Option } = Select;
const Post = () => {
  const { data: currentUser } = useSWR(`${backUrl}/api/users`, fetcher);
  const [title, onChangeTitle, setTitle] = useInput('');
  const [content, setContent] = useState<string | undefined>('');
  const [category, setCategory] = useState(''); // 카테고리 추가

  const { data: categoryData } = useSWR(`${backUrl}/api/categories`, fetcher);

  const onChangeCategory = useCallback((value: string) => {
    setCategory(value);
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!title || !content || !category) {
        alert('제목과 내용, 카테고리를 입력해주세요!');

        return;
      }
      try {
        const postData: PostData = {
          title,
          content,
          categoryId: category,
          UserId: currentUser.id,
        };

        await createPost(postData);

        alert('게시글이 작성되었습니다.');
        setTitle('');
        setContent('');
        setCategory('');
      } catch (err: any) {
        alert(err.response.data);
        console.error(err);
      }
    },
    [title, content, category, setTitle, setContent, setCategory, currentUser.id],
  );

  return (
    <>
      <HeadInfo title="Write" />
      <div>
        <form onSubmit={onSubmit}>
          <input
            className="w-full rounded-md pt-3.5 pb-3.5 border-none text-2xl font-bold border-b-gray-400 focus:outline-none"
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목"
          />
          <div className="markarea">
            <div data-color-mode="light">
              <MDEditor
                style={{ width: '100%' }}
                height={600}
                value={content}
                onChange={setContent}
                preview="live"
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            <Select value={category} onChange={onChangeCategory}>
              <Option value="">카테고리 선택</Option>
              {categoryData &&
                categoryData.map((category: any) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
            </Select>
          </div>
          <PostSubmit />
        </form>
      </div>
    </>
  );
};

export default Post;
