import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectToDB } from "./database/connectToDB.js";
import { createTask } from "./controllers/createTask.js";
import { getTasks } from "./controllers/getTasks.js";
import { updateTasks } from "./controllers/updateTasks.js";
import { deleteTasks } from "./controllers/deleteTasks.js";
import { deleteIndividualTask } from "./controllers/deleteIndividualTask.js";
import { getIndividualTask } from "./controllers/getIndividualTask.js";
import { updateIndividualTask } from "./controllers/updateIndividualTask.js";
import { getProgress } from "./controllers/getProgress.js";

const app = express();
const port = 3000;

// Configure CORS middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials to be included in requests
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup request logging
app.use(morgan("tiny"));

// Connect to the database
connectToDB();

// Define the root route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Backend Now Active!" });
});

// Define routes for task-related operations
app.get("/task/:id", getIndividualTask); // Get individual task by ID
app.get("/progress", getProgress); // Get progress statistics
app.post("/search", getTasks); // Search for tasks
app.post("/update-task/:id", updateIndividualTask); // Update an individual task
app.patch("/update-tasks", updateTasks); // Update multiple tasks
app.post("/delete-tasks", deleteTasks); // Delete multiple tasks
app.delete("/delete/:id", deleteIndividualTask); // Delete an individual task
app.post("/create-task", createTask); // Create a new task

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server is running on port ${port}`));
