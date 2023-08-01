import React from "react";
import "./FilterDropdown.scss";
import CommonDropdown from "../CommonDropdown/CommonDropdown";
import { FilterIcon } from "../../../../assets/svg/SvgIcon";
import CustomSelect from "../../Select/Select";
import CommonButton from "../../CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const FilterDropdown = ({
  level,
  setLevel,
  status,
  setStatus,
  levelOptions,
  statusOptions,
}: {
  level: any;
  setLevel: any;
  status: any;
  setStatus: any;
  levelOptions?: any;
  statusOptions?: any;
}) => {
  const navigate = useNavigate();
  return (
    <CommonDropdown
      toogleContent={
        <span>
          <FilterIcon />
          Filters
        </span>
      }
      className="filter-dropdown"
    >
      <ul>
        <li>
          <label>Level</label>
          <CustomSelect
            options={levelOptions}
            defaultValue={levelOptions[0]}
            onChange={(e: any) => setLevel(e)}
            value={level}
          />
        </li>
        <li>
          <label>Status</label>
          <CustomSelect
            options={statusOptions}
            defaultValue={statusOptions[0]}
            onChange={(e: any) => setStatus(e)}
            value={status}
          />
        </li>
      </ul>
      <div className="d-flex btns-wrap">
        <Dropdown.Item href="#">
          {" "}
          <CommonButton
            title="Clear Filter"
            className="primary"
            onClick={() => {
              setLevel(levelOptions[0]);
              setStatus(statusOptions[0]);
              navigate("/auth/projects");
            }}
          />
        </Dropdown.Item>
        <Dropdown.Item href="#">
          <CommonButton
            title="Apply Filter"
            className="primary"
            disabled={!level.value && !status?.value}
            onClick={() =>
              navigate("/auth/projects", { state: { level, status } })
            }
          />
        </Dropdown.Item>
      </div>{" "}
    </CommonDropdown>
  );
};

export default FilterDropdown;
