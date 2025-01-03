import { Route, Routes } from "react-router-dom";

import { Main } from "../common/components/Main";
import { PrivateRoutes } from "../common/components/PrivateRoutes";
import { SignUpPage } from "../features/auth";
import { EmailVerification } from "../features/auth/pages/EmailVerification";
import Login from "../features/auth/pages/Login";
import { Home } from "../features/home/pages/Home";
import Item from "../features/item/components/Item/Item";
import { BoardView, ListView } from "../features/view";

function NoComponent() {
  return <h1>404</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="email-verification" element={<EmailVerification />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="i/:itemId" element={<Item />} />
          <Route path=":workspaceId/home" element={<Home />} />
          <Route path=":workspaceId/v/l/:viewId" element={<ListView />} />
          <Route path=":workspaceId/v/b/:viewId" element={<BoardView />} />
        </Route>
      </Route>
      <Route path="*" element={<NoComponent />} />
    </Routes>
  );
}
