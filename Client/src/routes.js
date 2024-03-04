import { Navigate, useRoutes } from 'react-router-dom';
// layouts


//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Detail from './pages/Detail';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboardLayout from './layouts/AdminDasboardLayout';
import SimpleLayout from './layouts/SimpleLayout';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboardAppPage from './pages/AdminDasboardAppPage';
import EditUser from './pages/EditUser';

// ----------------------------------------------------------------------

export default function 
Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        {path :"info/:id", element: <Detail/>},
        {path :"register", element: <Register/>},
        {path :"admin/login", element: <AdminLogin/>}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/404',
      element: <NotFound />,
    }
    ,{
      path: '/admin/login',
      element: <AdminLogin />,
    },
    {
      path : "/admin",
      element: <AdminDashboardLayout />,
      children: [
        { path: "home" ,element: <AdminDashboardAppPage/>, index : true },
        {path :"user/:id", element: <EditUser/>},
      ],
    }
  ]);

  return routes;
}
