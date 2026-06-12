export default function Badge({ variant = "default", children }) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  const variants = {
    default: "bg-slate-100 text-slate-800 dark:bg-zinc-900 dark:text-slate-200",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    danger: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
    info: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  };

  return <span className={`${base} ${variants[variant] ?? variants.default}`}>{children}</span>;
}
