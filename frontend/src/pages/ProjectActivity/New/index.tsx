import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProjectUsers } from "@/services/project.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CalendarPlus,
  CheckCircle,
  FileText,
  FolderKanban,
  User,
} from "lucide-react";
import { useState } from "react";
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

// Componente de Autocomplete reutilizável para usuários
const UserAutocomplete = ({
  users,
  field,
  placeholder,
}: {
  users: any[];
  field: any;
  placeholder: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const selectedUser = users.find((u) => u.email === field.value);

  const filteredUsers = searchTerm
    ? users.filter(
        (user) =>
          user.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="relative">
      {selectedUser ? (
        <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
          <span>
            {selectedUser.nomeCompleto} ({selectedUser.email})
          </span>
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
      ) : (
        <Input
          {...field}
          placeholder={placeholder}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // Delay para permitir o clique
          onChange={(e) => {
            setSearchTerm(e.target.value);
            field.onChange(e); // Mantém o RHF atualizado
          }}
          value={searchTerm}
        />
      )}

      {showSuggestions && !selectedUser && filteredUsers.length > 0 && (
        <div className="absolute z-10 w-full mt-1 border rounded-md bg-white shadow-lg max-h-48 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-2 cursor-pointer hover:bg-accent"
              onClick={() => {
                field.onChange(user.email);
                setSearchTerm(user.nomeCompleto); // Preenche o input para feedback visual
                setShowSuggestions(false);
              }}
            >
              <p className="font-medium">{user.nomeCompleto}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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

  // Busca os membros do projeto para usar no autocomplete
  const { data: projectUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["project-users", currentProjetoTitulo],
    queryFn: () => getProjectUsers(currentProjetoTitulo!),
    enabled: !!currentProjetoTitulo,
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
      onSubmit={handleSubmit(processSubmit)}
      className="flex flex-col space-y-4"
    >
      {/* Nome da Atividade */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="nome" className="flex items-center gap-2 font-medium">
          <FileText size={16} /> Nome da Atividade
        </label>
        <Input
          {...register("nome")}
          placeholder="Ex: Desenvolver tela de login"
        />
        {errors.nome && (
          <p className="text-sm text-red-500">{errors.nome.message}</p>
        )}
      </div>

      {/* Descrição */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="descricao"
          className="flex items-center gap-2 font-medium"
        >
          <FileText size={16} /> Descrição
        </label>
        <Input
          {...register("descricao")}
          placeholder="Descreva os detalhes da tarefa..."
        />
        {errors.descricao && (
          <p className="text-sm text-red-500">{errors.descricao.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="status" className="flex items-center gap-2 font-medium">
          <Activity size={16} /> Status
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      {/* Data de Início */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="dataInicio"
          className="flex items-center gap-2 font-medium"
        >
          <CalendarPlus size={16} /> Data de Início
        </label>
        <Input {...register("dataInicio")} type="date" />
        {errors.dataInicio && (
          <p className="text-sm text-red-500">{errors.dataInicio.message}</p>
        )}
      </div>

      {/* Data Final Prevista */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="dataFimPrevista"
          className="flex items-center gap-2 font-medium"
        >
          <CalendarPlus size={16} /> Previsão de Término
        </label>
        <Input {...register("dataFimPrevista")} type="date" />
        {errors.dataFimPrevista && (
          <p className="text-sm text-red-500">
            {errors.dataFimPrevista.message}
          </p>
        )}
      </div>

      {/* Responsável (Autocomplete) */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="responsavelEmail"
          className="flex items-center gap-2 font-medium"
        >
          <User size={16} /> Responsável
        </label>
        <Controller
          name="responsavelEmail"
          control={control}
          render={({ field }) => (
            <UserAutocomplete
              users={projectUsers}
              field={field}
              placeholder="Buscar responsável..."
            />
          )}
        />
        {errors.responsavelEmail && (
          <p className="text-sm text-red-500">
            {errors.responsavelEmail.message}
          </p>
        )}
      </div>

      {/* Avaliador (Autocomplete) */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="avaliadorEmail"
          className="flex items-center gap-2 font-medium"
        >
          <User size={16} /> Avaliador
        </label>
        <Controller
          name="avaliadorEmail"
          control={control}
          render={({ field }) => (
            <UserAutocomplete
              users={projectUsers}
              field={field}
              placeholder="Buscar avaliador..."
            />
          )}
        />
        {errors.avaliadorEmail && (
          <p className="text-sm text-red-500">
            {errors.avaliadorEmail.message}
          </p>
        )}
      </div>

      {isLoadingUsers && (
        <p className="text-sm text-gray-500">
          Carregando membros do projeto...
        </p>
      )}
    </form>
  );
}
