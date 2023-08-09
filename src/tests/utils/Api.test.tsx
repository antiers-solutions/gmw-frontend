import { api } from "../../api/api";

describe("Api Test", () => {
  test("Api", async () => {
    expect(api.allProject(1, 10)).toBe(
      "/project/get-all?pageLimit=1&pageNo=10"
    );
    expect(api.allTeam(1, 10)).toBe("/teams/get-all?pageLimit=1&pageNo=10");
    expect(api.projectByName("ds")).toBe(
      "/project/search-by-name?searchedName=ds"
    );
    expect(api.projectById("dcs")).toBe("/project/get-by-id/dcs");
    expect(api.filteredProject(2, "active", 10, 1)).toBe(
      "/project/filter?level=2&status=active&ageLimit=10&pageNo=1"
    );
    expect(api.milestoneById("dcs")).toBe("/milestone/get-by-projectId/dcs");
    expect(api.teamById("dcs")).toBe("/teams/get-by-id/dcs");
    expect(api.teamByName("dcs")).toBe(
      "/teams/search-by-name?searchedName=dcs"
    );

    expect(api.mergeTeam()).toBe("/teams/merge-team");

    expect(api.login()).toBe("/user/signup");

    expect(api.logout()).toBe("/user/logout");
    expect(api.projectChart()).toBe("/graph/get-projects-count-by-status");
    expect(api.projectChartByLevel()).toBe(
      "/graph/get-projects-count-by-level"
    );
    expect(api.projectStatusChange()).toBe("/project/update-status");
    expect(api.dynamicCard()).toBe("/dynamic-cards");
    expect(api.projectStatusByYear(new Date().getFullYear())).toBe(
      "/graph/get-rejected-accepted-projects-year?year=2023"
    );
  });
});
