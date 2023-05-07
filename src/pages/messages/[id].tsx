import { AppContext } from "@/context/app-context";
import Head from "next/head";
import { useContext } from "react";
import Header from "../layouts/header/header";
import SideBar from "../layouts/sidebar/sidebar";

const MessagesContainer = () => {
  const { valueusernameandtitle, onSignOut } = useContext(AppContext);
  return (
    <div>
      <Head>
        <title>
          {valueusernameandtitle.title
            ? `Messages with ${valueusernameandtitle.title}`
            : "Chat App"}
        </title>
      </Head>
      <button onClick={() => onSignOut()}>Submit</button>
      <h2>MESSAGES</h2>
    </div>
  );
};

const Messages = () => {
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="flex h-full pt-16">
        <SideBar />
        <MessagesContainer />
      </div>
    </div>
  );
};

export default Messages;
