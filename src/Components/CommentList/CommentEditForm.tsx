/* eslint-disable */
import { useUpdateComment } from 'apis/comment';
import { Textarea } from 'flowbite-react';
import { useEditId, useEditContent, useCommentActions } from 'store/commentStore';

const CommentEditForm = () => {
  const editId = useEditId();
  const editContent = useEditContent();
  const { onChangeEditContent, handleEditCancel, setEditContent, setEditId } = useCommentActions();
  const { mutateAsync: updateComment } = useUpdateComment();

  const handleEditSubmit = () => {
    if (editId === null) {
      return;
    }

    updateComment({ commentId: editId, content: editContent });
    setEditId(null);
    setEditContent('');
  };

  return (
    <form className="mb-6">
      <div className="px-4 py-2 mb-4 bg-white border border-gray-200 rounded-lg rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
        <label className="sr-only">Your comment</label>
        <Textarea
          value={editContent}
          onChange={onChangeEditContent}
          placeholder="댓글을 입력해주세요."
          style={{ resize: 'none' }}
          rows={3}
          required
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        onClick={handleEditCancel}
      >
        취소
      </button>
      <button
        type="submit"
        className="ml-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        onClick={handleEditSubmit}
      >
        저장
      </button>
    </form>
  );
};

export default CommentEditForm;
