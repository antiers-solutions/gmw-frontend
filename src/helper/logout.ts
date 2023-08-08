import { api } from "../api/api"
import UseGetApi from "../hooks/UseGetApi";

const { logout } = api
const userLogout = async (url: string, navigate?: any) => {
    await UseGetApi(url, "delete");
    localStorage.setItem("isLogged", "");
    navigate("/")
}

export const logoutUser = (navigate: any) => {
    userLogout(logout(), navigate)
}