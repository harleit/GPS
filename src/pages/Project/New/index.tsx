import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { toast } from "sonner"

export function NewProject() {
      // Estado para armazenar o nome do projeto
  const [projectName, setProjectName] = useState('');
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Verifica se o campo está vazio
    if (projectName.trim() === '') {
      toast("Erro", { description: "Digite um nome para o projeto" });
      return;
    }

    // Exibe o toast com o nome do projeto
    toast("Projeto Criado", {
      description: `Seu primeiro projeto: ${projectName}`,
      action: {
        label: "Undo",
        onClick: () => console.log("Desfazer criação do projeto!"),
      },
    });

    console.log('Tentando criar...')

    // Limpa o campo após o envio (opcional)
    setProjectName('');
  }

  return (
    <div>

    <form onSubmit={onSubmit} className="w-2/3 space-y-6">
    <div>
          <label htmlFor="projectName" className="block mb-2">
            Nome do Projeto
          </label>
          <Input
            id="projectName"
            placeholder="Digite o nome do projeto"
            value={projectName} // Usa o estado
            onChange={(e) => setProjectName(e.target.value)} // Atualiza o estado
            className="w-full" // Adapta o tamanho do input
          />
          <p className="text-sm text-gray-500">
            Esse será o nome que seu projeto aparecerá.
          </p>
        </div>

        {/* Botão de submit */}
        <Button
          type="submit"
          disabled={!projectName.trim()} // Desabilita se o campo estiver vazio
        >
          Submit
        </Button>
    </form>
    </div>
  )
}