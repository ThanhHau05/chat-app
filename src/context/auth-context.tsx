import { auth } from "@/firebase";
import { useGetInfomationUser } from "@/hooks/useAuth";
import { CustomParameters, User, UserCredential } from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";

interface AuthContextProps {
  signInWithGoogle: (
    scopes?: string[] | undefined,
    customOAuthParameters?: CustomParameters | undefined
  ) => Promise<UserCredential | undefined>;
  loggedInUser: User | null | undefined;
  loggedloading: boolean;
  signOut: () => Promise<boolean>;
  infouser: {
    name: string;
    photoUrl: string;
    username: string;
  };
  setInfoUser: Dispatch<
    SetStateAction<{
      name: string;
      photoUrl: string;
      username: string;
    }>
  >;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signInWithGoogle, user, signinloading, signinerror] =
    useSignInWithGoogle(auth);
  const [loggedInUser, loggedloading, loggederror] = useAuthState(auth);
  const [signOut, signoutloading, error] = useSignOut(auth);
  const [infouser, setInfoUser] = useState({
    name: "",
    photoUrl: "",
    username: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      if (loggedInUser?.uid) {
        const user = await useGetInfomationUser(loggedInUser?.uid);
        if (user?.name && user?.photoURL && user?.userName) {
          setInfoUser({
            name: user?.name,
            photoUrl: user?.photoURL,
            username: user?.userName,
          });
        }
      }
    }
    getData();
  }, [loggedInUser]);

  useEffect(() => {
    setLoading(loggedloading);
  }, [loggedloading]);

  const value = {
    signInWithGoogle,
    loggedInUser,
    loggedloading,
    signOut,
    infouser,
    setInfoUser,
    loading,
    setLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
