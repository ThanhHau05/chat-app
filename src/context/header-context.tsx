import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from "react";

interface HeaderContextProps {
  valuesearch: string;
  setValueSearch: Dispatch<SetStateAction<string>>;
  inputref: RefObject<HTMLInputElement>;
}

export const HeaderContext = createContext({} as HeaderContextProps);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [valuesearch, setValueSearch] = useState("");
  const inputref = useRef<HTMLInputElement>(null);

  const value = {
    valuesearch,
    setValueSearch,
    inputref,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
