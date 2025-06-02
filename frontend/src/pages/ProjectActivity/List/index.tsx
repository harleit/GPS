import { Button } from "@/components/ui/button";
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
import { CalendarClock, CalendarMinus } from "lucide-react";
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

interface ProjectActivity {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFimPrevista: string;
  dataFimReal: string;
  status: string;
  projetoTitulo: string;
  responsavelEmail: string;
}

export function ListProjectActivity() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { titulo } = useParams<{ titulo: string }>();
  const queryClient = useQueryClient();

  const {
    data: activitiesData,
    isLoading,
    isError,
  } = useQuery<ProjectActivity[], Error>({
    queryKey: ["project-activities", titulo],
    queryFn: () => {
      if (!titulo) {
        // Não deve acontecer se 'enabled' estiver configurado corretamente, mas é uma guarda extra.
        // Retornar uma promessa rejeitada ou um array vazio, dependendo de como quer lidar.
        return Promise.reject(new Error("Título do projeto não fornecido."));
      }
      return getActivityProject(titulo); // Passa o título para a função
    },
    // 4. Habilitar a query somente se o título do projeto estiver disponível
    enabled: !!titulo,
  });

  const handleSaveActivity = async (data: ProjectActivityFormData) => {
    console.log(
      "ListProjectActivity: handleSaveActivity chamado com data:",
      data
    ); // DEBUG
    try {
      await createProjectActivity(data);
      console.log("ListProjectActivity: createProjectActivity bem-sucedido."); // DEBUG
      setIsDialogOpen(false); // Fecha o diálogo
      // Invalida a query da lista de atividades para forçar a atualização
      console.log("Invalidando query: project-activities", titulo);
      queryClient.invalidateQueries({
        queryKey: ["project-activities", titulo],
      });
    } catch (error) {
      console.error("ListProjectActivity: Erro em handleSaveActivity:", error); // DEBUG
      // Considere adicionar um feedback para o usuário aqui em caso de erro
    }
  };

  const activities = activitiesData || []; // Renomeado para clareza

  // Se o título não foi fornecido pela URL, mostre uma mensagem.
  if (!titulo) {
    return (
      <div className="w-full text-center py-10">
        Título do projeto não especificado na URL.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="flex justify-between items-center">
        <h1>Atividades</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-500 cursor-pointer"
              onClick={() => setIsDialogOpen(true)} // Controla explicitamente a abertura
            >
              Nova atividade
            </Button>
          </DialogTrigger>
          <DialogContent className="w-1/2">
            <DialogHeader>
              <DialogTitle>Cadastrar Nova Atividade - {titulo}</DialogTitle>
              <DialogDescription>
                Preencha os detalhes abaixo para adicionar uma nova atividade ao
                projeto.
              </DialogDescription>
            </DialogHeader>
            <NewProjectActivity
              onSave={handleSaveActivity}
              formId="newActivityForm"
              currentProjetoTitulo={titulo}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              {/* Este botão aciona o submit do formulário com id="newActivityForm" */}
              <Button
                type="submit"
                form="newActivityForm"
                onClick={() => {
                  console.log("Debug: Botão Salvar");
                }}
              >
                Salvar Atividade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap justify-center w-full h-11/12 gap-3 py-3 overflow-y-auto overflow-x-hidden ">
        {isLoading && <div>Carregando atividades...</div>}

        {isError && <div>Erro ao carregar as atividades</div>}

        {!isLoading && !isError && activities.length === 0 && (
          <div className="flex flex-col w-full h-full justify-center items-center text-center py-10">
            Nenhuma atividade registrada.
            <img src={NoDataFound} className="h-3/4" />
          </div>
        )}

        {!isLoading &&
          !isError &&
          activities.map((activity) => (
            <Card className="w-full max-h-1/2">
              <CardHeader>
                <CardTitle>{activity.nome}</CardTitle>
                <div className="flex gap-3">
                  <CardDescription className="flex gap-2">
                    <CalendarClock size={18} />
                    {activity.dataInicio}
                  </CardDescription>
                  <CardDescription className="flex gap-2">
                    <CalendarMinus size={18} />
                    {activity.dataFimPrevista}
                  </CardDescription>
                </div>
                <CardAction>{activity.status}</CardAction>
              </CardHeader>
              <CardContent>{activity.descricao}</CardContent>
              <CardFooter>{activity.responsavelEmail}</CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
