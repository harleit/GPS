import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import LogoSchedio from "../src/assets/logo-schedio.svg";
import { SquareKanban } from "lucide-react";
import { CircleUserRound } from "lucide-react";

export function Layout() {
  const location = useLocation();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-[100vh] max-w-md rounded-lg border md:min-w-[100vw]"
    >
      <ResizablePanel
        className="h-[100vh]"
        style={{ maxWidth: "300px", minWidth: "100px" }}
      >
        <div className="flex flex-col h-full items-center justify-between p-6 gap-6 bg-blue-950">
          {/* Header */}
          <div className="w-full h-20">
            <img src={LogoSchedio} alt="" />
          </div>
          {/* Content */}
          <div className="flex flex-col p-6 gap-6 h-100 w-full bg-blue-900/50 rounded-3xl overflow-y-auto">
            {/* <Link
              to="/about"
              className={`flex gap-4 items-center font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 ${
                location.pathname === "/about"
                  ? "bg-blue-800 rounded-lg p-2"
                  : ""
              }`}
            >
              <Info />
              Sobre nós
            </Link> */}
            <Link
              to="/project"
              className={`flex gap-4 items-center font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 ${
                location.pathname === "/project"
                  ? "bg-blue-800 rounded-lg p-2"
                  : ""
              }`}
            >
              <SquareKanban />
              Projetos
            </Link>
            <Link
              to="/profile"
              className={`flex gap-4 items-center font-semibold text-white px-4 py-2 rounded-lg transition-colors duration-300 ${
                location.pathname === "/profile"
                  ? "bg-blue-800 rounded-lg p-2"
                  : ""
              }`}
            >
              <CircleUserRound />
              Meu perfil
            </Link>
          </div>
          {/* Footer */}
          <div className="h-20 text-sm text-white">
            <p>© 2025 Schedio</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="h-[100vh]" defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <Outlet />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
