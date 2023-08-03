import { Spinner } from "react-bootstrap";
import { CustomTable } from "../../../components/ui";
import { useEffect, useState } from "react";
import UseGetApi from "../../../hooks/UseGetApi";
import { useLocation, useNavigate } from "react-router-dom";
import { firstLetterCapitalize } from "../../../helper/firstLetterCapitalize";
import { api } from "../../../api/api";
import { getStatusClass } from "../../../helper/getStatusClass";
import { timeFormat } from "../../../helper/timeFoemat";
import InfoCards from "../../../components/Infocard/InfoCards";

const fields = ["Name", "Started On", "Level", "Status", "Cost", "Milestones"];

const Dashboard = ({ search }: { search: string }) => {
  // State variables
  const [pageNo, setPageNo] = useState<number>(1);
  const pageLimit = 10;
  const [projectDataArray, setProjectDataArray] = useState<any[]>([]);
  const [projectDataCount, setProjectDataCount] = useState<number>(0);
  const [loader, setLoader] = useState(false);

  // React Router hook to manage navigation
  const navigate = useNavigate();
  const location = useLocation();

  // API links
  const { allProject, projectByName, filteredProject } = api;
  useEffect(() => {
    if (location.state) {
      const { level, status } = location?.state;
      getFilterProjectData(
        filteredProject(level.value, status.value, pageLimit, pageNo)
      );
    } else {
      getProjectData(allProject(pageLimit, pageNo));
    }
  }, [location?.state, pageLimit, pageNo]);

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
    let timer: any;
    if (search) {
      timer = setTimeout(() => {
        getProjectData(projectByName(search), "search");
      }, 800);
    } else {
      getProjectData(allProject(pageLimit, pageNo));
    }

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="dashboard">
      {loader ? <Spinner animation="border" variant="primary"></Spinner> : null}
      <h6 className="title">Grants: {projectDataCount}</h6>
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
              // const FinalLevel = Number(item?.level);
              return (
                <tr
                  className="cursor-pointer"
                  key={item.id}
                  onClick={() => {
                    navigate(`/auth/projects/${item.id}`);
                  }}
                >
                  <td className="fw600 setWidth">
                    {firstLetterCapitalize(item?.project_name) || "-"}
                  </td>
                  <td>
                    {(item?.start_date && timeFormat(item?.start_date)) || "-"}
                  </td>
                  <td>{Number(item?.level) || "-"}</td>
                  <td className={getStatusClass(item.status)}>
                    {firstLetterCapitalize(item.status) || "-"}
                  </td>{" "}
                  <td className="fw700">{`${item.total_cost.amount || "-"} ${
                    item.total_cost.currency?.toUpperCase() || "-"
                  }`}</td>
                  <td>{`${item.milestones?.length || 0} / ${
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
