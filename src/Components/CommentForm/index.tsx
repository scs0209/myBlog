/* eslint-disable */
import autosize from 'autosize';
import { Textarea } from 'flowbite-react';
import React, { FormEvent, useCallback, useEffect, useRef } from 'react';

import useInput from '../../utils/useInput';
import { useParams } from 'react-router';
import { useCreateComment } from 'apis/comment';

const CommentForm = () => {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: createComment } = useCreateComment();
  const [content, onChangeContent, setContent] = useInput('');
  const textareaRef = useRef(null);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!content || !content.trim()) {
        alert('내용을 입력해주세요.');

        return;
      }

      await createComment({ postId: id, content });
      setContent('');
    },
    [content, createComment, id],
  );

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  });

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion</h2>
      </div>
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label className="sr-only">Your comment</label>
        <Textarea
          name="content"
          id="content"
          ref={textareaRef}
          onChange={onChangeContent}
          value={content}
          placeholder="댓글을 입력해주세요."
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 dark:focus:ring-primary-900"
      >
        comment
      </button>
    </form>
  );
};

export default CommentForm;
