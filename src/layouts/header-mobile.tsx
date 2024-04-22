import { Drawer } from 'antd';
import { memo, useState } from 'react';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import { IoMenuOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Logo from 'src/assets/logo.png';
import { WEBSITE_NAME } from 'src/utils/resource';
import UserButton from './components/user-button';
import MenuLayout from './menu';

const HeaderMobile: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className="lg:hidden bg-[#29293D] flex items-center justify-between h-[60px] px-5">
      <button type="button" onClick={() => setOpenMenu(true)}>
        <IoMenuOutline size={25} color="#FFF" />
      </button>
      <Link to="/">
        <h2 className="text-white text-xl font-bold">{WEBSITE_NAME}</h2>
      </Link>
      <UserButton />

      <Drawer
        placement="left"
        closable
        destroyOnClose
        onClose={() => setOpenMenu(false)}
        open={openMenu}
        key="left"
        width={300}
        styles={{ body: { padding: 0, backgroundColor: '#001529' }, header: { display: 'none' } }}
      >
        <div className="bg-[#000C17] flex justify-between items-center h-[60px] px-5">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="logo" className="w-8 h-8" />
            <p className="font-bold text-xl text-white">{WEBSITE_NAME}</p>
          </div>
          <button type="button" onClick={() => setOpenMenu(false)}>
            <HiChevronDoubleLeft color="#254f74" size={20} />
          </button>
        </div>
        <MenuLayout onMenuItemClick={() => setOpenMenu(false)} />
      </Drawer>
    </div>
  );
};

export default memo(HeaderMobile);
