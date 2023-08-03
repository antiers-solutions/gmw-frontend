import { useEffect, useState } from "react";
import {
  CommonButton,
  CustomTable,
  TeamMergeModal,
} from "../../../components/ui";
import UseGetApi from "../../../hooks/UseGetApi";
import { useNavigate } from "react-router-dom";
import { firstLetterCapitalize } from "../../../helper/firstLetterCapitalize";
import { api } from "../../../api/api";
import "./Deliveries.scss";
import { Spinner } from "react-bootstrap";
import InfoCards from "../../../components/Infocard/InfoCards";

// const fields = [
//   "Team Name",
//   "Total Projects",
//   "Ongoing",
//   "Delivered",
//   "Proposed",
//   "Terminated",
// ];

const fields = [
  "Team Name",
  "Total Projects",
  "Active",
  "Completed",
  "Hold",
  "Rejected",
];

const TeamsMainPage = ({ search }: { search?: string }) => {
  const pageLimit = 10;
  const navigate = useNavigate(); // change route

  //state
  const [pageNo, setPageNo] = useState(1);
  const [teamDataArray, setTeamDataArray] = useState([]);
  const [teamDataCount, setTeamDataCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [statusCount, setStatusCount] = useState([]);

  //api links
  const { allTeam, teamByName } = api;

  const getTeamData: any = async (url: string) => {
    setLoader(true);
    // Fetch team data using the provided API URL
    try {
      const team = await UseGetApi(url);

      // Set the team data array to the fetched data or an empty array if no data is available
      setTeamDataArray(team?.data?.teams || []);

      // Set the count of team data items to the fetched count or 0 if count is not available
      setTeamDataCount(team?.data?.totalCount || 0);
      setStatusCount(team?.data?.statusCount || []);
    } catch (e) {}
    // Set the loading state to false
    setLoader(false);
  };

  useEffect(() => {
    let timer: any;
    if (search) {
      timer = setTimeout(() => {
        getTeamData(teamByName(search));
      }, 800);
    } else {
      getTeamData(allTeam(pageLimit, pageNo));
    }

    return () => clearTimeout(timer);
  }, [search, pageNo, pageLimit]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    getTeamData(allTeam(pageLimit, pageNo));
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="inner-layout">
        <h6 className="title">Teams: {teamDataCount}</h6>
        <InfoCards />
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h6 className="title mb-0">Teams List</h6>
          <CommonButton
            title="Merge"
            className="primary"
            onClick={handleShow}
          />
        </div>
        {loader ? (
          <Spinner animation="border" variant="primary"></Spinner>
        ) : null}
        <CustomTable
          fields={fields}
          pagination={!search && teamDataCount > pageLimit}
          handleNextClick={() => pageNo >= 1 && setPageNo(pageNo + 1)}
          handlePrevClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
          PageLimit={pageLimit}
          handlePageNumberClick={(value: number) => setPageNo(value)}
          totalCount={teamDataCount || 0}
          pageNo={pageNo}
        >
          {teamDataArray.length
            ? teamDataArray?.map((item: any, index: number) => {
                return (
                  <tr
                    key={item.id}
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/auth/team/${item.id}`);
                    }}
                  >
                    <td className="fw600">
                      {firstLetterCapitalize(item?.name) || "-"}
                    </td>
                    <td>{item.projects.length || "-"}</td>
                    <td>
                      {(statusCount?.length &&
                        statusCount[index][item?.name || ""]["active"]) ||
                        0}
                    </td>
                    <td>
                      {(statusCount?.length &&
                        statusCount[index][item?.name || ""]["complete"]) ||
                        0}
                    </td>
                    <td>
                      {(statusCount?.length &&
                        statusCount[index][item?.name || ""]["hold"]) ||
                        0}
                    </td>
                    <td>0</td>
                  </tr>
                );
              })
            : null}
        </CustomTable>
      </div>
      {show ? <TeamMergeModal show={show} onHide={handleClose} /> : null}
    </>
  );
};

export default TeamsMainPage;
