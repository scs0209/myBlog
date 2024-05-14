import Footer from 'Components/common/Footer';
import HeadInfo from 'Components/common/HeadInfo';
import Carousels from 'Components/HomePage/Carousels';
import News from 'Components/HomePage/News';
import Popular from 'Components/HomePage/Popular';

const Home = () => {
  return (
    <>
      <HeadInfo title="Home" />
      <div className="p-5 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Carousels />
          <div className="grid w-full grid-cols-1 gap-4 mb-5 sm:grid-cols-2">
            <Popular />
            <News />
            <div className="flex items-center justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">준비중...</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">준비중...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
