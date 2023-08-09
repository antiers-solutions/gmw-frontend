import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProfileDropdown from "../../components/ui/Dropdowns/ProfileDropdown/ProfileDropdown";

describe("ProfileDropdown Test", () => {
  test("ProfileDropdown", async () => {
    const rendered = render(<ProfileDropdown />);
    await waitFor(() => {
      const name = screen.getByTestId("name");
      expect(name.innerHTML).toBe("-");
    });
  });
});
