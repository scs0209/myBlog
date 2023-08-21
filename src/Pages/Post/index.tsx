import MDEditor from '@uiw/react-md-editor';
import { useUser } from 'apis/auth';
import { useCategories } from 'apis/category';
import { PostData, useCreatePost } from 'apis/post';
import HeadInfo from 'Components/common/HeadInfo';
import { Select } from 'flowbite-react';
import React, { FormEvent, useCallback, useState } from 'react';

import PostSubmit from '../../Components/PostSubmit';
import useInput from '../../utils/useInput';

const Post = () => {
  const { data: currentUser, isLoading, isError } = useUser();
  const [title, onChangeTitle, setTitle] = useInput('');
  const [content, setContent] = useState<string | undefined>('');
  const [category, setCategory] = useState(''); // 카테고리 추가

  const { data: categories } = useCategories();

  const { mutateAsync: createPost } = useCreatePost();

  const onChangeCategory = useCallback((e: any) => {
    setCategory(e.target.value);
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

  if (isLoading) return <div>Loading...</div>;

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
          <div className="flex justify-center mt-5 text-center">
            <Select value={category} onChange={onChangeCategory} color="blue">
              <option value="">카테고리 선택</option>
              {categories &&
                categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
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
