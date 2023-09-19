import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Tooltip.scss";

function ToolTip({
  tooltipData,
  type,
  data,
}: {
  tooltipData?: string;
  type?: string;
  data?: any;
}) {
  const tooltip = <Tooltip id="tooltip">{tooltipData}</Tooltip>;
  const firstLetterSplit = (value: string) => {
    if (!value) return "-";
    const exactValue = value.slice(0, 6);
    return exactValue + "...";
  };
  return (
    <>
      {type === "image" ? (
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <span className="tooltipStyleInternal" data-testid="name">
            {" "}
            <img src={data?.git_avatar} className="multiImg" />{" "}
          </span>
        </OverlayTrigger>
      ) : (
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <span className="tooltipStyleInternal" data-testid="name">
            {" "}
            {firstLetterSplit(tooltipData || "-")}
          </span>
        </OverlayTrigger>
      )}
    </>
  );
}

export default ToolTip;
