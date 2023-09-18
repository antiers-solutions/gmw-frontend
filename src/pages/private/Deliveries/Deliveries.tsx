import React from "react";
import "../Applications/Applications.scss";
import Check from "../../../assets/svg/check.svg";
import msgIcon from "../../../assets/svg/msgicon.svg";
import { useNavigate } from "react-router-dom";
import { dummyObject } from "../../../helper/dummy";
import { CommonButton, CustomTable } from "../../../components/ui";
import { useState } from "react";
import InfoCards from "../../../components/Infocard/InfoCards";

const Deliveries = () => {
  const [commonButton, setCommonButton] = useState("open");
  const navigate = useNavigate();
  const setactiveClass = (value: string) => {
    setCommonButton(value);
  };

  const fields = [
    <span className="buttonCustomOuter">
      <CommonButton
        title="Open"
        type="button"
        onClick={() => setactiveClass("open")}
        className={commonButton === "open" ? "opnBtn" : "closeBtn"}
      />
      <CommonButton
        title="Close"
        type="button"
        onClick={() => setactiveClass("close")}
        className={commonButton === "close" ? "opnBtn" : "closeBtn"}
      />{" "}
      {/* <button className="opnBtn">Open</button>
      <button className="closeBtn">Close</button> */}
    </span>,
    "Reviews",
    "Assignee",
  ];
  return (
    <div className="applicationsSec">
      <div className="heading">
        <h6 className="title" data-testid="count">
          Deliveries: {0}
        </h6>{" "}
      </div>
      <InfoCards />
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h6 className="title mb-0">Deliveries List</h6>
      </div>
      <div className="aplicationTop">
        <CustomTable
          className={` common_table  aplicationTable `}
          fields={fields}
          // pagination={!search && teamDataCount > pageLimit}
          // handleNextClick={() => pageNo >= 1 && setPageNo(pageNo + 1)}
          // handlePrevClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
          // PageLimit={pageLimit}
          // handlePageNumberClick={(value: number) => setPageNo(value)}
          // totalCount={teamDataCount || 0}
          // pageNo={pageNo}
        >
          {dummyObject.map((item, idx) => (
            <tr
              onClick={() => {
                navigate(`/auth/projects/`);
              }}
            >
              <td key={idx} data-th="name">
                <p>
                  {item.name}
                  <img src={Check} />
                </p>
                <p>{item.review}</p>
              </td>
              <td data-th="name">
                <img src={msgIcon} /> {item.count}
              </td>
              <td data-th="name">
                <div className="multiImgsDiv">
                  {item.image.map((items: string, index) => (
                    <img key={index} src={items} className="multiImg" />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </CustomTable>
      </div>
    </div>
  );
};

export default Deliveries;
