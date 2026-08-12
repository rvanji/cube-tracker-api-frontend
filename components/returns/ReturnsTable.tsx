"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import EditReturnDialog from "./EditReturnDialog";

type ReturnItem = {
  id: number;
  date: string;
  amount: number;
};

export default function ReturnsTable() {
  const [data, setData] = useState<ReturnItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<ReturnItem | null>(null);

  // ✅ single source of truth refresh function
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/returns");
      setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ delete + refresh
  async function handleDelete(id: number) {
    await api.delete(`/returns/${id}`);
    await fetchData(); // 🔥 ensures real-time sync
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading returns...</p>;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Recent Returns
        </h2>

        <p className="text-sm text-muted-foreground">
          Daily investment records
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="py-3">Date</th>
              <th className="py-3">Amount (LKR)</th>
              <th className="py-3">Cubes</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              const cubes = item.amount / 2000;

              return (
                <tr
                  key={item.id}
                  className="border-t border-border hover:bg-muted/40 transition"
                >
                  {/* DATE */}
                  <td className="py-3 text-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  {/* AMOUNT */}
                  <td className="py-3 text-foreground">
                    {item.amount.toLocaleString()}
                  </td>

                  {/* CUBES */}
                  <td className="py-3 font-medium text-foreground">
                    {cubes.toFixed(2)}
                  </td>

                  {/* ACTIONS */}
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      {/* EDIT */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => {
                          setSelected(item);
                          setEditOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {/* DELETE */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-500/10 hover:text-red-500"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <EditReturnDialog
        open={editOpen}
        setOpen={setEditOpen}
        selected={selected}
        onSuccess={fetchData}
      />
    </div>
  );
}
