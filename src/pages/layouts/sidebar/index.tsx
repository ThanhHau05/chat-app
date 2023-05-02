import { DROP_PROFILE_OPTIONS } from "@/components/constants/select-options";
import { SimpleInput } from "@/components/input";
import { AuthContext } from "@/context/auth-context";
import { SideBarContext, SideBarProvider } from "@/context/sidebar-context";
import { Images } from "@/images";
import { useContext } from "react";
import { GrSearch } from "react-icons/gr";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";

export const SideBar = () => {
  return (
    <SideBarProvider>
      <_SideBarContainer />
    </SideBarProvider>
  );
};

const _SideBarContainer = () => {
  const { input, setInput, inputRef } = useContext(SideBarContext);

  return (
    <div className="h-full bg-white border-r-2 w-[344px]">
      <_UserChat />
      <div className="w-full h-[calc(100%-80px)] pl-6">
        <div className="w-full pr-3">
          <SimpleInput
            Icon={GrSearch}
            setCurrentValue={setInput}
            currentValue={input}
            inputRef={inputRef}
            width="w-full"
          />
        </div>
      </div>
    </div>
  );
};

const _UserChat = () => {
  const { loggedInUser, infouser, signOut } = useContext(AuthContext);
  const { profileoption, setProfileOption, onClickProfileOption, listRef } =
    useContext(SideBarContext);

  return (
    <div className="flex items-center w-full h-20 pl-6 pr-3">
      <img
        alt=""
        src={infouser.photoUrl ? infouser.photoUrl : Images.user.src}
        className="border-2 border-indigo-900 rounded-full h-14 w-14 drop-shadow-sm"
      />
      <div className="flex items-center justify-between w-full h-full py-3 pl-2">
        <div className="w-full">
          <h2 className="w-full overflow-hidden font-medium text-indigo-900 drop-shadow-sm whitespace-nowrap text-ellipsis">
            {infouser.name}
          </h2>
          <span className="text-sm">@{infouser.username}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-900">
          <div className="flex justify-center">
            <HiOutlineDotsVertical
              className="text-xl cursor-pointer"
              onClick={() => setProfileOption(!profileoption)}
            />
            {profileoption && (
              <div
                ref={listRef}
                className="absolute mt-8 after:h-0 after:w-0 after:border-x-8 after:border-b-8 after:border-x-transparent after:contents-[''] after:border-b-slate-200 after:absolute after:-top-2 after:right-2/4 after:-mr-2 z-10"
              >
                {DROP_PROFILE_OPTIONS.map((item, index) =>
                  _ProfileOptions({
                    title: item.title,
                    Icon: item.Icon,
                    value: item.value,
                    onClick: onClickProfileOption,
                  })
                )}
              </div>
            )}
          </div>
          <IoLogOutOutline
            className="text-2xl cursor-pointer"
            onClick={() => signOut()}
          />
        </div>
      </div>
    </div>
  );
};

const _ProfileOptions = ({
  title,
  Icon,
  value,
  onClick,
}: {
  title: string;
  Icon: IconType;
  value: string;
  onClick: (value: string) => void;
}) => {
  return (
    <div
      className="flex items-center justify-center p-1 px-2 text-sm transition-all border-2 rounded-md cursor-pointer hover:bg-slate-300 drop-shadow-md bg-slate-200"
      onClick={() => onClick(value)}
    >
      <Icon className="mr-2" />
      <h2>{title}</h2>
    </div>
  );
};