import React, { createContext, useContext, useState } from "react";
import { User } from "../../../api";

export interface Auth {
  user: User | null;
}

interface InitialState {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>> | null;
}

const initialState: InitialState = {
  auth: null,
  setAuth: null,
};

export const AuthContext = createContext(initialState);

export function AuthProvider({ children }: { children: React.JSX.Element }) {
  const [auth, setAuth] = useState<Auth | null>({ user: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  if (!auth || !setAuth)
    throw new Error("Auth provider is not setup correctly");

  return {
    auth,
    setAuth,
  };
};
