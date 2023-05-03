import { auth } from "@/firebase";
import {
  useCheckUser,
  useGetInfomationUser,
  useSaveInfomationUser,
  useUpdateLastSeen,
} from "@/hooks/useAuth";
import { Images } from "@/images";
import { CustomParameters, User, UserCredential, signOut } from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

interface AuthContextProps {
  signInWithGoogle: (
    scopes?: string[] | undefined,
    customOAuthParameters?: CustomParameters | undefined
  ) => Promise<UserCredential | undefined>;
  loggedInUser: User | null | undefined;
  loggedloading: boolean;
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
  loadingprivate: boolean;
  setLoadingPrivate: Dispatch<SetStateAction<boolean>>;
  onSignOut: () => Promise<void>;
  onpublic: boolean;
  setOnPublic: Dispatch<SetStateAction<boolean>>;
  loggedInUsers: User | null;
  setLoggedInUsers: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signInWithGoogle, user, signinloading, signinerror] =
    useSignInWithGoogle(auth);
  const [loggedInUser, loggedloading, loggederror] = useAuthState(auth);
  const [infouser, setInfoUser] = useState({
    name: "",
    photoUrl: "",
    username: "",
  });
  const [loadingprivate, setLoadingPrivate] = useState(true);
  const [onpublic, setOnPublic] = useState(true);

  const [loggedInUsers, setLoggedInUsers] = useState<User | null>(null);

  const onSignOut = async () => {
    if (loggedInUser) {
      useUpdateLastSeen(loggedInUser.uid);
    }
    setInfoUser({ name: "", photoUrl: "", username: "" });
    await signOut(auth);
  };

  useEffect(() => {
    if (loggedInUser?.uid) {
      useUpdateLastSeen(loggedInUser.uid);
    }
  }, [loggedInUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoadingPrivate(false);
      setLoggedInUsers(user);
    });

    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setOnPublic(false);
      if (user) {
        const checkUser = async () => {
          const users = await useCheckUser(user.uid);
          if (users) {
            setLoadingPrivate(true);
            useSaveInfomationUser(
              user.uid,
              user.displayName ? user.displayName : "unknown",
              user.email ? user.email : "unknown",
              user.photoURL ? user.photoURL : Images.user
            ).then(() => {
              location.reload();
            });
          }
        };
        checkUser();
      }
    });

    return unsubscribe;
  }, []);

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

  const value = {
    signInWithGoogle,
    loggedInUser,
    loggedloading,
    onSignOut,
    infouser,
    setInfoUser,
    loadingprivate,
    setLoadingPrivate,
    setOnPublic,
    onpublic,
    loggedInUsers,
    setLoggedInUsers,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
