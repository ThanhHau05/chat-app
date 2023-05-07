import { InfomationUser } from "@/components/constants/select-options";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "./app-context";

interface MessagePersonContextProps {
  timer: string;
  handleOnSubmit: (data: InfomationUser) => void;
}

export const MessagePersonContext = createContext(
  {} as MessagePersonContextProps
);

export const MessagePersonProvider = ({
  children,
  message,
}: {
  children: ReactNode;
  message?: string;
}) => {
  const [timer, setTimer] = useState("");
  const router = useRouter();
  const { setValueUserNameAndTitle } = useContext(AppContext);

  useEffect(() => {
    if (message) {
      let hour = new Date().getHours();
      let minute = new Date().getMinutes().toString();
      let ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour ? hour : 12;
      minute = +minute < 10 ? "0" + minute : minute;
      const time = `${hour}:${minute} ${ampm}`;
      setTimer(time);
    }
  }, [message]);

  const handleOnSubmit = (data: InfomationUser) => {
    router.push(`/messages/@${data.userName}`);
    setValueUserNameAndTitle({ username: data.userName, title: data.name });
  };

  const value = {
    timer,
    handleOnSubmit,
  };
  return (
    <MessagePersonContext.Provider value={value}>
      {children}
    </MessagePersonContext.Provider>
  );
};
