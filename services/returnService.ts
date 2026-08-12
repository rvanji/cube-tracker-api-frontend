import api from "./api";
import { AddReturnRequest } from "@/types/AddReturnRequest";

export async function addReturn(data: AddReturnRequest) {
  const response = await api.post("/returns", data);
  return response.data;
}
export async function updateReturn(
  id: number,
  data: { date: string; amount: number },
) {
  return api.put(`/returns/${id}`, data);
}
