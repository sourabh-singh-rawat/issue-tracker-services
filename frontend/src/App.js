import { Routes, Route } from "react-router-dom";

// Routes
import Dashboard from "./routes/dashboard/dashboard.component";
import SignIn from "./routes/signin/signin.component";
import SignUp from "./routes/signup/signup.component";
import Teams from "./routes/teams/teams.component";
import Issues from "./routes/issues/issues.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Project from "./components/project/project.component";
import Projects from "./routes/projects/projects.component";

const NoComponent = () => {
  return <h1>404</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId/:type" element={<Project />} />
        <Route path="teams" element={<Teams />} />
        <Route path="issues/:view" element={<Issues />} />
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="*" element={<NoComponent />}></Route>
    </Routes>
  );
};

export default App;
