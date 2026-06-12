"use client";
import { useEffect, useState } from "react";
import { getEmployees } from "@/lib/api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to load employees", err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="overflow-x-auto bg-white dark:bg-[#0b0b0b] border border-zinc-100 dark:border-zinc-800 rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Salary</th>
            <th className="px-4 py-3">Experience</th>
            <th className="px-4 py-3">Satisfaction</th>
            <th className="px-4 py-3">Attrition Risk</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-4 py-3">{e.name}</td>
              <td className="px-4 py-3">{e.department}</td>
              <td className="px-4 py-3">${e.salary.toLocaleString()}</td>
              <td className="px-4 py-3">{e.experience} yrs</td>
              <td className="px-4 py-3">{Math.round(e.satisfaction * 100)}%</td>
              <td className="px-4 py-3">{e.attrition_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
