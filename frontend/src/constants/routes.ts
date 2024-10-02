import React from "react";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";
import ProjectOverview from "../components/ProjectOverview";
import UpdateTask from "../components/UpdateTask";

// Looping over the routes to increase code maintainability
export const routes = [
  {
    path: "/create-task",
    element: React.createElement(CreateTask),
  },
  {
    path: "/task-list",
    element: React.createElement(TaskList),
  },
  {
    path: "/overview",
    element: React.createElement(ProjectOverview),
  },
  {
    path: "/update-task/:id",
    element: React.createElement(UpdateTask),
  },
  {
    path: "*",
    element: React.createElement(CreateTask),
  },
];
