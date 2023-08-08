import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./PrimaryLayout.scss";
import Header from "../Header/Header";

const PrimaryLayout = ({ getSearchData }: { getSearchData?: any }) => {
  const [isOpen, setIsopen] = useState(false);
  const [scroll, setscroll] = useState(false);

  const ToggleSidebar = () => {
    setIsopen(!isOpen);
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the ref has been assigned a DOM element
      if (ref.current) {
        // Detect the scrolling event and set the scrolling state accordingly
        if (ref.current.scrollTop > 0) {
          setscroll(true);
        } else {
          setscroll(false);
        }
      }
    };

    // Attach the scroll event listener to the ref
    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }
  }, [ref]);
  return (
    <div className="primary-layout">
      <Sidebar ToggleSidebar={ToggleSidebar} isOpen={isOpen} />
      <div className="primary-layout__right">
        <main
          className={`primary-layout__inner ${scroll ? "is-sticky" : ""}`}
          id="myHeader"
          ref={ref}
        >
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
