import { useClickOutSide } from "@/hooks/useClickOutSide";
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from "react";

interface SideBarContextProps {
  profileoption: boolean;
  setProfileOption: Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
  onClickProfileOption: (e: string) => void;
  listRef: RefObject<HTMLDivElement>;
}
export const SideBarContext = createContext({} as SideBarContextProps);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [profileoption, setProfileOption] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
  };
  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};
