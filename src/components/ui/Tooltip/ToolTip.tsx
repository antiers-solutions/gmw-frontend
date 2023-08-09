import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Tooltip.scss";

function ToolTip({ tooltipData }: { tooltipData: string }) {
  const tooltip = <Tooltip id="tooltip">{tooltipData}</Tooltip>;
  const firstLetterSplit = (value: string) => {
    if (!value) return "-";
    const exactValue = value.slice(0, 6);
    return exactValue + "...";
  };

  return (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <span className="tooltipStyleInternal" data-testid="name">
        {" "}
        {firstLetterSplit(tooltipData)}
      </span>
    </OverlayTrigger>
  );
}

export default ToolTip;
