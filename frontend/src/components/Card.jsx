export default function Card({ title, value, children }) {
  return (
    <div className="bg-white dark:bg-[#0b0b0b] border border-zinc-100 dark:border-zinc-800 rounded-lg p-4 shadow-sm">
      <div className="text-xs text-zinc-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {children && <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{children}</div>}
    </div>
  );
}
