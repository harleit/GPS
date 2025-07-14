import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  addUsersToProject,
  getProjectUsers,
  removeUsersFromProject,
} from "@/services/project.service";
import { listAllUsers } from "@/services/user.service";

interface ManageProjectUsersProps {
  titulo: string;
}

interface User {
  id: number;
  nomeCompleto: string;
  email: string;
}

export function ManageProjectUsers({ titulo }: ManageProjectUsersProps) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Busca os usuários que já estão no projeto
  const { data: projectUsers = [], isLoading: isLoadingProjectUsers } =
    useQuery<User[]>({
      queryKey: ["project-users", titulo],
      queryFn: () => getProjectUsers(titulo),
    });

  // Busca todos os usuários do sistema para o autocomplete
  const { data: allUsers = [] } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: listAllUsers,
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["project-users", titulo] });
  };

  // Mutação para adicionar usuário
  const addUserMutation = useMutation({
    mutationFn: (email: string) => addUsersToProject(titulo, [email]),
    onSuccess: () => {
      toast.success("Membro adicionado com sucesso!");
      invalidateQueries();
      setSearchTerm("");
    },
    onError: () => {
      toast.error("Erro ao adicionar membro.");
    },
  });

  // Mutação para remover usuário
  const removeUserMutation = useMutation({
    mutationFn: (email: string) => removeUsersFromProject(titulo, email),
    onSuccess: () => {
      toast.success("Membro removido com sucesso!");
      invalidateQueries();
    },
    onError: () => {
      toast.error("Erro ao remover membro.");
    },
  });

  // Filtra usuários para o autocomplete, excluindo os que já são membros
  const filteredUsers = searchTerm
    ? allUsers.filter(
        (user) =>
          !projectUsers.some((pu) => pu.email === user.email) &&
          (user.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Membros do Projeto</h3>

      {/* Lista de Membros Adicionados */}
      <div className="space-y-2 mb-4">
        {isLoadingProjectUsers && <p>Carregando membros...</p>}
        {projectUsers.length === 0 && !isLoadingProjectUsers && (
          <p className="text-sm text-gray-500">Sem usuários adicionados.</p>
        )}
        {projectUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <div>
              <p className="font-semibold">{user.nomeCompleto}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeUserMutation.mutate(user.email)}
              disabled={removeUserMutation.isPending}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Input de Autocomplete para Adicionar Novos Membros */}
      <div>
        <Input
          placeholder="Pesquisar por nome ou e-mail para adicionar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredUsers.length > 0 && (
          <div className="mt-2 border rounded-md max-h-40 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => addUserMutation.mutate(user.email)}
              >
                {user.nomeCompleto} ({user.email})
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
