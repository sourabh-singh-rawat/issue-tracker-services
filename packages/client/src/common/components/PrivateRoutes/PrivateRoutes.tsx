import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import AppLoader from "../AppLoader";
import AppMain from "../AppMain";

export default function PrivateRoutes() {
  const location = useLocation();
  const { currentUser, isLoading } = useAppSelector((store) => store.auth);

  if (isLoading) return <AppLoader />;

  return currentUser ? (
    <AppMain />
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
}
