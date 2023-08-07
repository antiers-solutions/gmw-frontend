import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  CartesianGrid,
  Legend,
  Sector,
  ComposedChart,
  Area,
  YAxis,
} from "recharts";
import "./Home.scss";

const Chart = ({
  data,
  COLORS,
  type,
  className,
  paddingAngle,
  innerRadius,
  outerRadius,
}: {
  data?: any;
  COLORS?: any;
  type: string;
  className?: string;
  paddingAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
}) => {
  const [chartData, setChartData] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<number | any>(null);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const onMouseOver = (index: any, id: any) => {
    setActiveIndex(id);
  };
  const onMouseLeave = (index: any) => {
    setActiveIndex(null);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      name,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 12;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + -32}
          outerRadius={outerRadius + 6}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          stroke-dasharray="3,3"
          fill="none"
        />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey + 5}
          textAnchor={textAnchor}
        >
          {name}
        </text>
        <text
          // x={ex + (cos >= 0 ? 1 : -1) * 12}
          // y={ey}
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey + 25}
          textAnchor={textAnchor}
          fill="#5E5E5E"
        >{`${value}`}</text>
      </g>
    );
  };

  return (
    <ResponsiveContainer
      className={`responsive-container ${
        type !== "pie" ? "composedChartRes" : ""
      } ${className}`}
      width="100%"
      height={250}
    >
      {type === "pie" ? (
        <PieChart height={250}>
          <Pie
            activeIndex={activeIndex}
            data={chartData}
            className="pie-round"
            dataKey="value"
            nameKey="name"
            innerRadius={innerRadius ? innerRadius : 40}
            outerRadius={outerRadius ? outerRadius : 80}
            paddingAngle={paddingAngle}
            fill="#8884d8"
            stroke="transparent"
            activeShape={renderActiveShape}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          >
            {chartData.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            align="right"
            verticalAlign="middle"
            layout="vertical"
            wrapperStyle={{ right: "-15px" }}
          />
        </PieChart>
      ) : (
        <ComposedChart
          className="composedCharts"
          data={chartData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: -5,
          }}
        >
          <defs>
            <linearGradient id="chartBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#005FFE" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.25} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={true}
            stroke="#D2D6E0"
          />
          <XAxis
            dataKey="name"
            tickMargin={25}
            angle={-20}
            padding={{ left: 1, right: 35 }}
          />
          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="Accepted"
            strokeWidth={3}
            stroke="#005FFE"
            fill="url(#chartBody)"
          />

          <Area
            type="monotone"
            dataKey="Rejected"
            strokeWidth={3}
            stroke="#C5DCFF"
            fill="url(#chartBody)"
          />
        </ComposedChart>
      )}
    </ResponsiveContainer>
  );
};

export default Chart;
