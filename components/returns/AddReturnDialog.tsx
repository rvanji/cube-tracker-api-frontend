"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import {
  Calendar,
  CircleDollarSign,
  Cuboid as CubeIcon,
  Plus,
  Minus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddReturn } from "@/hooks/useAddReturn";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddReturnDialog({ open, setOpen }: Props) {
  const [date, setDate] = useState(""); // Stores canonical API wire format: YYYY-MM-DD
  const [amount, setAmount] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const mutation = useAddReturn();

  // set default date once using absolute timezone parameters
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Formats wire date YYYY-MM-DD to display value DD/MM/YYYY
  const displayDateFormat = (wireDate: string) => {
    if (!wireDate) return "dd/mm/yyyy";
    const [yyyy, mm, dd] = wireDate.split("-");
    if (!yyyy || !mm || !dd) return "dd/mm/yyyy";
    return `${dd}/${mm}/${yyyy}`;
  };

  // format number with commas
  const formatNumber = (value: number | string) => {
    if (!value) return "";
    return Number(value).toLocaleString("en-US");
  };

  // cube calculation
  const cubes = useMemo(() => {
    const value = Number(amount);
    if (!value || value <= 0) return 0;
    return value / 2000;
  }, [amount]);

  // step controls (2000 system)
  const increase = () => setAmount((prev) => String(Number(prev || 0) + 2000));

  const decrease = () =>
    setAmount((prev) => String(Math.max(0, Number(prev || 0) - 2000)));

  async function handleSave() {
    if (!amount) return;

    await mutation.mutateAsync({
      date,
      amount: Number(amount),
    });

    setAmount("");
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl border border-[#1f2937] bg-[#0b0f19] p-6 text-slate-100 shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold tracking-tight text-white">
            Add Daily Return
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-400">
            Enter today's payment to update your cubes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 my-2">
          {/* DATE FIELD WITH GLOBAL DD/MM/YYYY OVERLAY */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Calendar className="h-3.5 w-3.5 text-blue-400" />
              Date
            </label>
            <div
              className="relative cursor-pointer"
              onClick={() => dateInputRef.current?.showPicker()}
            >
              {/* Fake Interactive Display Box (Always forced to DD/MM/YYYY) */}
              <div className="flex h-11 w-full items-center rounded-xl border border-[#1f2937] bg-[#111827] px-3 text-white text-sm transition-colors focus-within:ring-1 focus-within:ring-blue-500">
                {displayDateFormat(date)}
                <span className="absolute right-3 text-slate-500 pointer-events-none">
                  📅
                </span>
              </div>

              {/* Invisible native trigger running under the mask */}
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto"
              />
            </div>
          </div>

          {/* AMOUNT */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <CircleDollarSign className="h-3.5 w-3.5 text-blue-400" />
              Amount (LKR)
            </label>

            <div className="flex items-center gap-2">
              {/* -2000 BUTTON */}
              <Button
                type="button"
                variant="outline"
                onClick={decrease}
                className="h-11 rounded-xl border-[#1f2937] bg-[#111827] text-slate-300 transition-all duration-150 hover:bg-[#1f2937] hover:text-white active:scale-95"
              >
                <Minus className="h-4 w-4 mr-1" />
                2,000
              </Button>

              {/* INPUT CONTAINER */}
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={formatNumber(amount)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/,/g, "");
                    if (!isNaN(Number(raw))) {
                      setAmount(raw);
                    }
                  }}
                  placeholder="20,000"
                  className="h-11 text-center text-lg font-bold rounded-xl border-[#1f2937] bg-[#111827] text-white focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
                />
              </div>

              {/* +2000 BUTTON */}
              <Button
                type="button"
                variant="outline"
                onClick={increase}
                className="h-11 rounded-xl border-[#1f2937] bg-[#111827] text-slate-300 transition-all duration-150 hover:bg-[#1f2937] hover:text-white active:scale-95"
              >
                <Plus className="h-4 w-4 mr-1" />
                2,000
              </Button>
            </div>
          </div>

          {/* LIVE CUBES CONTAINER */}
          <div className="flex items-center justify-between rounded-xl border border-blue-900/30 bg-gradient-to-r from-blue-950/40 to-indigo-950/20 p-4 shadow-inner">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Calculated Cubes
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(59,130,246,0.2)]">
                {cubes.toFixed(2)}
              </h2>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400 ring-1 ring-blue-500/20">
              <CubeIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* PROPORTIONAL ACTIONS WITH EXPLICIT PADDING AND GAP */}
        <DialogFooter className="mt-6 flex flex-row items-center justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-10 rounded-xl border-[#1f2937] bg-transparent px-5 text-slate-400 transition-all duration-200 hover:bg-[#111827] hover:text-white"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={mutation.isPending}
            className="h-10 rounded-xl bg-[#2563eb] px-5 font-semibold text-white shadow-md shadow-blue-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-[#3b82f6] active:scale-[0.98] disabled:opacity-50"
          >
            {mutation.isPending ? "Saving..." : "Save Return"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
