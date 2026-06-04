"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Navbar onMenuToggle={() => setMenuOpen((prev) => !prev)} />
        <main className="flex-1 px-4 pb-8 pt-6 md:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
