import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CustomTable, DetailCard } from "../ui";
import UseGetApi from "../../hooks/UseGetApi";
import { firstLetterCapitalize } from "../../helper/firstLetterCapitalize";
import { api } from "../../api/api";
import { DocIcon, ProjectIcon } from "../../assets/svg/SvgIcon";
import { useNavigate, useParams } from "react-router-dom";
import { splitText } from "../../helper/splitText";
import { timeFormat } from "../../helper/timeFormat";
import { getStatusName } from "../../helper/getStatusClass";
let fields = ["Milestone", "Delivery ID", "Link"];

const ProjectDetail = ({
  setLoader,
  setMdContent,
  setCardData,
  setProjectStatus,
  projectStatus,
  ID,
}: {
  setLoader?: any;
  setMdContent?: any;
  setCardData?: any;
  setProjectStatus?: any;
  projectStatus?: string;
  ID?: string;
}) => {
  const { id } = useParams(); // get id
  const navigate = useNavigate(); //route
  const [teamData, setTeamData] = useState([
    {
      name: "Team Name",
      info: "-",
    },
    {
      name: "Team ID",
      info: "-",
    },
    {
      name: "Approved on",
      info: "-",
    },
  ]);

  const [applicationData, setApplicationData] = useState([
    {
      name: "Application Name",
      info: "-",
    },
    {
      name: "Application ID",
      info: "-",
    },

    {
      name: "Approved on",
      info: "-",
    },
    {
      name: "Status",
      info: "",
    },
  ]);
  const [milestoneData, setMilestoneData] = useState([
    {
      name: "Currency",
      info: "-",
    },
    {
      name: "Cost",
      info: "-",
    },
  ]);
  const [deliveryData, setDeliveryData] = useState([]);

  //state
  const [cardData, setCardDatas] = useState([
    {
      text: "-",
      subText: "Project ID",
      icon: <DocIcon />,
    },
    {
      text: "-",
      subText: "Project Name",
      icon: <ProjectIcon />,
      class: "pink",
    },
  ]);

  //API links
  const { projectById, milestoneById, teamById, projectStatusChange } = api;

  useEffect(() => {
    if (applicationData[3].info.toLocaleLowerCase() !== projectStatus) {
      updateStatus(projectStatusChange());
    }
  }, [projectStatus]);

  // Function to fetch project data from the API based on the provided URL
  const getProjectData = async (url: string) => {
    try {
      const project = await UseGetApi(url);
      // Extract data from the response
      const {
        project_name,
        status,
        team_id,
        start_date,
        total_cost,
        md_content,
      } = project.data[0];
      // Update state variables with the extracted data
      setProjectStatus(status || "-");
      setMdContent(md_content || "");
      const card = [...cardData];
      const application = [...applicationData];
      const team = [...teamData];
      const milestone = [...milestoneData];
      card[1].text =
        (project_name && firstLetterCapitalize(project_name)) || "-";
      application[0].info =
        (project_name && firstLetterCapitalize(project_name)) || "-";
      application[3].info = (status && getStatusName(status)) || "-";
      team[1].info = team_id || "-";
      milestone[1].info = `${total_cost?.amount || "-"}`;
      milestone[0].info = `${total_cost?.currency?.toUpperCase() || "-"}`;
      application[2].info = `${start_date ? timeFormat(start_date) : "-"}`;
      setCardDatas(card || []);
      setCardData(card || []);
      setApplicationData(application || []);
      setTeamData(team || []);
      setMilestoneData(milestone || []);
      // Call the team API using the 'teamById' API endpoint and the 'team_id'
      getTeamData(teamById(team_id));
    } catch (err) {
      navigate(-1);
    }
  };
  // Function to fetch team data from the API based on the provided URL
  const getTeamData: any = async (url: string) => {
    try {
      const team = await UseGetApi(url);
      // Extract data from the response
      const teams = [...teamData];
      teamData[0].info =
        firstLetterCapitalize(team?.data?.teamData?.name) || "-";
      setTeamData(teams || []);
    } catch (e) {}
    setLoader(false);
  };

  // Function to fetch milestone data from the API based on the provided URL
  const getMilestoneData: any = async (url: string) => {
    try {
      const milestone = await UseGetApi(url);
      // Extract data from the response and process it into a formatted array of milestones
      const milestones = milestone?.data?.map((item: any) => {
        const sliceIndex = item?.file_name?.lastIndexOf(".");
        const milestoneName =
          item?.file_name ||
          "-"
            .slice(0, sliceIndex)
            .trim()
            .replace(/^\w/, (c: string) => c.toUpperCase());

        return {
          milestone: milestoneName || "-",
          id: item?.id || "-",
          hash: item?.project_md_link || "-",
        };
      });
      // Update the state variable with the formatted array of milestones
      setDeliveryData(milestones || []);
    } catch (error) {}
    setLoader(false);
  };

  const updateStatus = async (url: string) => {
    const payload = {
      updatedStatus: projectStatus,
      id,
    };
    const statusUpdated = await UseGetApi(url, "put", payload);
    if (statusUpdated?.data === "success") {
      getProjectData(projectById(String(id)));
    }
  };
  // useEffect hook for API calling
  useEffect(() => {
    // Check if 'id' is not provided, if not, navigate back to the previous page
    // if (!id) {
    //   navigate(-1);
    //   return;
    // }
    // Set loading state to true before making the API calls
    setLoader(true);
    // Make API calls to fetch project, team, and milestone data based on the 'id'
    getProjectData(projectById(id || ID || ""));
    getMilestoneData(milestoneById(id || ID || ""));
    const card = [...cardData];
    const application = [...applicationData];
    card[0].text = id || ID || "";
    application[1].info = id || ID || "";
    // Update the 'cardData' and 'applicationData' state with the 'id'
    setCardData(card);
    setApplicationData(application);
  }, [id]);
  return (
    <div className="project inner-layout">
      <Row className="mb-3 mb-md-5">
        <Col md={6} xl={8} className="mb-4 mb-md-0">
          <DetailCard
            heading="Application Details"
            contentList={applicationData}
          />
        </Col>
        <Col md={6} xl={4}>
          <DetailCard
            heading="Team Details"
            className="flex"
            contentList={teamData}
          />
        </Col>
      </Row>
      <Row style={{ alignItems: "flex-start" }}>
        <Col md={6} xl={8} className="mb-4 mb-md-0">
          <DetailCard heading="Delivery Information">
            <CustomTable fields={fields}>
              {deliveryData?.length
                ? deliveryData.map((item: any, index) => (
                    <tr>
                      <td
                        className="fw600"
                        data-testid={`milestone-${index}-name`}
                      >
                        {item?.milestone?.slice(
                          0,
                          item?.milestone?.indexOf(".")
                        ) || "-"}
                      </td>
                      <td data-testid={`milestone-${index}-id`}>{item.id}</td>
                      <td data-testid={`milestone-${index}-link`}>
                        <a href={item.hash} target="_blank" rel="noreferrer">
                          {splitText(item.hash, 9)}
                        </a>
                      </td>
                    </tr>
                  ))
                : null}
            </CustomTable>
          </DetailCard>
        </Col>
        <Col md={6} xl={4}>
          <DetailCard
            heading="Milestone Details"
            className="flex"
            contentList={milestoneData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail;
