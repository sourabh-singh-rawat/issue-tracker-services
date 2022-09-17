import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  let token = useSelector((store) => store.auth.token);
  if (token) window.localStorage.setItem("user", true);
  const location = useLocation();

  return window.localStorage.getItem("user") ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
