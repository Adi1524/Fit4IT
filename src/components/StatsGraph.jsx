import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatsGraph = () => {
  const data = [
    { day: "Mon", workouts: 2 },
    { day: "Tue", workouts: 3 },
    { day: "Wed", workouts: 1 },
    { day: "Thu", workouts: 2 },
    { day: "Fri", workouts: 5 }, // Most Active
    { day: "Sat", workouts: 4 },
    { day: "Sun", workouts: 3 },
  ];

  // Determine the most active day
  const mostActiveDay = data.reduce((prev, current) =>
    current.workouts > prev.workouts ? current : prev
  ).day;

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
        <span style={{ fontWeight: "bold", color: "white" }}>
          {mostActiveDay}
        </span>
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: "#8884d8", fontSize: 14 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="workouts"
            fill="#b39ddb"
            radius={[10, 10, 0, 0]} // Rounded top edges
            label={({ x, y, width, value }) =>
              value === 5 ? (
                <text
                  x={x + width / 2}
                  y={y - 10}
                  fill="#76c7c0"
                  textAnchor="middle"
                  fontSize="14px"
                  fontWeight="bold"
                ></text>
              ) : null
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsGraph;
