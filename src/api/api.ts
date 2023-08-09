export const api = {
    projectByName: (search: string) => `/project/search-by-name?searchedName=${search}`,
    allProject: (pageLimit: Number, pageNo: Number) => `/project/get-all?pageLimit=${pageLimit}&pageNo=${pageNo}`,
    projectById: (id: String) => `/project/get-by-id/${id}`,
    filteredProject: (level: number, status: string, pageLimit: Number, pageNo: Number) => `/project/filter?level=${level}&status=${status}&ageLimit=${pageLimit}&pageNo=${pageNo}`,
    milestoneById: (id: String) => `/milestone/get-by-projectId/${id}`,
    teamById: (team_id: String) => `/teams/get-by-id/${team_id}`,
    allTeam: (pageLimit: Number, pageNo: Number) => `/teams/get-all?pageLimit=${pageLimit}&pageNo=${pageNo}`,
    teamByName: (search: string) => `/teams/search-by-name?searchedName=${search}`,
    mergeTeam: () => `/teams/merge-team`,
    login: () => `/user/signup`,
    logout: () => `/user/logout`,
    projectChart: () => `/graph/get-projects-count-by-status`,
    projectChartByLevel: () => `/graph/get-projects-count-by-level`,
    projectStatusByYear: (currentYear: number) => `/graph/get-rejected-accepted-projects-year?year=${currentYear}`,
    projectStatusChange: () => `/project/update-status`,
    dynamicCard: () => `/dynamic-cards`

}