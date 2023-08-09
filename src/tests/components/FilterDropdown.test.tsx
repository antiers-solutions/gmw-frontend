import React from "react";
import { waitFor } from "@testing-library/dom";
import { FilterDropdown } from "../../components/ui";
import { render } from "@testing-library/react";

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    useNavigate: jest.fn,
    useParams: jest.fn,
    useLocation: jest.fn,
  };
});

describe("FilterDropdown Test", () => {
  test("FilterDropdown", async () => {
    const rendered = render(
      <FilterDropdown
        level={""}
        setLevel={() => {}}
        status={""}
        setStatus={() => {}}
        levelOptions={[
          { label: "query", value: "query" },
          { label: "page", value: "page" },
        ]}
        statusOptions={[
          { label: "query", value: "query" },
          { label: "page", value: "page" },
        ]}
      />
    );
    waitFor(() => {});
  });
});
