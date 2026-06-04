import employees from "@/lib/dummyData.json";
import Card from "@/components/Card";
import Badge from "@/components/ui/badge";
import AnalyticsChartsSection from "@/components/AnalyticsChartsSection";

export default function AnalyticsPage() {
  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">Team analytics</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Workforce insights</h1>
        </div>
        <Badge variant="info">Data-driven</Badge>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card title="Performance distribution" value="Visualized" />
        <Card title="Salary distribution" value="Workplace balance" />
        <Card title="Attrition overview" value="Retention forecast" />
      </div>

      <AnalyticsChartsSection employees={employees} />
    </div>
  );
}
