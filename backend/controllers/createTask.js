export const createTask = async (req, res) => {
  const data = req.body; // Extract the task data from the request body

  try {
    // Attempt to create a new task with the provided data
    const response = await Task.create(data);

    // If task creation is successful, send a success response with the created task
    return res
      .status(201) // HTTP status 201 indicates a resource was successfully created
      .json({ message: "Task Created Successfully", task: response });
  } catch (error) {
    // If an error occurs during task creation, log the error for debugging
    console.log(error);

    // Send a response indicating an internal server error occurred
    return res
      .status(500) // HTTP status 500 indicates a server-side error
      .json({ message: `Error Creating Task - ${error.message}` });
  }
};
