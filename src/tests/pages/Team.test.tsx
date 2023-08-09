import React from "react";
import Team from "../../pages/private/Team/Team";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";

jest.mock("../../hooks/UseGetApi.tsx", () => {
  return {
    __esModule: true,
    default: async (url: string, method: string, body: any) => {
      if (url === "/teams/get-by-id/3232") {
        return {
          data: {
            teamData: {
              _id: "64ccde92a15ec4f83dd35c17",
              id: "1d3749ef-7ceb-4978-89c0-94f5ca98f394",
              name: "dia data",
              members: [],
              projects: [
                {
                  projectId: "b37185e7-0e94-42e7-a0ea-6aa2ca129396",
                  status: "active",
                  _id: "64ccde92a15ec4f83dd35c18",
                },
              ],
              __v: 0,
            },
            projectsData: [
              {
                _id: "64ccde92a15ec4f83dd35a6e",
                id: "b37185e7-0e94-42e7-a0ea-6aa2ca129396",
                start_date: "2023-03-22T19:30:40.000Z",
                html_url:
                  "https://github.com/shaurya-ATR940/Grants-Program_dummy/blob/master/applications/DIA_Bridge_Attestation_Oracle.md",
                payment_details:
                  "0xc13233bd20a7fcb1d7c2394ade4857b778382264 ethereum. preferred currency - usdc (0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48).",
                project_name: "bridges attestation oracle",
                status: "active",
                total_cost: {
                  amount: "30000",
                  currency: "usd",
                },
                total_duration: "3 months",
                team_id: "1d3749ef-7ceb-4978-89c0-94f5ca98f394",
                level: "2",
                milestones: [],
                totalMilestones: 2,
              },
            ],
          },
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

describe("Team Details Test", () => {
  test("Team Details", async () => {
    const rendered = render(<Team ID="3232" />);
    await waitFor(() => {
      const cardProjectName = screen.getByTestId("projectName");
      const projectName = screen.getByTestId("projectName");
      const projectStatus = screen.getByTestId("projectStatus");
      const onClick = screen.getByTestId("onClick");
      expect(cardProjectName.innerHTML).toBe("Bridges attestation oracle");
      expect(projectName.innerHTML).toBe("Bridges attestation oracle");
      expect(projectStatus.innerHTML).toBe("In-Progress");
      fireEvent.click(onClick);
      expect(window.location.pathname).toBe("/");
    });
  });
});
