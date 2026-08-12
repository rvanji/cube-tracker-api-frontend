import api from "./api";
import { Summary } from "@/types/Summary";

export async function getSummary() {
  const response = await api.get<Summary>("/returns/summary");

  return response.data;
}
