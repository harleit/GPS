import * as Popover from "@radix-ui/react-popover";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

export function ProjectMenu() {
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
          <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md flex items-center gap-2 text-sm">
            <Pencil className="w-4 h-4" />
            Editar
          </button>
          <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md flex items-center gap-2 text-sm text-red-600">
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
