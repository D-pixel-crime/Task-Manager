// Import the model and Schema from mongoose for defining the data structure
import { model, Schema } from "mongoose";

// Define the schema for a Task
const TaskSchema = new Schema({
  taskName: {
    type: String, // The name of the task
    required: true, // This field is required
  },
  description: {
    type: String, // The description of the task
    required: true, // This field is required
  },
  taskPriority: {
    type: String, // The priority level of the task
    required: true, // This field is required
  },
  taskStatus: {
    type: String, // The current status of the task (e.g., Completed, Pending)
    required: true, // This field is required
  },
  deadline: {
    type: Date, // The deadline for completing the task
    required: true, // This field is required
  },
  projectName: {
    type: String, // The name of the project associated with the task
    required: true, // This field is required
  },
});

// Create and export the Task model based on the TaskSchema
export const Task = model("Task", TaskSchema);
