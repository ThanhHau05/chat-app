import clsx from "clsx";
import { FC, InputHTMLAttributes, RefObject } from "react";
import { IoClose } from "react-icons/io5";
import { IconType } from "react-icons/lib";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width: string;
  Icon: IconType;
  setCurrentValue: (value: string) => void;
  currentValue: string;
  inputRef: RefObject<HTMLInputElement>;
}

export const SimpleInput: FC<SimpleInputProps> = ({
  width,
  Icon,
  setCurrentValue,
  currentValue,
  inputRef,
  ...rest
}) => {
  const onRemoveTextInInput = () => {
    setCurrentValue("");
    inputRef.current?.focus();
  };

  const handleChange = (e: string) => {
    if (!e.startsWith(" ")) setCurrentValue(e);
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
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        name=""
        id=""
        className="w-full py-2 pr-10 text-black border-2 border-gray-100 rounded-md outline-none pl-11 drop-shadow-md"
        {...rest}
      />
    </div>
  );
};
