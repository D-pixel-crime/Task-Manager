import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import { PanelLeftOpen } from "lucide-react";

interface mainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: mainContainerProps) => {
  // State to manage the visibility of the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Main container for the app with a minimum height and background color
    <main className="min-h-screen w-max-screen overflow-x-hidden bg-slate-200">
      {/* Sidebar component with control over its open state */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Button to open the sidebar, hidden if the sidebar is already open */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsSidebarOpen(true);
        }}
        className={`w-fit z-50 p-2 text-slate-500/80 hover:scale-110 fixed top-2 left-2 border-2 border-slate-500/80 rounded-full bg-slate-300 ${
          isSidebarOpen ? "hidden" : "visible"
        } shadow-md shadow-slate-500 transition`}
      >
        {/* Icon for opening the sidebar */}
        <PanelLeftOpen width={40} height={40} />
      </button>

      {/* Section to render children components */}
      <section className="w-full h-full overflow-x-hidden">{children}</section>
    </main>
  );
};

export default MainContainer;
