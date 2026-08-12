import { ReactNode } from "react";

export default function DashboardGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-12 gap-6">{children}</div>;
}
