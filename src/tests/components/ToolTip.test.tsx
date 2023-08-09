import React from "react";
import { screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import ToolTip from "../../components/ui/Tooltip/ToolTip";

describe("Tooltip Test", () => {
  test("Tooltip", async () => {
    const rendered = render(<ToolTip tooltipData={"jatin Sehgal"} />);
    await waitFor(() => {
      const name = screen.getByTestId("name");
      expect(name.innerHTML).toBe(" jatin ...");
    });
  });
});
