import React from "react";
import { waitFor } from "@testing-library/dom";
import { CustomPagination } from "../../components/ui";
import { render } from "@testing-library/react";

describe("CustomPagination Test", () => {
  test("CustomPagination", async () => {
    const rendered = render(
      <CustomPagination
        PageLimit="20"
        totalCount="400"
        pageNo={1}
        handleNextClick={() => {}}
        handlePrevClick={() => {}}
        handlePageNumberClick={() => {}}
      />
    );
    waitFor(() => {});
  });
});
