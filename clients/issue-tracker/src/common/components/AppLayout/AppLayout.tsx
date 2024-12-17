import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import { useGetCurrentUserQuery } from "../../../api/codegen/gql/graphql";
import { useAuth } from "../../contexts/Auth";
import { AppLoader } from "../AppLoader";

export function AppLayout() {
  const { setAuth } = useAuth();
  const { loading: isLoading, data: user } = useGetCurrentUserQuery();

  useEffect(() => {
    (async () => {
      if (user) setAuth({ user: user.getCurrentUser });
    })();
  }, [isLoading]);

  return (
    <MuiBox width="100vw" height="100vh">
      {isLoading ? <AppLoader /> : <Outlet />}
    </MuiBox>
  );
}
