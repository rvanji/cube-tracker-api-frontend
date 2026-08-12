"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  ChartColumn,
  Target,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Returns",
    href: "/returns",
    icon: Wallet,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartColumn,
  },
  {
    title: "Goal",
    href: "/goal",
    icon: Target,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
const router = useRouter();

function handleLogout() {
  localStorage.removeItem("cube_tracker_token");
  router.replace("/login");
}
export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Cube Tracker</h1>

        <p className="mt-1 text-sm text-slate-400">Investment Dashboard</p>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="mb-2 flex items-center gap-4 rounded-xl p-4 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="mx-4 mt-6 flex w-[calc(100%-2rem)] items-center gap-4 rounded-xl p-4 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}
