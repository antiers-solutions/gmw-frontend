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
import { logoutUser } from "../../../../helper/logout";

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
              {sidebarLinks.map((item) => (
                <li>
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
            onClick={() => logoutUser(navigate)}
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
