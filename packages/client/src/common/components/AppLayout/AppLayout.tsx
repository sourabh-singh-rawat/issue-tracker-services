import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGetCurrentUserQuery } from "../../../api/generated/identity.api";
import { useAppDispatch } from "../../hooks";
import {
  setCurrentUser,
  setCurrentWorkspace,
} from "../../../features/auth/auth.slice";

import MuiBox from "@mui/material/Box";
import AppLoader from "../AppLoader";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess, isError } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      const workspace = {
        id: data?.defaultWorkspaceId,
        name: data?.defaultWorkspaceName,
      };

      dispatch(setCurrentUser({ ...data }));
      dispatch(setCurrentWorkspace(workspace));
    }

    if (isError) {
      dispatch(setCurrentUser(null));
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <MuiBox width="100vw" height="100vh">
      {isLoading ? <AppLoader /> : <Outlet />}
    </MuiBox>
  );
}
