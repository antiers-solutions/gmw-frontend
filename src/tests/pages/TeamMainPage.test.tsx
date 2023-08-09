import React from "react";
import TeamsMainPage from "../../pages/private/Team/TeamMainPage";
import { screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";

jest.mock("../../hooks/UseGetApi.tsx", () => {
  return {
    __esModule: true,
    default: async (url: string, method: string, body: any) => {
      if (url === "/teams/get-all?pageLimit=10&pageNo=1") {
        return {
          data: {
            totalCount: "407",
            teamsDataWithProjectStatus: [
              {
                id: "e91201d1-0e82-4d7a-91d6-21294ef02dec",
                projects: [
                  {
                    projectId: "8906b923-a1d6-45fd-adda-2bd07226d253",
                    status: "complete",
                    _id: "64ccde92a15ec4f83dd35c16",
                  },
                ],
                name: "mutai solutions",
                projectStatus: {
                  active: 0,
                  complete: 1,
                  hold: 0,
                },
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

describe("Team Test", () => {
  test("Team List", async () => {
    const rendered = render(<TeamsMainPage search="" />);
    await waitFor(() => {
      const count = screen.getByTestId("count");
      const projectName = screen.getByText("Mutai ...");
      const projectLength = screen.getByTestId("projectLength");
      const active = screen.getByTestId("active");
      const complete = screen.getByTestId("complete");
      const hold = screen.getByTestId("hold");
      expect(count.innerHTML).toBe("Teams: 407");
      expect(projectLength.innerHTML).toBe("01");
      expect(active.innerHTML).toBe("00");
      expect(complete.innerHTML).toBe("01");
      expect(hold.innerHTML).toBe("00");
    });
  });
});
