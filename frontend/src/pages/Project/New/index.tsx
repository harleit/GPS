import { DatePicker } from "@/components/custom/datePicker";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  projectName: z.string().min(1, { message: 'Nome obrigatório' }),
  projectDescription: z.string().min(1, { message: 'Descrição obrigatória' }),
  projectInitialDate: z.date({ required_error: 'Data obrigatória' }),
  projectStatus: z.enum(['ativo', 'pausado', 'finalizado'], {
    errorMap: () => ({ message: 'Selecione um status' })
  })
});

export function NewProject() {

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<z.infer<typeof schema>>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      projectStatus: 'ativo'
    }
  })



  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    // Exibe o toast com o nome do projeto
    toast("Projeto Criado", {
      description: `Seu primeiro projeto`,
      action: {
        label: "Undo",
        onClick: () => console.log("Desfazer criação do projeto!"),
      },
    });

    console.log('Tentando criar...')
  }

  return (
    <div className="flex justify-center w-1/2 p-[10px] bg-red-50">
      <form onSubmit={onSubmit} className="flex flex-col gap-8 w-full">
        <div>
          <label htmlFor="projectName" className="block mb-2">
            Nome do Projeto
          </label>
          <Input
            {...register("projectName")}
            placeholder="Digite o nome do projeto"
            className="w-full" // Adapta o tamanho do input
          />
          {errors.projectName
            ?
            <p className="text-red-500">{errors.projectName.message}</p>
            :
            <p className="text-sm text-gray-500">
              Esse será o nome que seu projeto aparecerá.
            </p>
          }

        </div>

        <div>
          <label htmlFor="projectDescription" className="block mb-2">
            Descrição do Projeto
          </label>
          <Textarea
            {...register("projectDescription")}
            placeholder="Digite a descrição do projeto"
            className="w-full" // Adapta o tamanho do input
          />
          {errors.projectDescription
            ?
            <p className="text-red-500">{errors.projectDescription.message}</p>
            :
            <p className="text-sm text-gray-500">
              Esse será a descrição do seu projeto.
            </p>
          }

        </div>



        <div className="flex flex-col">
          <label htmlFor="projectInitialDate">Data Inicial</label>
          <Controller
            name="projectInitialDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onSelect={(date) => field.onChange(date)}
              />
            )}
          />
          {errors.projectInitialDate && (
            <p className="text-red-500">{errors.projectInitialDate.message}</p>
          )}
        </div>

        {/* Campo de Status */}
        <div>
          <label htmlFor="projectStatus">Status</label>
          <Controller
            name="projectStatus"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pausado">Pausado</SelectItem>
                  <SelectItem value="finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.projectStatus && (
            <p className="text-red-500">{errors.projectStatus.message}</p>
          )}
        </div>


        {/* Botão de submit */}
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}
