import { format } from "date-fns" // [[5]][[6]]
import { CalendarIcon } from "lucide-react" // Atualizado para o nome correto do ícone

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

export function DatePicker({
  selected,
  onSelect,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal", // Largura padrão do Shadcn [[8]]
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" /> {/* Nome do ícone atualizado */}
          {selected 
            ? format(selected, "PPP") 
            : "Selecione uma data" /* Texto mais claro */}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="start" // Posicionamento recomendado [[8]]
      >
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => onSelect?.(date)} 
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}