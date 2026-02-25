import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  // 🔒 Logged-in user ko login/register page par nahi jane dena
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

export default ProtectedRoute;
