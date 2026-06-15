"use client";
import { useState } from "react";
import { Menu, Search, Bell, UserCircle2 } from "lucide-react";

export default function Navbar({ onMenuToggle }) {

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-[#050505]/95">
      <div className="mx-auto flex max-w-9xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 text-zinc-700 transition hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden flex-1 items-center gap-3 xl:flex">
          <div className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <Search className="h-4 w-4" />
            <input
              placeholder="Search employees, clusters, reports"
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400" disabled
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">
            <Bell className="h-5 w-5" />
          </button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">
            <UserCircle2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
