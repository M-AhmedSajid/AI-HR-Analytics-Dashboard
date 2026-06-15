"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BarChartComp({
  data,
  dataKeys,
  stacked = false,
  dualAxis = false,
  colors = ["#2563eb", "#14b8a6", "#f97316"],
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-72 min-h-70" />;
  }

  return (
    <div className="w-full h-72 min-h-70">
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={0}
      >
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: -16, bottom: 0 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /> */}
          <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#070707",
              border: "1px solid var(--color-zinc-800)",
              borderRadius: "0.375rem",
            }}
            isAnimationActive={true}
            cursor={{ fill: "#070707" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            labelStyle={{ textTransform: "capitalize" }}
          />
          {dualAxis ? (
            <>
              <YAxis yAxisId="left" tick={{ fill: "#64748b", fontSize: 12 }} />

              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#64748b", fontSize: 12 }}
              />

              <Bar
                dataKey={dataKeys[0]}
                yAxisId="left"
                fill={colors[0]}
                radius={[8, 8, 0, 0]}
              />

              <Bar
                dataKey={dataKeys[1]}
                yAxisId="right"
                fill={colors[1]}
                radius={[8, 8, 0, 0]}
              />
            </>
          ) : (
            <>
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />

              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  stackId={stacked ? "stack" : undefined}
                  radius={[8, 8, 0, 0]}
                />
              ))}
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
