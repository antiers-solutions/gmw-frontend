import axios from "axios";

const isLogged = () => {
  // If the session is expired, clear the token from localStorage
  localStorage.setItem("isLogged", "");
  // Reload the page to force the user to log in again
  window.location.reload();
};
const UseGetApi = async (url: string, method?: string, body?: any) => {
  try {
    // Make a GET request using Axios with the provided URL and HTTP method (defaulting to "get" if not provided)
    const result = await axios({
      method: method || "get",
      url: process.env.REACT_APP_URL + url,
      data: body || undefined,
      withCredentials: true, // Include credentials for cross-origin requests
    });
    if (!localStorage.getItem("isLogged")) {
      isLogged();
    }
    // If the request is successful, return the data from the response
    return result?.data;
  } catch (error: any) {
    const { response } = error;
    // Check if the error response contains the message "Session expired"
    if (
      response?.data?.message === "Session expired" ||
      response?.data?.message === "Unauthorized!"
    ) {
      isLogged();
    }
    // Return the error object
    return error;
  }
};

export default UseGetApi;
