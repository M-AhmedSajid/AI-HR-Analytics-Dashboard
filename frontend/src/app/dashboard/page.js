import { fetchEmployeesServer } from "@/lib/api";
import Card from "@/components/Card";
import Badge from "@/components/ui/badge";
import DashboardChartsSection from "@/components/DashboardChartsSection";

const metricData = (data) => {
  const total = data.length;
  const attrition = data.filter((employee) => employee.attrition_status === "Yes").length;
  const avgSalary = Math.round(data.reduce((sum, employee) => sum + employee.salary, 0) / total);
  const avgPerformance = Math.round(data.reduce((sum, employee) => sum + employee.performance_score, 0) / total);
  return { total, attrition, avgSalary, avgPerformance };
};

const recentEmployees = (data) =>
  [...data]
    .sort((a, b) => b.tenure_years - a.tenure_years)
    .slice(0, 5);

export default async function Dashboard() {
  const employees = await fetchEmployeesServer();
  const metrics = metricData(employees);

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Total employees" value={metrics.total}>
          <p className="text-sm text-zinc-500">Active headcount across departments</p>
        </Card>
        <Card title="Attrition risk" value={`${metrics.attrition}`}>
          <p className="text-sm text-zinc-500">Employees flagged for retention focus</p>
        </Card>
        <Card title="Average salary" value={`$${metrics.avgSalary.toLocaleString()}`}>
          <p className="text-sm text-zinc-500">Total workforce compensation average</p>
        </Card>
        <Card title="Avg performance" value={`${metrics.avgPerformance}%`}>
          <p className="text-sm text-zinc-500">Average employee score across teams</p>
        </Card>
      </div>

      <DashboardChartsSection employees={employees} />

      <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#0b0b0b] dark:border dark:border-zinc-800">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Recent employee highlights</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Talent spotlight</h2>
          </div>
          <Badge variant="success">Updated this quarter</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recentEmployees(employees).map((employee) => (
            <div key={employee.id} className="rounded-3xl border border-zinc-200 p-5 shadow-sm dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">{employee.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">{employee.role}</p>
                </div>
                <Badge variant={employee.attrition_status === "Yes" ? "danger" : "success"}>
                  Attrition {employee.attrition_status}
                </Badge>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-zinc-500">
                <p>Department: {employee.department}</p>
                <p>Cluster: {employee.cluster}</p>
                <p>Tenure: {employee.tenure_years.toFixed(1)} yrs</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
