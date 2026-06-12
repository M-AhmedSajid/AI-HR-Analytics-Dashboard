"use client"
import React from "react";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/components/charts/LineChart"), {
  ssr: false,
});
const BarChart = dynamic(() => import("@/components/charts/BarChart"), {
  ssr: false,
});

const AnalyticsCharts = ({ satisfactionData, overtimeData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-[#0b0b0b] p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
        <h3 className="text-sm font-medium">Employee Satisfaction (%)</h3>
        <BarChart
          data={satisfactionData}
          dataKey="satisfaction"
          color="#10b981"
        />
      </div>
      <div className="bg-white dark:bg-[#0b0b0b] p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
        <h3 className="text-sm font-medium">Overtime Hours</h3>
        <LineChart data={overtimeData} dataKey="overtime" color="#f97316" />
      </div>
    </div>
  );
};

export default AnalyticsCharts;
