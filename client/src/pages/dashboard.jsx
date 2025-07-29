import React, { useState } from "react";
import { TopBanner } from "../components/topBanner";
import CircularProgressBar from "../components/circular_progress_bar";
import { ItemsCard } from "../components/itemCard";
import { UseTaskContext } from "../Context/tasksContext";

export const Dashboard = () => {
  const [selected, setSelected] = useState("Completed");
  const { tasks } = UseTaskContext();

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      isToday(task.date) && (selected === "all" || task.status === selected)
  );

  const todayCompletedTasks = tasks.filter(
    (task) => task.status === "completed" && isToday(task.date)
  );

  const todayTasks = tasks.filter((task) => isToday(task.date));
  const totalToday = todayTasks.length;


  return (
    <div className="min-h-screen w-full overflow-auto bg-gray-50">
      <TopBanner />

      {/* Responsive Layout: column on mobile, row on medium+ screens */}
      <div className="flex flex-col md:flex-row md:h-[68.vh]">
        {/* Left Panel */}
        <div className="w-full md:w-2/5 p-5">
          <div className="text-primary font-semibold text-xl md:text-2xl mb-4">
            Task Completion Today
          </div>
          <div className="flex items-center justify-center h-[40vh] md:h-[60vh]">
            <div className="w-[200px] md:w-[300px]">
              <CircularProgressBar size={200} progress={todayCompletedTasks.length} stroke={16} number={totalToday} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-3/5 overflow-y-auto bg-white p-5 rounded-t-xl md:rounded-xl shadow-inner">
          {/* Tabs */}
          <div className="flex space-x-3 mb-6 justify-center md:justify-start">
            {["all", "new", "in-progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setSelected(status)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selected === status
                    ? "bg-primary text-white shadow"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} Tasks
              </button>
            ))}
          </div>

          {/* Task List */}
          {filteredTasks.length > 0 ? (
            filteredTasks.map((item) => (
              <div key={item.id} className="mb-4">
                <ItemsCard
                  title={item.title}
                  seconditem={item.time}
                  content={item.task}
                />
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center mt-10">
              No tasks found for "{selected}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
