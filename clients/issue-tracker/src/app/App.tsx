import { Route, Routes } from "react-router-dom";

import { Main } from "../common/components/Main";
import { PrivateRoutes } from "../common/components/PrivateRoutes";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/Signup";

import { EmailVerification } from "../features/auth/pages/EmailVerification";
import { Home } from "../features/home/pages/Home";
import Item from "../features/issue/components/Item/Item";
import { Profile } from "../features/user/pages/Profile";
import { BoardView, ListView, View } from "../features/views";

function NoComponent() {
  return <h1>404</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="email-verification" element={<EmailVerification />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="me" element={<Profile />} />
          <Route path="i/:itemId" element={<Item />} />
          <Route path=":workspaceId/home" element={<Home />} />
          <Route path=":workspaceId/v" element={<View />}>
            <Route path="l/:viewId" element={<ListView />} />
            <Route path="b/:viewId" element={<BoardView />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NoComponent />} />
    </Routes>
  );
}
