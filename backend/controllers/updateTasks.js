// Import the Task model for database operations
import { Task } from "../models/TaskModel.js";

export const updateTasks = async (req, res) => {
  // Get the array of updated tasks from the request body
  const updatedTasks = req.body;
  // Log the updated tasks for debugging purposes
  console.log(updatedTasks);

  try {
    // Iterate over each task and update its status in the database
    updatedTasks.forEach(async (task) => {
      await Task.findByIdAndUpdate(task._id, { taskStatus: task.taskStatus });
    });
    // Return a success response after all tasks have been updated
    return res.status(200).json({ message: "Tasks Updated Successfully" });
  } catch (error) {
    // Log any errors encountered during the update
    console.log(error);
    // Return a 500 status with an error message if updating fails
    return res
      .status(500)
      .json({ message: `Error Updating Tasks - ${error.message}` });
  }
};
