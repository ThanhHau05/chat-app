import { InfomationUser } from "@/components/constants/select-options";
import { dbg } from "@/firebase";
import { useAddConVersation, useGetUserNameList } from "@/hooks/useAuth";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { ChatSelection } from "@/pages/layouts/header/header";
import { collection, getDocs, query, where } from "firebase/firestore";
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

interface HeaderContextProps {
  valuesearch: string;
  setValueSearch: Dispatch<SetStateAction<string>>;
  inputref: RefObject<HTMLInputElement>;
  valuedelaytime: string;
  setValueDelayTime: Dispatch<SetStateAction<string>>;
  usersearchlist: boolean;
  usersearchlistRef: RefObject<HTMLDivElement>;
  onFocus: () => void;
  filteritemsconversation: (JSX.Element | null)[] | undefined;
  AddConversation: (recipientEmail: string) => void;
}

export const HeaderContext = createContext({} as HeaderContextProps);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [valuesearch, setValueSearch] = useState("");
  const [valuedelaytime, setValueDelayTime] = useState("");
  const [usersearchlist, setUserSearchList] = useState(true);
  const [filteritemsconversation, setFilterItemsConversation] =
    useState<(JSX.Element | null)[]>();
  const inputref = useRef<HTMLInputElement>(null);
  const { loggedInUser, infousersidebar, setIsMounted } =
    useContext(AppContext);

  useEffect(() => {
    if (valuesearch !== valuedelaytime && valuedelaytime) {
      setValueDelayTime("");
    }
  }, [valuedelaytime, valuesearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValueDelayTime(valuesearch);
    }, 700);
    return () => clearTimeout(timer);
  }, [valuesearch]);

  useEffect(() => {
    const handle = async () => {
      setFilterItemsConversation([]);
      if (valuedelaytime) {
        const value: [] = await useGetUserNameList();
        let count = 0;
        let filteredItems = await Promise.all(
          value?.map(async (item: string) => {
            if (
              item.includes(valuedelaytime) &&
              item !== infousersidebar.username
            ) {
              const queryRef = query(
                collection(dbg, "users"),
                where("userName", "==", item)
              );
              const infomationUser = (
                await getDocs(queryRef)
              ).docs[0].data() as InfomationUser;
              count++;
              return (
                <ChatSelection
                  key={infomationUser.id}
                  index={infomationUser.id}
                  name={infomationUser.name}
                  photoURL={infomationUser.photoURL}
                  userName={infomationUser.userName}
                  email={infomationUser.email}
                />
              );
            }
            return null;
          })
        );
        if (count === 0) {
          filteredItems = [];
          filteredItems.push(<h2 key="no-results">No results were found</h2>);
        }
        setFilterItemsConversation(filteredItems);
      }
    };
    handle();
  }, [valuedelaytime]);

  const AddConversation = (recipientEmail: string) => {
    if (loggedInUser?.email) {
      useAddConVersation(loggedInUser.email, recipientEmail).then(() => {
        setIsMounted(true);
      });
    }
  };

  const onFocus = () => {
    if (valuedelaytime) setUserSearchList(true);
  };

  const usersearchlistRef = useClickOutSide(() => {
    setUserSearchList(false);
  });

  const value = {
    valuesearch,
    setValueSearch,
    inputref,
    valuedelaytime,
    setValueDelayTime,
    usersearchlist,
    usersearchlistRef,
    onFocus,
    filteritemsconversation,
    AddConversation,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
