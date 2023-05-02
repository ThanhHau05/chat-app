import clsx from "clsx";
import { RefObject } from "react";
import { IoClose } from "react-icons/io5";
import { IconType } from "react-icons/lib";

export const SimpleInput = ({
  width,
  Icon,
  setCurrentValue,
  currentValue,
  inputRef,
}: {
  width: string;
  Icon: IconType;
  setCurrentValue: (value: string) => void;
  currentValue: string;
  inputRef: RefObject<HTMLInputElement>;
}) => {
  const onRemoveTextInInput = () => {
    setCurrentValue("");
    inputRef.current?.focus();
  };
  return (
    <div className={clsx("relative", width)}>
      <div className="absolute z-10 flex items-center h-full cursor-pointer">
        <Icon className="left-0 mx-3 text-xl text-slate-700" />
      </div>
      {currentValue && (
        <div
          className="absolute right-0 z-10 flex items-center h-full px-3 cursor-pointer"
          onClick={() => onRemoveTextInInput()}
        >
          <IoClose className=" text-slate-700" />
        </div>
      )}
      <input
        ref={inputRef}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        type="text"
        name=""
        id=""
        className="w-full py-2 pr-10 text-black border-2 border-gray-100 rounded-md outline-none pl-11 drop-shadow-md"
      />
    </div>
  );
};
