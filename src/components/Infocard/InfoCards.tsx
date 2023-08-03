import React, { useEffect, useState } from "react";
import { InfoCard } from "../../components/ui";
import { Col, Row } from "react-bootstrap";
import { DollarIcon, TagIcon } from "../../assets/svg/SvgIcon";
import UseGetApi from "../../hooks/UseGetApi";
import { api } from "../../api/api";

function InfoCards() {
  const [cardData, setCardData] = useState([
    {
      text: "-",
      subText: "Total Proposals",
      icon: <TagIcon />,
    },
    {
      text: "-",
      subText: "Rejected Proposals",
      icon: <TagIcon />,
      class: "purple",
    },
    {
      text: "-",
      subText: "Total Projects",
      icon: <TagIcon />,
      class: "pink",
    },

    {
      text: "-",
      subText: "Completed Projects",
      icon: <TagIcon />,
      class: "green",
    },
  ]);

  const cardDataApi = async (url: string) => {
    const card = await UseGetApi(url);
    if (card?.data) {
      let cardDetail = [...cardData];
      cardDetail[0].text = card?.data?.totalProposals || 0;
      cardDetail[1].text = card?.data?.totalRejectedProposals || 0;
      cardDetail[2].text = card?.data?.totalProjects || 0;
      cardDetail[3].text = card?.data?.totalCompletedProjects || 0;
      setCardData(cardDetail);
    }
  };
  useEffect(() => {
    cardDataApi(api.dynamicCard());
  }, []);
  return (
    <>
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
    </>
  );
}

export default InfoCards;
