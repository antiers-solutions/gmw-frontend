import { Col, Row } from "react-bootstrap";
import { CustomTable, InfoCard, Loader } from "../../../components/ui";
import { DollarIcon, TagIcon } from "../../../assets/svg/SvgIcon";
import { useEffect, useState } from "react";
import UseGetApi from "../../../hooks/UseGetApi";
import { useLocation, useNavigate } from "react-router-dom";
import { firstLetterCapitalize } from "../../../helper/firstLetterCapitalize";
import { api } from "../../../api/api";
import { getStatusClass } from "../../../helper/getStatusClass";

const cardData = [
  {
    text: "$1,534",
    percText: "+7",
    subText: "Lorem Ispum",
    icon: <TagIcon />,
  },
  {
    text: "$1,700",
    percText: "+7",
    subText: "Lorem Ispum",
    icon: <TagIcon />,
    class: "pink",
  },
  {
    text: "$1,800",
    percText: "+7",
    subText: "Lorem Ispum",
    icon: <TagIcon />,
    class: "purple",
  },
  {
    text: "$20,000",
    subText: "Total Amount Paid",
    icon: <DollarIcon />,
    class: "green",
  },
];

const fields = ["Name", "Started On", "Level", "Status", "Cost", "Milestone"];

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
      {loader ? <Loader /> : null}
      <h6 className="title">Grants: {projectDataCount}</h6>
      <Row className="mb-3 mb-lg-5">
        {cardData.map((item: any, index) => (
          <Col xxl={3} sm={6} className="mb-4 mb-xxl-0" key={index}>
            <InfoCard
              className={item.class}
              icon={item.icon}
              text={item.text}
              percText={item.percText}
              subText={item.subText}
            />
          </Col>
        ))}
      </Row>
      <h6 className="title mb-4">Projects List</h6>
      <CustomTable
        fields={fields}
        pagination={!search}
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
                  <td className="fw600">
                    {firstLetterCapitalize(item?.project_name) || "-"}
                  </td>
                  <td>{item.start_date || "-"}</td>
                  <td>{Number(item?.level) || "-"}</td>
                  <td className={getStatusClass(item.status)}>
                    {firstLetterCapitalize(item.status) || "-"}
                  </td>{" "}
                  <td className="fw700">{`${item.total_cost.amount || "-"} ${
                    item.total_cost.currency?.toUpperCase() || "-"
                  }`}</td>
                  <td>{`${item.milestones?.length || 0} / ${
                    item.totalMilestones
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
