// src/components/ui/StatusBadge.tsx
interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusClasses: { [key: string]: string } = {
    'New': 'bg-sky-500/20 text-sky-300 ring-sky-500/30',
    'In Progress': 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
    'Resolved': 'bg-green-500/20 text-green-300 ring-green-500/30',
  };

  const classes = statusClasses[status] || 'bg-slate-500/20 text-slate-300 ring-slate-500/30';

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ring-1 ring-inset ${classes}`}>
      {status}
    </span>
  );
}