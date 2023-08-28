import { Navigate, Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppLoader from "../AppLoader";

export default function ProtectedRoutes() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCurrentUser = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(true);
        setCurrentUser({ id: "uuid", email: "email@email.com" });
        resolve("promise resolved");
      }, 1000);
    });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!isLoading) return <AppLoader />;

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
}
