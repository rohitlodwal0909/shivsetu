import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  return isLoggedIn ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AuthGuard;
