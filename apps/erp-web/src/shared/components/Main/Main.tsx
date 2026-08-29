import { useEffect, useLayoutEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import MuiBox from "@mui/material/Box";
import { useFindProjectsQuery, useGetMyOrganizationsQuery } from "@generated/gql";
import { useGetCurrentUserQuery } from "@generated/api/@tanstack/react-query.gen";
import { useAuthStore } from "@features/auth";
import { useOrganizationStore } from "@features/organization";
import { useProjectStore } from "@features/project";
import { redirectToOidcSignIn } from "../../../lib/auth";
import { AppLoader } from "../AppLoader";

interface MainProps {
  children?: React.ReactNode;
}

const isPublicPath = (pathname: string) =>
  pathname === "/email-verification" || pathname === "/callback";

function getIdentityFromMeResponse(data: unknown): {
  id: string;
  email: string;
  emailVerified?: boolean;
} | null {
  if (typeof data !== "object" || data === null || !("identity" in data)) {
    return null;
  }
  const identity = data.identity;
  if (typeof identity !== "object" || identity === null) {
    return null;
  }
  if (!("id" in identity) || !("email" in identity)) {
    return null;
  }
  if (typeof identity.id !== "string" || typeof identity.email !== "string") {
    return null;
  }
  const emailVerified =
    "emailVerified" in identity && typeof identity.emailVerified === "boolean"
      ? identity.emailVerified
      : undefined;
  return { id: identity.id, email: identity.email, emailVerified };
}

export function Main({ children }: MainProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const setProjects = useProjectStore((s) => s.setProjects);
  const syncOrganizations = useOrganizationStore((s) => s.syncOrganizations);

  const userQuery = useGetCurrentUserQuery();
  const projectsQuery = useFindProjectsQuery(undefined, {
    select: (data) => data.findProjects,
    enabled: userQuery.isSuccess,
  });
  const organizationsQuery = useGetMyOrganizationsQuery(undefined, {
    select: (data) => data.getMyOrganizations ?? [],
    enabled: userQuery.isSuccess,
  });

  useEffect(() => {
    const identity = getIdentityFromMeResponse(userQuery.data);
    if (identity) {
      setCurrentUser({
        current: {
          userId: identity.id,
          email: identity.email,
          emailVerified: identity.emailVerified,
          displayName: identity.email,
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

  useLayoutEffect(() => {
    if (organizationsQuery.isSuccess) {
      syncOrganizations(organizationsQuery.data);
      return;
    }
    if (organizationsQuery.isError) {
      syncOrganizations([]);
    }
  }, [
    organizationsQuery.data,
    organizationsQuery.isError,
    organizationsQuery.isSuccess,
    syncOrganizations,
  ]);

  useEffect(() => {
    if (!userQuery.isError) return;
    if (isPublicPath(pathname)) return;
    redirectToOidcSignIn();
  }, [userQuery.isError, pathname]);

  const loading =
    userQuery.isPending ||
    (userQuery.isSuccess && (projectsQuery.isPending || organizationsQuery.isPending));

  return (
    <MuiBox width="100vw" height="100vh">
      {loading ? <AppLoader /> : children}
    </MuiBox>
  );
}
