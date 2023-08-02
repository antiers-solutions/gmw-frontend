import CommonDropdown from "../CommonDropdown/CommonDropdown";
import "./ProfileDropdown.scss";

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
      ></CommonDropdown>
    </>
  );
};

export default ProfileDropdown;
