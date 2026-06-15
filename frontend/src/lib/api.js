import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const API = axios.create({
  baseURL: API_BASE,
});

export const getEmployees = async () => {
  const res = await API.get("/employees");
  return res.data;
};

export const fetchEmployeesServer = async () => {
  const res = await fetch(`${API_BASE}/employees`);
  if (!res.ok) throw new Error("Failed to fetch employees from API");
  return res.json();
};

export const createEmployee = async (employee) => {
  const res = await API.post("/employees", employee);
  return res.data;
};

export const updateEmployee = async (employeeId, employee) => {
  const res = await API.put(`/employees/${employeeId}`, employee);
  return res.data;
};

export const deleteEmployee = async (employeeId) => {
  const res = await API.delete(`/employees/${employeeId}`);
  return res.data;
};