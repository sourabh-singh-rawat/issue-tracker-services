import { Route, Routes } from "react-router-dom";

import { PrivateRoutes } from "../common";
import { Main } from "../common/components/Main";
import {
  BoardView,
  HomePage,
  ListView,
  LoginPage,
  ProfilePage,
  SignUpPage,
} from "../features";
import { EmailVerification } from "../features/auth/pages/EmailVerification";
import { ItemPage } from "../features/item";

function NoComponent() {
  return <h1>404</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="email-verification" element={<EmailVerification />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="me" element={<ProfilePage />} />
          <Route path="i/:itemId" element={<ItemPage />} />
          <Route path=":workspaceId/home" element={<HomePage />} />
          <Route path=":workspaceId/v/l/:viewId" element={<ListView />} />
          <Route path=":workspaceId/v/b/:viewId" element={<BoardView />} />
        </Route>
      </Route>
      <Route path="*" element={<NoComponent />} />
    </Routes>
  );
}
