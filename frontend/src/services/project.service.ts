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

export const listProjects = async () => {
  try {
    const response = await api.get("/api/projeto");
    return response.data;
  } catch (error) {
    console.error("Erro na busca de dados", AxiosError);
    throw error;
  }
};

export const getActivityProject = async (titulo: string) => {
  try {
    const response = await api.get(`/api/projeto/${titulo}/atividades`);
    return response.data;
  } catch (error) {
    console.error("Erro na busca de dados");
    throw error;
  }
};
