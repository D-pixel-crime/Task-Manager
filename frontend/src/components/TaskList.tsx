import { Search } from "lucide-react";
import MainContainer from "../containers/MainContainer";
import Table from "./Table";

const data = [
  {
    projectName: "Project 1",
    taskName: "Task 1",
    Description: "Complete Work fwqefkweooooooooooooooooopoooo",
    taskPriority: "Critical",
    dueIn: "12 Hours",
    taskStatus: "Completed",
  },
  {
    projectName: "Project 1",
    taskName: "Task 1",
    Description: "Complete Work",
    taskPriority: "Critical",
    dueIn: "12 Hours",
    taskStatus: "Completed",
  },
];

const TaskList = () => {
  return (
    <MainContainer>
      <section className="w-full h-full flex-center">
        <article className="w-full h-full flex flex-col items-center py-10 border-2 gap-14">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-1 w-1/4"
          >
            <label htmlFor="search" className="text-sm text-slate-500">
              Search Task:
            </label>
            <div className="flex justify-between p-2 bg-white rounded-md gap-2 items-center text-slate-500 border-2 w-full border-slate-500">
              <input type="text" className="outline-none w-full" />
              <button
                type="submit"
                className="flex-center w-fit hover:text-green-500"
              >
                <Search />
              </button>
            </div>
          </form>
          <Table data={data} />
        </article>
      </section>
    </MainContainer>
  );
};
export default TaskList;
