/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './hoc/ProtectedRoute';

import Main from './common/headers/Main';
import Login from './features/auth/pages/Login/Login';
import SignUp from './features/auth/pages/Signup';
import Dashboard from './features/dashboard/pages/Dashboard';
import Settings from './features/settings/components/pages/Settings';

import Collaborators from './features/collaborator-list/pages/Collaborators/Collaborators';
import CollaboratorList from './features/collaborator-list/components/containers/CollaboratorList';

import Project from './features/project/pages/Project';
import ProjectOverview from './features/project/pages/ProjectOverview';
import ProjectIssues from './features/project/pages/ProjectIssues';
import ProjectMembers from './features/project/pages/ProjectMembers';
import ProjectActivity from './features/project/pages/ProjectActivity';
import ProjectSetting from './features/project/pages/ProjectSettings';
import ProjectForm from './features/project/pages/ProjectForm';
import Projects from './features/project-list/pages/Projects';
import ProjectList from './features/project-list/components/containers/ProjectList';

import Issues from './features/issue-list/pages/Issues';
import Issue from './features/issue/pages/Issue';
import IssueTasks from './features/issue-tasks/pages/IssueTasks/IssueTasks';
import IssueOverview from './features/issue/pages/IssueOverview';
import IssueComments from './features/issue-comments/pages/IssueComments';
import IssueAttachments from './features/issue/pages/IssueAttachments';
import IssueSettings from './features/issue/pages/IssueSettings';
import IssueForm from './features/issue/pages/IssueForm';
import IssueList from './features/issue-list/components/containers/IssueList';

import Teams from './features/team-list/pages/Teams';
import Team from './features/team/pages/Team';
import TeamActivity from './features/team/pages/TeamActivity';
import TeamOverview from './features/team/pages/TeamOverview';
import TeamSettings from './features/team/pages/TeamSettings';
import TeamForm from './features/team/pages/TeamForm';
import TeamList from './features/team-list/components/containers/TeamList';

import Profile from './features/profile/pages/Profile';
import TeamProjects from './features/team/pages/TeamProjects';
import TeamMembers from './features/team/pages/TeamMembers';

function NoComponent() {
  return <h1>404</h1>;
}

function App() {
  return (
    <Routes>
      <Route element={<SignUp />} path="/signup" />
      <Route element={<Login />} path="/login" />
      <Route element={<ProtectedRoute />}>
        <Route element={<Main />} path="/">
          <Route element={<Dashboard />} index />
          <Route element={<Settings />} path="settings" />
          <Route path="profile">
            <Route element={<Profile />} path=":id" />
          </Route>
          {/* collaborator route */}
          <Route element={<Collaborators />} path="collaborators">
            <Route element={<CollaboratorList />} index />
          </Route>
          {/* project route */}
          <Route element={<Projects />} path="projects">
            <Route element={<ProjectList />} index />
            <Route element={<ProjectForm />} path="new" />
            <Route element={<Project />} path=":id">
              <Route element={<ProjectOverview />} path="overview" />
              <Route element={<ProjectIssues />} path="issues" />
              <Route element={<ProjectMembers />} path="members" />
              <Route element={<ProjectActivity />} path="activity" />
              <Route element={<ProjectSetting />} path="settings" />
            </Route>
          </Route>
          {/* team route */}
          <Route element={<Teams />} path="teams">
            <Route element={<TeamList />} index />
            <Route element={<TeamForm />} path="new" />
            <Route element={<Team />} path=":id">
              <Route element={<TeamOverview />} path="overview" />
              <Route element={<TeamMembers />} path="people" />
              <Route element={<TeamProjects />} path="projects" />
              <Route element={<TeamActivity />} path="activity" />
              <Route element={<TeamSettings />} path="settings" />
            </Route>
          </Route>
          {/* issue route */}
          <Route element={<Issues />} path="issues">
            <Route element={<IssueList />} index />
            <Route element={<IssueForm />} path="new" />
            <Route element={<Issue />} path=":id">
              <Route element={<IssueOverview />} path="overview" />
              <Route element={<IssueTasks />} path="tasks" />
              <Route element={<IssueAttachments />} path="attachments" />
              <Route element={<IssueComments />} path="comments" />
              <Route element={<IssueSettings />} path="settings" />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route element={<NoComponent />} path="*" />
    </Routes>
  );
}

export default App;
