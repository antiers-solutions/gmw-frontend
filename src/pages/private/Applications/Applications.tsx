import React, { useEffect } from "react";
import "./Applications.scss";
import Check from "../../../assets/svg/check.svg";
import msgIcon from "../../../assets/svg/msgicon.svg";
import { useNavigate } from "react-router-dom";
import { CommonButton, CustomTable } from "../../../components/ui";
import { useState } from "react";
import InfoCards from "../../../components/Infocard/InfoCards";
import UseGetApi from "../../../hooks/UseGetApi";
import { api } from "../../../api/api";
import { firstLetterCapitalize } from "../../../helper/firstLetterCapitalize";
import ToolTip from "../../../components/ui/Tooltip/ToolTip";
import { Spinner } from "react-bootstrap";

const Applications = ({ search }: { search: string }) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const pageLimit = 10;
  const [pullRequest, setPullRequest] = useState<any[]>([]);
  const [pullRequestCount, setPullRequestCount] = useState<number>(0);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { applicationsAll } = api;
  const fields = [
    <span className="buttonCustomOuter">
      <CommonButton title="Open" type="button" className={"opnBtn"} />
      <CommonButton
        title="Close"
        type="button"
        onClick={() =>
          window.open(
            "https://github.com/w3f/Grant-Milestone-Delivery/pulls?q=is%3Apr+is%3Aclosed",
            "_blank"
          )
        }
        className={"closeBtn"}
      />{" "}
    </span>,
    "Reviews",
    "Assignee",
  ];

  // API calling function to fetch project data based on the provided URL
  const getPullRequest = async (url: string, type?: string) => {
    setLoader(true); // Set the loader to true to indicate an ongoing API call
    try {
      const project = await UseGetApi(url);

      setPullRequest(
        type === "search" ? project?.data || [] : project?.data?.proposals || []
      ); // Set the project data array with the fetched data or an empty array if no data is available
      setPullRequestCount(
        type === "search"
          ? pullRequestCount || 0
          : project?.data?.totalCount || 0
      ); // Set the project data count with the fetched count or 0 if count is not available
    } catch (e) {}
    setLoader(false); // Set the loader to false after the API call is completed
  };

  useEffect(() => {
    getPullRequest(applicationsAll(pageLimit, pageNo));
  }, [pageLimit, pageNo]);

  return (
    <div className="applicationsSec">
      {loader ? (
        <div className="loaderStyle">
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      ) : null}
      <div className="heading">
        <h6 className="title" data-testid="count">
          Applications: {pullRequestCount}
        </h6>{" "}
      </div>
      <InfoCards />
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h6 className="title mb-0">Applications List</h6>
      </div>
      <div className="aplicationTop">
        <CustomTable
          className={` common_table  aplicationTable `}
          fields={fields}
          pagination={!search && pullRequestCount > pageLimit}
          handleNextClick={() => pageNo >= 1 && setPageNo(pageNo + 1)}
          handlePrevClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
          PageLimit={pageLimit}
          handlePageNumberClick={(value: number) => setPageNo(value)}
          totalCount={pullRequestCount || 0}
          pageNo={pageNo}
        >
          {pullRequest.length
            ? pullRequest.map((item, idx) => (
                <tr
                  onClick={() => {
                    navigate(`/auth/applications/${item.id}`);
                  }}
                >
                  <td key={item?.id} data-th="Name">
                    <p>
                      {firstLetterCapitalize(item?.file_name)}
                      <img src={Check} alt="image" />
                    </p>
                    {/* <p>{item.review}</p> */}
                  </td>
                  <td data-th="Reviews">
                    <img src={msgIcon} alt="image" /> {item?.reviewers?.length}
                  </td>
                  <td data-th="Assignee">
                    <div className="multiImgsDiv">
                      {item?.assignee_details?.length
                        ? item?.assignee_details?.map(
                            (items: any, index: number) => (
                              <ToolTip
                                type="image"
                                data={items}
                                tooltipData={items?.git_user_name}
                              />
                            )
                          )
                        : null}
                    </div>
                  </td>
                </tr>
              ))
            : null}
        </CustomTable>
      </div>
    </div>
  );
};

export default Applications;
