import { DateTimePicker } from "@mui/x-date-pickers";
import MainContainer from "../containers/MainContainer";
import { Plus } from "lucide-react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Alert, AlertTitle } from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const CreateTask = () => {
  const [details, setDetails] = useState({
    taskName: "",
    projectName: "",
    description: "",
    deadline: null as Dayjs | null,
    taskPriority: "",
    taskStatus: "",
  });

  const [isSuccess, setIsSuccess] = useState({
    status: "error" as "success" | "error" | "warning" | "info",
    message: "",
  });

  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

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

  return (
    <MainContainer>
      <article className="w-full h-full flex-center overflow-x-hidden">
        <div className="flex-center lg:w-4/12 overflow-x-hidden">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // const future = dayjs(details.deadline);
              // const now = dayjs();
              // const diff = now.diff(future, "hour");
              // console.log(diff);
              handleClick(SlideTransition)();
            }}
            className="flex flex-col gap-5 py-12 w-full overflow-x-hidden"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm">
                Project Name:
              </label>
              <input
                type="text"
                placeholder="Name of project"
                className="px-2 text-slate-400 py-2.5 bg-white border-2 border-slate-500/70 outline-none rounded-lg w-full"
                value={details.projectName}
                onChange={(e) =>
                  setDetails({ ...details, projectName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="taskName" className="text-sm">
                Task Name:
              </label>
              <input
                type="text"
                placeholder="Name of task"
                className="px-2 text-slate-400 py-2.5 bg-white border-2 border-slate-500/70 outline-none rounded-lg w-full"
                value={details.taskName}
                onChange={(e) =>
                  setDetails({ ...details, taskName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm">
                Description:
              </label>
              <textarea
                maxLength={200}
                rows={5}
                placeholder="Description of task"
                className="px-2 text-slate-400 py-2.5 bg-white border-2 border-slate-500/70 outline-none rounded-lg w-full"
                value={details.description}
                onChange={(e) =>
                  setDetails({ ...details, description: e.target.value })
                }
              />
            </div>
            <DateTimePicker
              label="Task Deadline"
              onChange={(newValue) =>
                setDetails({ ...details, deadline: newValue })
              }
              sx={{
                borderRadius: "0.7rem",
                marginY: "0.5rem",
              }}
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="priority" className="text-sm">
                Task Priority:
              </label>
              <select
                name="priority"
                className="bg-slate-800 rounded-md border-2 border-cyan-400 px-2 py-3 mb-4 cursor-pointer text-cyan-400 outline-none h-fit"
                value={details.taskPriority}
                onChange={(e) =>
                  setDetails({ ...details, taskPriority: e.target.value })
                }
              >
                <option value="" disabled>
                  Set Priority
                </option>
                <option value="Critical">Critical</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 border-b-4 border-b-slate-300 pb-4">
              <label htmlFor="status" className="text-sm">
                Task Status:
              </label>
              <select
                name="status"
                className="bg-slate-800 rounded-md border-2 border-cyan-400 px-2 py-3 mb-4 cursor-pointer text-cyan-400 outline-none h-fit"
                value={details.taskStatus}
                onChange={(e) =>
                  setDetails({ ...details, taskStatus: e.target.value })
                }
              >
                <option value="" disabled>
                  Set Status
                </option>
                <option value="Started">Started</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-2 shadow shadow-green-700 tracking-[0.1rem] mt-2 py-2 flex-center gap-1 font-semibold rounded-md bg-green-500 text-white border-2 border-green-500 hover:text-green-600 hover:bg-transparent transition"
            >
              Create task
              <Plus />
            </button>
          </form>
        </div>
      </article>
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
          {isSuccess.message}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
};
export default CreateTask;
