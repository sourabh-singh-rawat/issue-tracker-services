import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setCurrentUser } from "./redux/user/user.reducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase.utils";
import Dashboard from "./routes/Dashboard/Dashboard";
import SignIn from "./routes/SignIn/SignIn";
import SignUp from "./routes/SignUp/SignUp";
import Teams from "./routes/Teams/Teams";
import Sidebar from "./components/Sidebar/Sidebar";
import Project from "./components/Project/Project";
import Projects from "./routes/Projects/Projects";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectOverview from "./components/ProjectOverview/ProjectOverview";
import ProjectPeople from "./components/ProjectPeople/ProjectPeople";
import ProjectActivity from "./components/Activity/Activity";
import Issue from "./components/Issue/Issue";
import Issues from "./routes/Issues/Issues";
import IssuesList from "./components/IssuesList/IssuesList";
import IssueForm from "./components/IssueForm/IssueForm";
import TeamForm from "./components/TeamForm/TeamForm";
import ProjectList from "./components/ProjectList/ProjectList";
import IssueOverview from "./components/IssueOverview/IssueOverview";
import ProtectedRoutes from "./routes/ProtectedRoutes/ProtectedRoutes";

const NoComponent = () => {
  return <h1>404</h1>;
};

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Authentication
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) dispatch(setCurrentUser(user));
    });
  }, [auth]);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
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
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NoComponent />} />
    </Routes>
  );
};

export default App;
