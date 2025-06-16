import * as Popover from "@radix-ui/react-popover";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import { toast } from "sonner"; 
import  { deleteProjectActivityById } from "@/services/project.service"

interface ActivityMenuProps {
  activityId: string;
  projectTitle: string;  // adicione essa prop
}

export function ActivityMenu({ activityId, projectTitle }: ActivityMenuProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteProjectActivityById(activityId),
    onSuccess: () => {
      toast.success("Atividade excluída com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["project-activities"] });
    },
    onError: () => {
      toast.error("Erro ao excluir a atividade.");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
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
            className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded-md flex items-center gap-2 text-sm hover:cursor-pointer"
            onClick={() => navigate(`/activity/${encodeURIComponent(projectTitle)}/edit/${activityId}`)}
          >
            <Pencil className="w-4 h-4" />
            Editar
          </button>
          <button
            className="w-full text-left px-2 py-1 rounded-md flex items-center gap-2 text-sm text-red-600 hover:cursor-pointer hover:bg-red-100"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            <Trash2 className="w-4 h-4" />
            {mutation.isPending ? "Excluindo..." : "Excluir"}
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
