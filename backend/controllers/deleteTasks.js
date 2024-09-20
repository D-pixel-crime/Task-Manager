// Import the Task model for interacting with the database
import { Task } from "../models/TaskModel.js";

export const deleteTasks = async (req, res) => {
  const updatedTasks = req.body; // Extract the list of tasks to be deleted from the request body
  console.log(updatedTasks); // Log the tasks being deleted for debugging

  try {
    // Iterate over each task in the updatedTasks array
    updatedTasks.forEach(async (task) => {
      // Check if the task has an _id property
      if (task._id) {
        // Delete the task from the database using its ID
        await Task.findByIdAndDelete(task._id);
      }
    });

    // Return a success message after processing all deletions
    return res.status(200).json({ message: "Tasks Deleted Successfully" });
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.log(error);

    // Return a 500 status with an error message if deletion fails
    return res
      .status(500)
      .json({ message: `Error Deleting Tasks - ${error.message}` });
  }
};
