// Import the Task model for database operations
import { Task } from "../models/TaskModel.js";

export const getProgress = async (req, res) => {
  try {
    // Count the total number of tasks in the database
    const totalTasks = await Task.find().countDocuments();

    // Count the number of completed tasks
    const completedTasks = await Task.find({
      taskStatus: "Completed",
    }).countDocuments();

    // Count the number of tasks that are in progress
    const inProgressTasks = await Task.find({
      taskStatus: "Pending",
    }).countDocuments();

    // Count the number of tasks that have not started
    const notStartedTasks = await Task.find({
      taskStatus: "Not Started",
    }).countDocuments();

    // Calculate the percentage of each task status
    const progress = {
      completedTasks: Math.ceil((completedTasks / totalTasks) * 100),
      inProgressTasks: Math.ceil((inProgressTasks / totalTasks) * 100),
      notStartedTasks: Math.ceil((notStartedTasks / totalTasks) * 100),
    };

    // Return the progress data with a 200 status
    return res.status(200).json({ progress });
  } catch (error) {
    // Log any errors encountered during the process
    console.log(error);
    // Return a 500 status with an error message if fetching fails
    return res
      .status(500)
      .json({ message: `Error Fetching Progress - ${error.message}` });
  }
};
