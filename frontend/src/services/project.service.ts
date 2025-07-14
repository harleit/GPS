import api from "@/lib/api";
import type { ProjectActivityFormData } from "@/pages/ProjectActivity/New";
import { AxiosError } from "axios";

// Interface para definir os parâmetros de filtro
interface ListProjectsParams {
  titulo?: string;
  usuarioEmail?: string;
  status?: string;
}

export const createProject = async (data: any) => {
  try {
    const response = await api.post("/api/projeto", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar um novo projeto", AxiosError);
    throw error;
  }
};

export const listProjects = async (params: ListProjectsParams = {}) => {
  try {
    const { titulo, usuarioEmail, status } = params;

    // Remove parâmetros vazios para não poluir a URL
    const queryParams = {
      titulo: titulo || undefined,
      usuarioEmail: usuarioEmail || undefined,
      status: status || undefined,
    };
    const response = await api.get("/api/projeto", { params: queryParams });
    return response.data;
  } catch (error) {
    console.error("Erro na busca de dados", AxiosError);
    throw error;
  }
};

export const getProjectByTitle = async (titulo: string) => {
  try {
    const response = await api.get(
      `/api/projeto/${encodeURIComponent(titulo)}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o projeto", error);
    throw error;
  }
};

export const updateProjectByTitle = async (titulo: string, payload: any) => {
  const response = await api.put(
    `/api/projeto/${encodeURIComponent(titulo)}`,
    payload
  );
  return response.data;
};

export const deleteProjectByTitle = async (titulo: string) => {
  const response = await api.delete(
    `/api/projeto/${encodeURIComponent(titulo)}`
  );
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
  try {
    const response = await api.delete(`/api/atividade/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar a atividade", error);
    throw error;
  }
};

export const getProjectActivityById = async (id: string) => {
  try {
    const response = await api.get(`/api/atividade/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar atividade pelo ID", error);
    throw error;
  }
};

export const updateProjectActivityById = async (
  id: string,
  data: ProjectActivityFormData
) => {
  try {
    const response = await api.put(`/api/atividade/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar atividade", error);
    throw error;
  }
};

export const getProjectUsers = async (titulo: string) => {
  try {
    const response = await api.get(
      `/api/projeto/${encodeURIComponent(titulo)}/usuarios`
    );
    return response.data || []; // Garante que retorne um array
  } catch (error) {
    console.error("Erro ao buscar usuários do projeto", error);
    throw error;
  }
};

export const addUsersToProject = async (titulo: string, emails: string[]) => {
  try {
    const response = await api.post(
      `/api/projeto/${encodeURIComponent(titulo)}/usuarios`,
      emails
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar usuários ao projeto", error);
    throw error;
  }
};

export const removeUsersFromProject = async (titulo: string, email: string) => {
  try {
    // O backend espera uma lista de e-mails, então enviamos um array com um e-mail
    const response = await api.delete(
      `/api/projeto/${encodeURIComponent(titulo)}/usuarios`,
      { data: [email] }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao remover usuário do projeto", error);
    throw error;
  }
};
