import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProjectOverview from "./components/ProjectOverview";
import TaskList from "./components/TaskList";
import UpdateTask from "./components/UpdateTask";

function App() {
  return (
    // Provides date localization using Dayjs adapter
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          {/* Route for creating a new task */}
          <Route path="/create-task" element={<CreateTask />} />
          {/* Redirect all other routes to CreateTask */}
          <Route path="*" element={<CreateTask />} />
          {/* Route for project overview */}
          <Route path="/overview" element={<ProjectOverview />} />
          {/* Route for task list */}
          <Route path="/task-list" element={<TaskList />} />
          {/* Route for updating a specific task by ID */}
          <Route path="/update-task/:id" element={<UpdateTask />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
