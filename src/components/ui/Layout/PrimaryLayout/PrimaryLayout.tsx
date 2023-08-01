import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./PrimaryLayout.scss";
import Header from "../Header/Header";

const PrimaryLayout = ({ getSearchData }: { getSearchData?: any }) => {
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    setIsopen(!isOpen);
  };
  return (
    <div className="primary-layout">
      <Sidebar ToggleSidebar={ToggleSidebar} isOpen={isOpen} />
      <div className="primary-layout__right">
        <main className="primary-layout__inner">
          <Header
            ToggleSidebar={ToggleSidebar}
            isOpen={isOpen}
            getSearchData={(e: string) => getSearchData(e)}
          />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrimaryLayout;
