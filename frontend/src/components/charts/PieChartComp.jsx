"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const palette = ["#ea580c", "#0ea5e9", "#7c3aed"];

export default function PieChartComp({ data, dataKey, nameKey = "name" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-72 min-h-70" />;
  }

  return (
    <div className="w-full h-72 min-h-70">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} innerRadius={48} outerRadius={88} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#070707", border: "1px solid var(--color-zinc-800)", borderRadius: "0.375rem" }} isAnimationActive={true} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
