import React from "react";
import { render, waitFor } from "@testing-library/react";
import Header from "../../components/ui/Layout/Header/Header";

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    useNavigate: jest.fn,
    useParams: jest.fn,
    useLocation: jest.fn,
  };
});

describe("Header Test", () => {
  test("Header", async () => {
    const rendered = render(<Header getSearchData={() => {}} />);
    waitFor(() => {});
  });
});
