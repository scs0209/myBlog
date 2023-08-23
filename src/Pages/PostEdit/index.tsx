import MDEditor from '@uiw/react-md-editor';
import { usePostById, usePostUpdate } from 'apis/post';
import HeadInfo from 'Components/common/HeadInfo';
import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post } = usePostById(id);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const { mutateAsync: updatePost } = usePostUpdate();

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!title || !content) {
        alert('제목과 내용, 카테고리를 입력해주세요!');

        return;
      }
      // usePostUpdate hook을 사용하여 게시글을 수정합니다.
      await updatePost({ id, title, content });

      navigate(`/main/posts/${id}`);
    },
    [id, title, content, navigate],
  );

  return (
    <>
      <HeadInfo title="Post Edit" />
      <div>
        <h2 className="text-4xl font-bold dark:text-white">게시글 수정</h2>
        <form onSubmit={handleSubmit}>
          <div className="dark:bg-slate-700">
            <div>
              <input
                className="w-11/12 pt-3.5 pb-3.5 border-none text-2xl font-bold border-b-gray-400 focus:outline-none dark:bg-slate-700 dark:text-white"
                type="text"
                name="title"
                value={title}
                onChange={onChangeTitle}
                placeholder="제목"
              />
            </div>
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
          </div>
          <div className="mt-8 text-center">
            <button
              className="w-32 p-2 bg-white rounded-lg cursor-pointer hover:bg-rose-400 hover:text-white"
              style={{ border: 'solid 1px lightgray' }}
              type="submit"
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostEdit;
