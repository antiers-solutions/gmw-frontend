import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InfoCards from "../../../components/Infocard/InfoCards";
import { CommonButton, CustomTable, DetailCard } from "../../../components/ui";
import { splitText } from "../../../helper/splitText";
import Overview from "../Overview/Overview";
const DeliveriesDetail = ({ search }: { search: string }) => {
  const [commonButtonStatus, setCommonButtonStatus] = useState("information");
  const navigate = useNavigate();
  const [deliveryData, setDeliveryData] = useState([
    {
      milestone: "M1",
      id: "34",
      hash: "hdgd7db48ndd8djskd8sd9s",
    },
    {
        milestone: "M1",
        id: "34",
        hash: "hdgd7db48ndd8djskd8sd9s",
      },
      {
        milestone: "M11",
        id: "34",
        hash: "hdgd7db48ndd8djskd8sd9s",
      },
      {
        milestone: "M1",
        id: "34",
        hash: "hdgd7db48ndd8djskd8sd9s",
      },
  ]);
  let fields = ["Milestone", "Delivery ID", "Hash"];

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
      <Overview />
      <Row className="mb-lg-5">
        <Col lg={8} className="mb-5 mb-lg-0">
          <DetailCard
            heading="Delivery Information"
            className="flex applicationCard"
          >
            <CustomTable fields={fields}>
              {deliveryData?.length
                ? deliveryData.map((item: any, index: number) => (
                    <tr key={index}>
                      <td
                        className="fw600"
                        data-testid={`milestone-${index}-name`}
                        data-th="Milestone"
                      >
                        {item?.milestone?.slice(
                          0,
                          item?.milestone?.indexOf(".")
                        ) || "-"}
                      </td>
                      <td data-testid={`milestone-${index}-id`} data-th="Delivery ID">{item.id}</td>
                      <td data-th="Hash">
                        <a
                        className="tableHash"
                          href={item.hash}
                          target="_blank"
                          rel="noreferrer"
                          data-testid={`milestone-${index}-link`}
                        >
                          {splitText(item.hash, 9)}
                        </a>
                      </td>
                    </tr>
                  ))
                : null}
            </CustomTable>
          </DetailCard>
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

export default DeliveriesDetail;
