import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { AppLoader } from "../AppLoader";
import { AppMain } from "../AppMain";

export default function PrivateRoutes() {
  const location = useLocation();
  const { auth } = useAuth();

  if (!auth) return <AppLoader />;

  return auth ? (
    <AppMain />
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
}
