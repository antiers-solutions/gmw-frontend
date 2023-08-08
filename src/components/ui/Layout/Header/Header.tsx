import { Container, Row, Col } from "react-bootstrap";
import ProfileDropdown from "../../Dropdowns/ProfileDropdown/ProfileDropdown";
import logo from "../../../../assets/images/mob-logo.png";
import {
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from "../../../../assets/svg/SvgIcon";
import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FilterDropdown from "../../Dropdowns/FilterDropdown/FilterDropdown";
import { alphaNumeric } from "../../../../helper/alphaNumeric";

const LevelOptions = [
  {
    value: "",
    label: "Select Level",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
];
const StatusOptions = [
  {
    value: "",
    label: "Select Status",
  },
  {
    value: "active",
    label: "In-Progress",
  },
  {
    value: "complete",
    label: "Completed",
  },
  {
    value: "hold",
    label: "Hold",
  },
];

const Header = (props: {
  ToggleSidebar?: any;
  isOpen?: boolean;
  getSearchData?: any;
}) => {
  // State to control whether the search bar is visible or hidden
  const [searchBar, setSearchBar] = useState<boolean>(false); // Show search bar
  const [search, setSearch] = useState<string>(""); // Show search bar
  const [level, setLevel] = useState<any>(LevelOptions[0]);
  const [status, setStatus] = useState<any>(StatusOptions[0]);

  // React Router hook to access the current location
  const location = useLocation();
  const navigate = useNavigate();
  // Function that will be called when the form is submitted
  const onSubmit = (e: any, values: any) => {
    e.preventDefault();
    props.getSearchData(values); // Call the 'getSearchData' function with the search value
  };

  // useEffect hook to handle side effects related to the route and search bar
  useEffect(() => {
    // Clear search state when the route changes
    setLevel(LevelOptions[0]);
    setStatus(StatusOptions[0]);
    // Call 'getSearchData' with an empty search value when the route changes

    // Check if the current route is '/auth/team' or '/auth/projects'
    if (["/auth/team", "/auth/projects"].includes(location.pathname)) {
      // If the route is one of the specified paths, show the search bar
      setSearchBar(true);
      return;
    }

    // If the route is not one of the specified paths, hide the search bar
    setSearchBar(false);
  }, [location.pathname]);

  useEffect(() => {
    setSearch("");
    props.getSearchData("");
  }, [location.key]);

  // Assuming the alphaNumeric regex pattern is already defined somewhere in your code
  const setInputState = (value: string) => {
    setLevel(LevelOptions[0]);
    setStatus(StatusOptions[0]);
    if (alphaNumeric.test(value)) {
      setSearch(value);
      props.getSearchData(value);
    }
    if (!value) {
      setSearch(value);
      props.getSearchData(value);
    }
  };

  return (
    <header className="header">
      <Container fluid className="px-0">
        <Row className="align-items-center">
          <Col xs={1} className="d-xl-none">
            <div className="mob-logo">
              <img src={logo} alt="mob-logo" />
            </div>
          </Col>
          <Col xs={11} md={4} xl={3} className="order-md-last">
            <div className="d-flex align-items-center justify-content-end ">
              {/* <NotificationDropdown /> */}
              <ProfileDropdown />
              <div className="toggle-btn" onClick={props.ToggleSidebar}>
                {props.isOpen ? <CloseIcon /> : <MenuIcon />}
              </div>
            </div>
          </Col>
          <Col xs={12} md={7} xl={9} className="mt-5 mt-md-0">
            {searchBar ? (
              <div className="header__search">
                <form onSubmit={(e) => onSubmit(e, search)}>
                  <div className={`common_input`}>
                    <input
                      className="form-control"
                      maxLength={255}
                      placeholder={`Search By ${
                        location.pathname === "/auth/projects"
                          ? "Project Name"
                          : "Team Name"
                      }`}
                      type="text"
                      onChange={(e: any) => setInputState(e.target.value)}
                      value={search}
                      name="search"
                    />
                    <SearchIcon />
                    {/* <button
                      type="submit"
                      className="header__search__search cursor-pointer"
                    >
                      <SearchIcon />
                    </button> */}
                  </div>
                </form>

                <div className="header__search__actions">
                  {/* <button
                      type="submit"
                      className="header__search__search cursor-pointer"
                    >
                      <SearchIcon />
                    </button> */}
                  {location.pathname === "/auth/projects" ? (
                    <>
                      <span className="header__search__divider" />
                      <div className="header__search__right">
                        <FilterDropdown
                          level={level}
                          setLevel={(value: any) => setLevel(value)}
                          status={status}
                          setStatus={(value: any) => setStatus(value)}
                          levelOptions={LevelOptions}
                          statusOptions={StatusOptions}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
