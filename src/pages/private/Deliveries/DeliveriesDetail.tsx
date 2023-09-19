
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InfoCards from "../../../components/Infocard/InfoCards";
import { CommonButton, CustomTable, DetailCard } from "../../../components/ui";
import Overview from "../Overview/Overview";
const DeliveriesDetail = ({ search }: { search: string }) => {
  const [commonButtonStatus, setCommonButtonStatus] = useState("information");
  const navigate = useNavigate();
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
  return (
    <div className="applicationsSec">
      <div className="heading">
        <h6 className="title" data-testid="count">
        Deliveries: {0}
        </h6>{" "}
      </div>
      <InfoCards />
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
      <Overview/>
      <Row className="mb-lg-5">
        <Col lg={8} className="mb-5 mb-lg-0">
          <DetailCard
            heading="Delivery Information"
            contentList={applicationDetails}
            className="flex applicationCard"
          />
        </Col>
        <Col lg={4}>
          <div className="team-page__right__inner teamsRowCard">
            <Row>
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

export default DeliveriesDetail;
