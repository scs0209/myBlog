import React, { useCallback, useState, VFC } from 'react';

import CreateCategoryModal from '../../Components/onCreateCategoryModal';
import CategoryName from '../CategoryNameEdit';
import SideBar from './SideBar';
import Visitor from './Visitor';

interface Props {
  showSidebar: boolean;
}

const Category: VFC<Props> = ({ showSidebar }) => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const onClickCreateCategory = useCallback(() => {
    setShowCreateCategoryModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  return (
    <aside
      id="logo-sidebar"
      className={`fixed z-40 w-64 top-20 transition-transform ${
        showSidebar ? 'left-2 translate-x-0 sm:translate-x-0' : '-translate-x-full sm:-left-2'
      }`}
      aria-label="Sidebar"
    >
      <Visitor />
      <SideBar />
      <div className="h-[calc(85vh-20rem)] px-3 pb-4 overflow-y-auto bg-gray-200 dark:bg-gray-800 border-gray-700 rounded-lg shadow-md">
        <CategoryName openCreateCategory={onClickCreateCategory} />
      </div>
      <CreateCategoryModal
        show={showCreateCategoryModal}
        onCloseModal={onCloseModal}
        setShowCreateCategoryModal={setShowCreateCategoryModal}
      />
    </aside>
  );
};

export default Category;
