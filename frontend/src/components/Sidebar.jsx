"use client";
import { X, BarChart3, Users, PieChart, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/analytics", label: "Analytics", icon: PieChart },
  { href: "/salary-optimization", label: "Salary Optimization", icon: DollarSign },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden md:flex md:w-72 flex-col bg-white border-r border-zinc-200 dark:bg-[#070707] dark:border-zinc-800">
        <div className="px-6 py-6 border-b border-zinc-100 dark:border-zinc-800">
          <Link href="/dashboard" className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            HR Analytics
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-slate-100 text-slate-950 shadow-sm dark:bg-zinc-900 dark:text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-400"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-6 pb-6 pt-3 text-xs text-zinc-500">Designed for HR teams with high-growth operations.</div>
      </aside>

      <div className={`fixed inset-0 z-30 md:hidden transition-opacity ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div onClick={onClose} className="absolute inset-0 bg-black/30" />
        <div className={`absolute left-0 top-0 h-full w-72 bg-white border-r border-zinc-200 p-6 dark:bg-[#070707] dark:border-zinc-800 ${open ? "translate-x-0" : "-translate-x-full"} transition-transform`}>
          <div className="flex items-center justify-between mb-8">
            <div className="text-lg font-semibold">HR Analytics</div>
            <button onClick={onClose} className="rounded-full p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-slate-100 text-slate-950 shadow-sm dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
