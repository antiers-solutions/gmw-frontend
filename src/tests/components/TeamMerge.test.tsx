import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { TeamMergeModal } from "../../components/ui";

jest.mock("../../hooks/UseGetApi.tsx", () => {
  return {
    __esModule: true,
    default: async (url: string, method: string, body: any) => {
      if (url === "/teams/search-by-name?searchedName=") {
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
      }
    },
  };
});
describe("TeamMergeModal Test", () => {
  test("TeamMergeModal", async () => {
    const rendered = render(<TeamMergeModal show onHide={() => {}} />);
    await waitFor(() => {
      const name = screen.getByTestId("name");
      expect(name.innerHTML).toBe("mutai solutions");
    });
  });
});
