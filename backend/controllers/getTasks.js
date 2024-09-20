// Import the Task model for database operations
import { Task } from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  // Extract the search term from the request body
  const { search } = req.body;
  console.log(search);

  // Get the current date and time
  const now = new Date();

  try {
    // Use aggregation to fetch tasks based on the search term
    const tasks = await Task.aggregate([
      {
        // Match tasks whose name contains the search term (case-insensitive)
        $match: {
          taskName: { $regex: search, $options: "i" },
        },
      },
      {
        // Project necessary fields and calculate the time until the deadline
        $project: {
          taskName: 1,
          description: 1,
          taskPriority: 1,
          taskStatus: 1,
          projectName: 1,
          dueIn: {
            $ceil: {
              $divide: [{ $subtract: ["$deadline", now] }, 1000 * 60 * 60],
            },
          },
        },
      },
      {
        // Group tasks by project name
        $group: {
          _id: "$projectName",
          tasks: {
            // Push relevant task details into an array
            $push: {
              _id: "$_id",
              projectName: "$projectName",
              taskName: "$taskName",
              description: "$description",
              taskPriority: "$taskPriority",
              taskStatus: "$taskStatus",
              dueIn: "$dueIn",
            },
          },
        },
      },
    ]);

    console.log(tasks);

    // Return the aggregated tasks with a 200 status
    return res.status(200).json({ tasks });
  } catch (error) {
    // Log any errors encountered during the process
    console.log(error);
    // Return a 500 status with an error message if fetching fails
    return res
      .status(500)
      .json({ message: `Error Getting Tasks - ${error.message}` });
  }
};
