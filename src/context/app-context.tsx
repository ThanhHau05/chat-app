import { auth, dbg } from "@/firebase";
import {
  useCheckUser,
  useGetInfomationUser,
  useSaveInfomationUser,
  useUpdateLastSeen,
} from "@/hooks/useAuth";
import { CustomParameters, User, UserCredential, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

interface AppContextProps {
  signInWithGoogle: (
    scopes?: string[] | undefined,
    customOAuthParameters?: CustomParameters | undefined
  ) => Promise<UserCredential | undefined>;
  loggedInUser: User | null | undefined;
  loggedloading: boolean;
  infousersidebar: {
    name: string;
    photoUrl: string;
    username: string;
  };
  setInfoUserSidebar: Dispatch<
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
  valueusernameandtitle: {
    username: string;
    title: string;
  };
  setValueUserNameAndTitle: Dispatch<
    SetStateAction<{
      username: string;
      title: string;
    }>
  >;
  isMounted: boolean;
  setIsMounted: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext({} as AppContextProps);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [signInWithGoogle, user, signinloading, signinerror] =
    useSignInWithGoogle(auth);
  const [loggedInUser, loggedloading, loggederror] = useAuthState(auth);
  const [infousersidebar, setInfoUserSidebar] = useState({
    name: "",
    photoUrl: "",
    username: "",
  });
  const [loadingprivate, setLoadingPrivate] = useState(true);
  const [onpublic, setOnPublic] = useState(true);
  const [valueusernameandtitle, setValueUserNameAndTitle] = useState({
    username: "",
    title: "",
  });

  const [isMounted, setIsMounted] = useState(false);

  const [loggedInUsers, setLoggedInUsers] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      const username = router.asPath.split("/@").pop();
      const queryTitle = query(
        collection(dbg, "users"),
        where("userName", "==", username)
      );
      const title = await getDocs(queryTitle);
      username && title.docs[0]
        ? setValueUserNameAndTitle({
            username: username,
            title: title.docs[0].data().name,
          })
        : null;
    };
    handle();
  }, [router.asPath]);

  const onSignOut = async () => {
    if (loggedInUser) {
      useUpdateLastSeen(loggedInUser.uid);
    }
    router.push("/");
    setInfoUserSidebar({ name: "", photoUrl: "", username: "" });
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoadingPrivate(false);
      setLoggedInUsers(user);
    });

    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    const handle = async () => {
      if (
        loggedInUser?.uid &&
        loggedInUser.displayName &&
        loggedInUser.email &&
        loggedInUser.photoURL
      ) {
        const users = await useCheckUser(loggedInUser.uid);
        if (users) {
          setLoadingPrivate(true);
          useSaveInfomationUser(
            loggedInUser.uid,
            loggedInUser.displayName,
            loggedInUser.email,
            loggedInUser.photoURL
          ).then(() => {
            location.reload();
          });
        } else {
          useUpdateLastSeen(loggedInUser.uid);
          const user = await useGetInfomationUser(loggedInUser?.uid);
          if (user?.name && user?.photoURL && user?.userName) {
            setInfoUserSidebar({
              name: user?.name,
              photoUrl: user?.photoURL,
              username: user?.userName,
            });
          }
        }
      }
    };
    handle();
  }, [loggedInUser]);

  useEffect(() => {
    async function handle() {
      if (loggedInUser?.uid) {
        const user = await useGetInfomationUser(loggedInUser?.uid);
        if (user?.name && user?.photoURL && user?.userName) {
          setInfoUserSidebar({
            name: user?.name,
            photoUrl: user?.photoURL,
            username: user?.userName,
          });
        }
      }
    }
    handle();
  }, [loggedInUser]);

  const value = {
    signInWithGoogle,
    loggedInUser,
    loggedloading,
    onSignOut,
    infousersidebar,
    setInfoUserSidebar,
    loadingprivate,
    setLoadingPrivate,
    setOnPublic,
    onpublic,
    loggedInUsers,
    setLoggedInUsers,
    valueusernameandtitle,
    setValueUserNameAndTitle,
    isMounted,
    setIsMounted,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
