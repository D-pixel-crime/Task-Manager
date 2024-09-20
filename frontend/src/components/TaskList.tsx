import { Search } from "lucide-react";
import MainContainer from "../containers/MainContainer";
import Table from "./Table";
import { useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

interface dataProps {
  _id: string;
  projectName: string;
  taskName: string;
  description: string;
  taskPriority: string;
  dueIn: string;
  taskStatus: string;
}

const TaskList = () => {
  const [data, setData] = useState(null as dataProps[] | null); // State to hold fetched tasks
  const [search, setSearch] = useState(""); // State for search input
  const [isSearch, setIsSearch] = useState(false); // State to manage search loading status

  const [isSuccess, setIsSuccess] = useState({
    status: "error" as "success" | "error" | "warning" | "info",
    message: "",
  });

  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & { children: React.ReactElement<any, any> }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const handleClick = (
    Transition: React.ComponentType<
      TransitionProps & { children: React.ReactElement<any, any> }
    >
  ) => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const handleSearch = () => {
    setIsSearch(true); // Indicate that search is in progress
    console.log(search); // Log current search term

    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/search`,
          { search },
          { withCredentials: true }
        );

        const responseData = response.data.tasks || response.data;
        console.log("Response Data:", responseData);

        if (!Array.isArray(responseData) || responseData.length === 0) {
          setIsSuccess({
            status: "info",
            message: "No tasks found",
          });
          setData(null);
          return;
        }

        // Flatten the tasks from projects into a single array
        const allTasks = responseData.reduce(
          (acc: dataProps[], project: any) => {
            return [...acc, ...project.tasks];
          },
          []
        );

        setData(allTasks); // Set the fetched tasks into state
        setIsSuccess({
          status: "success",
          message: "Tasks fetched successfully",
        });
      } catch (error: any) {
        console.error(error.message);
        setIsSuccess({
          status: "error",
          message:
            error.message ||
            error.response?.data?.message ||
            "Something went wrong",
        });
      } finally {
        handleClick(SlideTransition);
        setIsSearch(false); // Reset loading status
      }
    }, 1000); // Simulated delay for demonstration
  };

  React.useEffect(() => {
    handleSearch(); // Trigger initial search on component mount
  }, []);

  return (
    <MainContainer>
      <section className="w-full h-full flex-center">
        <article className="w-full h-full flex flex-col items-center py-10 border-2 gap-14">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              handleSearch(); // Trigger search
            }}
            className="flex flex-col gap-1 w-1/4"
          >
            <label htmlFor="search" className="text-sm text-slate-500">
              Search Task:
            </label>
            <div className="flex justify-between p-2 bg-white rounded-md gap-2 items-center text-slate-500 border-2 w-full border-slate-500">
              <input
                type="text"
                className="outline-none w-full"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value); // Update search state
                }}
              />
              <button
                type="submit"
                className="flex-center w-fit hover:text-green-500"
              >
                <Search />
              </button>
            </div>
          </form>
          {isSearch && <MagnifyingGlass />} {/* Show loading indicator */}
          {data && (
            <Table
              data={data} // Pass fetched data to the Table component
              SlideTransition={SlideTransition}
              handleSearch={handleSearch}
              setIsSuccess={setIsSuccess}
              showAlert={() => handleClick(SlideTransition)} // Show alert on action
            />
          )}
        </article>
      </section>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
        autoHideDuration={4000}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess.status}
          sx={{ width: "100%" }}
        >
          <AlertTitle>{isSuccess.status}</AlertTitle>
          {isSuccess.message} {/* Display success or error message */}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
};

export default TaskList;
