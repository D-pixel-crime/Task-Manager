import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import { PanelLeftOpen } from "lucide-react";

interface mainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: mainContainerProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen w-max-screen overflow-x-hidden bg-slate-200">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          setIsSidebarOpen(true);
        }}
        className={`w-fit z-50 p-2 text-slate-500/80 hover:scale-110 fixed top-2 left-2 border-2 border-slate-500/80 rounded-full bg-slate-300 ${
          isSidebarOpen ? "hidden" : "visible"
        } shadow-md shadow-slate-500 transition`}
      >
        <PanelLeftOpen width={40} height={40} />
      </button>

      <section className="w-full h-full overflow-x-hidden">{children}</section>
    </main>
  );
};
export default MainContainer;
