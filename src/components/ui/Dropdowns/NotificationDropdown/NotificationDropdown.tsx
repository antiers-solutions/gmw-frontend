import { NotificationIcon } from "../../../../assets/svg/SvgIcon";
import CommonDropdown from "../CommonDropdown/CommonDropdown";
// import CommonBtn from "../../CommonBtn/CommonBtn";

import PerfectScrollbar from "react-perfect-scrollbar";
import "./NotificationDropdown.scss";
import Notification from "../../Notification/Notification";

const NotificationDropdown = () => {
  return (
    <CommonDropdown
      toogleContent={
        <span className="dropdown-icon">
          <NotificationIcon />
        </span>
      }
      className="notification-dropdown"
    >
      <div className="notification-dropdown__head d-flex align-items-center justify-content-between">
        <span className="fw-700">Notification</span>
      </div>

      <div className="notification-dropdown__body">
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          <Notification />
        </PerfectScrollbar>
      </div>

      {/* <CommonBtn
        role="link"
        to="/#"
        title="View All Notification"
        className="d-flex"
      /> */}
    </CommonDropdown>
  );
};

export default NotificationDropdown;
