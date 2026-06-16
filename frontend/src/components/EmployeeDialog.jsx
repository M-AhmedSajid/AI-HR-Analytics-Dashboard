"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { createEmployee, updateEmployee } from "@/lib/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialForm = {
  name: "",
  role: "",
  department: "",
  salary: 0,
  experience: 0,
  satisfaction: 0,
  overtime_hours: 0,
  performance_score: 0,
  attrition_status: "No",
  cluster: "",
  tenure_years: 0.0,
};

export default function EmployeeDialog({ open, onClose, onCreated, employee = null }) {
  const [form, setForm] = useState(initialForm);
  const isEditMode = !!employee;

  useEffect(() => {
    if (open) {
      if (employee) {
        setForm(employee);
      } else {
        setForm({ ...initialForm, id: Date.now() });
      }
    }
  }, [open, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsed = {
        ...form,
        id: Number(form.id),
        salary: Number(form.salary),
        experience: Number(form.experience),
        satisfaction: Number(form.satisfaction),
        overtime_hours: Number(form.overtime_hours),
        performance_score: Number(form.performance_score),
        tenure_years: Number(form.tenure_years),
      };

      let res;
      if (isEditMode) {
        res = await updateEmployee(parsed.id, parsed);
      } else {
        res = await createEmployee(parsed);
      }
      onCreated && onCreated(res || parsed, isEditMode);
      onClose();
    } catch (err) {
      console.error("Failed to save employee", err);
      alert("Failed to save employee: " + (err.message || err));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit employee" : "Add employee"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the employee details below and submit to save changes."
              : "Enter the new employee details below and submit to add them to the directory."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <span>Role</span>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <span>Department</span>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <span>Salary</span>
              <input
                name="salary"
                type="number"
                value={form.salary}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <span>Experience (yrs)</span>
              <input
                name="experience"
                type="number"
                value={form.experience}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <span>Performance %</span>
              <input
                name="performance_score"
                type="number"
                value={form.performance_score}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <span>Satisfaction</span>
              <input
                name="satisfaction"
                type="number"
                step="0.01"
                value={form.satisfaction}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <span>Tenure years</span>
              <input
                name="tenure_years"
                type="number"
                step="0.1"
                value={form.tenure_years}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800"
              />
            </label>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
            </DialogClose>
            <Button type="submit">{isEditMode ? "Save" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
