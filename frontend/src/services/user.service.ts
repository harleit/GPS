import api from "@/lib/api"; 
import { AxiosError } from "axios"; 

export const createUser = async(data: any) => {
    try{
        const response = await api.post("/api/usuario", data); 
        return response.data; 
    } catch(error) {
        console.error("Erro ao criar um novo projeto", AxiosError); 
        throw error; 
    }
}