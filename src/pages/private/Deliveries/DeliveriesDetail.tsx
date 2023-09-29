import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DocIcon, ProjectIcon } from "../../../assets/svg/SvgIcon";
import {
  CommonButton,
  CustomTable,
  DetailCard,
  InfoCard,
} from "../../../components/ui";
import { splitText } from "../../../helper/splitText";
import Overview from "../Overview/Overview";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import UseGetApi from "../../../hooks/UseGetApi";
import axios from "axios";
const DeliveriesDetail = () => {
  const [commonButtonStatus, setCommonButtonStatus] = useState("information");
  const { id } = useParams();
  const { deliveryById } = api;
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
  const StatusOptions = [
    {
      value: "active",
      label: "In-Progress",
    },
    {
      value: "complete",
      label: "Completed",
    },
    {
      value: "hold",
      label: "Hold",
    },
  ];

  useEffect(() => {
    if (id) {
      getPullRequest(deliveryById(id));
    }
  }, [id]);

  // API calling function to fetch project data based on the provided URL
  const getPullRequest = async (url: string) => {
    try {
      const project = await UseGetApi(url);

      console.log(project.data[0].md_content_url, "this is an project");

      // const url1 =
      //   "https://github.com/w3f/Grant-Milestone-Delivery/raw/799248b0720f8bdb2268b68668ee003805527470/deliveries%2Ftpscore_milestone_2.md";
      // const data1 = await axios.get(url1);

      // console.log(data1.data, "this is the data");

      if (project.data[0].md_content_url) {
        // const data1 = await fetch(`${project.data[0].md_content_url}`);
        const data = await axios.get(`${project.data[0].md_content_url}`);
        // console.log(data1, "this is the data");
        // const mdData = await axios({
        //   method: "get",
        //   url: project.data[0].md_content_url,
        //   // data: undefined,
        //   withCredentials: true, // Include credentials for cross-origin requests
        // });
        // console.log(project.data[0].md_content_url, "this is the link");

        // console.log(mdData, "-------------------------------");
      }
      // setPullRequest(
      //   type === "search" ? project?.data || [] : project?.data?.proposals || []
      // ); // Set the project data array with the fetched data or an empty array if no data is available
      // setPullRequestCount(
      //   type === "search"
      //     ? pullRequestCount || 0
      //     : project?.data?.totalCount || 0
      // ); // Set the project data count with the fetched count or 0 if count is not available
    } catch (e) {
      console.log(e, "-----------------------????????????");
    }
    // setLoader(false); // Set the loader to false after the API call is completed
  };
  return (
    <div className="applicationsSec">
      <div className="heading">
        <h6 className="title" data-testid="count">
          Deliveries: {0}
        </h6>{" "}
      </div>
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
                      <td
                        data-testid={`milestone-${index}-id`}
                        data-th="Delivery ID"
                      >
                        {item.id}
                      </td>
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
