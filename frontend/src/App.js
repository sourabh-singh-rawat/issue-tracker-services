import { Routes, Route } from "react-router-dom";

// Routes
import Dashboard from "./routes/dashboard/dashboard.component";
import SignIn from "./routes/signin/signin.component";
import SignUp from "./routes/signup/signup.component";
import Teams from "./routes/teams/teams.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Project from "./components/project/project.component";
import Projects from "./routes/projects/projects.component";
import ProjectMembers from "./components/project-members/project-members.component";
import Issues from "./routes/issues/issues.component";
import IssuesBoard from "./components/issue-board/issues-board.component";

const NoComponent = () => {
  return <h1>404</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />}>
          <Route path=":projectId" element={<Project />}>
            <Route path=":members" element={<ProjectMembers />}></Route>
          </Route>
        </Route>
        <Route path="teams" element={<Teams />} />
        <Route path="issues" element={<Issues />}>
          <Route path=":board" element={<IssuesBoard />}></Route>
        </Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="*" element={<NoComponent />}></Route>
    </Routes>
  );
};

export default App;
