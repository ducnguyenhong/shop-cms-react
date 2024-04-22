import { MenuProps } from 'antd';
import { BiSolidCategory } from 'react-icons/bi';
import { FaRegMoneyBillAlt, FaUserFriends } from 'react-icons/fa';
import { FaMoneyBill, FaNewspaper, FaPalette, FaProductHunt } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
) => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
};

export const menuItems: MenuProps['items'] = [
  getMenuItem('Bảng điều khiển', 'dashboard', <FaPalette />),
  getMenuItem('Đơn hàng', 'order-list', <FaMoneyBill />, [
    getMenuItem('Đơn hàng mới', 'new-orders', <FaMoneyBill />),
    getMenuItem('Đơn hàng hoàn thành', 'completed-orders', <FaRegMoneyBillAlt />)
  ]),
  getMenuItem('Quản lý sản phẩm', 'product-list', <FaProductHunt />, [
    getMenuItem('Sản phẩm', 'products', <FaProductHunt />),
    getMenuItem('Danh mục', 'categories', <BiSolidCategory />)
  ]),
  getMenuItem('Danh sách khách hàng', 'customers', <FaUserFriends />),
  getMenuItem('Danh sách tin tức', 'news', <FaNewspaper />)
];

interface MenuRoute {
  key: string;
  route: string;
  breadcrumb: { title: string; route: string }[];
  section: string;
}

export const MENU_ROUTES: MenuRoute[] = [
  {
    key: 'dashboard',
    route: '/',
    breadcrumb: [
      {
        title: 'Bảng điều khiển',
        route: '/'
      }
    ],
    section: 'Bảng điều khiển'
  },
  {
    key: 'new-orders',
    route: '/new-orders',
    breadcrumb: [
      {
        title: 'Đơn hàng mới',
        route: '/new-orders'
      }
    ],
    section: 'Đơn hàng mới'
  },
  {
    key: 'completed-orders',
    route: '/completed-orders',
    breadcrumb: [
      {
        title: 'Đơn hàng đã hoàn thành',
        route: '/completed-orders'
      }
    ],
    section: 'Đơn hàng đã hoàn thành'
  },
  {
    key: 'products',
    route: '/products',
    breadcrumb: [
      {
        title: 'Sản phẩm',
        route: '/products'
      }
    ],
    section: 'Danh sách sản phẩm'
  },
  {
    key: 'backgrounds',
    route: '/backgrounds',
    breadcrumb: [
      {
        title: 'Background',
        route: '/backgrounds'
      }
    ],
    section: 'Danh sách background'
  },
  {
    key: 'stickers',
    route: '/stickers',
    breadcrumb: [
      {
        title: 'Sticker',
        route: '/stickers'
      }
    ],
    section: 'Danh sách sticker'
  },
  {
    key: 'categories',
    route: '/categories',
    breadcrumb: [
      {
        title: 'Danh mục',
        route: '/categories'
      }
    ],
    section: 'Danh sách danh mục'
  },
  {
    key: 'categories/create',
    route: '/categories/create',
    breadcrumb: [
      {
        title: 'Danh mục',
        route: '/categories'
      },
      {
        title: 'Tạo danh mục',
        route: '/categories/create'
      }
    ],
    section: 'Tạo danh mục'
  },
  {
    key: 'categories/:id/edit',
    route: '/categories/:id/edit',
    breadcrumb: [
      {
        title: 'Danh mục',
        route: '/categories'
      },
      {
        title: 'Cập nhật danh mục',
        route: '/categories/:id/edit'
      }
    ],
    section: 'Cập nhật danh mục'
  },
  {
    key: 'categories/:id/detail',
    route: '/categories/:id/detail',
    breadcrumb: [
      {
        title: 'Danh mục',
        route: '/categories'
      },
      {
        title: 'Chi tiết danh mục',
        route: '/categories/:id/detail'
      }
    ],
    section: 'Chi tiết danh mục'
  },
  {
    key: 'news',
    route: '/news',
    breadcrumb: [
      {
        title: 'Tin tức',
        route: '/news'
      }
    ],
    section: 'Danh sách tin tức'
  },
  {
    key: 'feedbacks',
    route: '/feedbacks',
    breadcrumb: [
      {
        title: 'Feedback',
        route: '/feedbacks'
      }
    ],
    section: 'Danh sách feedback'
  }
];

export const useGetCurrentRoute = () => {
  const { pathname } = useLocation();

  if (pathname.includes('/edit') || pathname.includes('/detail')) {
    const route = pathname.split('/')[1];
    const type = pathname.split('/')[3];
    const newPathname = `/${route}/:id/${type}`;
    const currentRoute = MENU_ROUTES.find((i) => i.route === newPathname);
    if (currentRoute) {
      const { breadcrumb } = currentRoute;
      const newBreadcrumb = breadcrumb.map((item) => {
        if (item.route === newPathname) {
          return { title: item.title, route: pathname };
        }
        return item;
      });
      return { ...currentRoute, breadcrumb: newBreadcrumb };
    }
    return MENU_ROUTES.find((i) => i.route === newPathname);
  }

  return MENU_ROUTES.find((i) => i.route === pathname);
};
