import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Tooltip.scss";

function ToolTip({ tooltipData }: { tooltipData: string }) {
  const tooltip = <Tooltip id="tooltip">{tooltipData}</Tooltip>;
  const firstLetterSplit = (value: string) => {
    if (!value) return "-";
    const exactValue = value.slice(0, value.indexOf(" "));
    return value.indexOf(" ") > 1 ? exactValue + "..." : value;
  };

  return (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <span className="tooltipStyleInternal">
        {" "}
        {firstLetterSplit(tooltipData)}
      </span>
    </OverlayTrigger>
  );
}

export default ToolTip;
