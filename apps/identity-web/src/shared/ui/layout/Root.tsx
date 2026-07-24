import { useGetCurrentUserQuery } from "@generated/api/@tanstack/react-query.gen";
import { Outlet } from "@tanstack/react-router";

export const Root = () => {
  // Bootstrap session: verify the session cookie via GET /identity/me.
  useGetCurrentUserQuery();

  return <Outlet />;
};
