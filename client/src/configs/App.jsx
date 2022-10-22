import { Routes, Route } from "react-router-dom";

import Main from "../common/Main";
import Dashboard from "../features/dashboard/components/Dashboard";
import Login from "../features/auth/components/Login";
import SignUp from "../features/auth/components/Signup";
import Teams from "../features/teamList/components/Teams";
import Settings from "../features/settings/components/Settings";
import Collaborators from "../features/collaboratorList/components/Collaborators";
import CollaboratorList from "../features/collaboratorList/components/CollaboratorList";
import Project from "../features/project/components/Project";
import Projects from "../features/projectList/components/Projects";
import ProjectForm from "../features/project/components/ProjectForm";
import ProjectMembers from "../features/project/components/ProjectMembers";
import ProjectIssues from "../features/project/components/ProjectIssues";
import ProjectOverview from "../features/project/components/ProjectOverview";
import ProjectActivity from "../features/project/components/ProjectActivity";
import ProjectSetting from "../features/project/components/ProjectSettings";
import Issue from "../features/issue/components/Issue";
import Issues from "../features/issueList/component/Issues";
import IssueForm from "../features/issue/components/IssueForm";
import IssueOverview from "../features/issue/components/IssueOverview";
import IssueComments from "../features/issueComments/components/IssueComments/IssueComments";
import IssueList from "../features/issueList/component/IssueList";
import IssueTasks from "../features/issueTasks/components/IssueTasks";
import IssueSettings from "../features/issue/components/IssueSettings";
import ProjectList from "../features/projectList/components/ProjectList";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import Team from "../features/team/components/Team";
import TeamList from "../features/teamList/components/TeamList";
import TeamForm from "../features/team/components/TeamForm";
import TeamOverview from "../features/team/components/TeamOverview";
import TeamSettings from "../features/team/components/TeamSettings";
import Profile from "../features/profile/components/Profile";

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
