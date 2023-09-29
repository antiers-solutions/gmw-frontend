import { Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Applications,
  Dashboard,
  Deliveries,
  Home,
  Login,
  Projects,
  Team,
} from "../pages";
import { PrimaryLayout } from "../components/ui";
import TeamsMainPage from "../pages/private/Team/TeamMainPage";
import ApplicationDetail from "../pages/private/Applications/ApplicationDetail";
import DeliveriesDetail from "../pages/private/Deliveries/DeliveriesDetail";

const Routes = () => {
  const [search, setSearch] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<String>("");
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/auth",
          element: isAuthenticated ? (
            <PrimaryLayout getSearchData={(e: string) => setSearch(e)} />
          ) : (
            <Login />
          ),
          children: [
            {
              path: "projects",
              element: isAuthenticated ? (
                <Dashboard search={search} />
              ) : (
                <Login />
              ),
              index: true,
            },
            {
              path: "projects/:id",
              element: isAuthenticated ? <Projects /> : <Login />,
            },
            {
              path: "team",
              element: isAuthenticated ? (
                <TeamsMainPage search={search} />
              ) : (
                <Login />
              ),
            },
            {
              path: "team/:id",
              element: isAuthenticated ? <Team /> : <Login />,
            },
            {
              path: "deliveries",
              element: isAuthenticated ? (
                <Deliveries search={search} />
              ) : (
                <Login />
              ),
            },
            {
              path: "applications",
              element: isAuthenticated ? (
                <Applications search={search} />
              ) : (
                <Login />
              ),
            },
            {
              path: "applications/:id",
              element: isAuthenticated ? <ApplicationDetail /> : <Login />,
            },
            {
              path: "deliveries/:id",
              element: isAuthenticated ? <DeliveriesDetail /> : <Login />,
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    // Get the token from the local storage
    let token: String | null = localStorage.getItem("isLogged");
    // Set the value of isAuthenticated to the token if it's not null, or an empty string otherwise
    setIsAuthenticated(token || "");
  }, [localStorage.getItem("isLogged")]);

  return (
    <>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default Routes;
