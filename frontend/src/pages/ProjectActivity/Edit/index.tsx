import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Activity,
  CalendarPlus,
  FileText,
  FolderKanban,
  User,
} from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

export const projectActivitySchema = z.object({
  nome: z.string().min(1, { message: "O nome da atividade é obrigatório." }),
  descricao: z
    .string()
    .nonempty({ message: "O campo é obrigatório" })
    .min(2, { message: "O campo deve ter mais de 1 caractere." }),
  dataInicio: z
    .string()
    .nonempty({ message: "O campo é obrigatório" })
    .min(2, { message: "O campo deve ter mais de 1 caractere." }),
  dataFimPrevista: z
    .string()
    .nonempty({ message: "O campo é obrigatório" })
    .min(2, { message: "O campo deve ter mais de 1 caractere." }),
  status: z
    .string()
    .nonempty({ message: "O campo é obrigatório" })
    .min(2, { message: "O campo deve ter mais de 1 caractere." }),
  projetoTitulo: z
    .string()
    .nonempty({ message: "O campo é obrigatório" })
    .min(2, { message: "O campo deve ter mais de 1 caractere." }),
  responsavelEmail: z
    .string()
    .nonempty({ message: "O campo é obrigatório" })
    .min(2, { message: "O campo deve ter mais de 1 caractere." }),
  avaliadorEmail: z
    .string()
    .nonempty({ message: "O campo é obrigatório" })
    .min(2, { message: "O campo deve ter mais de 1 caractere." }),
});

export type ProjectActivityFormData = z.infer<typeof projectActivitySchema>;

interface EditActivityFormProps {
  formId: string;
  onUpdate: (data: ProjectActivityFormData) => void;
  initialData: ProjectActivityFormData;
}

export function EditProjectActivity({
  formId,
  onUpdate,
  initialData,
}: EditActivityFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectActivityFormData>({
    resolver: zodResolver(projectActivitySchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onValidSubmit: SubmitHandler<ProjectActivityFormData> = (data) => {
    console.log("EditProjectActivity: dados válidos:", data);
    onUpdate(data);
  };

  const onInvalidSubmit = (errors: any) => {
    console.error("EditProjectActivity: erros de validação:", errors);
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      className="flex flex-col w-full"
    >
      <div className="flex gap-8 items-center justify-center">
        <div>
          <div className="flex gap-2 items-center">
            <FolderKanban className="text-blue-500" size={18} />
            <label htmlFor="projectName" className="block mb-2">
              Nome da Atividade
            </label>
          </div>
          <Input
            {...register("nome")}
            placeholder="Digite o nome da atividade"
            className="w-full"
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p>
          )}
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <FileText className="text-blue-500" size={18} />
            <label htmlFor="descricao" className="block mb-2">
              Descrição da atividade
            </label>
          </div>
          <Input
            {...register("descricao")}
            placeholder="Digite a descrição da atividade"
            className="w-full"
          />
          {errors.descricao && (
            <p className="text-sm text-red-500">{errors.descricao.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-8 items-center justify-center">
        <div>
          <div className="flex gap-2 items-center">
            <CalendarPlus className="text-blue-500" size={18} />
            <label htmlFor="dataInicio">Data Inicial</label>
          </div>
          <Input
            {...register("dataInicio")}
            placeholder="yyyy-mm-dd"
            className="w-full"
          />
          {errors.dataInicio && (
            <p className="text-sm text-red-500">{errors.dataInicio.message}</p>
          )}
        </div>

        <div>
          <div className="flex gap-2 items-center">
            <CalendarPlus className="text-blue-500" size={18} />
            <label htmlFor="dataFimPrevista">Data Final Prevista</label>
          </div>
          <Input
            {...register("dataFimPrevista")}
            placeholder="yyyy-mm-dd"
            className="w-full"
          />
          {errors.dataFimPrevista && (
            <p className="text-sm text-red-500">
              {errors.dataFimPrevista.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-8 items-center justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <User className="text-blue-500" size={18} />
            <label htmlFor="responsavelEmail">Responsável</label>
          </div>
          <Input
            {...register("responsavelEmail")}
            placeholder="Email do responsável"
            className="w-full"
          />
          {errors.responsavelEmail && (
            <p className="text-sm text-red-500">
              {errors.responsavelEmail.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <User className="text-blue-500" size={18} />
            <label htmlFor="avaliadorEmail">Avaliador</label>
          </div>
          <Input
            {...register("avaliadorEmail")}
            placeholder="Email do avaliador"
            className="w-full"
          />
          {errors.avaliadorEmail && (
            <p className="text-sm text-red-500">
              {errors.avaliadorEmail.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2 items-center">
          <Activity className="text-blue-500" size={18} />
          <label htmlFor="status">Status</label>
        </div>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>
    </form>
  );
}
