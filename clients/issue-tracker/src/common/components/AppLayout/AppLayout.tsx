import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../../hooks";
import {
  setCurrentUser,
  setCurrentWorkspace,
} from "../../../features/auth/auth.slice";

import MuiBox from "@mui/material/Box";
import AppLoader from "../AppLoader";
import { client } from "../../..";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const user = await client.getCurrentUser.query();

        if (!user) throw new Error("Temp: User not found");
        dispatch(setCurrentUser(user));
        dispatch(
          setCurrentWorkspace({
            id: user.defaultWorkspaceId,
            name: user.defaultWorkspaceName,
          }),
        );

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        dispatch(setCurrentUser(null));
      }
    })();
  }, []);

  return (
    <MuiBox width="100vw" height="100vh">
      {isLoading ? <AppLoader /> : <Outlet />}
    </MuiBox>
  );
}
