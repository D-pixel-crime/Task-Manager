import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { Link } from "react-router-dom";
import { Filter, Pen, Trash } from "lucide-react";
import { TailSpin } from "react-loader-spinner";

interface detailProps {
  _id: string;
  projectName: string;
  taskName: string;
  description: string;
  taskPriority: string;
  dueIn: string;
  taskStatus: string;
}

interface props {
  data: detailProps[];
  setIsSuccess: (any: any) => void;
  showAlert: (any: any) => void;
  SlideTransition: (any: any) => void;
  handleSearch: () => void;
}

const Table = ({
  data,
  setIsSuccess,
  showAlert,
  SlideTransition,
  handleSearch,
}: props) => {
  const [isUpdate, setIsUpdate] = useState(false); // State for managing update loading
  const [details, setDetails] = useState<detailProps[]>([]); // State for task details

  // Initialize details and checked items when data changes
  useEffect(() => {
    setDetails(data);
    setCheckedItems(new Array(data?.length || 0).fill(false));
  }, [data]);

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(data?.length || 0).fill(false)
  ); // State for checked items
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll; // Toggle select all
    setSelectAll(newSelectAll);
    setCheckedItems(new Array(details.length).fill(newSelectAll)); // Update checked items based on select all
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index]; // Toggle individual checkbox
    setCheckedItems(updatedCheckedItems);

    const allChecked = updatedCheckedItems.every((item) => item);
    setSelectAll(allChecked); // Update select all based on individual checkboxes
  };

  const individualDelete = async (id: string) => {
    setIsUpdate(true);
    setTimeout(async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/delete/${id}`, {
          withCredentials: true,
        });

        handleSearch(); // Refresh task list
        setCheckedItems(new Array(details.length).fill(false));
        setSelectAll(false);

        setIsSuccess({
          status: "warning",
          message: "Task Deleted Successfully!",
        });
      } catch (error: any) {
        setIsSuccess({
          status: "error",
          message:
            error?.message ||
            error?.response?.data?.message ||
            "Error While Deleting!",
        });
      } finally {
        showAlert(SlideTransition);
        setIsUpdate(false);
      }
    }, 1000); // Simulated delay for demonstration
  };

  const deleteTasks = async () => {
    setIsUpdate(true);
    setTimeout(async () => {
      try {
        const updatedTasks = details.filter((_, index) => checkedItems[index]);

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/delete-tasks`,
          updatedTasks,
          { withCredentials: true }
        );

        handleSearch(); // Refresh task list
        setCheckedItems(new Array(details.length).fill(false));
        setSelectAll(false);

        setIsSuccess({
          status: "warning",
          message: "Tasks Deleted Successfully!",
        });
      } catch (error: any) {
        setIsSuccess({
          status: "error",
          message:
            error?.message ||
            error?.response?.data?.message ||
            "Error While Deleting!",
        });
      } finally {
        showAlert(SlideTransition);
        setIsUpdate(false);
      }
    }, 1000);
  };

  const handleUpdate = () => {
    setIsUpdate(true);
    setTimeout(async () => {
      try {
        const updatedTasks = details.map((task, index) => {
          if (checkedItems[index]) {
            return {
              _id: task._id,
              taskStatus: task.taskStatus,
            };
          }
          return task;
        });

        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URI}/update-tasks`,
          updatedTasks,
          { withCredentials: true }
        );
        handleSearch(); // Refresh task list
        setCheckedItems(new Array(details.length).fill(false));
        setSelectAll(false);

        setIsSuccess({
          status: "success",
          message: "Tasks Updated Successfully!",
        });
      } catch (error: any) {
        setIsSuccess({
          status: "error",
          message:
            error?.message ||
            error?.response?.data?.message ||
            "Error While Updating!",
        });
      } finally {
        showAlert(SlideTransition);
        setIsUpdate(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full px-10 items-center gap-2">
      <div className="flex items-center gap-4 justify-start w-full px-5">
        <span className="flex-center gap-1">
          <input
            type="checkbox"
            name="select-all"
            id="select-all"
            style={{ width: "20px", height: "20px" }}
            checked={selectAll}
            onChange={handleSelectAllChange} // Handle select all change
          />
          Select All
        </span>
        <span className="flex items-center gap-1 text-sm cursor-pointer hover:text-purple-600">
          <Filter />
          Filter
        </span>
      </div>
      <div className="flex flex-col w-full bg-white border-2 border-slate-300/50 rounded-md px-5 shadow-md pt-5 pb-10 shadow-slate-300">
        <div className="grid grid-cols-6 font-bold text-center text-lg py-4 border-b-2 border-b-slate-200">
          <h2 className="flex-center gap-1">Project Name</h2>
          <h2>Task Name</h2>
          <h2>Description</h2>
          <h2>Task Priority</h2>
          <h2>Due In</h2>
          <h2>Task Status</h2>
        </div>
        {details?.map((task: detailProps, index: number) => (
          <div
            key={task._id}
            className={`grid grid-cols-6 text-center py-2 border-b-2 ${
              index <= details.length - 1 ? "border-b-slate-200" : ""
            } text-slate-500`}
          >
            <p className="flex-center gap-2">
              <input
                type="checkbox"
                name="select"
                id={`select-${index}`}
                style={{ width: "20px", height: "20px" }}
                checked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)} // Handle individual checkbox change
              />
              {task.projectName || "N/A"}
            </p>
            <p className="flex-center">{task.taskName || "N/A"}</p>
            <p className="flex-center">
              {task.description?.substring(0, 30) || "N/A"}...
            </p>
            <p className="flex-center">
              <span className="w-fit h-fit py-1 px-2 rounded-3xl bg-slate-200">
                {task.taskPriority || "N/A"}
              </span>
            </p>
            <p className="flex-center">{task.dueIn || "N/A"} hours</p>
            <p className="flex-center flex-col">
              <span className="flex-center cursor-pointer bg-slate-200 px-2 py-2 rounded-3xl outline-none appearance-none">
                <select
                  name="task-status"
                  id="task-status"
                  className="bg-slate-200 px-1 cursor-pointer outline-none appearance-none w-full"
                  value={task.taskStatus || "Not Started"}
                  onChange={(e) => {
                    setDetails((prevDetails) => {
                      const newDetails = [...prevDetails];
                      if (newDetails[index]) {
                        newDetails[index].taskStatus = e.target.value;
                      }
                      return newDetails;
                    });
                    setCheckedItems((prevCheckedItems) => {
                      const newCheckedItems = [...prevCheckedItems];
                      newCheckedItems[index] = true;
                      return newCheckedItems;
                    });
                  }}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <ArrowDropDownIcon className="w-fit" />
              </span>
              <span className="flex-center gap-4 mt-2">
                <Link to={`/update-task/${task._id}`} className="w-fit">
                  <Pen className="cursor-pointer hover:text-blue-600 transition" />
                </Link>
                <Trash
                  className="cursor-pointer hover:text-red-600 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    individualDelete(task._id); // Handle individual delete
                  }}
                />
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-start w-full mt-5 px-5 gap-5">
        <button
          className=""
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span className="flex-center cursor-pointer bg-slate-600 px-2 py-2 text-white rounded-3xl outline-none appearance-none">
            <select
              name="task-status"
              id="task-status"
              className="bg-slate-600 px-1 cursor-pointer outline-none appearance-none w-full"
              value={details[0]?.taskStatus || "Not Started"}
              disabled={
                checkedItems.every((item) => !item) ||
                checkedItems.length === 0 ||
                isUpdate
              }
              onChange={(e) => {
                setDetails((prevDetails) => {
                  const newDetails = [...prevDetails];
                  newDetails.forEach((detail) => {
                    detail.taskStatus = e.target.value;
                  });
                  return newDetails;
                });
              }}
            >
              <option value="Not Started">Not Started</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <ArrowDropDownIcon className="w-fit" />
          </span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleUpdate(); // Handle batch update
          }}
          className={`px-2 py-1 font-semibold rounded-md ${
            isUpdate ? "bg-transparent" : "bg-indigo-500"
          } text-white border-2 border-indigo-500 hover:text-indigo-600 hover:bg-transparent transition`}
          disabled={
            checkedItems.every((item) => !item) ||
            checkedItems.length === 0 ||
            isUpdate
          }
        >
          {isUpdate ? (
            <TailSpin width={20} height={20} color="indigo" />
          ) : (
            "Apply Changes"
          )}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteTasks(); // Handle bulk delete
          }}
          className={`px-2 py-1 font-semibold rounded-md ${
            isUpdate ? "bg-transparent" : "bg-red-500"
          } text-white border-2 border-red-500 hover:text-red-600 hover:bg-transparent transition`}
          disabled={
            checkedItems.every((item) => !item) ||
            checkedItems.length === 0 ||
            isUpdate
          }
        >
          {isUpdate ? (
            <TailSpin width={20} height={20} color="red" />
          ) : (
            "DELETE"
          )}
        </button>
      </div>
    </div>
  );
};

export default Table;
