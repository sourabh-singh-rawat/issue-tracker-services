import { Outlet, useLocation, useNavigate } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import {
  useFindDefaultWorkspaceQuery,
  useFindSpacesLazyQuery,
  useFindWorkspacesLazyQuery,
  useGetCurrentUserQuery,
} from "../../../api/codegen/gql/graphql";
import { setCurrentUser } from "../../../features/auth/auth.slice";
import { setSpaces } from "../../../features/spaces/space.slice";
import {
  setCurrentWorkspace,
  setWorkspaces,
} from "../../../features/workspace/workspace.slice";
import { useAppDispatch } from "../../hooks";
import { AppLoader } from "../AppLoader";

export function Main() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [findSpaces] = useFindSpacesLazyQuery({
    onCompleted(response) {
      dispatch(setSpaces(response.findSpaces));
    },
  });
  useFindDefaultWorkspaceQuery({
    async onCompleted(response) {
      const workspace = response.findDefaultWorkspace;
      const workspaceId = workspace.id;

      dispatch(setCurrentWorkspace(workspace));

      await findSpaces({
        variables: { input: { workspaceId } },
      });
    },
  });
  const [findWorkspaces] = useFindWorkspacesLazyQuery({
    onCompleted(response) {
      dispatch(setWorkspaces(response.findWorkspaces));
    },
  });
  const { loading } = useGetCurrentUserQuery({
    async onCompleted(response) {
      dispatch(
        setCurrentUser({ current: response.getCurrentUser, isLoading: false }),
      );
      await findWorkspaces();
    },
    onError() {
      const url = location.pathname;
      if (["/login", "/signup"].includes(url)) return;

      navigate("/login", { replace: true });
    },
  });

  return (
    <MuiBox width="100vw" height="100vh">
      {loading ? <AppLoader /> : <Outlet />}
    </MuiBox>
  );
}
