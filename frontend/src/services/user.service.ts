import api from "@/lib/api";
import { AxiosError } from "axios";

export const createUser = async (data: any) => {
  try {
    const response = await api.post("/api/usuario", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar um novo projeto", AxiosError);
    throw error;
  }
};

// Adicione esta nova função
export const listAllUsers = async () => {
  try {
    const response = await api.get("/api/usuario");
    return response.data || []; // Garante que retorne um array
  } catch (error) {
    console.error("Erro ao listar usuários", error);
    throw error;
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await api.post("/api/usuario/login", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Erro no login:", error.response.data);
        throw new Error(
          error.response.data.message || "Email ou senha incorretos."
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error(
          "Erro no login: Nenhuma resposta do servidor.",
          error.request
        );
        throw new Error(
          "Não foi possível conectar ao servidor. Tente novamente mais tarde."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Erro na configuração da requisição:", error.message);
        throw new Error("Ocorreu um erro inesperado. Tente novamente.");
      }
    } else {
      console.error("Erro desconhecido:", error);
      throw new Error("Ocorreu um erro desconhecido.");
    }
  }
};
