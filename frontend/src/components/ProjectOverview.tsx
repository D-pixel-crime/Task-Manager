import { useLayoutEffect, useState } from "react";
import MainContainer from "../containers/MainContainer";
import CircularWithValueLabel from "./Progress";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

function SlideTransition(props: SlideProps) {
  // Function to create a slide animation with upward direction
  return <Slide {...props} direction="up" />;
}

const ProjectOverview = () => {
  // State to track if data is still being fetched
  const [isFetch, setIsFetch] = useState(true);

  // State to hold the progress data of different task categories
  const [progress, setProgress] = useState({
    completedTasks: 0, // Completed tasks count
    inProgressTasks: 0, // In-progress tasks count
    notStartedTasks: 0, // Not started tasks count
  });

  useLayoutEffect(() => {
    // Function to fetch task progress from the backend
    const fetchProgress = async () => {
      try {
        // API call to fetch progress data
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/progress`,
          { withCredentials: true }
        );

        // Updating progress state with data fetched
        setProgress(data.progress);
        console.log(data);

        // Success message when data is fetched successfully
        setIsSuccess({
          status: "success",
          message: "Data fetched successfully",
        });
      } catch (error) {
        // Handling errors during data fetching
        console.error("Error:", error);
        setIsSuccess({
          status: "error",
          message: "Error fetching data",
        });
      } finally {
        // Show Snackbar notification after fetching
        handleClick(SlideTransition)();
        // Set fetching state to false after API call finishes
        setIsFetch(false);
      }
    };

    fetchProgress(); // Trigger the fetch function when the component mounts
  }, []);

  // State to manage the success/error message to be displayed in the Snackbar
  const [isSuccess, setIsSuccess] = useState({
    status: "error" as "success" | "error" | "warning" | "info",
    message: "",
  });

  // State to manage Snackbar visibility and transition
  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade, // Default transition for Snackbar
  });

  // Function to handle the opening of the Snackbar
  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
    () => {
      setState({
        open: true, // Open the Snackbar
        Transition, // Set the transition
      });
    };

  // Function to close the Snackbar
  const handleClose = () => {
    setState({
      ...state, // Keep the current state but close the Snackbar
      open: false,
    });
  };

  return isFetch ? (
    // Display a loader when data is being fetched
    <main className="flex-center flex-col bg-slate-900/80 text-white h-screen w-screen">
      <InfinitySpin color="violet" />
      Fetching Progress...
    </main>
  ) : (
    // Display the progress when data is available
    <MainContainer>
      <section className="flex-center w-full h-screen">
        <article className="w-full h-full p-20 grid grid-cols-3 gap-5 relative">
          {/* Completed tasks progress */}
          <div className="flex-center flex-col gap-10 w-full p-10">
            <CircularWithValueLabel
              value={progress.completedTasks} // Show the number of completed tasks
              color="#3cca35" // Color representing completed tasks
            />
            <h2 className="flex items-center gap-2">
              <span className="w-[10px] h-[10px] bg-green-500 rounded-full" />
              Completed
            </h2>
          </div>

          {/* In-progress tasks progress */}
          <div className="flex-center flex-col gap-10 w-full p-10">
            <CircularWithValueLabel
              value={progress.inProgressTasks} // Show the number of in-progress tasks
              color="#3d7ccd" // Color representing in-progress tasks
            />
            <h2 className="flex items-center gap-2">
              <span className="w-[10px] h-[10px] bg-blue-500 rounded-full" />
              In-Progress
            </h2>
          </div>

          {/* Not started tasks progress */}
          <div className="flex-center flex-col gap-10 w-full p-10">
            <CircularWithValueLabel
              value={progress.notStartedTasks} // Show the number of not started tasks
              color="#ec1010" // Color representing not started tasks
            />
            <h2 className="flex items-center gap-2">
              <span className="w-[10px] h-[10px] bg-red-500 rounded-full" />
              Not Started
            </h2>
          </div>
        </article>
      </section>

      {/* Snackbar for showing notifications */}
      <Snackbar
        open={state.open} // Open or close the Snackbar
        onClose={handleClose} // Handle Snackbar close
        TransitionComponent={state.Transition} // Apply transition effect
        key={state.Transition.name} // Unique key for transition
        autoHideDuration={4000} // Automatically hide after 4 seconds
      >
        {/* Alert component within the Snackbar */}
        <Alert
          onClose={handleClose} // Close the alert
          severity={isSuccess.status} // Display the alert based on status
          sx={{ width: "100%" }}
        >
          <AlertTitle>{isSuccess.status}</AlertTitle>
          {isSuccess.message} {/* Display the message */}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
};

export default ProjectOverview;
