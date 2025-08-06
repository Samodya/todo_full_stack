import React, { useEffect, useState } from "react";
import { TopBanner } from "../components/topBanner";
import CircularProgressBar from "../components/circular_progress_bar";
import { ItemsCard } from "../components/itemCard";
import { UseTaskContext } from "../Context/tasksContext";
import { EditTasks } from "../components/editTasks";
import { useRequestContext } from "../Context/requestscontent";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("today");
  const { tasks } = UseTaskContext();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const normalizeDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const categorizedTasks = {
    today: [],
    upcoming: [],
    past: [],
  };

  tasks.forEach((task) => {
    const taskDate = normalizeDate(task.date);
    if (taskDate.getTime() === today.getTime()) {
      categorizedTasks.today.push(task);
    } else if (taskDate > today) {
      categorizedTasks.upcoming.push(task);
    } else {
      categorizedTasks.past.push(task);
    }
  });

  const todayTasks = categorizedTasks.today;
  const todayStatusCounts = {
    new: todayTasks.filter((t) => t.status === "new").length,
    inProgress: todayTasks.filter((t) => t.status === "in-progress").length,
    completed: todayTasks.filter((t) => t.status === "completed").length,
    total: todayTasks.length,
  };

  const renderTasks = (taskList) =>
    taskList.length > 0 ? (
      taskList.map((item) => (
        <div key={item.id} className="mb-3">
          <ItemsCard title={item.title} seconditem={item.time} content={item.task}
            content2 = <EditTasks id={item._id}/>
           />
        </div>
      ))
    ) : (
      <div className="text-gray-400 text-sm mt-6 text-center">No tasks</div>
    );

  const renderLeftPanel = () => {
    if (activeTab === "today") {
      return (
        <>
          <div className="text-primary font-semibold text-xl md:text-2xl mb-4">
            Task Completion Today
          </div>
          <div className="flex items-center justify-center h-[30vh]">
            <div className="w-[200px] md:w-[260px]">
              <CircularProgressBar
                size={200}
                progress={todayStatusCounts.completed}
                stroke={16}
                number={todayStatusCounts.total}
              />
            </div>
          </div>

          <div className="mt-6 space-y-2 text-gray-700 text-sm">
            <div>🆕 New: {todayStatusCounts.new}</div>
            <div>🔄 In Progress: {todayStatusCounts.inProgress}</div>
            <div>✅ Completed: {todayStatusCounts.completed}</div>
          </div>
        </>
      );
    } else {
      return (
        <div className="p-4 bg-white rounded-xl shadow-inner">
          <div className="text-lg font-semibold text-gray-700 mb-3">
            Productivity Tip 💡
          </div>
          <p className="text-sm text-gray-600">
            Break large tasks into smaller chunks and set mini-deadlines.
          </p>
          <div className="mt-6 text-xs text-gray-400">
            “The secret of getting ahead is getting started.” – Mark Twain
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen w-full overflow-auto bg-gray-50">
      <TopBanner />
      {/* Tabs */}
      <div className="flex justify-center space-x-4 mt-4 mb-2">
        {["today", "upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? "bg-primary text-white shadow"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {tab === "today"
              ? "Today"
              : tab === "upcoming"
              ? "Upcoming"
              : "Overdue"}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:h-[70vh]">
        {/* Left Panel */}
        <div className="w-full md:w-2/5 p-5">
          {renderLeftPanel()}
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-3/5 overflow-y-auto bg-white p-5 rounded-t-xl md:rounded-xl shadow-inner">
          <div className="text-lg font-semibold mb-3 text-gray-700">
            {activeTab === "today"
              ? "Today's Tasks"
              : activeTab === "upcoming"
              ? "Upcoming Tasks"
              : "Overdue Tasks"}
          </div>
          {renderTasks(categorizedTasks[activeTab])}
        </div>
      </div>
    </div>
  );
};
