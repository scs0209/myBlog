import { ChangeEvent, FormEvent, VFC, memo } from "react"
import styles from "../../styles/CategoryPost.module.css";

interface Props {
  editedCategoryName: string;
  onChangeCategoryName: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitEdit: (e: FormEvent<HTMLFormElement>) => void;
}

const CategoryEditForm: VFC<Props> = ({ onSubmitEdit, editedCategoryName, onChangeCategoryName}) => {
  return (
    <form onSubmit={onSubmitEdit}>
      <div className="flex items-center">
        <input
          value={editedCategoryName}
          onChange={onChangeCategoryName}
          className={`${styles.input} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
          required
        />
        <button
          type="submit"
          className={`${styles.editBtn} dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
        >
          수정
        </button>
      </div>
    </form>
  );
}

export default memo(CategoryEditForm)