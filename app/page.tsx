"use client";

import { useDashboard } from "@/hooks/useDashboard";
import SummaryCard from "@/components/dashboard/SummaryCard";
import GoalProgress from "@/components/dashboard/GoalProgress";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import ReturnsTable from "@/components/returns/ReturnsTable";

import { Wallet, Coins, Target, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { data } = useDashboard();

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* SUMMARY CARDS */}
      <DashboardGrid>
        <SummaryCard
          title="Total Earnings"
          value={`LKR ${data.totalAmount.toLocaleString()}`}
          icon={<Wallet className="text-green-500" />}
          subText="All time income"
        />

        <SummaryCard
          title="Total Cubes"
          value={`${data.totalCubes}`}
          icon={<Coins className="text-blue-500" />}
          subText="Accumulated units"
        />

        <SummaryCard
          title="Today's Return"
          value={`LKR ${data.todayAmount.toLocaleString()}`}
          icon={<TrendingUp className="text-yellow-500" />}
          subText={`${data.todayCubes.toFixed(2)} cubes`}
        />

        <SummaryCard
          title="Daily Average"
          value={`${data.dailyAverage.toFixed(2)}`}
          icon={<Target className="text-purple-500" />}
          subText="Cubes per day"
        />
      </DashboardGrid>

      {/* GOAL PROGRESS */}
      <GoalProgress total={data.totalCubes} target={data.targetCubes} />
      <ReturnsTable />
    </div>
  );
}
