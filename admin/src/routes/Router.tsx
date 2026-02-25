// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

import ProtectedRoute from 'src/components/shared/ProtectedRoute';
import AuthGuard from 'src/utils/Authcard';

import SeeAllNotifications from 'src/views/Notifications/SeeAllNotifications';
import Dashboard from 'src/views/dashboard/Dashboard';
import Packages from 'src/views/tourManagment/tourpackages/Packages';
import Booking from 'src/views/tourManagment/bookings/Booking';
import Category from 'src/views/productManagment/category/Category';
import PujaCategory from 'src/views/pujaManagment/category/PujaCategory';
import Product from 'src/views/productManagment/products/Product';
import Order from 'src/views/productManagment/orders/Order';
import Puja from 'src/views/pujaManagment/puja/Puja';
import PujaPackage from 'src/views/pujaManagment/pujapackage/PujaPackage';
import Cab from 'src/views/tourManagment/cabs/Cabs';
import Slider from 'src/views/home/slider/Slider';
import Marquee from 'src/views/home/marquee/Marquee';
import Blog from 'src/views/home/blogs/Blog';

/* Layouts */

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* Pages */
const Userprofile = Loadable(lazy(() => import('src/views/userprofile/Userprofile')));

/* Auth Pages */
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const router = createBrowserRouter([
  /* 🔐 PROTECTED APPLICATION ROUTES */
  {
    element: <AuthGuard />,
    children: [
      {
        element: <FullLayout />,
        children: [
          { path: '/', element: <Dashboard /> },
          { path: '/tour-management/packages', element: <Packages /> },
          { path: '/tour-management/bookings', element: <Booking /> },
          { path: '/tour-management/cabs', element: <Cab /> },

          { path: '/product-management/category', element: <Category /> },
          { path: '/product-management/products', element: <Product /> },
          { path: '/product-management/orders', element: <Order /> },

          { path: '/puja-management/puja-category', element: <PujaCategory /> },
          { path: '/puja-management/pujas', element: <Puja /> },
          { path: '/puja-management/package/:id', element: <PujaPackage /> },

          { path: '/home-management/sliders', element: <Slider /> },
          { path: '/home-management/marquee', element: <Marquee /> },
          { path: '/home-management/blogs', element: <Blog /> },

          { path: '/user-profile', element: <Userprofile /> },
          { path: '/notifications', element: <SeeAllNotifications /> },
          { path: '*', element: <Navigate to="/auth/404" replace /> },
        ],
      },
    ],
  },

  /* 🚪 AUTH / PUBLIC ROUTES */
  {
    element: <BlankLayout />,
    children: [
      {
        path: '/admin/login',
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/register',
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
      },
      { path: '/admin/forgot-password', element: <ForgotPassword /> },
      { path: '/admin/two-steps', element: <TwoSteps /> },
      { path: '/admin/maintenance', element: <Maintainance /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" replace /> },
    ],
  },
]);

export default router;
