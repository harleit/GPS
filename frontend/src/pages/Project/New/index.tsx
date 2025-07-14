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
import {
  Activity,
  CalendarPlus,
  FileText,
  FolderKanban,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  projectName: z
    .string()
    .min(3, { message: "O campo deve ter pelo menos 3 caracteres" })
    .max(50, { message: "O campo deve ter no máximo 50 caracteres" }),
  projectDescription: z
    .string()
    .min(3, { message: "O campo deve ter pelo menos 3 caracteres" })
    .max(200, { message: "O campo deve ter no máximo 200 caracteres" }),
  projectInitialDate: z.string().refine(
    (value) => {
      // Verifica formato yyyy-mm-dd
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(value)) return false;

      // Verifica se é uma data válida
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    },
    { message: "Data inválida" }
  ),
  projectStatus: z.enum(
    ["planejado", "em_andamento", "concluido", "cancelado"],
    {
      errorMap: () => ({ message: "Selecione um status" }),
    }
  ),
  gerente: z
    .string()
    .email({ message: "E-mail inválido." })
    .min(3, { message: "O campo deve ter pelo menos 3 caracteres" })
    .max(50, { message: "O campo deve ter no máximo 50 caracteres" }), // Adicionado
});

export function NewProject() {
  let navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    mode: "onSubmit",
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
        dataInicio: data.projectInitialDate, // Converte a data para string
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
      navigate("/project"); // Redireciona para a lista de projetos
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
        className="flex flex-col gap-2 2xl:gap-8 max-h-full w-full overflow-auto"
      >
        <div>
          <div className="flex gap-2 items-center">
            <FolderKanban className="text-blue-500" size={18} />
            <label htmlFor="projectName" className="block mb-2">
              Nome do Projeto
            </label>
          </div>
          <Input
            {...register("projectName")}
            placeholder="Digite o nome do projeto"
            className="w-full" // Adapta o tamanho do input
          />
          {errors.projectName ? (
            <p className="text-sm text-red-500">{errors.projectName.message}</p>
          ) : (
            <p className="text-sm text-blue-500">
              Mínimo 3 | Máximo 50 caracteres.
            </p>
          )}
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <FileText className="text-blue-500" size={18} />
            <label htmlFor="projectDescription" className="block mb-2">
              Descrição do Projeto
            </label>
          </div>
          <Textarea
            {...register("projectDescription")}
            placeholder="Digite a descrição do projeto"
            className="w-full" // Adapta o tamanho do input
          />
          {errors.projectDescription ? (
            <p className="text-sm text-red-500">
              {errors.projectDescription.message}
            </p>
          ) : (
            <p className="text-sm text-blue-500">
              Mínimo 3 | Máximo 200 caracteres.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <CalendarPlus className="text-blue-500" size={18} />
            <label htmlFor="projectInitialDate">Data Inicial</label>
          </div>
          <Input
            {...register("projectInitialDate")}
            placeholder="yyyy-mm-dd"
            className="w-full"
            type="date"
          />
          {errors.projectInitialDate && (
            <p className="text-sm text-red-500">
              {errors.projectInitialDate.message}
            </p>
          )}
        </div>

        {/* Campo de Status */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Activity className="text-blue-500" size={18} />
            <label htmlFor="projectStatus">Status</label>
          </div>
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
            <p className="text-sm text-red-500">
              {errors.projectStatus.message}
            </p>
          )}
        </div>

        {/* Campo GERENTE */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <User className="text-blue-500" size={18} />
            <label htmlFor="gerente">Gerente</label>
          </div>
          <Input
            {...register("gerente")}
            placeholder="Email do gerente"
            className="w-full"
          />
          {errors.gerente ? (
            <p className="text-sm text-red-500">{errors.gerente.message}</p>
          ) : (
            <p className="text-sm text-blue-500">
              Digite o e-mail do gerente do projeto.
            </p>
          )}
        </div>

        {/* Botão de submit */}
        <Button
          className="cursor-pointer,  transition-colors ease-in-out bg-blue-500 hover:bg-blue-600 cursor-pointer"
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
