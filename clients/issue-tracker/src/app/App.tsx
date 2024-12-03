import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../features/dashboard/pages/Dashboard";
import AppLayout from "../common/components/AppLayout";
import PrivateRoutes from "../common/components/PrivateRoutes";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/Signup";

import Lists from "../features/Lists/pages/Lists";
import ProjectOverview from "../features/Lists/pages/ProjectOverview";
import { List } from "../features/Lists/pages/List";
import ProjectMembers from "../features/Lists/pages/ProjectMembers";
import ProjectActivity from "../features/Lists/pages/ProjectActivity";
import { ListItems } from "../features/Lists/pages/ListItems";
import Profile from "../features/user/pages/Profile";
import Workspace from "../features/workspace/pages/Workspace";
import WorkspaceSettings from "../features/workspace/pages/WorkspaceSettings";
import WorkspaceMembers from "../features/workspace/pages/WorkspaceMembers";
import Item from "../features/issue/components/Item/Item";
import { EmailVerification } from "../features/auth/pages/EmailVerification";

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
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} index />
          <Route element={<Profile />} path="me" />
          <Route element={<Lists />} path="lists">
            <Route element={<List />} path=":id">
              <Route element={<ProjectOverview />} path="board" />
              <Route element={<ListItems />} path="items" />
              <Route element={<ProjectMembers />} path="members" />
              <Route element={<ProjectActivity />} path="activity" />
            </Route>
          </Route>

          <Route element={<Item />} path="lists/:id/items/:itemId" />
          <Route path="workspaces">
            <Route path=":id" element={<Workspace />}>
              <Route path="settings" element={<WorkspaceSettings />} />
              <Route path="members" element={<WorkspaceMembers />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route element={<NoComponent />} path="*" />
    </Routes>
  );
}
