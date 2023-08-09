import React from "react";
import { render, waitFor } from "@testing-library/react";
import { FormikControls } from "../../components/ui";

describe("Formik Test", () => {
  test("Formik", async () => {
    const rendered = render(<FormikControls type="text" />);
    waitFor(() => {});
  });
});
