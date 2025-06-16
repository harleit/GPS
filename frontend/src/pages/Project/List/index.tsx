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
import { listProjects } from "@/services/project.service";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import NoDataFound from "../../../assets/data-not-found.png";
import { ProjectMenu } from "./ProjectMenu";
import { Calendar, ContactRound, Plus, Text } from "lucide-react";

type ProjectStatusType =
  | "planejado"
  | "em_andamento"
  | "concluido"
  | "cancelado";

interface Project {
  id: number;
  titulo: string;
  descricao: string;
  dataInicio: string;
  status: ProjectStatusType;
  gerente: string;
}

const statusColors: {
  planejado: string;
  em_andamento: string;
  concluido: string;
  cancelado: string;
} = {
  planejado: "border-2 border-solid text-sm border-blue-500 text-blue-500",
  em_andamento: "border-2 border-solid text-sm border-yellow-500 text-yellow-500",
  concluido: "border-2 border-solid text-sm border-green-500 text-green-500",
  cancelado: "border-2 border-solid text-sm border-red-500 text-red-500",
};

export function ListProjects() {
  let navigate = useNavigate();

  const {
    data: projectsData,
    isLoading,
    isError,
  } = useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: listProjects,
  });

  const projects = projectsData || [];

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Projetos</h1>
        <Button
          className=" flex  items-center bg-blue-500 cursor-pointer hover:bg-blue-600 transition-colors ease-in-out"
          onClick={() => navigate("new")}
        >
          <Plus/>
          Novo projeto
        </Button>
      </div>
      <div className="flex flex-wrap justify-center w-full h-11/12 gap-3 py-3 overflow-y-auto overflow-x-hidden ">
        {isLoading && <div>Carregando projetos...</div>}

        {isError && <div>Erro ao carregar os projetos</div>}

        {!isLoading && !isError && projects.length === 0 && (
          <div className="flex flex-col w-full h-full justify-center items-center text-center py-10">
            Nenhum projeto registrado.
            <img src={NoDataFound} className="h-3/4" />
          </div>
        )}

        {!isLoading &&
          !isError &&
          projects.map((project) => (
            <Card key={project.id} className="md:w-[45%] sm:w-[20%]  max-h-1/2 transition-colors duration-300 ease-in-out hover:bg-gray-100 ">
              <CardHeader>
                <CardTitle
                  onClick={() => navigate(`/activity/${project.titulo}`)}
                  className="cursor-pointer hover:underline"
                >
                  {project.titulo}
                </CardTitle>
                <CardDescription>
                  <div>
                  <div className = "flex items-center justify-center gap-1  p-1 rounded  w-fit border-gray-500"><Calendar size={18}/>{project.dataInicio}</div>
                </div></CardDescription>
                <CardAction>
                  <div className="flex items-center gap-2">
                    <div
                      className={`${statusColors[project.status] || "bg-red-300"
                        } p-1 rounded-md text-center`}
                    >
                      {project.status}
                    </div>
                    <div>
                      <ProjectMenu/>
                    </div>
                  </div>
                </CardAction>

              </CardHeader>
              <CardContent className = "flex items-start gap-1">
                <Text size = {18}/>
                Descrição: {project.descricao}
                </CardContent>
              <CardFooter className = "flex items-center gap-1">
                <ContactRound size = {18} />Responsável: {project.gerente}
                </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
