"use client";
import BarChartComp from "@/components/charts/BarChartComp";
import PieChartComp from "@/components/charts/PieChartComp";

const bucketCounts = (data, accessor, buckets) =>
  buckets.map((bucket) => ({
    name: bucket.label,
    value: data.filter((employee) => accessor(employee) >= bucket.min && accessor(employee) < bucket.max).length,
  }));

export default function AnalyticsChartsSection({ employees }) {
  const performanceBuckets = bucketCounts(employees, (employee) => employee.performance_score, [
    { label: "50-60", min: 50, max: 60 },
    { label: "60-70", min: 60, max: 70 },
    { label: "70-80", min: 70, max: 80 },
    { label: "80-90", min: 80, max: 90 },
    { label: "90+", min: 90, max: 101 },
  ]);

  const salaryBuckets = bucketCounts(employees, (employee) => employee.salary, [
    { label: "60k-80k", min: 60000, max: 80000 },
    { label: "80k-100k", min: 80000, max: 100000 },
    { label: "100k-120k", min: 100000, max: 120000 },
    { label: "120k+", min: 120000, max: Infinity },
  ]);

  const clusterData = Object.entries(
    employees.reduce((acc, employee) => {
      acc[employee.cluster] = (acc[employee.cluster] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const attritionData = [
    { name: "At risk", value: employees.filter((employee) => employee.attrition_status === "Yes").length },
    { name: "Stable", value: employees.filter((employee) => employee.attrition_status === "No").length },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#0b0b0b] dark:border dark:border-zinc-800">
        <div className="mb-4">
          <p className="text-sm font-medium text-zinc-500">Performance distribution</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">Team performance tiers</h2>
        </div>
        <BarChartComp data={performanceBuckets} dataKeys={["value"]} colors={["#2563eb"]} />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#0b0b0b] dark:border dark:border-zinc-800">
        <div className="mb-4">
          <p className="text-sm font-medium text-zinc-500">Salary distribution</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">Compensation bands</h2>
        </div>
        <BarChartComp data={salaryBuckets} dataKeys={["value"]} colors={["#0ea5e9"]} />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#0b0b0b] dark:border dark:border-zinc-800">
        <div className="mb-4">
          <p className="text-sm font-medium text-zinc-500">Cluster breakdown</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">How talent groups stack up</h2>
        </div>
        <PieChartComp data={clusterData} dataKey="value" />
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#0b0b0b] dark:border dark:border-zinc-800">
        <div className="mb-4">
          <p className="text-sm font-medium text-zinc-500">Attrition overview</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">Retention health</h2>
        </div>
        <BarChartComp data={attritionData} dataKeys={["value"]} colors={["#f97316"]} />
      </section>
    </div>
  );
}
