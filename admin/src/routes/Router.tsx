// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

import AuthGuard from 'src/utils/Authcard';
import ProtectedRoute from 'src/components/shared/ProtectedRoute';

/* Pages */
import Dashboard from 'src/views/dashboard/Dashboard';
import Packages from 'src/views/tourManagment/tourpackages/Packages';
import Booking from 'src/views/tourManagment/bookings/Booking';
import Cab from 'src/views/tourManagment/cabs/Cabs';

import Category from 'src/views/productManagment/category/Category';
import Product from 'src/views/productManagment/products/Product';
import Order from 'src/views/productManagment/orders/Order';

import PujaCategory from 'src/views/pujaManagment/category/PujaCategory';
import Puja from 'src/views/pujaManagment/puja/Puja';
import PujaPackage from 'src/views/pujaManagment/pujapackage/PujaPackage';

import Slider from 'src/views/home/slider/Slider';
import Marquee from 'src/views/home/marquee/Marquee';
import Blog from 'src/views/home/blogs/Blog';
import Reviews from 'src/views/home/reviews/Reviews';

import SeeAllNotifications from 'src/views/Notifications/SeeAllNotifications';
import Pandit from 'src/views/pujaManagment/pandit/Pandit';
import PujaBooking from 'src/views/pujaManagment/booking/Booking';

const Userprofile = Loadable(lazy(() => import('src/views/userprofile/Userprofile')));

/* Layouts */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* Auth Pages */
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const router = createBrowserRouter([
  /* 🔐 PRIVATE ROUTES */
  {
    element: <AuthGuard />,
    children: [
      {
        element: <FullLayout />,
        children: [
          { path: '/admin', element: <Dashboard /> },

          { path: '/admin/tour-management/packages', element: <Packages /> },
          { path: '/admin/tour-management/bookings', element: <Booking /> },
          { path: '/admin/tour-management/cabs', element: <Cab /> },

          { path: '/admin/product-management/category', element: <Category /> },
          { path: '/admin/product-management/products', element: <Product /> },
          { path: '/admin/product-management/orders', element: <Order /> },

          { path: '/admin/puja-management/puja-category', element: <PujaCategory /> },
          { path: '/admin/puja-management/pujas', element: <Puja /> },
          { path: '/admin/puja-management/package/:id', element: <PujaPackage /> },
          { path: '/admin/puja-management/pandits', element: <Pandit /> },
          { path: '/admin/puja-management/bookings', element: <PujaBooking /> },

          { path: '/admin/home-management/sliders', element: <Slider /> },
          { path: '/admin/home-management/marquee', element: <Marquee /> },
          { path: '/admin/home-management/blogs', element: <Blog /> },
          { path: '/admin/home-management/client-reviews', element: <Reviews /> },

          { path: '/admin/user-profile', element: <Userprofile /> },
          { path: '/admin/notifications', element: <SeeAllNotifications /> },
        ],
      },
    ],
  },

  /* 🚪 PUBLIC ROUTES */
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
