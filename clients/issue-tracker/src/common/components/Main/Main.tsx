import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import MuiBox from "@mui/material/Box";
import {
  useFindDefaultWorkspaceQuery,
  useFindProjectsQuery,
  useFindWorkspacesQuery,
  useGetCurrentUserQuery,
} from "@generated/gql";
import { useAuthStore } from "@features/auth";
import { useWorkspaceStore } from "@features/workspace";
import { useProjectStore } from "@features/project";
import { AppLoader } from "../AppLoader";

interface MainProps {
  children?: React.ReactNode;
}

export function Main({ children }: MainProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const setProjects = useProjectStore((s) => s.setProjects);
  const setCurrentWorkspace = useWorkspaceStore((s) => s.setCurrentWorkspace);
  const setWorkspaces = useWorkspaceStore((s) => s.setWorkspaces);

  const userQuery = useGetCurrentUserQuery(undefined, {
    select: (data) => data.getCurrentUser ?? null,
  });
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
    if (userQuery.data) {
      setCurrentUser({ current: userQuery.data, isLoading: false });
    }
  }, [userQuery.data, setCurrentUser]);

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
    if (["/login", "/signup"].includes(pathname)) return;
    navigate({ to: "/login", replace: true });
  }, [userQuery.isError, pathname, navigate]);

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
