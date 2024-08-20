import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import React from "react";
import { useSelector } from "react-redux";

const PieChartBox = () => {
  const { dashboardData } = useSelector((slice: any) => slice.dashboard);
  const data = [
    { name: " Request", value: dashboardData.successRequests ? dashboardData.successRequests : 111, color: "#FF8042" },
    { name: " Volume", value: dashboardData.successVolume ? dashboardData.successVolume : 999, color: "#0088FE" },
    { name: " Fees", value: dashboardData.fees ? dashboardData.fees : 99, color: "#00C49F" },
    { name: "tax", value: dashboardData.tax ? dashboardData.tax : 9, color: "#FFBB28" },

  ];

  return (
    <div className="pieChartBox">
      <h1 className="text-lg font-semibold">Total Transactions</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
