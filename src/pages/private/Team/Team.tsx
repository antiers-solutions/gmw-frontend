import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  CommonButton,
  CustomTable,
  DetailCard,
  InfoCard,
  Loader,
} from "../../../components/ui";
import {
  ApplicationsIcon,
  DocIcon,
  ProjectIcon,
  TeamIcon,
} from "../../../assets/svg/SvgIcon";
import "./Team.scss";
import { useNavigate, useParams } from "react-router-dom";
import UseGetApi from "../../../hooks/UseGetApi";
import { firstLetterCapitalize } from "../../../helper/firstLetterCapitalize";
import { api } from "../../../api/api";
import { getStatusClass, getStatusName } from "../../../helper/getStatusClass";
import { addZero } from "../../../helper/addZero";

const fields = ["Project name", "Status"];

const Team = ({ ID }: { ID?: string }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [cardData, setCardData] = useState([
    {
      text: "-",
      subText: "Team ID",
      icon: <DocIcon />,
    },
    {
      text: "-",
      subText: "Team Name",
      icon: <TeamIcon />,
      class: "pink",
    },
    {
      text: "-",
      subText: "Applications",
      icon: <ApplicationsIcon />,
      class: "purple",
    },
    {
      text: "-",
      subText: "Projects",
      icon: <ProjectIcon />,
      class: "green",
    },
  ]);

  const [applicationData, setApplicationData] = useState([
    {
      name: "Accepted",
      info: "00",
    },
    {
      name: "In-Review",
      info: "00",
    },

    {
      name: "Rejected",
      info: "00",
    },
  ]);

  const [teamDatas, setTeamDatas] = useState([
    {
      name: "Completed",
      info: "0",
    },
    {
      name: "In-Progress",
      info: "0",
    },

    {
      name: "Hold",
      info: "0",
    },
  ]);

  const [deliveryData, setDeliveryData] = useState([]);

  //api links
  const { teamById } = api;

  // API function to fetch team data
  const geTeamData = async (url: string) => {
    try {
      const team = await UseGetApi(url);
      // Extract data from the response and update the state variables accordingly
      const { teamData, projectsData } = team?.data;
      const card: any = [...cardData];
      card[0].text = id || ID;
      card[1].text = firstLetterCapitalize(teamData?.name) || "-";
      card[3].text = projectsData?.length || "-";
      let active = 0;
      let complete = 0;
      let hold = 0;
      let projectStatus: any = [...teamDatas];
      const projectDetail =
        (projectsData?.length &&
          projectsData?.map((project: any) => {
            if (project?.status === "complete") {
              complete++;
            } else if (project?.status === "active") {
              active++;
            } else {
              hold++;
            }
            return {
              name: firstLetterCapitalize(project?.project_name) || "-",
              status: project?.status || "-",
              id: project?.id || "-",
            };
          })) ||
        [];
      projectStatus[0].info = addZero(String(complete));
      projectStatus[1].info = addZero(String(active));
      projectStatus[2].info = addZero(String(hold));
      setTeamDatas(projectStatus || []);
      setCardData(card || []);
      setDeliveryData(projectDetail || []);
    } catch (e) {
      navigate(-1); // If team data is not found, navigate back to the previous page
    }
    setLoader(false);
  };

  // API calling useEffect
  useEffect(() => {
    // If 'id' is not found, navigate back to the previous page
    if (!id && !ID) {
      navigate(-1);
      return;
    }
    setLoader(true);
    geTeamData(teamById(id || ID || ""));
  }, [id]);

  return (
    <div className="team-page inner-layout">
      {loader ? <Loader /> : null}
      <h6 className="title">Teams</h6>
      <Row className="mb-3 mb-lg-5">
        {cardData.map((item, index) => (
          <Col xxl={3} sm={6} key={index} className="mb-4 mb-xxl-0">
            <InfoCard
              className={item.class}
              icon={item.icon}
              text={item.text}
              subText={item.subText}
            />
          </Col>
        ))}
      </Row>
      <div className="inner-layout__btns">
        <CommonButton title="Projects" type="button" className="active" />
        <CommonButton title="Applications" type="button" />
      </div>

      <Row className="mb-lg-5">
        <Col lg={8} className="mb-5 mb-lg-0">
          <CustomTable fields={fields}>
            {deliveryData.length
              ? deliveryData.map((item: any, index) => (
                  <tr
                    className="cursor-pointer"
                    key={index}
                    onClick={() => navigate(`/auth/projects/${item.id}`)}
                  >
                    <td className="fw600" data-testid="projectName">
                      {item.name}
                    </td>
                    <td
                      className={getStatusClass(item.status)}
                      data-testid="projectStatus"
                    >
                      {getStatusName(item?.status) || "-"}
                    </td>
                  </tr>
                ))
              : null}
          </CustomTable>
        </Col>
        <Col lg={4}>
          <div className="team-page__right__inner teamsRowCard">
            <Row>
              <Col sm={12}>
                <DetailCard
                  heading="Applications"
                  contentList={applicationData}
                  className="flex"
                />
              </Col>
              <Col sm={12}>
                <DetailCard
                  heading="Projects"
                  className="flex"
                  contentList={teamDatas}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Team;
