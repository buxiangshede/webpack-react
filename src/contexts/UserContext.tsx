import type { UserProfile } from "@/types/user";
import { type PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/stores";

interface UserContextValue {
  user: UserProfile | null;
  setUser: (updater: UserProfile | null | ((prev: UserProfile | null) => UserProfile | null)) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useAtom(userAtom);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return ctx;
};
