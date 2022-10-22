import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../features/auth/components/ProtectedRoute";

import Main from "../common/Main";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/Signup";
import Dashboard from "../features/dashboard/pages/Dashboard";

import Settings from "../features/settings/components/pages/Settings";

import Collaborators from "../features/collaboratorList/pages/Collaborators";
import CollaboratorList from "../features/collaboratorList/components/CollaboratorList";

import Projects from "../features/projectList/pages/Projects";
import Project from "../features/project/pages/Project";
import ProjectOverview from "../features/project/pages/ProjectOverview";
import ProjectIssues from "../features/project/pages/ProjectIssues";
import ProjectMembers from "../features/project/pages/ProjectMembers";
import ProjectActivity from "../features/project/pages/ProjectActivity";
import ProjectSetting from "../features/project/pages/ProjectSettings";
import ProjectForm from "../features/project/pages/ProjectForm";
import ProjectList from "../features/projectList/components/containers/ProjectList";

import Issues from "../features/issueList/pages/Issues";
import Issue from "../features/issue/pages/Issue";
import IssueOverview from "../features/issue/pages/IssueOverview";
import IssueTasks from "../features/issueTasks/pages/IssueTasks";
import IssueComments from "../features/issueComments/pages/IssueComments";
import IssueSettings from "../features/issue/pages/IssueSettings";
import IssueForm from "../features/issue/pages/IssueForm";
import IssueList from "../features/issueList/components/containers/IssueList";

import Teams from "../features/teamList/pages/Teams";
import Team from "../features/team/pages/Team";
import TeamOverview from "../features/team/pages/TeamOverview";
import TeamSettings from "../features/team/pages/TeamSettings";
import TeamForm from "../features/team/pages/TeamForm";
import TeamList from "../features/teamList/components/containers/TeamList";

import Profile from "../features/profile/pages/Profile";

const NoComponent = () => {
  return <h1>404</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile">
            <Route path=":id" element={<Profile />} />
          </Route>
          {/* collaborator route */}
          <Route path="collaborators" element={<Collaborators />}>
            <Route index element={<CollaboratorList />} />
          </Route>
          {/* project route */}
          <Route path="projects" element={<Projects />}>
            <Route index element={<ProjectList />} />
            <Route path="new" element={<ProjectForm />} />
            <Route path=":id" element={<Project />}>
              <Route path="overview" element={<ProjectOverview />} />
              <Route path="issues" element={<ProjectIssues />} />
              <Route path="members" element={<ProjectMembers />} />
              <Route path="activity" element={<ProjectActivity />} />
              <Route path="settings" element={<ProjectSetting />} />
            </Route>
          </Route>
          {/* team route */}
          <Route path="teams" element={<Teams />}>
            <Route index element={<TeamList />} />
            <Route path="new" element={<TeamForm />} />
            <Route path=":id" element={<Team />}>
              <Route path="overview" element={<TeamOverview />} />
              <Route path="settings" element={<TeamSettings />} />
            </Route>
          </Route>
          {/* issue route */}
          <Route path="issues" element={<Issues />}>
            <Route index element={<IssueList />} />
            <Route path="new" element={<IssueForm />} />
            <Route path=":id" element={<Issue />}>
              <Route path="overview" element={<IssueOverview />} />
              <Route path="tasks" element={<IssueTasks />} />
              <Route path="comments" element={<IssueComments />} />
              <Route path="settings" element={<IssueSettings />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NoComponent />} />
    </Routes>
  );
};

export default App;
