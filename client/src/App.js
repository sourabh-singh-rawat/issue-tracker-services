import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setCurrentUser } from "./reducers/user.reducer";
import { onAuthStateChangedListener } from "./auth/firebase-config";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Teams from "./pages/Teams/Teams";
import Sidebar from "./components/Sidebar/Sidebar";
import Project from "./pages/Project/Project";
import Projects from "./pages/Projects/Projects";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectOverview from "./components/ProjectOverview/ProjectOverview";
import ProjectMembers from "./components/ProjectMembers/ProjectMembers";
import ProjectActivity from "./components/Activity/Activity";
import Issue from "./components/Issue/Issue";
import Issues from "./pages/Issues/Issues";
import IssuesList from "./components/IssuesList/IssuesList";
import IssueForm from "./components/IssueForm/IssueForm";
import TeamForm from "./components/TeamForm/TeamForm";
import ProjectList from "./components/ProjectList/ProjectList";
import IssueOverview from "./components/IssueOverview/IssueOverview";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import ProjectSetting from "./components/ProjectSettings/ProjectSettings";
import IssueSettings from "./components/IssueSettings/IssueSettings";
import IssueTasks from "./components/IssueTasks/IssueTasks";
import TeamList from "./components/TeamList/TeamList";
import Team from "./pages/Team/Team";
import TeamOverview from "./components/TeamOverview/TeamOverview";
import TeamSettings from "./components/TeamSettings/TeamSettings";
import ProjectIssues from "./components/ProjectIssues/ProjectIssues";

const NoComponent = () => {
  return <h1>404</h1>;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChangedListener(async (user) => {
      if (user) {
        await user.getIdToken();
        const { displayName, email } = user;
        localStorage.setItem("user", JSON.stringify({ displayName, email }));

        dispatch(setCurrentUser(user));
      }
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          {/* list routes */}
          <Route path="issues" element={<Issues />}>
            <Route index element={<IssuesList />} />
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
            <Route path="new" element={<IssueForm />} />
            <Route path=":id" element={<Issue />}>
              <Route path="overview" element={<IssueOverview />} />
              <Route path="tasks" element={<IssueTasks />} />
              <Route path="settings" element={<IssueSettings />} />
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
