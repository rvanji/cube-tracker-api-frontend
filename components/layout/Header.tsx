"use client";

import { useState } from "react";
import { Bell, Plus } from "lucide-react";

import AddReturnDialog from "@/components/returns/AddReturnDialog";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Container forced to Dark Theme colors if globally broken */}
      <header className="flex h-20 items-center justify-between border-b border-[#2e3440] bg-[#1e222a] px-8">
        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-bold text-[#f4f4f5]">Dashboard</h2>
          <p className="text-[#9ca3af]">Welcome back 👋</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* PRIMARY ACTION: Nova Teal Accent */}
          {/* PRIMARY ACTION */}
          <Button
            onClick={() => setOpen(true)}
            className="
    bg-[#2563eb] 
    hover:bg-[#3b82f6] 
    text-white 
    font-medium
    rounded-xl
    px-4 py-2
    flex items-center gap-2
    shadow-md
    transition-all duration-200
    hover:scale-[1.02]
    active:scale-[0.98]
  "
          >
            <Plus className="h-4 w-4" />
            Add Return
          </Button>

          {/* NOTIFICATION */}
          <button className="rounded-xl bg-[#111827] border border-[#1f2937] p-3 transition-colors duration-200 hover:bg-[#1f2937] group">
            <Bell className="text-[#9ca3af] group-hover:text-[#3b82f6] transition-colors duration-200 h-5 w-5" />
          </button>
        </div>
      </header>

      {/* MODAL LIVES OUTSIDE HEADER */}
      <AddReturnDialog open={open} setOpen={setOpen} />
    </>
  );
}
