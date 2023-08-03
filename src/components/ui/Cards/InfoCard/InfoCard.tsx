import { ReactNode } from "react";

import "./InfoCard.scss";

const InfoCard = (props: {
  icon?: ReactNode;
  text?: string;
  subText?: string;
  className?: string;
  percText?: string;
}) => {
  return (
    <div className={`info-card ${props.className ? props.className : ""}`}>
      <div className="info-card__icon icon-bg">{props.icon}</div>
      <div className="info-card__content">
        <h6 className="text-dark">
          {props.text}
          {props.percText && (
            // use classname "negtive" for show in red
            <small className="positive">{props.percText}%</small>
          )}
        </h6>
        <p>{props.subText}</p>
      </div>
    </div>
  );
};

export default InfoCard;
