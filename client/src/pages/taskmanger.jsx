import { UseTaskContext } from "../Context/tasksContext";
import { AddTasks } from "../components/addTasks";
import { TopBanner } from "../components/topBanner";
import { EditTasks } from "../components/editTasks";
import { DeleteTask } from "../components/deletetasks";
import { useState } from "react";

export const TasksManger = () => {
  const { tasks } = UseTaskContext();
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = tasks
    .filter((item) => item && typeof item === "object")
    .filter(
      (item) => statusFilter === "all" || item.status === statusFilter
    );

  return (
    <div>
      <TopBanner title="Tasks Manager" />

      {/* Add Task Button */}
      <div className="p-5 flex flex-row-reverse m-auto w-[95vw]">
        <AddTasks />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 px-5 mt-3 items-center w-full justify-center">
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

      {/* Scrollable Task List */}
      <div className="px-5 mt-6 flex justify-center">
        <div className="w-full max-w-4xl h-[65vh] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center hover:shadow transition"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {new Date(item.date).toLocaleString()}
                  </p>
                  <p className="text-gray-700 text-sm">{item.task}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 sm:flex-col sm:items-end">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      item.status === "in-progress"
                        ? "bg-yellow-500"
                        : item.status === "new"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <span className="capitalize">{item.status}</span>
                </div>

                <div className="flex gap-2 justify-end">
                  <EditTasks id={item._id} />
                  <DeleteTask id={item._id} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No tasks found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
