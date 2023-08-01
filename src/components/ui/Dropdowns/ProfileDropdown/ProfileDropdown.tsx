import CommonDropdown from "../CommonDropdown/CommonDropdown";
import { Link } from "react-router-dom";
import "./ProfileDropdown.scss";
import { logoutUser } from "../../../../helper/logout";

const ProfileDropdown = () => {
  //get user's data
  const user: any = JSON.parse(localStorage.getItem("isLogged") || "{}");

  return (
    <>
      <CommonDropdown
        toogleContent={
          <>
            <span className="dropdown-icon">
              <img
                style={{ borderRadius: "50%" }} //to-do
                src={user.image_url || ""}
                alt="img"
              />
            </span>
            <strong>{user.name || "-"}</strong>
          </>
        }
        className="profile-dropdown"
      >
        <ul className="profile-dropdown__list">
          <li onClick={() => logoutUser()}>
            <Link to="/" className="d-block">
              Logout
            </Link>
          </li>
        </ul>
      </CommonDropdown>
    </>
  );
};

export default ProfileDropdown;
