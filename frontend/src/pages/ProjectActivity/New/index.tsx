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

interface NewActivityFormProps {
  onSave: (data: ProjectActivityFormData) => void;
  formId: string;
  currentProjetoTitulo?: string;
}

export function NewProjectActivity({
  formId,
  onSave,
  currentProjetoTitulo,
}: NewActivityFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ProjectActivityFormData>({
    resolver: zodResolver(projectActivitySchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      descricao: "",
      projetoTitulo: currentProjetoTitulo || "",
      dataInicio: "",
      dataFimPrevista: "",
      status: "",
      avaliadorEmail: "",
      responsavelEmail: "",
    },
  });

  const processSubmit: SubmitHandler<ProjectActivityFormData> = (data) => {
    console.log("NewProjectActivity: processSubmit chamado com data:", data); // DEBUG
    onSave(data);
    console.log("NewProjectActivity: onSave foi chamado."); // DEBUG
    reset();
    console.log("NewProjectActivity: Formulário resetado."); // DEBUG
  };

  // Função para quando a validação PASSA
  const onValidSubmit: SubmitHandler<ProjectActivityFormData> = (data) => {
    console.log("DEBUG: RHF - Validação PASSOU. Dados:", data);
    console.log("DEBUG: RHF - Chamando processSubmit...");
    processSubmit(data); // Sua função original que chama onSave
  };

  // Função para quando a validação FALHA
  const onInvalidSubmit = (validationErrors: any) => {
    console.error("DEBUG: RHF - Validação FALHOU. Erros:", validationErrors);
    console.log("DEBUG: RHF - Valores atuais do formulário:", getValues());
  };
  // Log para ver os erros que o RHF detecta nos campos
  console.log(
    "DEBUG: NewProjectActivity - Erros de formulário (formState.errors):",
    errors
  );

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
      className="flex flex-col gap-8 w-full"
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
            placeholder="Digite o nome do projeto"
            className="w-full" // Adapta o tamanho do input
          />
          {errors.nome ? (
            <p className="text-sm text-red-500">{errors.nome.message}</p>
          ) : (
            <p className="text-sm text-blue-500">
              Mínimo 3 | Máximo 50 caracteres.
            </p>
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
            placeholder="Digite a descrição do projeto"
            className="w-full" // Adapta o tamanho do input
          />
          {errors.descricao ? (
            <p className="text-sm text-red-500">{errors.descricao.message}</p>
          ) : (
            <p className="text-sm text-blue-500">
              Mínimo 3 | Máximo 200 caracteres.
            </p>
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
          {errors.dataInicio ? (
            <p className="text-sm text-red-500">{errors.dataInicio.message}</p>
          ) : (
            <p className="text-sm text-blue-500">
              Digite a data conforme o exemplo
            </p>
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
          {errors.dataFimPrevista ? (
            <p className="text-sm text-red-500">
              {errors.dataFimPrevista.message}
            </p>
          ) : (
            <p className="text-sm text-blue-500">
              Digite a data conforme o exemplo
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-8 items-center justify-center">
        {/* Campo GERENTE */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <User className="text-blue-500" size={18} />
            <label htmlFor="responsavelEmail">Responsável</label>
          </div>
          <Input
            {...register("responsavelEmail")}
            placeholder="Email do responsavel"
            className="w-full"
          />
          {errors.responsavelEmail ? (
            <p className="text-sm text-red-500">
              {errors.responsavelEmail.message}
            </p>
          ) : (
            <p className="text-sm text-blue-500">
              Digite o e-mail do responsável da atividade.
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
          {errors.avaliadorEmail ? (
            <p className="text-sm text-red-500">
              {errors.avaliadorEmail.message}
            </p>
          ) : (
            <p className="text-sm text-blue-500">
              Digite o e-mail do avaliador da atividade.
            </p>
          )}
        </div>
      </div>

      {/* Campo de Status */}
      <div className="flex flex-col gap-2">
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
