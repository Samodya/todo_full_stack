import { Link } from "react-router-dom";
import { UseTaskContext } from "../Context/tasksContext";
import { AddTasks } from "../components/addTasks";
import { TopBanner } from "../components/topBanner";
import { Pencil, Trash } from "lucide-react";
import { EditTasks } from "../components/editTasks";
import { useState } from "react";

export const TasksManger = () => {
  const { tasks } = UseTaskContext();
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div>
      <TopBanner title="Tasks Manager" />
      <div className="p-5 flex flex-row-reverse m-auto w-[95vw]">
        <AddTasks />
      </div>
      <div className="flex gap-3 px-5 mt-3">
        {["all", "new", "in-progress", "completed"].map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              statusFilter === filter
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter === "all" ? "All" : filter.replace("-", " ").toUpperCase()}
          </button>
        ))}
      </div>

      <div className="px-5 py-6">
        {tasks.length > 0 ? (
          tasks
            .filter(
              (item) => statusFilter === "all" || item.status === statusFilter
            )
            .map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-2xl shadow-sm mb-5 border border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center hover:shadow-md transition"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(item.date).toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">Time: {item.time}</p>
                  <p>{item.task}</p>
                </div>
                <div className="flex items-center gap-1 flex-1">
                  <div
                    className={
                      item.status == "in-progress"
                        ? "flex w-4 h-4 rounded-full bg-yellow-500"
                        : item.status == "new"
                        ? "flex w-4 h-4 rounded-full bg-red-500"
                        : "flex w-4 h-4 rounded-full bg-green-500"
                    }
                  ></div>
                  {item.status}
                </div>

                <div className="flex gap-3 justify-start sm:justify-end">
                  <EditTasks id={item._id} />
                  <button
                    // onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    title="Delete Task"
                  >
                    <Trash size={18} />
                    {/* in progress */}
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No tasks found</p>
        )}
      </div>
    </div>
  );
};
