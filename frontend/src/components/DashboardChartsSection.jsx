"use client";
import PieChartComp from "@/components/charts/PieChartComp";
import BarChartComp from "@/components/charts/BarChartComp";

export default function DashboardChartsSection({ employees }) {
  const clusterDistribution = Object.entries(
    employees.reduce((acc, employee) => {
      acc[employee.cluster] = (acc[employee.cluster] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const salaryPerformance = employees.map((employee) => ({
    name: employee.name.split(" ")[0],
    salary: employee.salary / 1000,
    performance: employee.performance_score,
  }));

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm dark:bg-[#0b0b0b] dark:border dark:border-zinc-800">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-zinc-500">Employee cluster distribution</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">People segments</h2>
          </div>
        </div>
        <PieChartComp data={clusterDistribution} dataKey="value" />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#0b0b0b] dark:border dark:border-zinc-800">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Salary vs performance</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">Compensation balance</h2>
          </div>
        </div>
        <BarChartComp data={salaryPerformance} dataKeys={["salary", "performance"]} colors={["#2563eb", "#f97316"]} />
      </section>
    </div>
  );
}
