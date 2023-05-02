import { Header } from "../header";
import { SideBar } from "../sidebar";

export const Private = () => {
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="h-full pt-16">
        <SideBar />
      </div>
    </div>
  );
};
