import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { ErrorScreen } from 'src/components/effect-screen';
import MainLayout from 'src/layouts/main';
import NotFound404 from 'src/pages/404';
import { CategoryCreate, CategoryList } from 'src/pages/category';
import Dashboard from 'src/pages/dashboard';
import Login from 'src/pages/login';
import NewOrders from 'src/pages/new-order';

const AppRoute = () => {
  return (
    <ErrorBoundary FallbackComponent={({ error }) => <ErrorScreen className="mt-20" message={error?.message} />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="new-orders">
            <Route path="" element={<NewOrders />} />
            {/* <Route path="create" element={<UserCreate />} />
            <Route path="edit/:id" element={<UserCreate />} />
            <Route path="detail/:id/*" element={<UserDetail />} /> */}
          </Route>

          <Route path="categories">
            <Route path="" element={<CategoryList />} />
            <Route path="create" element={<CategoryCreate />} />
            <Route path=":id/edit" element={<CategoryCreate />} />
            {/* <Route path="detail/:id/*" element={<UserDetail />} /> */}
          </Route>

          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoute;
