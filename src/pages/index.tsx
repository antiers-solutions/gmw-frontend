import React from "react";

// public pages
const Login = React.lazy(() => import("./public/Login/Login"));
const Home = React.lazy(() => import("./public/Home/Home"));

// private pages
const Dashboard = React.lazy(() => import("./private/Dashboard/Dashboard"));
const Projects = React.lazy(() => import("./private/Projects/Projects"));
const Team = React.lazy(() => import("./private/Team/Team"));
const Deliveries = React.lazy(() => import("./private/Deliveries/Deliveries"));
const Applications = React.lazy(
  () => import("./private/Applications/Applications")
);

export { Login, Dashboard, Projects, Team, Deliveries, Applications, Home };
