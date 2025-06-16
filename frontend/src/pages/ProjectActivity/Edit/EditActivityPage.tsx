import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditProjectActivity } from ".";
import type { ProjectActivityFormData } from ".";
import { getProjectActivityById, updateProjectActivityById } from "@/services/project.service";
import { toast } from "sonner";

export function EditActivityPage() {
  const { projectTitle, activityId } = useParams<{ projectTitle: string; activityId: string }>();

  const [initialData, setInitialData] = useState<ProjectActivityFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        if (!activityId) return;
        const data = await getProjectActivityById(activityId);
        setInitialData(data);
      } catch (error) {
        toast.error("Erro ao carregar atividade.");
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, [activityId]);

  async function handleUpdate(data: ProjectActivityFormData) {
    try {
      if (!activityId) return;
      await updateProjectActivityById(activityId, data);
      toast.success("Atividade atualizada com sucesso!");
      // Redirecionar ou atualizar a tela, se quiser
    } catch (error) {
      toast.error("Erro ao atualizar atividade.");
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!initialData) return <p>Atividade não encontrada.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Editar Atividade</h1>
      <EditProjectActivity
        formId="edit-activity-form"
        initialData={initialData}
        onUpdate={handleUpdate}
      />
      <button
        type="submit"
        form="edit-activity-form"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Salvar Alterações
      </button>
    </div>
  );
}
