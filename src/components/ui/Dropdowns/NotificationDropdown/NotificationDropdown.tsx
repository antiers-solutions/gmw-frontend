import CommonDropdown from "../CommonDropdown/CommonDropdown";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./NotificationDropdown.scss";
import Notification from "../../Notification/Notification";

const NotificationDropdown = () => {
  return (
    <CommonDropdown
      toogleContent={<span className="dropdown-icon"></span>}
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
    </CommonDropdown>
  );
};

export default NotificationDropdown;
