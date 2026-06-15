"use client";

import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "@/lib/api";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import EmployeeDialog from "@/components/EmployeeDialog";
import { Trash2, Edit2 } from "lucide-react";

const performanceColor = (score) => {
  if (score >= 90) return "success";
  if (score >= 75) return "info";
  if (score >= 65) return "warning";
  return "danger";
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };

    fetchData();
  }, []);

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setOpen(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleDelete = async (employeeId) => {
    if (!confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await deleteEmployee(employeeId);
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
    } catch (err) {
      console.error("Failed to delete employee", err);
      alert("Failed to delete employee: " + (err.message || err));
    }
  };

  const handleCreated = (updatedEmployee, isEdit) => {
    if (isEdit) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
      );
    } else {
      setEmployees((prev) => [updatedEmployee, ...prev]);
    }
  };
  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">People operations</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Employee directory</h1>
        </div>
        <Button variant="secondary" onClick={handleAddNew}>Add employee</Button>
      </div>

      <EmployeeDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreated={handleCreated}
        employee={selectedEmployee}
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {employees.map((employee) => (
          <div key={employee.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#0b0b0b]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-950 dark:text-white">{employee.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{employee.role}</p>
              </div>
              <Badge variant={employee.attrition_status === "Yes" ? "danger" : "success"}>
                Attrition {employee.attrition_status}
              </Badge>
            </div>
            <div className="mt-5 space-y-3 text-sm text-zinc-500">
              <div className="flex items-center justify-between gap-2">
                <span>Department</span>
                <Badge variant="info">{employee.department}</Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>Salary</span>
                <span className="font-semibold text-slate-950 dark:text-white">${employee.salary.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>Performance</span>
                <Badge variant={performanceColor(employee.performance_score)}>{employee.performance_score}%</Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>Cluster</span>
                <Badge variant="secondary">{employee.cluster}</Badge>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-zinc-500">Performance goal</div>
              <div className="h-2 overflow-hidden rounded-full bg-white dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-slate-950 dark:bg-sky-500"
                  style={{ width: `${employee.performance_score}%` }}
                />
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => handleEdit(employee)}
                className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-semibold text-slate-950 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(employee.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
