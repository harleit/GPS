import { DatePicker } from "@/components/custom/datePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProject } from "@/services/project.service";

const schema = z.object({
  projectName: z.string().min(1, { message: "Nome obrigatório" }),
  projectDescription: z.string().min(1, { message: "Descrição obrigatória" }),
  projectInitialDate: z.date({ required_error: "Data obrigatória" }),
  projectStatus: z.enum(
    ["planejado", "em_andamento", "concluido", "cancelado"],
    {
      errorMap: () => ({ message: "Selecione um status" }),
    }
  ),
  gerente: z.string().min(1, { message: "Gerente obrigatório" }), // Adicionado
});

export function NewProject() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      projectStatus: "em_andamento",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      // Mapeie os dados para o formato esperado pelo backend
      const payload = {
        titulo: data.projectName,
        descricao: data.projectDescription,
        dataInicio: data.projectInitialDate.toISOString(), // Converte a data para string
        status: data.projectStatus,
        gerente: data.gerente,
      };

      // Chame o serviço para criar o projeto
      await createProject(payload);

      // Sucesso
      toast("Projeto Criado!", {
        description: "Seu projeto foi criado com sucesso!",
      });
      reset(); // Limpa o formulário
    } catch (error) {
      // Erro no envio
      toast.error("Erro ao criar projeto", {
        description: "Verifique os dados e tente novamente.",
      });
      console.error("Erro:", error);
    }
  };

  return (
    <div className="flex justify-center w-1/2 p-[10px] bg-gray-50 rounded-lg shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full"
      >
        <div>
          <label htmlFor="projectName" className="block mb-2">
            Nome do Projeto
          </label>
          <Input
            {...register("projectName")}
            placeholder="Digite o nome do projeto"
            className="w-full" // Adapta o tamanho do input
          />
          {errors.projectName ? (
            <p className="text-red-500">{errors.projectName.message}</p>
          ) : (
            <p className="text-sm text-gray-500">
              Esse será o nome que seu projeto aparecerá.
            </p>
          )}
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
          {errors.projectDescription ? (
            <p className="text-red-500">{errors.projectDescription.message}</p>
          ) : (
            <p className="text-sm text-gray-500">
              Esse será a descrição do seu projeto.
            </p>
          )}
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
                  <SelectItem value="planejado">Planejado</SelectItem>
                  <SelectItem value="em_andamento">Em andamento</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.projectStatus && (
            <p className="text-red-500">{errors.projectStatus.message}</p>
          )}
        </div>

        {/* Campo GERENTE */}
        <div>
          <label htmlFor="gerente">Gerente</label>
          <Input
            {...register("gerente")}
            placeholder="Nome do gerente"
            className="w-full"
          />
          {errors.gerente && (
            <p className="text-red-500">{errors.gerente.message}</p>
          )}
        </div>

        {/* Botão de submit */}
        <Button className = "cursor-pointer" type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}
