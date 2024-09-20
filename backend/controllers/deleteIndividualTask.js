// Import the Task model for interacting with the database
import { Task } from "../models/TaskModel.js";

export const createTask = async (req, res) => {
  const { id } = req.params;
  try {
    // Attempt to create a new task in the database using the received data
    const response = await Task.findByIdAndDelete(id);

    // Return a 201 status with a success message and the created task
    return res
      .status(201)
      .json({ message: "Task Deleted Successfully", task: response });
  } catch (error) {
    // Log any errors that occur during task creation
    console.log(error);

    // Return a 500 status with an error message if task creation fails
    return res
      .status(500)
      .json({ message: `Error Deleting Task - ${error.message}` });
  }
};
