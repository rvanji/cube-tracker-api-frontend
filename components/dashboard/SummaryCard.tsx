import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
  subText?: string;
}

export default function SummaryCard({ title, value, icon, subText }: Props) {
  return (
    <div className="col-span-3 rounded-2xl border border-border bg-card p-6 transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">{value}</h2>
          {subText && <p className="mt-1 text-xs text-slate-500">{subText}</p>}
        </div>

        <div className="rounded-xl bg-muted p-3">{icon}</div>
      </div>
    </div>
  );
}
