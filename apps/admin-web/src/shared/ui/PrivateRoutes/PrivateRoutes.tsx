import { useEffect } from "react";
import { useAuthStore } from "@features/auth";
import { redirectToOidcSignIn } from "../../../lib/auth";
import { AppLoader } from "../AppLoader";

interface PrivateRoutesProps {
  children?: React.ReactNode;
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const current = useAuthStore((s) => s.current);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isLoading && !current) {
      redirectToOidcSignIn();
    }
  }, [isLoading, current]);

  if (isLoading || !current) {
    return <AppLoader />;
  }

  return children;
};
