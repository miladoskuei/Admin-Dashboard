import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  CartesianGrid,
  YAxis
} from "recharts";

export default function Chart({ title,yaxis, data, dataKey, grid }) {
  return (
    <div
      className="chart"
      style={{
        boxShadow: " 0 0 15px -10px rgba(0, 0, 0, 0.75)",
        padding: "0 0.8rem",
      }}
    >
      <h3
        className="chart-title"
        style={{ textAlign: "center", marginBottom: "1.6rem" }}
      >
        {title}
      </h3>
      <ResponsiveContainer width="100%" aspect={4}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd">
            
          </XAxis>
          <YAxis dataKey={yaxis} stroke="#5550bd"></YAxis>
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd">
            
          </Line>
          <Tooltip> </Tooltip>
          {grid && (
            <CartesianGrid
              stroke="#5550bd"
              strokeDasharray="10"
            ></CartesianGrid>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
