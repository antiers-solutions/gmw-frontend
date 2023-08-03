import CommonDropdown from "../CommonDropdown/CommonDropdown";
import "./ProfileDropdown.scss";

const ProfileDropdown = () => {
  //get user's data
  const user: any = JSON.parse(localStorage.getItem("isLogged") || "{}");

  return (
    <div className="profile-dropdown">
      <span className="dropdown-icon">
        <img
          style={{ borderRadius: "50%" }} //to-do
          src={user.image_url || ""}
          alt="img"
        />
      </span>
      <strong>{user.name || "-"}</strong>
    </div>
  );
};

export default ProfileDropdown;
