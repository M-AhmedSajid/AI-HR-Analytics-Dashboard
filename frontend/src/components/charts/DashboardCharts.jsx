"use client"
import React from 'react'
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/components/charts/LineChart"), { ssr: false });
const BarChart = dynamic(() => import("@/components/charts/BarChart"), { ssr: false });

const DashboardCharts = ({ data, perfData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0b0b0b] p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-medium">Performance by Employee</h3>
          <LineChart data={perfData} dataKey="score" />
        </div>
        <div className="bg-white dark:bg-[#0b0b0b] p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-sm font-medium">Employees by Department</h3>
          <BarChart data={data} dataKey="value" />
        </div>
      </div>
  )
}

export default DashboardCharts