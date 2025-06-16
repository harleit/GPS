import api from "@/lib/api";
import type { ProjectActivityFormData } from "@/pages/ProjectActivity/New";
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

export const updateProjectByTitle = async (titulo: string, payload: any) => {
  const response = await api.put(`/api/projeto/${encodeURIComponent(titulo)}`, payload);
  return response.data;
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

export const createProjectActivity = async (data: ProjectActivityFormData) => {
  try {
    const response = await api.post("api/atividade", data);
    return response.data;
  } catch (error) {
    console.error("Erro na criação");
    throw error;
  }
};

export const deleteProjectActivityById = async (id: string) => {
  try{
    const response = await api.delete(`/api/atividade/${id}`); 
    return response.data;
  } catch(error){
    console.error("Erro ao deletar a atividade", error); 
    throw error; 
  }
}


