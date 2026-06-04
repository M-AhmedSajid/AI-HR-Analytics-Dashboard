"use client";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function LineChart({ data, dataKey, color = "#3b82f6" }) {
  return (
    <div className="w-full h-56">
      <ResponsiveContainer>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "#070707", border: "1px solid var(--color-zinc-800)", borderRadius: "0.375rem" }} isAnimationActive={true} />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}
