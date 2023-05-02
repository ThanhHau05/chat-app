import { SimpleButton } from "@/components/button";
import { AuthContext } from "@/context/auth-context";
import { useSaveInfomationUser } from "@/hooks/useAuth";
import { Images } from "@/images";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdAccountCircle } from "react-icons/md";
import { Private } from "./layouts/private";

const _Login = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Image
        alt=""
        src={Images.backgroundlogin}
        className="w-3/5 h-3/5 -ml-80"
      />

      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col gap-5">
          <SimpleButton
            onClick={() => console.log("hi")}
            title="Sign In With Account"
            Icon={MdAccountCircle}
          />
          <SimpleButton
            onClick={signInWithGoogle}
            title="Sign In With Google"
            Icon={FcGoogle}
          />
        </div>
        <span className="text-sm font-medium">
          You don't have an account?{" "}
          <button className="transition-all text-cyan-800 drop-shadow-md hover:text-cyan-950">
            Sign Up
          </button>
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  const { loggedInUser, loggedloading } = useContext(AuthContext);
  useEffect(() => {
    if (loggedInUser) {
      useSaveInfomationUser(
        loggedInUser.uid,
        loggedInUser.displayName ? loggedInUser.displayName : "unknown",
        loggedInUser.email ? loggedInUser.email : "unknown",
        loggedInUser.photoURL ? loggedInUser.photoURL : ""
      );
    }
  }, [loggedInUser]);
  if (!loggedInUser && !loggedloading) return <_Login />;
  return <Private />;
}