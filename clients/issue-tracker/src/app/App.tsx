import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../common/components/AppLayout";
import PrivateRoutes from "../common/components/PrivateRoutes";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/Signup";
import SpaceBoard from "../features/dashboard/pages/Dashboard";

import { List } from "../features/Lists/pages/List";
import ProjectActivity from "../features/Lists/pages/ProjectActivity";
import ProjectMembers from "../features/Lists/pages/ProjectMembers";
import { EmailVerification } from "../features/auth/pages/EmailVerification";
import Item from "../features/issue/components/Item/Item";
import Profile from "../features/user/pages/Profile";
import { BoardView, ListView } from "../features/views";

function NoComponent() {
  return <h1>404</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<Login />} path="login" />
        <Route element={<SignUp />} path="signup" />
        <Route element={<EmailVerification />} path="email-verification" />
        <Route element={<PrivateRoutes />} path="/">
          <Route element={<Profile />} path="me" />
          <Route element={<SpaceBoard />} path=":spaceId">
            <Route path="l">
              <Route element={<List />} path=":listId">
                <Route element={<BoardView />} path="board" />
                <Route element={<ListView />} path="items">
                  <Route element={<Item />} path=":itemId" />
                </Route>
                <Route element={<ProjectMembers />} path="members" />
                <Route element={<ProjectActivity />} path="activity" />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route element={<NoComponent />} path="*" />
    </Routes>
  );
}
