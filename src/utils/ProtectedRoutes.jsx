import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Naviate to="/login" replace />;
  }

  return <Outlet />;
}