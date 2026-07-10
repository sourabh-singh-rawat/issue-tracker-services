import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import MuiBox from "@mui/material/Box";
import {
  useFindDefaultWorkspaceQuery,
  useFindSpacesQuery,
  useFindWorkspacesQuery,
  useGetCurrentUserQuery,
} from "@generated/gql";
import { useAuthStore } from "@features/auth";
import { useWorkspaceStore } from "@features/workspace";
import { useSpaceStore } from "@features/space/store";
import { AppLoader } from "../AppLoader";

interface MainProps {
  children?: React.ReactNode;
}

export function Main({ children }: MainProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const setSpaces = useSpaceStore((s) => s.setSpaces);
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
  const spacesQuery = useFindSpacesQuery(
    { input: { workspaceId: defaultWsQuery.data?.id! } },
    {
      select: (data) => data.findSpaces,
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
    if (spacesQuery.data) {
      setSpaces(spacesQuery.data);
    }
  }, [spacesQuery.data, setSpaces]);

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
        (Boolean(defaultWsQuery.data?.id) && spacesQuery.isPending)));

  return (
    <MuiBox width="100vw" height="100vh">
      {loading ? <AppLoader /> : children}
    </MuiBox>
  );
}
