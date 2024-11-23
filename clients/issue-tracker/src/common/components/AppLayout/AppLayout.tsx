import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../../hooks";
import {
  setCurrentUser,
  setCurrentWorkspace,
} from "../../../features/auth/auth.slice";

import MuiBox from "@mui/material/Box";
import AppLoader from "../AppLoader";
import { authService } from "../../../app/trpc";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const { isLoading, data: user } = authService.getCurrentUser.useQuery();

  useEffect(() => {
    (async () => {
      try {
        if (!user) throw new Error("Temp: User not found");
        dispatch(setCurrentUser(user));
        dispatch(
          setCurrentWorkspace({
            // id: user.defaultWorkspaceId,
            // name: user.defaultWorkspaceName,
          }),
        );
      } catch (err) {
        dispatch(setCurrentUser(null));
      }
    })();
  }, [isLoading]);

  return (
    <MuiBox width="100vw" height="100vh">
      {isLoading ? <AppLoader /> : <Outlet />}
    </MuiBox>
  );
}
