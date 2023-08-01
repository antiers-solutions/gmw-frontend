import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./CommonDropdown.scss";

const CommonDropdown = ({ children, toogleContent, className, align }: any) => {
  return (
    <Dropdown
      id="CustomDropdown"
      className={`common-dropdown ${className}`}
      align={align ? align : "end"}
    >
      <Dropdown.Toggle>{toogleContent}</Dropdown.Toggle>
      <Dropdown.Menu>
        <div className={`common-dropdown__content ${className}__content`}>
          {children}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CommonDropdown;
