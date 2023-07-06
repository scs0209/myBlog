import { VFC } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
}

const HeadInfo: VFC<Props> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HeadInfo;
