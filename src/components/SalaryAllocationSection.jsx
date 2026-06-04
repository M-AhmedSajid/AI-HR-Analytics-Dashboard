"use client";
import BarChartComp from "@/components/charts/BarChartComp";

const allocationData = (data) =>
  Object.entries(
    data.reduce((acc, employee) => {
      acc[employee.department] = acc[employee.department] || { current: 0, recommended: 0 };
      acc[employee.department].current += employee.salary;
      acc[employee.department].recommended +=
        employee.salary * (employee.attrition_status === "Yes" ? 1.08 : employee.cluster === "Needs Attention" ? 1.05 : 1.02);
      return acc;
    }, {})
  ).map(([name, values]) => ({ name, current: Math.round(values.current / 1000), recommended: Math.round(values.recommended / 1000) }));

export default function SalaryAllocationSection({ employees }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#0b0b0b] dark:border dark:border-zinc-800">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">Allocation by department</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">Salary allocation outlook</h2>
        </div>
      </div>
      <BarChartComp data={allocationData(employees)} dataKeys={["current", "recommended"]} colors={["#2563eb", "#16a34a"]} />
    </section>
  );
}
