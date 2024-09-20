// Import the Task model for interacting with the database
import { Task } from "../models/TaskModel.js";

export const getIndividualTask = async (req, res) => {
  const id = req.params.id; // Extract the task ID from the request parameters
  try {
    // Fetch the task from the database using its ID
    const task = await Task.findById(id);
    // Return the task in the response with a 200 status
    return res.status(200).json({ task });
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.log(error);
    // Return a 500 status with an error message if fetching fails
    return res
      .status(500)
      .json({ message: `Error Fetching Task - ${error.message}` });
  }
};
