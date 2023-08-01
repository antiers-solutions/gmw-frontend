import { api } from "../api/api"
import UseGetApi from "../hooks/UseGetApi";

const { logout } = api
const userLogout = async (url: string) => {
    await UseGetApi(url, "delete");
    localStorage.setItem("isLogged", "");
    window.location.reload();
}

export const logoutUser = () => {
    userLogout(logout())
}