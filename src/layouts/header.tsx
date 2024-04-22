import { Layout } from 'antd';
import { memo } from 'react';
import Breadcrumb from './components/breadcrumb';
import UserButton from './components/user-button';

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntdHeader className="bg-white px-7 flex items-center justify-between h-[40px] lg:h-[64px]">
      <Breadcrumb />

      <div className="hidden lg:block">
        <UserButton />
      </div>
    </AntdHeader>
  );
};

export default memo(Header);
