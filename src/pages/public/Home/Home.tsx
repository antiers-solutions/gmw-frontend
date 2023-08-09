import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import logo from "../../../assets/images/logo.svg";
import { CommonButton, CustomSelect } from "../../../components/ui";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import Chart from "./chart";
import { api } from "../../../api/api";
import axios from "axios";
import { DiagonalArrow } from "../../../assets/svg/SvgIcon";

const Home = () => {
  const navigate = useNavigate();

  const COLORS = ["#0166FA", "#74ACFF", "#C5DCFF"];
  const currentYear = new Date().getFullYear();

  const { projectChart, projectChartByLevel, projectStatusByYear } = api;
  const [projectCharts, setProjectCharts] = useState<any>([]);
  const [projectMilestoneCharts, setProjectMilestoneCharts] = useState<any>([]);
  const [levelChart, setLevelChart] = useState<any>([]);
  const chartData = async (url: string, type: string) => {
    try {
      const chart = await axios.get(process.env.REACT_APP_URL + url);
      const { data } = chart;

      if (type === "project") {
        setProjectCharts(data?.data || []);
      } else if (type === "milestone") {
        setProjectMilestoneCharts(data?.data || []);
      } else {
        setLevelChart(data?.data || []);
      }
    } catch (e) {}
  };

  useEffect(() => {
    chartData(projectChart(), "project");
    chartData(projectChartByLevel(), "projectByLevel");
    chartData(projectStatusByYear(currentYear), "milestone");
  }, []);

  const [yearOptions, setYearOptions] = useState<any>([]);

  useEffect(() => {
    const year = [];
    for (let i = 2020; i <= currentYear; i++) {
      year.push({ value: i, label: i });
    }
    setYearOptions(year);
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
            <p>Projects Level</p>
            <Chart
              type="pie"
              data={levelChart}
              COLORS={COLORS}
              className="pie-chart"
              paddingAngle={0}
              innerRadius={50}
              outerRadius={80}
            />
          </div>
          <div className="home-imgs-middle">
            <div className="text-center yearlySelect">
              <CustomSelect
                options={yearOptions}
                defaultValue={
                  yearOptions.length
                    ? yearOptions[yearOptions?.length - 1]
                    : { value: currentYear, label: currentYear }
                }
                className="yearlySelect_main"
                onChange={(e: any) => {
                  chartData(projectStatusByYear(e.value), "milestone");
                }}
              />
              <Chart
                type="line"
                data={projectMilestoneCharts}
                className="graph-chart"
              />
            </div>
            <div className="text-center">
              <CommonButton
                onClick={() =>
                  window.open("https://grants.web3.foundation/", "_blank")
                }
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
            <p>Projects</p>
            <Chart
              type="pie"
              data={projectCharts}
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
