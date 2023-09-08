import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGetCurrentUserQuery } from "../../../api/generated/identity.api";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../../../features/auth/auth.slice";

import MuiBox from "@mui/material/Box";
import AppLoader from "../AppLoader";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCurrentUser(data));
    }
  }, [isLoading]);

  return (
    <MuiBox width="100vw" height="100vh">
      {isLoading ? <AppLoader /> : <Outlet />}
    </MuiBox>
  );
}
