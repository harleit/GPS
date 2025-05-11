import { Link, Outlet } from 'react-router-dom'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'

export function Layout() {

  return (
    <ResizablePanelGroup
    direction="horizontal"
    className="min-h-[100vh] max-w-md rounded-lg border md:min-w-[100vw]"
  >
    <ResizablePanel defaultSize={25}>
      <div className="flex flex-col h-full items-center justify-center p-6">
        <Link to="/">
        <span className="font-semibold">Home</span>
        </Link>
        <Link to="about ">
        <span className="font-semibold">Sobre nós</span>
        </Link>
        <Link to="project/new ">
        <span className="font-semibold">Novo Projeto</span>
        </Link>
        <Link to="user/new ">
        <span className="font-semibold">Criar conta</span>
        </Link>
      </div>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={75}>
      <div className="flex h-full items-center justify-center p-6">
        <Outlet />
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
)
}

