import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProjectOverview from "./components/ProjectOverview";
import TaskList from "./components/TaskList";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="*" element={<CreateTask />} />
          <Route path="/overview" element={<ProjectOverview />} />
          <Route path="/task-list" element={<TaskList />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
