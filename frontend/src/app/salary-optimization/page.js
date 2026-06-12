import { fetchEmployeesServer } from "@/lib/api";
import Card from "@/components/Card";
import Badge from "@/components/ui/badge";
import SalaryAllocationSection from "@/components/SalaryAllocationSection";

const totalPayroll = (data) => data.reduce((sum, employee) => sum + employee.salary, 0);
const riskCost = (data) =>
  data.filter((employee) => employee.attrition_status === "Yes").reduce((sum, employee) => sum + employee.salary * 0.08, 0);

const recommendations = (data) =>
  data
    .map((employee) => {
      const bonus = employee.attrition_status === "Yes" ? 0.08 : employee.cluster === "Needs Attention" ? 0.06 : employee.cluster === "Top Talent" ? 0.04 : 0.02;
      return {
        ...employee,
        recommendedSalary: Math.round(employee.salary * (1 + bonus)),
        adjustment: Math.round(bonus * 100),
      };
    })
    .sort((a, b) => b.adjustment - a.adjustment)
    .slice(0, 6);

export default async function SalaryOptimization() {
  const employees = await fetchEmployeesServer();
  const payroll = totalPayroll(employees);
  const risk = Math.round(riskCost(employees));
  const recs = recommendations(employees);

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">Compensation planning</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Salary optimization</h1>
        </div>
        <Badge variant="secondary">Budget-aware</Badge>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Total payroll" value={`$${payroll.toLocaleString()}`}>
          <p className="text-sm text-zinc-500">Current annual payroll expense</p>
        </Card>
        <Card title="Attrition buffer" value={`$${risk.toLocaleString()}`}>
          <p className="text-sm text-zinc-500">Potential retention investment</p>
        </Card>
        <Card title="Projected uplift" value="+4.8%">
          <p className="text-sm text-zinc-500">Recommended salary adjustments</p>
        </Card>
      </div>

      <SalaryAllocationSection employees={employees} />

      <section className="grid gap-5 lg:grid-cols-2">
        {recs.map((employee) => (
          <div key={employee.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#0b0b0b]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-950 dark:text-white">{employee.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{employee.role}</p>
              </div>
              <Badge variant={employee.attrition_status === "Yes" ? "danger" : "warning"}>
                +{employee.adjustment}%
              </Badge>
            </div>
            <div className="mt-5 space-y-3 text-sm text-zinc-500">
              <p>Department: {employee.department}</p>
              <p>Current salary: ${employee.salary.toLocaleString()}</p>
              <p>Recommended salary: ${employee.recommendedSalary.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
