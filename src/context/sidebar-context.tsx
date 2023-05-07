import { dbg } from "@/firebase";
import { useGetUsersConversations } from "@/hooks/useAuth";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "./app-context";

interface SideBarContextProps {
  profileoption: boolean;
  setProfileOption: Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
  onClickProfileOption: (e: string) => void;
  listRef: RefObject<HTMLDivElement>;
  messagerinfomation: QueryDocumentSnapshot<DocumentData>[];
}
export const SideBarContext = createContext({} as SideBarContextProps);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [profileoption, setProfileOption] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [messagerinfomation, setMessagerInfomation] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);

  const { loggedInUser, isMounted, setIsMounted } = useContext(AppContext);

  useEffect(() => {
    const handle = async () => {
      if (isMounted && loggedInUser?.email) {
        setMessagerInfomation([]);
        const array: [] = await useGetUsersConversations(loggedInUser?.email);
        array?.map(async (item) => {
          const queryMessagePerson = query(
            collection(dbg, "users"),
            where("email", "==", item)
          );
          const info = await getDocs(queryMessagePerson);
          setMessagerInfomation((prev) => [...prev, ...info.docs]);
        });
        setIsMounted(false);
      }
    };
    handle();
  }, [isMounted, setMessagerInfomation]);

  useEffect(() => {
    const handle = async () => {
      if (loggedInUser?.email) {
        setMessagerInfomation([]);
        const array: [] = await useGetUsersConversations(loggedInUser?.email);
        const messageInfo = [];
        if (array) {
          for (const item of array) {
            const queryMessagePerson = query(
              collection(dbg, "users"),
              where("email", "==", item)
            );
            const info = await getDocs(queryMessagePerson);
            messageInfo.push(...info.docs);
          }
        }
        setMessagerInfomation(messageInfo);
      }
    };
    handle();
  }, [loggedInUser?.email]);

  const listRef = useClickOutSide(() => {
    setProfileOption(false);
  });

  const onClickProfileOption = (e: string) => {
    setProfileOption(false);
    if (e === "edit profile") {
      console.log("hi");
    }
  };

  const value = {
    profileoption,
    setProfileOption,
    input,
    setInput,
    inputRef,
    onClickProfileOption,
    listRef,
    messagerinfomation,
  };
  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};
