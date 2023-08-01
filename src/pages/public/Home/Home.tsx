import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import logo from "../../../assets/images/logo.svg";
import { CommonButton } from "../../../components/ui";
import { DiagonalArrow } from "../../../assets/svg/SvgIcon";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import Chart from "./chart";
import { api } from "../../../api/api";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const COLORS = ["#0166FA", "#74ACFF", "#C5DCFF"];

  const { projectChart, projectChartByLevel, projectByMilestone } = api;
  const [projectCharts, setProjectCharts] = useState<any>([]);
  const [projectMilestoneCharts, setProjectMilestoneCharts] = useState<any>([]);
  const [levelChart, setLevelChart] = useState<any>([]);
  const chartData = async (url: string, type: string) => {
    try {
      const chart = await axios.get(url);
      const { data } = chart;

      if (type === "project") {
        setProjectCharts(data.data);
      } else if (type === "milestone") {
        setProjectMilestoneCharts(data.data);
      } else {
        setLevelChart(data.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    chartData(projectChart(), "project");
    chartData(projectChartByLevel(), "projectByLevel");
    chartData(projectByMilestone(), "milestone");
  }, []);

  return (
    <section className="home">
      <Container>
        <header className="home-header d-flex justify-content-between align-items-center">
          <div className="home-header-logo">
            <img src={logo} alt="logo" />
          </div>
          <CommonButton
            title={localStorage.getItem("isLogged") ? "Projects" : "Login"}
            className="primary"
            onClick={() => navigate("/login")}
          />
        </header>
        <div className="home-top">
          <h1>
            Unveil the Power of Web3 <br /> Grants Foundation:
            <span className="ms-3">
              Polkadot & <br /> Kusama.
            </span>
          </h1>
          <h4>Learn more about our Grants Program.</h4>
        </div>
        <div className="home-imgs">
          <div className="home-imgs-left">
            <p>Total Applications</p>
            <Chart
              type="pie"
              data={projectCharts}
              COLORS={COLORS}
              className="pie-chart"
              paddingAngle={0}
              innerRadius={50}
              outerRadius={80}
            />
          </div>
          <div className="home-imgs-middle">
            <div className="text-center">
              <Chart
                type="line"
                data={projectMilestoneCharts}
                className="graph-chart"
              />
            </div>
            <div className="text-center">
              <CommonButton
                onClick={() => navigate("/login")}
                title={
                  <>
                    Explore
                    <span>
                      <DiagonalArrow />
                    </span>
                  </>
                }
                className="primary explore-btn"
              />
            </div>
          </div>
          <div className="home-imgs-right">
            <p>Total Grants</p>
            <Chart
              type="pie"
              data={levelChart}
              COLORS={COLORS}
              className="pie-chart"
              paddingAngle={7}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Home;
