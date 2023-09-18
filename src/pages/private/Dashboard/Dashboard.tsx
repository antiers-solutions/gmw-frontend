import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { CustomTable } from "../../../components/ui";
import UseGetApi from "../../../hooks/UseGetApi";
import { useLocation, useNavigate } from "react-router-dom";
import { firstLetterCapitalize } from "../../../helper/firstLetterCapitalize";
import { api } from "../../../api/api";
import { getStatusClass, getStatusName } from "../../../helper/getStatusClass";
import InfoCards from "../../../components/Infocard/InfoCards";
import { timeFormat } from "../../../helper/timeFormat";
import ToolTip from "../../../components/ui/Tooltip/ToolTip";
import FilterIcon from "../../../assets/svg/sortIcon.svg";
import "./Dashboard.scss";

const Dashboard = ({ search }: { search: string }) => {
  const fields = [
    <span className="sortIcon">
      Name
      <span
        onClick={() => sortedData("name", orderBy === "asc" ? "desc" : "asc")}
      >
        <img src={FilterIcon} alt="Filter" />
      </span>
    </span>,
    <span className="sortIcon">
      Started On
      <span
        onClick={() => sortedData("date", orderBy === "asc" ? "desc" : "asc")}
      >
        <img src={FilterIcon} alt="Filter" />
      </span>
    </span>,
    "Status",
    "Cost",
    "Level",
    "Milestones",
  ];
  // State variables
  const [pageNo, setPageNo] = useState<number>(1);
  const pageLimit = 10;
  const [projectDataArray, setProjectDataArray] = useState<any[]>([]);
  const [projectDataCount, setProjectDataCount] = useState<number>(0);
  const [loader, setLoader] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [orderBy, setOrderBy] = useState("asc");

  // React Router hook to manage navigation
  const navigate = useNavigate();
  const location = useLocation();

  // API links
  const { allProject, projectByName, filteredProject } = api;
  useEffect(() => {
    if (!search) {
      const { level, status } = location?.state || {};
      const projectDataFunction = location.state
        ? () =>
            getFilterProjectData(
              filteredProject(level.value, status.value, pageLimit, pageNo)
            )
        : () => getProjectData(allProject(pageLimit, pageNo, sortBy, orderBy));

      projectDataFunction();
    }
  }, [location?.state, pageLimit, pageNo, search]);

  useEffect(() => {
    setPageNo(1);
  }, [location?.key]);

  // API calling function to fetch project data based on the provided URL
  const getProjectData = async (url: string, type?: string) => {
    setLoader(true); // Set the loader to true to indicate an ongoing API call
    try {
      const project = await UseGetApi(url);
      setProjectDataArray(
        type === "search" ? project?.data || [] : project?.data?.projects || []
      ); // Set the project data array with the fetched data or an empty array if no data is available
      setProjectDataCount(
        type === "search"
          ? projectDataCount || 0
          : project?.data?.totalCount || 0
      ); // Set the project data count with the fetched count or 0 if count is not available
    } catch (e) {}
    setLoader(false); // Set the loader to false after the API call is completed
  };

  // API calling function to fetch project data based on the provided URL
  const getFilterProjectData = async (url: string) => {
    setLoader(true); // Set the loader to true to indicate an ongoing API call
    try {
      const project = await UseGetApi(url);
      setProjectDataArray(project?.data?.filteredData || []); // Set the project data array with the fetched data or an empty array if no data is available
      setProjectDataCount(project?.data?.count || 0);
    } catch (e) {}
    setLoader(false); // Set the loader to false after the API call is completed
  };

  // useEffect hook to fetch project data based on search, page number, and page limit
  useEffect(() => {
    const timer =
      search &&
      setTimeout(() => {
        getProjectData(projectByName(search), "search");
      }, 800);

    if (!search && !location.state) {
      getProjectData(allProject(pageLimit, pageNo, sortBy, orderBy));
    }

    return () => clearTimeout(timer);
  }, [search]);

  // Function to sort and fetch project data based on sorting parameters
  const sortedData = (name: string, type: string) => {
    // Set the sorting parameters
    setOrderBy(type);
    setSortBy(name);

    // Fetch project data using the sorting parameters
    getProjectData(allProject(pageLimit, pageNo, name, type));
  };

  return (
    <div className="dashboard">
      {loader ? (
        <div className="loaderStyle">
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      ) : null}
      <h6 className="title" data-testid="count">
        Grants: {projectDataCount}
      </h6>
      <InfoCards />
      <h6 className="title mb-3 proj_listTitle">Projects List</h6>
      <CustomTable
        className="width_td"
        fields={fields}
        pagination={!search && projectDataCount > pageLimit}
        handleNextClick={() => pageNo >= 1 && setPageNo(pageNo + 1)}
        handlePrevClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
        handlePageNumberClick={(value: number) => setPageNo(value)}
        PageLimit={pageLimit}
        totalCount={projectDataCount}
        pageNo={pageNo}
      >
        {projectDataArray?.length
          ? projectDataArray?.map((item: any) => {
              return (
                <tr
                  className="cursor-pointer"
                  key={item.id}
                  data-testid="onClick"
                  onClick={() => {
                    navigate(`/auth/projects/${item.id}`);
                  }}
                >
                  <td className="fw600 setWidth" data-testid="projectName" data-th="Name">
                    <ToolTip
                      tooltipData={
                        firstLetterCapitalize(item?.project_name) || "-"
                      }
                    />
                  </td>
                  <td data-th="Started On"  > 
                    {(item?.start_date && timeFormat(item?.start_date)) || "-"}
                  </td>
                  <td className={getStatusClass(item.status)} data-th="Status">
                    {getStatusName(item?.status) || "-"}
                  </td>
                  <td className="fw700" data-th="Cost">{`${item.total_cost.amount || "-"} ${
                    item.total_cost.currency?.toUpperCase() || "-"
                  }`}</td>
                  <td data-th="Level">{Number(item?.level) || "-"}</td>
                  <td data-th="Milestones">{`${item.milestones?.length || 0} / ${
                    item.totalMilestones || item.milestones?.length
                  }`}</td>
                </tr>
              );
            })
          : null}
      </CustomTable>
    </div>
  );
};

export default Dashboard;
