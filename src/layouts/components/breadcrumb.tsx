import clsx from 'clsx';
import { Fragment, memo } from 'react';
import { IoChevronForwardOutline, IoHome } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { useGetCurrentRoute } from './helper';

const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const currentRoute = useGetCurrentRoute();

  if (!currentRoute) {
    return null;
  }

  const { breadcrumb } = currentRoute;

  return (
    <div className="flex items-center gap-3">
      <Link to="/">
        <IoHome />
      </Link>

      {breadcrumb.map((item) => {
        const { route, title } = item;
        const isActive = pathname === route;

        return (
          <Fragment key={route}>
            <IoChevronForwardOutline color="#828282" />
            <Link to={route}>
              <p className={clsx({ 'font-semibold': isActive })}>{title}</p>
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
};

export default memo(Breadcrumb);
