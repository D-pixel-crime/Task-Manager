// Import the Task model for database operations
import { Task } from "../models/TaskModel.js";

export const updateIndividualTask = async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  // Get the updated task data from the request body
  const data = req.body;

  try {
    // Update the task in the database using the provided ID and data
    const response = await Task.findByIdAndUpdate(id, data);
    // Return a success response with the updated task details
    return res
      .status(201)
      .json({ message: "Task Updated Successfully", task: response });
  } catch (error) {
    // Log any errors encountered during the update
    console.log(error);
    // Return a 500 status with an error message if updating fails
    return res
      .status(500)
      .json({ message: `Error Updating Task - ${error.message}` });
  }
};
