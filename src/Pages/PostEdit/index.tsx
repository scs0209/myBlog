import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import HeadInfo from 'Components/common/HeadInfo';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';

import { backUrl } from '../../config';
import fetcher from '../../utils/fetcher';

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, mutate } = useSWR(`${backUrl}/api/main/posts/${id}`, fetcher);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!title || !content) {
        alert('제목과 내용, 카테고리를 입력해주세요!');

        return;
      }
      axios
        .put(
          `${backUrl}/api/main/posts/${id}`,
          {
            title,
            content,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          mutate(`${backUrl}/api/main/posts`);
          // 수정하고 나면 내가 수정한 내용을 보기 위해 그 페이지로 가게 해주기!
          navigate(`/main/posts/${id}`);
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 403) {
            alert('게시글 작성자만 수정할 수 있습니다.');
          } else if (error.response && error.response.status === 401) {
            alert(error.response.data);
          } else {
            alert('게시글을 수정하는 도중 오류가 발생했습니다.');
          }
        });
    },
    [id, title, content, navigate, mutate],
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
          <div className="text-center mt-8">
            <button
              className="w-32 p-2 rounded-lg  bg-white cursor-pointer hover:bg-rose-400 hover:text-white"
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
