import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import MuiBox from "@mui/material/Box";
import {
  useFindDefaultWorkspaceQuery,
  useFindProjectsQuery,
  useFindWorkspacesQuery,
} from "@generated/gql";
import { useGetCurrentUserQuery } from "@generated/api/@tanstack/react-query.gen";
import { useAuthStore } from "@features/auth";
import { useWorkspaceStore } from "@features/workspace";
import { useProjectStore } from "@features/project";
import { redirectToOidcLogin } from "../../../lib/auth";
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
  const setCurrentWorkspace = useWorkspaceStore((s) => s.setCurrentWorkspace);
  const setWorkspaces = useWorkspaceStore((s) => s.setWorkspaces);

  const userQuery = useGetCurrentUserQuery();
  const workspacesQuery = useFindWorkspacesQuery(undefined, {
    select: (data) => data.findWorkspaces,
    enabled: userQuery.isSuccess,
  });
  const defaultWsQuery = useFindDefaultWorkspaceQuery(undefined, {
    select: (data) => data.findDefaultWorkspace,
    enabled: userQuery.isSuccess,
  });
  const projectsQuery = useFindProjectsQuery(
    { input: { workspaceId: defaultWsQuery.data?.id! } },
    {
      select: (data) => data.findProjects,
      enabled: Boolean(defaultWsQuery.data?.id),
    },
  );

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
    if (workspacesQuery.data) {
      setWorkspaces(workspacesQuery.data);
    }
  }, [workspacesQuery.data, setWorkspaces]);

  useEffect(() => {
    if (defaultWsQuery.data) {
      setCurrentWorkspace(defaultWsQuery.data);
    }
  }, [defaultWsQuery.data, setCurrentWorkspace]);

  useEffect(() => {
    if (projectsQuery.data?.rows) {
      setProjects(projectsQuery.data.rows);
    }
  }, [projectsQuery.data, setProjects]);

  useEffect(() => {
    if (!userQuery.isError) return;
    if (isPublicPath(pathname)) return;
    redirectToOidcLogin();
  }, [userQuery.isError, pathname]);

  const loading =
    userQuery.isPending ||
    (userQuery.isSuccess &&
      (defaultWsQuery.isPending ||
        workspacesQuery.isPending ||
        (Boolean(defaultWsQuery.data?.id) && projectsQuery.isPending)));

  return (
    <MuiBox width="100vw" height="100vh">
      {loading ? <AppLoader /> : children}
    </MuiBox>
  );
}
