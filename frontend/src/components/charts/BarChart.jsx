"use client";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function BarChart({ data, dataKey, color = "#06b6d4" }) {
  return (
    <div className="w-full h-56">
      <ResponsiveContainer>
        <ReBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "#070707", border: "1px solid var(--color-zinc-800)", borderRadius: "0.375rem" }} isAnimationActive={true} />
          <Bar dataKey={dataKey} fill={color} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
