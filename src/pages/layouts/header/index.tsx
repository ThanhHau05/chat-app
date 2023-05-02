import { SimpleInput } from "@/components/input";
import { AuthContext } from "@/context/auth-context";
import { HeaderContext, HeaderProvider } from "@/context/header-context";
import { Images } from "@/images";
import Image from "next/image";
import { useContext } from "react";
import { RiUserSearchLine } from "react-icons/ri";

export const Header = () => {
  return (
    <HeaderProvider>
      <HeaderContainer />
    </HeaderProvider>
  );
};

const HeaderContainer = () => {
  const { setValueSearch, valuesearch, inputref } = useContext(HeaderContext);
  const { signOut } = useContext(AuthContext);
  return (
    <div className="fixed top-0 flex items-center w-full h-16 px-6 shadow-md">
      <Image alt="" src={Images.logo} />
      <div className="flex items-center justify-center w-full h-full">
        <SimpleInput
          Icon={RiUserSearchLine}
          setCurrentValue={setValueSearch}
          currentValue={valuesearch}
          inputRef={inputref}
          width="w-2/5"
        />
      </div>
    </div>
  );
};
