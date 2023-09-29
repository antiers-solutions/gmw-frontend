import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./Applications.scss";
import { CommonButton, DetailCard, InfoCard } from "../../../components/ui";
import Overview from "../Overview/Overview";
import { DocIcon, ProjectIcon } from "../../../assets/svg/SvgIcon";
import { useParams } from "react-router-dom";
import UseGetApi from "../../../hooks/UseGetApi";
import { api } from "../../../api/api";
import { firstLetterCapitalize } from "../../../helper/firstLetterCapitalize";
const ApplicationDetail = () => {
  const { id } = useParams();
  const { applicationById } = api;
  const [commonButtonStatus, setCommonButtonStatus] = useState("information");
  const [applicationDetails, setApplicationDetails] = useState([
    {
      name: "Application name",
      info: "Validator Screen",
    },
    {
      name: "Application ID",
      info: "126",
    },
    {
      name: "Approved on",
      info: "24-04-2023",
    },

    {
      name: "Status",
      info: "In Progress",
    },
  ]);
  const [applicationData, setApplicationData] = useState([
    {
      name: "Team name",
      info: "215",
    },
    {
      name: "Team ID",
      info: "AVVVD",
    },

    {
      name: "Status",
      info: "In Progress",
    },
  ]);

  const [teamDatas, setTeamDatas] = useState([
    {
      name: "Payment Information",
      info: "215",
    },
    {
      name: "Payment Method",
      info: "abjcjdd",
    },

    {
      name: "Cost",
      info: "3000 USD",
    },
  ]);
  const [cardData, setCardData] = useState([
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

  useEffect(() => {
    if (id) {
      getPullRequest(applicationById(id));
    }
    console.log(id, "+++++++++++++++++++++++");
  }, [id]);

  // API calling function to fetch project data based on the provided URL
  const getPullRequest = async (url: string, type?: string) => {
    try {
      const { data } = await UseGetApi(url);
      const card = [...cardData];
      const application = [...applicationDetails];
      const fileName = firstLetterCapitalize(data[0].file_name)?.slice(0, -3);
      card[0].text = id || "-";
      card[1].text = fileName || "-";
      application[0].info = fileName || "-";
      application[1].info = id || "-";
      application[2].info = data[0].status || "-";
      setCardData(card);
      setApplicationDetails(application);
      console.log(data[0], "-----------");

      // setPullRequest(
      //   type === "search" ? project?.data || [] : project?.data?.proposals || []
      // ); // Set the project data array with the fetched data or an empty array if no data is available
      // setPullRequestCount(
      //   type === "search"
      //     ? pullRequestCount || 0
      //     : project?.data?.totalCount || 0
      // ); // Set the project data count with the fetched count or 0 if count is not available
    } catch (e) {}
    // setLoader(false); // Set the loader to false after the API call is completed
  };

  return (
    <div className="applicationsSec">
      <Row className="mb-3 mb-lg-5">
        {cardData.length
          ? cardData.map((item, index) => (
              <Col xxl={3} sm={6} key={index} className="mb-4 mb-xxl-0">
                <InfoCard
                  className={item.class}
                  icon={item.icon}
                  text={item.text}
                  subText={item.subText}
                />
              </Col>
            ))
          : null}
      </Row>
      <div className="inner-layout__btns">
        <CommonButton
          title="Information"
          type="button"
          onClick={() => setCommonButtonStatus("information")}
          className={commonButtonStatus === "information" ? "active" : null}
        />
        <CommonButton
          title="Links"
          type="button"
          onClick={() => setCommonButtonStatus("links")}
          className={commonButtonStatus === "links" ? "active" : null}
        />
      </div>
      <Overview />
      <Row className="mb-lg-5">
        <Col lg={8} className="mb-5 mb-lg-0">
          <DetailCard
            heading="Application Details"
            contentList={applicationDetails}
            className="flex applicationCard"
          />
        </Col>
        <Col lg={4}>
          <div className="team-page__right__inner teamsRowCard">
            <Row className="rowGap">
              <Col sm={12}>
                <DetailCard
                  heading="Team Details"
                  contentList={applicationData}
                  className="flex"
                />
              </Col>
              <Col sm={12}>
                <DetailCard
                  heading="Current Milestone"
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

export default ApplicationDetail;
