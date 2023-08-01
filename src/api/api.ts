export const api = {
    projectByName: (search: string) => `/api/project/get-by-name?searchedName=${search}`,
    allProject: (pageLimit: Number, pageNo: Number) => `/api/project/get-all?pageLimit=${pageLimit}&pageNo=${pageNo}`,
    projectById: (id: String) => `/api/project/get-by-id/${id}`,
    filteredProject: (level: number, status: string, pageLimit: Number, pageNo: Number) => `/api/project/filter?level=${level}&status=${status}&ageLimit=${pageLimit}&pageNo=${pageNo}`,
    milestoneById: (id: String) => `/api/milestone/get-by-projectId/${id}`,
    teamById: (team_id: String) => `/api/teams/get-by-id/${team_id}`,
    allTeam: (pageLimit: Number, pageNo: Number) => `/api/teams/get-all?pageLimit=${pageLimit}&pageNo=${pageNo}`,
    teamByName: (search: string) => `/api/teams/get-by-name?searchedName=${search}`,
    mergeTeam: () => `/api/teams/update-team`,
    login: () => `/api/user/signup`,
    logout: () => `/api/user/logout`,
    projectChart: () => `/api/graph/get-projects-count-by-status`,
    projectChartByLevel: () => `/api/graph/get-projects-count-by-level`,
    projectByMilestone: () => `/api/graph/get-milestones-count-per-project`
}