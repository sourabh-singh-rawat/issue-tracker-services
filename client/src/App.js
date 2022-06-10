import { Routes, Route } from "react-router-dom";
import Dashboard from "./routes/dashboard/dashboard";
import SignIn from "./routes/signin/signin";
import SignUp from "./routes/signup/signup";
import Teams from "./routes/teams/teams";
import Sidebar from "./components/Sidebar/Sidebar";
import Project from "./components/Project/Project";
import Projects from "./routes/projects/projects";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectOverview from "./components/ProjectOverview/ProjectOverview";
import ProjectPeople from "./components/ProjectPeople/ProjectPeople";
import ProjectActivity from "./components/Activity/Activity";
import Issue from "./components/Issue/Issue";
import Issues from "./routes/Issues/issues";
import IssuesList from "./components/IssuesList/IssuesList";
import IssueForm from "./components/IssueForm/IssueForm";
import TeamForm from "./components/TeamForm/TeamForm";
import ProjectList from "./components/ProjectList/ProjectList";
import IssueOverview from "./components/IssueOverview/IssueOverview";

const NoComponent = () => {
  return <h1>404</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        {/* list routes */}
        <Route path="teams" element={<Teams />} />
        <Route path="issues" element={<Issues />}>
          <Route index element={<IssuesList />} />
        </Route>
        {/* project route */}
        <Route path="projects" element={<Projects />}>
          <Route path="all" element={<ProjectList />} />
          <Route path="create" element={<ProjectForm />} />
          <Route path=":projectId" element={<Project />}>
            <Route path="overview" element={<ProjectOverview />} />
            <Route path="issues" element={<IssuesList />} />
            <Route path="people" element={<ProjectPeople />} />
            <Route path="activity" element={<ProjectActivity />} />
          </Route>
        </Route>
        {/* team route */}
        <Route path="teams">
          <Route path="create" element={<TeamForm />} />
        </Route>
        {/* issue route */}
        <Route path="issues" element={<Issues />}>
          <Route path="create" element={<IssueForm />} />
          <Route path=":issueId" element={<Issue />}>
            <Route path="overview" element={<IssueOverview />} />
          </Route>
        </Route>
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NoComponent />} />
    </Routes>
  );
};

export default App;
