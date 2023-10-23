import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../features/dashboard/pages/Dashboard";
import AppLayout from "../common/components/AppLayout";
import PrivateRoutes from "../common/components/PrivateRoutes";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/Signup";
// import Settings from "./features/settings/pages/Settings";
// import CollaboratorList from "./features/collaborator-list/components/CollaboratorList";
// import Collaborators from "./features/collaborator-list/pages/Collaborators/Collaborators";

import Projects from "../features/project/pages/Projects";
// import Project from "../features/project/pages/Project";
// import ProjectActivity from "./features/project/pages/ProjectActivity";
// import ProjectForm from "./features/project/pages/ProjectForm";
// import ProjectMembers from "./features/project/pages/ProjectMembers";
import ProjectOverview from "../features/project/pages/ProjectOverview";
import ProjectForm from "../features/project/components/ProjectForm";
import ProjectList from "../features/project-list/pages/ProjectListPage";
import Project from "../features/project/pages/Project";
import ProjectMembers from "../features/project/pages/ProjectMembers";
import ProjectActivity from "../features/project/pages/ProjectActivity";
import ProjectSettings from "../features/project/pages/ProjectSettings";
import ProjectIssues from "../features/project/pages/ProjectIssues";
// import ProjectSetting from "./features/project/pages/ProjectSettings";

import Issue from "../features/issue/pages/Issue";
import Issues from "../features/issue-list/pages/Issues";
import IssueForm from "../features/issue/pages/IssueForm";
import IssueList from "../features/issue-list/components/IssueList";
import IssueOverview from "../features/issue/pages/IssueOverview";
import IssueComments from "../features/issue-comments/pages/IssueComments";
// import IssueAttachments from "./features/issue-attachments/pages/IssueAttachments";
// import IssueForm from "./features/issue/pages/IssueForm";
// import IssueList from "./features/issue-list/components/IssueList";
// import Issues from "./features/issue-list/pages/Issues";
// import IssueSettings from "./features/issue/pages/IssueSettings";
import IssueTasks from "../features/issue-tasks/pages/IssueTasks";

// import Team from "./features/team/pages/Team";
// import TeamActivity from "./features/team/pages/TeamActivity";
// import TeamForm from "./features/team/pages/TeamForm";
// import TeamList from "./features/team-list/components/TeamList";
// import TeamOverview from "./features/team/pages/TeamOverview";
// import Teams from "./features/team-list/pages/Teams";
// import TeamSettings from "./features/team/pages/TeamSettings";

// import Profile from "./features/profile/pages/Profile";
// import TeamMembers from "./features/team/pages/TeamMembers";
// import TeamProjects from "./features/team/pages/TeamProjects";

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

          <Route element={<Projects />} path="projects">
            <Route element={<ProjectList />} index />
            <Route element={<ProjectForm />} path="new" />
            <Route element={<Project />} path=":id">
              <Route element={<ProjectOverview />} path="overview" />
              <Route element={<ProjectIssues />} path="issues" />
              <Route element={<ProjectMembers />} path="members" />
              <Route element={<ProjectActivity />} path="activity" />
              <Route element={<ProjectSettings />} path="settings" />
            </Route>
          </Route>

          <Route element={<Issues />} path="issues">
            <Route element={<IssueList />} index />
            <Route element={<IssueForm />} path="new" />
            <Route element={<Issue />} path=":id">
              <Route element={<IssueOverview />} path="overview" />
              <Route element={<IssueComments />} path="comments" />
              <Route element={<IssueTasks />} path="tasks" />
            </Route>
          </Route>
          {/* 
              <Route element={<IssueAttachments />} path="attachments" />
              <Route element={<IssueSettings />} path="settings" /> */}
        </Route>
      </Route>
      <Route element={<NoComponent />} path="*" />
    </Routes>
  );
}
