import { useEffect, useState } from "react";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { Filter, Pen, Trash } from "lucide-react";

interface detailProps {
  projectName: string;
  taskName: string;
  Description: string;
  taskPriority: string;
  dueIn: string;
  taskStatus: string;
}

const Table = ({ data }: any) => {
  const [details, setDetails] = useState<detailProps[]>([]);

  useEffect(() => {
    setDetails(data || []);
    setCheckedItems(new Array(data?.length || 0).fill(false)); // Update checkedItems based on new data
  }, [data]);

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(data?.length || 0).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCheckedItems(new Array(details.length).fill(newSelectAll));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);

    const allChecked = updatedCheckedItems.every((item) => item);
    setSelectAll(allChecked);
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
            onChange={handleSelectAllChange}
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
        {details.map((task: any, index: number) => (
          <div
            key={index}
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
                onChange={() => handleCheckboxChange(index)}
              />
              {task.projectName}
            </p>
            <p className="flex-center">{task.taskName}</p>
            <p className="flex-center">
              {task.Description.substring(0, 30)}...
            </p>
            <p className="flex-center">
              <span className="w-fit h-fit py-1 px-2 rounded-3xl bg-slate-200">
                {task.taskPriority}
              </span>
            </p>
            <p className="flex-center">{task.dueIn}</p>
            <p className="flex-center flex-col">
              <span className="flex-center cursor-pointer bg-slate-200 px-2 py-2 rounded-3xl outline-none appearance-none">
                <select
                  name="task-status"
                  id="task-status"
                  className="bg-slate-200 px-1 cursor-pointer outline-none appearance-none w-full"
                  value={task.taskStatus || "Not Started"} // Fallback value
                  onChange={(e) => {
                    setDetails((prevDetails) => {
                      const newDetails = [...prevDetails];
                      newDetails[index].taskStatus = e.target.value;
                      return newDetails;
                    });
                  }}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <ArrowDropDownIcon className="w-fit" />
              </span>
              <span className="flex-center gap-4 mt-2">
                <Pen className="cursor-pointer hover:text-blue-600 transition" />
                <Trash className="cursor-pointer hover:text-red-600 transition" />
              </span>
            </p>
          </div>
        ))}
      </div>
      {checkedItems.some((item) => item) && (
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
                value={details[0].taskStatus}
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
                <option value="Completed">Completed</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Not Started">Not Started</option>
              </select>
              <ArrowDropDownIcon className="w-fit" />
            </span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="px-2 py-1 font-semibold rounded-md bg-indigo-500 text-white border-2 border-indigo-500 hover:text-indigo-600 hover:bg-transparent transition"
          >
            Apply Changes
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="px-2 flex-center gap-1 tracking-[0.15rem] py-1 font-semibold rounded-md bg-red-500 text-white border-2 border-red-500 hover:text-red-600 hover:bg-transparent transition"
          >
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
