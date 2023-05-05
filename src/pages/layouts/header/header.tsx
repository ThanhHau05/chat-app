import { SimpleInput } from "@/components/input";
import { AuthContext } from "@/context/auth-context";
import { HeaderContext, HeaderProvider } from "@/context/header-context";
import { Images } from "@/images";
import clsx from "clsx";
import Image from "next/image";
import { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { RiUserSearchLine } from "react-icons/ri";

const Header = () => {
  return (
    <HeaderProvider>
      <HeaderContainer />
    </HeaderProvider>
  );
};

const HeaderContainer = () => {
  const { loggedInUser } = useContext(AuthContext);
  const {
    setValueSearch,
    valuesearch,
    inputref,
    valuedelaytime,
    usersearchlist,
    usersearchlistRef,
    filteritemsconversation,
    onFocus,
  } = useContext(HeaderContext);

  return (
    <div className="fixed top-0 flex items-center w-full h-16 px-6 shadow-md">
      <Image alt="" src={Images.logo} />
      <div className="flex justify-center w-full h-full">
        <div
          ref={usersearchlistRef}
          className="relative flex flex-col items-center w-2/5 h-full pt-2.5 gap-2"
        >
          <SimpleInput
            onFocus={onFocus}
            placeholder="Username search"
            Icon={RiUserSearchLine}
            setCurrentValue={setValueSearch}
            currentValue={valuesearch}
            inputRef={inputref}
            width="w-full"
          />
          {valuesearch && usersearchlist && (
            <div
              className={clsx(
                "container-conversation flex flex-col gap-2 justify-center w-full py-2 max-h-96 bg-white rounded-md  drop-shadow-md",
                valuedelaytime ? "items-start" : "items-center",
                filteritemsconversation![0] === undefined && "items-center"
              )}
            >
              {!valuedelaytime ? (
                <AiOutlineLoading3Quarters className="text-xl text-gray-900 animate-spin " />
              ) : (
                filteritemsconversation
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ChatSelection = ({
  index,
  photoURL,
  name,
  userName,
}: {
  index: number;
  photoURL: string;
  name: string;
  userName: string;
}) => {
  return (
    <div
      key={index}
      className="flex items-center justify-between w-full px-2 transition-all hover:bg-slate-100 group/item item-conversation"
    >
      <div className="flex items-center w-[calc(100%-140px)]">
        <img src={photoURL} alt="" className="w-10 h-10 rounded-full" />
        <div className="w-full pl-2">
          <h2 className="font-medium drop-shadow-md">{name}</h2>
          <span className="text-sm font-medium text-indigo-900 drop-shadow-md">
            @{userName}
          </span>
        </div>
      </div>
      <div className="flex items-center invisible p-1 px-2 mr-2 font-medium text-gray-800 transition-all rounded-md cursor-pointer group-hover/item:visible hover:scale-105 hover:bg-indigo-400 group/items">
        <span className="block w-full pr-1 text-xs group-hover/items:text-white">
          Add Conversations
        </span>
        <BiMessageRoundedAdd className="group-hover/items:text-white" />
      </div>
    </div>
  );
};

export default Header;
