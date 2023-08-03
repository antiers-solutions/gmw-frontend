import React, { useState } from "react";
import { InfoCard } from "../../components/ui";
import { Col, Row } from "react-bootstrap";
import { DollarIcon, TagIcon } from "../../assets/svg/SvgIcon";

function InfoCards() {
    const [cardData, setCardData] = useState([
        {
          text: "$1,534",
          percText: "+7",
          subText: "Active",
          icon: <TagIcon />,
        },
        {
          text: "$1,700",
          percText: "+7",
          subText: "Hold",
          icon: <TagIcon />,
          class: "pink",
        },
        {
          text: "$1,800",
          percText: "+7",
          subText: "Reject",
          icon: <TagIcon />,
          class: "purple",
        },
        {
          text: "$20,000",
          subText: "Complete",
          icon: <DollarIcon />,
          class: "green",
        },
      ])
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
