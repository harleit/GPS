import * as Popover from "@radix-ui/react-popover";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteProjectByTitle } from "@/services/project.service";

interface ProjectMenuProps {
  titulo: string;
}

export function ProjectMenu({ titulo }: ProjectMenuProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!titulo) throw new Error("Título do projeto não encontrado na URL.");
      return await deleteProjectByTitle(titulo);
    },
    onSuccess: () => {
      toast.success("Projeto excluído com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/projetos"); // ajuste o caminho conforme sua rota de listagem
    },
    onError: () => {
      toast.error("Erro ao excluir projeto.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Ellipsis className="cursor-pointer hover:text-gray-700" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          className="rounded-md border bg-white shadow-md p-2 space-y-1 z-50 min-w-[120px]"
        >
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md flex items-center gap-2 text-sm hover:cursor-pointer"
            onClick={() =>
              navigate(`/project/edit/${encodeURIComponent(titulo)}`)
            }
          >
            <Pencil className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md flex items-center gap-2 text-sm text-red-600 hover:cursor-pointer hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
