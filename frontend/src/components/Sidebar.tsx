import { ClipboardCheck, Folders, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface sidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: sidebarProps) => {
  const pathname = window.location.pathname;

  return (
    <nav
      className={`fixed z-50 top-0 left-0 h-screen bg-white ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-[105%]"
      } flex flex-col justify-between items-center lg:w-1/6 md:w-1/5 w-1/3 py-3 px-2.5 border-r-2 border-r-slate-300/90 shadow-2xl shadow-slate-400/40 transition duration-700 ease-in-out`}
    >
      <div className="flex flex-col gap-7 w-full px-2">
        <h1 className="text-2xl font-semibold text-center text-slate-500">
          PT
          <sup className="text-slate-400 text-base">3</sup>
          <br />
          ( Personal Task
          <br />&<br />
          Time Tracker )
        </h1>
        <div className="flex flex-col w-full border-2 rounded-md">
          <Link
            className={`flex gap-2 px-2 py-1.5 hover:bg-slate-300 items-center text-sm font-semibold transition border-b-2 border-y-slate-200 w-full ${
              pathname === "/task-list" || pathname === "/overview"
                ? ""
                : "bg-slate-300"
            }`}
            to={"/create-task"}
          >
            <Home /> Create Task
          </Link>
          <Link
            className={`flex gap-2 px-2 py-1.5 hover:bg-slate-300 items-center text-sm font-semibold transition border-b-2 border-y-slate-200 w-full ${
              pathname === "/task-list" && "bg-slate-300"
            }`}
            to={"/task-list"}
          >
            <Folders /> Task List
          </Link>
          <Link
            className={`flex gap-2 px-2 py-1.5 hover:bg-slate-300 items-center text-sm font-semibold transition border-y-slate-200 w-full ${
              pathname === "/overview" && "bg-slate-300"
            }`}
            to={"/overview"}
          >
            <ClipboardCheck /> Project Overview
          </Link>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsSidebarOpen(false);
        }}
        className="px-2 w-full tracking-[0.25rem] py-1 font-semibold rounded-md bg-red-500 text-white border-2 border-red-500 hover:text-red-600 hover:bg-transparent transition"
      >
        CLOSE
      </button>
    </nav>
  );
};
export default Sidebar;
