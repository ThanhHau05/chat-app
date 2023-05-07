import {
  MessagePersonContext,
  MessagePersonProvider,
} from "@/context/message-person-context";
import { Images } from "@/images";
import clsx from "clsx";
import { StaticImageData } from "next/image";
import { useContext } from "react";
import { InfomationUser } from "../constants/select-options";

export function SimpleMessagePerson({
  status,
  avatar,
  message,
  name,
  data,
  userName,
}: {
  status?: boolean;
  avatar?: string | StaticImageData;
  message?: string;
  name: string;
  data: InfomationUser;
  userName: string;
}) {
  return (
    <MessagePersonProvider message={message}>
      <MessagePersonContainer
        status={status}
        avatar={avatar}
        message={message}
        name={name}
        data={data}
        userName={userName}
      />
    </MessagePersonProvider>
  );
}

function MessagePersonContainer({
  status,
  avatar,
  message,
  name,
  data,
  userName,
}: {
  status?: boolean;
  avatar?: string | StaticImageData;
  message?: string;
  name: string;
  data: InfomationUser;
  userName: string;
}) {
  const { timer, handleOnSubmit } = useContext(MessagePersonContext);

  return (
    <div className="flex items-center w-full h-20 py-0.5 pl-3 pr-3">
      <div
        onClick={() => handleOnSubmit(data)}
        className={clsx(
          "flex items-center w-full h-full pl-3 rounded-lg cursor-pointer  transition-all",
          data.userName === userName
            ? "bg-indigo-200/70"
            : "hover:bg-slate-200/70"
        )}
      >
        <div className="relative h-14 w-14">
          <div className="absolute bg-green-600 rounded-full h-3 w-3 border-2 drop-shadow-md bottom-1 right-0.5"></div>
          <img
            src={avatar ? avatar.toString() : Images.user.src}
            alt={""}
            className="w-full h-full border-2 border-gray-100 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center w-48 h-full p-2">
          <h2 className="flex items-center w-full h-5 overflow-hidden font-medium whitespace-nowrap text-ellipsis drop-shadow-sm">
            {name}
          </h2>
          {/* font-medium text-slate-900 */}
          <span className="inline-block w-full h-4 overflow-hidden text-xs text-ellipsis whitespace-nowrap">
            {message}
          </span>
        </div>
        <div className="h-full w-[calc(100%-248px)] py-3">
          <span className="block text-xs text-end">{timer}</span>
          <div className="flex justify-end w-full h-5 pr-0.5 mt-1.5">
            {/* <span className="relative flex items-center justify-center w-5 h-full rounded-full bg-cyan-700 drop-shadow-md">
              <p className="absolute text-[10px] leading-3 text-white drop-shadow-sm">
                2
              </p>
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
