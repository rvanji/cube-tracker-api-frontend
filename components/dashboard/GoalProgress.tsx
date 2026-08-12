interface Props {
  total: number;
  target: number;
}

export default function GoalProgress({ total, target }: Props) {
  const percent = (total / target) * 100;
  const remaining = target - total;

  return (
    <div className="col-span-12 rounded-2xl border border-slate-800 bg-[#111A2E] p-6">
      <h2 className="text-lg font-semibold">Goal Progress</h2>

      <div className="mt-4 h-3 w-full rounded-full bg-slate-800">
        <div
          className="h-3 rounded-full bg-blue-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 flex justify-between text-sm text-slate-400">
        <span>
          {total.toFixed(0)} / {target} Cubes
        </span>
        <span>{percent.toFixed(2)}%</span>
      </div>

      <p className="mt-2 text-sm text-slate-500">
        Remaining: {remaining.toFixed(0)} Cubes
      </p>
    </div>
  );
}
