import { CustomFlowbiteTheme, Sidebar } from 'flowbite-react';
import { Link } from 'react-router-dom';

const customTheme: CustomFlowbiteTheme['sidebar'] = {
  root: {
    inner:
      'h-full overflow-y-auto overflow-x-hidden rounded-lg bg-gray-200 py-4 px-3 dark:bg-gray-800',
  },
};

const SideBar = () => {
  return (
    <Sidebar className="mb-3" theme={customTheme}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item>
            <Link to="/main/profile">프로필</Link>
          </Sidebar.Item>
          <Sidebar.Item
            href="https://portfolio-next-ab9r.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            <p>포트폴리오</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
