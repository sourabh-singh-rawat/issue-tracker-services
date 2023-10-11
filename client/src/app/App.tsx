import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../features/dashboard/pages/Dashboard";
import AppLayout from "../common/components/AppLayout";
import PrivateRoutes from "../common/components/PrivateRoutes";
import LoginPage from "../features/auth/pages/Login";
import SignUpPage from "../features/auth/pages/Signup";
// import Settings from "./features/settings/pages/Settings";
// import CollaboratorList from "./features/collaborator-list/components/CollaboratorList";
// import Collaborators from "./features/collaborator-list/pages/Collaborators/Collaborators";

import Projects from "../features/project-list/pages/Projects";
import ProjectPage from "../features/project/pages/ProjectPage";
// import Project from "../features/project/pages/Project";
// import ProjectActivity from "./features/project/pages/ProjectActivity";
// import ProjectForm from "./features/project/pages/ProjectForm";
// import ProjectIssues from "./features/project/pages/ProjectIssues";
import ProjectList from "../features/project-list/components/ProjectList";
// import ProjectMembers from "./features/project/pages/ProjectMembers";
// import ProjectOverview from "./features/project/pages/ProjectOverview";
// import ProjectSetting from "./features/project/pages/ProjectSettings";

// import Issue from "./features/issue/pages/Issue";
// import IssueAttachments from "./features/issue-attachments/pages/IssueAttachments";
// import IssueComments from "./features/issue-comments/pages/IssueComments";
// import IssueForm from "./features/issue/pages/IssueForm";
// import IssueList from "./features/issue-list/components/IssueList";
// import IssueOverview from "./features/issue/pages/IssueOverview";
// import Issues from "./features/issue-list/pages/Issues";
// import IssueSettings from "./features/issue/pages/IssueSettings";
// import IssueTasks from "./features/issue-tasks/pages/IssueTasks/IssueTasks";

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

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} index />
          {/* <Route element={<Settings />} path="settings" /> */}
          <Route path="profile">
            {/* <Route element={<Profile />} path=":id" /> */}
          </Route>
          {/* collaborator route */}
          {/* <Route element={<Collaborators />} path="collaborators">
            <Route element={<CollaboratorList />} index />
          </Route> */}
          {/* project route */}
          <Route element={<Projects />} path="projects">
            <Route element={<ProjectList />} index />
            <Route element={<ProjectPage />} path="new" />
            {/* 
            
            <Route element={<Project />} path=":id">
            <Route element={<ProjectOverview />} path="overview" />
            <Route element={<ProjectMembers />} path="members" />
            <Route element={<ProjectActivity />} path="activity" />
            <Route element={<ProjectSetting />} path="settings" />
            <Route element={<ProjectIssues />} path="issues" />
            </Route> */}
          </Route>
          {/* team route */}
          {/* <Route element={<Teams />} path="teams">
            <Route element={<TeamList />} index />
            <Route element={<TeamForm />} path="new" />
            <Route element={<Team />} path=":id">
              <Route element={<TeamOverview />} path="overview" />
              <Route element={<TeamMembers />} path="people" />
              <Route element={<TeamProjects />} path="projects" />
              <Route element={<TeamActivity />} path="activity" />
              <Route element={<TeamSettings />} path="settings" />
            </Route>
          </Route> */}
          {/* issue route */}
          {/* <Route element={<Issues />} path="issues">
            <Route element={<IssueList />} index />
            <Route element={<IssueForm />} path="new" />
            <Route element={<Issue />} path=":id">
              <Route element={<IssueOverview />} path="overview" />
              <Route element={<IssueTasks />} path="tasks" />
              <Route element={<IssueAttachments />} path="attachments" />
              <Route element={<IssueComments />} path="comments" />
              <Route element={<IssueSettings />} path="settings" />
            </Route>
          </Route> */}
        </Route>
      </Route>
      <Route element={<NoComponent />} path="*" />
    </Routes>
  );
}

export default App;
