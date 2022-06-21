import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  let user =
    useSelector((store) => store.user) ||
    JSON.parse(window.localStorage.getItem("user"));
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" replace state={{ path: location.pathname }} />
  );
};

export default RequireAuth;
