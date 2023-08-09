import { api } from "../../api/api";
import UseGetApi from "../../hooks/UseGetApi";

jest.mock("../../hooks/UseGetApi.tsx", () => {
  return {
    __esModule: true,
    default: async (url: string, method: string, body: any) => {
      if (url === "/user/logout") {
        return { data: null };
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

describe("Logout Test", () => {
  test("Logout", async () => {
    UseGetApi(api.logout(), "delete");
  });
});
