import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../features/dashboard/pages/Dashboard";
import AppLayout from "../common/components/AppLayout";
import PrivateRoutes from "../common/components/PrivateRoutes";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/Signup";

import Lists from "../features/project/pages/Lists";
import ProjectOverview from "../features/project/pages/ProjectOverview";
import ListForm from "../features/project/components/ListForm";
import Project from "../features/project/pages/Project";
import ProjectMembers from "../features/project/pages/ProjectMembers";
import ProjectActivity from "../features/project/pages/ProjectActivity";
import ProjectSettings from "../features/project/pages/ProjectSettings";
import ProjectIssues from "../features/project/pages/ListItems";

import Issue from "../features/issue/pages/Issue";
import Issues from "../features/issue-list/pages/Issues";
import IssueForm from "../features/issue/pages/ItemForm";
import IssueOverview from "../features/issue/pages/IssueOverview";
import IssueComments from "../features/issue-comments/pages/IssueComments";
import IssueAttachments from "../features/issue-attachments/pages/IssueAttachments";
import IssueTasks from "../features/issue-tasks/pages/IssueTasks";
import Profile from "../features/user/pages/Profile";
import Workspace from "../features/workspace/pages/Workspace";
import WorkspaceSettings from "../features/workspace/pages/WorkspaceSettings";
import WorkspaceMembers from "../features/workspace/pages/WorkspaceMembers";
import Item from "../features/issue/components/Item/Item";

function NoComponent() {
  return <h1>404</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<Login />} path="login" />
        <Route element={<SignUp />} path="signup" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} index />
          <Route element={<Profile />} path="me" />
          <Route element={<Lists />} path="lists">
            <Route element={<ListForm />} path="new" />
            <Route element={<Project />} path=":id">
              <Route element={<ProjectOverview />} path="overview" />
              <Route element={<ProjectIssues />} path="items" />
              <Route element={<ProjectMembers />} path="members" />
              <Route element={<ProjectActivity />} path="activity" />
              <Route element={<ProjectSettings />} path="settings" />
            </Route>
          </Route>

          <Route element={<Item />} path="lists/:id/items/:itemId" />

          <Route element={<Issues />} path="items">
            <Route element={<IssueForm />} path="new" />
          </Route>

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
