// Import mongoose for database operations
import mongoose from "mongoose";
// Import environment variables from the .env file
import "dotenv/config";
// Import colors for console output styling
import "colors";

// Function to connect to the MongoDB database
export const connectToDB = async () => {
  try {
    // Attempt to connect to the database using the URI from the environment variables
    const res = await mongoose.connect(process.env.MONGO_URI);
    // Log a success message with the host of the connected database
    console.log(`MongoDB connected: ${res.connection.host}`.bgCyan);
  } catch (error) {
    // Log an error message if the connection fails
    console.log(`Error connecting to database: ${error}`.bgRed);
  }
};
