import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export function SimpleMessagePerson({
  status,
  avatar,
  message,
  name,
}: {
  status?: boolean;
  avatar: string | StaticImageData;
  message: string;
  name: string;
}) {
  const [timer, setTimer] = useState("");
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

  return (
    <div className="flex items-center h-20 p-2 w-80 ">
      <div className="flex items-center w-full h-full">
        <div className="relative h-14 w-14">
          <div className="absolute bg-green-600 rounded-full h-3 w-3 border-2 drop-shadow-md bottom-1 right-0.5"></div>
          <Image
            src={avatar}
            alt={""}
            className="w-full h-full border-2 border-gray-100 rounded-full "
          />
        </div>
        <div className="w-3/5 h-full p-2">
          <h2 className="inline-block w-full h-5 overflow-hidden font-medium text-indigo-900 whitespace-nowrap text-ellipsis drop-shadow-sm">
            {name}
          </h2>
          {/* font-medium text-slate-900 */}
          <span className="inline-block w-full h-4 overflow-hidden text-xs text-ellipsis whitespace-nowrap">
            {message}
          </span>
        </div>
        <div className="h-full w-[calc(100%-238.4px)] py-3">
          <span className="block text-xs text-end">{timer}</span>
          <div className="flex justify-end w-full h-5 pr-0.5 mt-1.5">
            <span className="relative flex items-center justify-center w-5 h-full rounded-full bg-cyan-700 drop-shadow-md">
              <p className="absolute text-[10px] leading-3 text-white drop-shadow-sm">
                2
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
