import React from "react";
import Dashboard from "../../pages/private/Dashboard/Dashboard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("../../hooks/UseGetApi.tsx", () => {
  return {
    __esModule: true,
    default: async (url: string, method: string, body: any) => {
      if (url === "/project/get-all?pageLimit=10&pageNo=1") {
        return {
          data: {
            totalCount: 407,
            projects: [
              {
                _id: "64ccde92a15ec4f83dd35a5d",
                id: "c97cf5d7-bf0f-439f-aa00-1123d24dff89",
                start_date: "2021-12-15T10:19:48.000Z",
                project_name: "admeta",
                status: "complete",
                total_cost: {
                  amount: "12000",
                  currency: "usd",
                },
                total_duration: "1 months",
                team_id: "9e8c36ea-502c-4545-9498-0cb6ad64676a",
                level: "2",
                milestones: ["5c0a52e1-da47-4316-a701-e2a82a547e2e"],
                totalMilestones: 1,
              },
            ],
          },
        };
      } else if (url === "/dynamic-cards") {
        return {
          data: {
            totalProposals: 578,
            totalProjects: 407,
            totalRejectedProposals: 278,
            totalCompletedProjects: 218,
          },
        };
      } else if (url === " /project/search-by-name?searchedName=dsd") {
        return {
          data: [
            {
              _id: "64ccde92a15ec4f83dd35a5d",
              id: "c97cf5d7-bf0f-439f-aa00-1123d24dff89",
              start_date: "2021-12-15T10:19:48.000Z",
              project_name: "admeta",
              status: "complete",
              total_cost: {
                amount: "12000",
                currency: "usd",
              },
              total_duration: "1 months",
              team_id: "9e8c36ea-502c-4545-9498-0cb6ad64676a",
              level: "2",
              milestones: ["5c0a52e1-da47-4316-a701-e2a82a547e2e"],
              totalMilestones: 1,
            },
          ],
        };
      }
    },
  };
});

jest.mock("react-router-dom", () => {
  return {
    __esModule: true,
    useNavigate: jest.fn,
    useParams: jest.fn,
    useLocation: jest.fn,
  };
});

describe("Project Test", () => {
  test("Project List", async () => {
    const rendered = render(<Dashboard search="" />);

    await waitFor(() => {
      const count = screen.getByTestId("count");
      const projectName = screen.getByText("Admeta...");
      const onClick = screen.getByTestId("onClick");
      expect(count.innerHTML).toBe("Grants: 407");
      //   expect(projectName);
      fireEvent.click(onClick);
      expect(window.location.pathname).toBe("/");
    });
  });
});
