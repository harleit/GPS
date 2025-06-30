// harleit/gps/GPS-b885fdf8f7de3f14d31842ccfa48446b797a40c8/frontend/src/pages/ProjectActivity/List/index.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createProjectActivity,
  getActivityProject,
} from "@/services/project.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarClock,
  CalendarMinus,
  User,
  MessageSquareText,
  BarChart,
  Flag,
  FileText,
} from "lucide-react";
import { useParams } from "react-router-dom";
import NoDataFound from "../../../assets/data-not-found.png";
import { useState } from "react";
import { NewProjectActivity, type ProjectActivityFormData } from "../New";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ActivityMenu } from "./ActivityMenu";
import { format } from "date-fns";

type ProjectStatusType = "pendente" | "em_andamento" | "concluida";
type ActivityEvaluationType =
  | "nao_concluida"
  | "concluida_com_observacoes"
  | "concluida";
type ActivityPriorityType = "baixa" | "normal" | "alta";

interface ProjectActivity {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFimPrevista: string;
  dataFimReal?: string;
  status: ProjectStatusType;
  projetoTitulo: string;
  responsavelEmail: string;
  avaliadorEmail?: string;
  avaliacao?: ActivityEvaluationType;
  observacoes?: string;
  prioridade?: ActivityPriorityType;
}

const statusColors = {
  pendente: "border-2 border-solid border-blue-500 text-blue-500",
  em_andamento: "border-2 border-solid border-yellow-500 text-yellow-500",
  concluida: "border-2 border-solid border-green-500 text-green-500",
};

const priorityColors = {
  baixa: "border-2 border-solid border-gray-400 text-gray-600",
  normal: "border-2 border-solid border-blue-400 text-blue-600",
  alta: "border-2 border-solid border-red-500 text-red-600",
};

export function ListProjectActivity() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { titulo } = useParams<{ titulo: string }>();
  const queryClient = useQueryClient();

  const {
    data: activitiesData,
    isLoading,
    isError,
    error,
  } = useQuery<ProjectActivity[], Error>({
    queryKey: ["project-activities", titulo],
    queryFn: () => {
      if (!titulo) return Promise.reject(new Error("Título do projeto não fornecido."));
      return getActivityProject(titulo);
    },
    enabled: !!titulo,
  });

  const handleSaveActivity = async (data: ProjectActivityFormData) => {
    try {
      await createProjectActivity(data);
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["project-activities", titulo] });
    } catch (error) {
      console.error("Erro ao salvar atividade:", error);
    }
  };

  const filteredActivities = (activitiesData || []).filter((activity) => {
    const term = searchTerm.toLowerCase();
    return (
      activity.nome.toLowerCase().includes(term) ||
      activity.descricao.toLowerCase().includes(term) ||
      activity.responsavelEmail.toLowerCase().includes(term) ||
      (activity.avaliadorEmail && activity.avaliadorEmail.toLowerCase().includes(term))
    );
  });

  if (!titulo) {
    return <div className="w-full text-center py-10">Título do projeto não especificado na URL.</div>;
  }

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <h1 className="text-xl font-semibold">Atividades do Projeto: {titulo}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 transition-colors">
              Nova atividade
            </Button>
          </DialogTrigger>
          <DialogContent className="w-11/12 md:w-1/2">
            <DialogHeader>
              <DialogTitle>Nova Atividade - {titulo}</DialogTitle>
              <DialogDescription>Adicione uma nova atividade ao projeto.</DialogDescription>
            </DialogHeader>
            <NewProjectActivity
              onSave={handleSaveActivity}
              formId="newActivityForm"
              currentProjetoTitulo={titulo}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" form="newActivityForm" className="bg-blue-500 hover:bg-blue-600">
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        placeholder="Buscar por nome, descrição, responsável ou avaliador..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      <div className="flex flex-wrap justify-center gap-4 py-3 overflow-y-auto">
        {isLoading && <div>Carregando...</div>}
        {isError && <div>Erro: {error?.message}</div>}
        {!isLoading && !isError && filteredActivities.length === 0 && (
          <div className="flex flex-col items-center">
            Nenhuma atividade encontrada.
            <img src={NoDataFound} alt="Nenhum dado" className="h-64 mt-4" />
          </div>
        )}

        {!isLoading &&
          !isError &&
          filteredActivities.map((activity) => (
            <Card key={activity.id} className="w-full md:w-[48%] flex flex-col p-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg font-bold">{activity.nome}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className={`${statusColors[activity.status]} px-2 py-1 rounded text-xs font-semibold`}>{activity.status.replace(/_/g, " ")}</div>
                  {activity.prioridade && (
                    <div className={`${priorityColors[activity.prioridade]} px-2 py-1 rounded text-xs font-semibold`}> <Flag size={14} className="inline-block mr-1" />{activity.prioridade}</div>
                  )}
                  <ActivityMenu activityId={String(activity.id)} projectTitle={titulo} />
                </div>
              </div>

              <div className="flex flex-wrap text-sm text-gray-600 gap-4 mb-2">
                <span className="flex items-center gap-1"><CalendarClock size={16} /> Início: {activity.dataInicio ? format(new Date(activity.dataInicio), "dd/MM/yyyy") : "N/A"}</span>
                <span className="flex items-center gap-1"><CalendarMinus size={16} /> Previsto: {activity.dataFimPrevista ? format(new Date(activity.dataFimPrevista), "dd/MM/yyyy") : "N/A"}</span>
                {activity.dataFimReal && (
                  <span className="flex items-center gap-1"><CalendarMinus size={16} /> Real: {format(new Date(activity.dataFimReal), "dd/MM/yyyy")}</span>
                )}
              </div>

              <CardContent className="px-0 text-sm text-gray-700">
                <p className="flex gap-1"><FileText size={16} /> Descrição: {activity.descricao}</p>
                {activity.avaliacao && (
                  <p className="flex gap-1 mt-2"><BarChart size={16} /> Avaliação: {activity.avaliacao.replace(/_/g, " ")}</p>
                )}
                {activity.observacoes && (
                  <p className="flex gap-1 mt-2"><MessageSquareText size={16} /> Observações: {activity.observacoes}</p>
                )}
              </CardContent>

              <CardFooter className="px-0 mt-4 border-t pt-2 text-sm text-gray-800 flex justify-between">
                <span className="flex items-center gap-1"><User size={16} /> {activity.responsavelEmail}</span>
                {activity.avaliadorEmail && (
                  <span className="flex items-center gap-1"><User size={16} /> {activity.avaliadorEmail}</span>
                )}
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}