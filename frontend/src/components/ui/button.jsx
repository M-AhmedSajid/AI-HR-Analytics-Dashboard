export default function Button({ variant = "primary", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500";
  const variants = {
    primary: "bg-slate-950 text-white hover:bg-slate-800",
    secondary: "bg-white text-slate-900 border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-slate-100 dark:border-zinc-800 dark:hover:bg-zinc-800",
  };

  return (
    <button className={`${base} ${variants[variant] ?? variants.primary}`} {...props}>
      {children}
    </button>
  );
}
