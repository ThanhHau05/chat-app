import Header from "../header/header";
import SideBar from "../sidebar/sidebar";

const Private = () => {
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="h-full pt-16">
        <SideBar />
      </div>
    </div>
  );
};

export default Private;
