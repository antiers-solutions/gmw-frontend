export const setCsrfToken = (token: string) => {
    localStorage.setItem("isLogged", token);
}

export const getCsrfToken = () => {
    return localStorage.getItem("isLogged");
}