import { Dropdown } from 'flowbite-react';
import { VFC } from 'react';

interface Props {
  username: string;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const UserDropDown: VFC<Props> = ({ username, isEditing, onEdit, onDelete }) => {
  return (
    <>
      <footer className="flex items-center justify-between mb-2">
        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          {username}
        </p>
        <Dropdown size="xs" label="..." style={{ backgroundColor: ' #2d3748' }}>
          {!isEditing && (
            <>
              <Dropdown.Item>
                <button onClick={onEdit}>수정</button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button onClick={onDelete}>삭제</button>
              </Dropdown.Item>
            </>
          )}
        </Dropdown>
      </footer>
    </>
  );
};

export default UserDropDown;
