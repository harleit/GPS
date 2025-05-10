import api from "@/lib/api";
import { AxiosError } from "axios";

export const createProject = async (data: any) => {
  try {
    const response = await api.post("/api/projeto", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar um novo projeto", AxiosError);
    throw error;
  }
};
