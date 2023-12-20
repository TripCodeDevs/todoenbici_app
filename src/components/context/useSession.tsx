"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface User {
  detailsUser: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    phone: string;
    status: "authenticated" | "unauthenticated";
  };
  token: string;
}

interface AuthContextType {
  user: User | null;
  setAuthData: (userData: User) => void;
}

const UseSession = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const infoSession = localStorage.getItem("userData");
    if (infoSession) {
      setUser(JSON.parse(infoSession));
    }
  }, []);

  const setAuthData = (userData: User) => {
    setUser(userData);

    sessionStorage.setItem("userData", JSON.stringify(userData));
  };

  return (
    <UseSession.Provider value={{ user, setAuthData }}>
      {children}
    </UseSession.Provider>
  );
}

export function useAuth() {
  const context = useContext(UseSession);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
