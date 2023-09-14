import React from "react";
import "./ProfileDropdown.scss";
import { getCsrfToken } from "../../../../helper/setToken";

const ProfileDropdown = () => {
  //get user's data
  const user: any = JSON.parse(getCsrfToken() || "{}");

  return (
    <div className="profile-dropdown">
      <span className="dropdown-icon">
        <img
          style={{ borderRadius: "50%" }} //to-do
          src={user.image_url || ""}
          alt="img"
        />
      </span>
      <strong data-testid="name">{user?.name || user?.gitId || "-"}</strong>
    </div>
  );
};

export default ProfileDropdown;
