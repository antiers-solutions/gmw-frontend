import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  ApplicationsIcon,
  DashboardIcon,
  DeliveriesIcon,
  LogoutIcon,
  TeamIcon,
} from "../../../../assets/svg/SvgIcon";
import "./Sidebar.scss";
import UseGetApi from "../../../../hooks/UseGetApi";
import { api } from "../../../../api/api";
import { setCsrfToken } from "../../../../helper/setToken";

const sidebarLinks = [
  {
    name: "Projects",
    icon: <DashboardIcon />,
    to: "/auth/projects",
  },
  {
    name: "Teams",
    icon: <TeamIcon />,
    to: "/auth/team",
  },
  {
    name: "Deliveries",
    icon: <DeliveriesIcon />,
    to: "/auth/deliveries",
  },
  {
    name: "Applications",
    icon: <ApplicationsIcon />,
    to: "/auth/applications",
  },
];

const Sidebar = (props: { ToggleSidebar?: any; isOpen?: boolean }) => {
  const navigate = useNavigate();
  const { logout } = api;

  const userLogout = async () => {
    await UseGetApi(logout(), "delete");
    setCsrfToken("");
    navigate("/");
  };

  return (
    <>
      <div className={`sidebar ${props.isOpen === true ? "active" : ""}`}>
        <div className="sidebar__head">
          <Link to="/auth/projects">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="sidebar__wrap">
          <ul className="sidebar__nav">
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              {sidebarLinks.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.to}>
                    <span className="sidebar-icon">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </PerfectScrollbar>
          </ul>

          <button
            type="button"
            onClick={() => userLogout()}
            className="sidebar__logoutBtn"
          >
            <span className="sidebar-icon">
              <LogoutIcon />
            </span>
            Logout
          </button>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${props.isOpen === true ? "active" : ""}`}
        onClick={props.ToggleSidebar}
      />
    </>
  );
};

export default Sidebar;
