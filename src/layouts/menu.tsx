import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'src/states/common';
import styled from 'styled-components';
import { MENU_ROUTES, menuItemsAdmin, menuItemsSuperAdmin } from './components/helper';

interface Props {
  onMenuItemClick?: () => void;
}

const MenuLayout: React.FC<Props> = ({ onMenuItemClick }) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const userRoles: string[] = userInfo?.authorities?.map((i) => i.role) || [];

  return (
    <MenuStyle>
      <Menu
        className="pt-3"
        defaultSelectedKeys={['dashboard']}
        defaultOpenKeys={['order-list', 'product-list']}
        mode="inline"
        items={userRoles?.includes('ROLE_SUPER_ADMIN') ? menuItemsSuperAdmin : menuItemsAdmin}
        theme="dark"
        onClick={(e) => {
          onMenuItemClick && onMenuItemClick();
          const menu = MENU_ROUTES.find((i) => i.key === e.key);
          !!menu && navigate(menu.route);
        }}
      />
    </MenuStyle>
  );
};

export default MenuLayout;

const MenuStyle = styled.div`
  .ant-menu-item-selected {
    background-color: transparent;
  }

  .ant-menu-item-selected .ant-menu-item-icon {
    color: #8bb9f9;
  }

  .ant-menu-item-selected .ant-menu-title-content {
    color: #8bb9f9;
  }
`;
