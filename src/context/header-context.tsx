import { InfomationUser } from "@/components/constants/select-options";
import { useGetUserNameList } from "@/hooks/useAuth";
import { useClickOutSide } from "@/hooks/useClickOutSide";
import { ChatSelection } from "@/pages/layouts/header/header";
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
import { AuthContext } from "./auth-context";

interface HeaderContextProps {
  valuesearch: string;
  setValueSearch: Dispatch<SetStateAction<string>>;
  inputref: RefObject<HTMLInputElement>;
  valuedelaytime: string;
  setValueDelayTime: Dispatch<SetStateAction<string>>;
  usersearchlist: boolean;
  usersearchlistRef: RefObject<HTMLDivElement>;
  onFocus: () => void;
  _handleCheckItemConversation: () => boolean;
  filteritemsconversation: (JSX.Element | undefined)[] | undefined;
}

export const HeaderContext = createContext({} as HeaderContextProps);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [valuesearch, setValueSearch] = useState("");
  const [valuedelaytime, setValueDelayTime] = useState("");
  const [usersearchlist, setUserSearchList] = useState(true);
  const [filteritemsconversation, setFilterItemsConversation] =
    useState<(JSX.Element | undefined)[]>();
  const inputref = useRef<HTMLInputElement>(null);
  const { loggedInUser } = useContext(AuthContext);

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
      if (valuedelaytime) {
        const value: [] = await useGetUserNameList();
        let count = 0;
        setFilterItemsConversation([]);
        const filteredItems = value?.map((item: InfomationUser, index) => {
          if (
            item.userName.includes(valuedelaytime) &&
            item.email !== loggedInUser?.email
          ) {
            count++;
            return (
              <ChatSelection
                key={index}
                index={index}
                name={item.name}
                photoURL={item.photoURL}
                userName={item.userName}
              />
            );
          }
        });
        if (count === 0)
          filteredItems.push(<h2 key="no-results">No results were found</h2>);
        setFilterItemsConversation(filteredItems);
      }
    };
    handle();
  }, [valuedelaytime]);

  const _handleCheckItemConversation = () => {
    const myDiv = document
      .querySelector(".container-conversation")
      ?.querySelector(".item-conversation");
    const item = myDiv?.querySelector(".item-conversation");
    if (item) return true;
    else return false;
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
    _handleCheckItemConversation,
    filteritemsconversation,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
