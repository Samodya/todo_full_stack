import React, { useState } from "react";
import { TopBanner } from "../components/topBanner";
import CircularProgressBar from "../components/circular_progress_bar";
import { ItemsCard } from "../components/itemCard";

const tasks = [
  { id: 1, title: "Gardening", desc: "Watering plants, planting new seeds", time: "10.30 AM", state: "Completed" },
  { id: 2, title: "Feeding Dogs", desc: "Buy new, for afternoon", time: "01.30 PM", state: "Completed" },
  { id: 3, title: "Grocery shopping", desc: "Dog food, vegetables", time: "03.30 PM", state: "Completed" },
  { id: 4, title: "Fixing broken radio", desc: "Repair wiring and test speaker", time: "06.30 PM", state: "Incompleted" },
];

export const Dashboard = () => {
  const [selected, setSelected] = useState("Completed");

  const filteredTasks = tasks.filter(task => task.state === selected);

  return (
    <div className="min-h-screen w-full overflow-auto bg-gray-50">
      <TopBanner />

      {/* Responsive Layout: column on mobile, row on medium+ screens */}
      <div className="flex flex-col md:flex-row md:h-[68.vh]">
        {/* Left Panel */}
        <div className="w-full md:w-2/5 p-5">
          <div className="text-primary font-semibold text-xl md:text-2xl mb-4">
            Task Completion This Month
          </div>
          <div className="flex items-center justify-center h-[40vh] md:h-[60vh]">
            <div className="w-[200px] md:w-[300px]">
              <CircularProgressBar size={200} progress={80} stroke={16} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-3/5 overflow-y-auto bg-white p-5 rounded-t-xl md:rounded-xl shadow-inner">
          {/* Tabs */}
          <div className="flex space-x-3 mb-6 justify-center md:justify-start">
            {["Completed", "Incompleted"].map(status => (
              <button
                key={status}
                onClick={() => setSelected(status)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selected === status
                    ? "bg-primary text-white shadow"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {status} Tasks
              </button>
            ))}
          </div>

          {/* Task List */}
          {filteredTasks.length > 0 ? (
            filteredTasks.map(item => (
              <div key={item.id} className="mb-4">
                <ItemsCard title={item.title} seconditem={item.time} content={item.desc} />
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center mt-10">No tasks found for "{selected}"</div>
          )}
        </div>
      </div>
    </div>
  );
};
