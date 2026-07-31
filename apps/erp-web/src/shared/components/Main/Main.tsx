import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import MuiBox from "@mui/material/Box";
import { useFindProjectsQuery } from "@generated/gql";
import { useGetCurrentUserQuery } from "@generated/api/@tanstack/react-query.gen";
import { useAuthStore } from "@features/auth";
import { useProjectStore } from "@features/project";
import { redirectToOidcSignIn } from "../../../lib/auth";
import { AppLoader } from "../AppLoader";

interface MainProps {
  children?: React.ReactNode;
}

const isPublicPath = (pathname: string) =>
  pathname === "/email-verification" || pathname === "/callback";

export function Main({ children }: MainProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const setProjects = useProjectStore((s) => s.setProjects);

  const userQuery = useGetCurrentUserQuery();
  const projectsQuery = useFindProjectsQuery(undefined, {
    select: (data) => data.findProjects,
    enabled: userQuery.isSuccess,
  });

  useEffect(() => {
    if (userQuery.data?.identity) {
      setCurrentUser({
        current: {
          userId: userQuery.data.identity.id,
          email: userQuery.data.identity.email,
          emailVerified: userQuery.data.identity.emailVerified,
          displayName: userQuery.data.identity.email,
        },
        isLoading: false,
      });
      return;
    }

    if (userQuery.isError || userQuery.isSuccess) {
      setCurrentUser({ current: null, isLoading: false });
    }
  }, [userQuery.data, userQuery.isError, userQuery.isSuccess, setCurrentUser]);

  useEffect(() => {
    if (projectsQuery.data?.rows) {
      setProjects(projectsQuery.data.rows);
    }
  }, [projectsQuery.data, setProjects]);

  useEffect(() => {
    if (!userQuery.isError) return;
    if (isPublicPath(pathname)) return;
    redirectToOidcSignIn();
  }, [userQuery.isError, pathname]);

  const loading = userQuery.isPending || (userQuery.isSuccess && projectsQuery.isPending);

  return (
    <MuiBox width="100vw" height="100vh">
      {loading ? <AppLoader /> : children}
    </MuiBox>
  );
}
