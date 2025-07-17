import Cookies from "js-cookie";
import { Cookie, X } from "lucide-react";
import { useState } from "react";
import apiService from "../utilities/httpservices";
import { UseTaskContext } from "../Context/tasksContext";

export const AddTasks = () => {
  const [showPop, setShowPop] = useState(false);
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [datein, setDate] = useState("");
  const [time, setTime] = useState("");
  const { refreshTasks } = UseTaskContext();
  const userId = Cookies.get("userId");
  const token = Cookies.get("token")
  const handleSave = async () => {
    try {
      if (!datein || !time) {
        console.log("Date or Time is missing");
        return;
      }
  
      // Combine date and time correctly
      const date = new Date(`${datein}T${time}`);
  
      const data = {
        title,
        task,
        date,
        time, // Use a single ISO date field
        createdBy: userId,
      };
  
      const result = await apiService.createData("tasks", data,token);
      console.log("Task added:", result);
      refreshTasks();
    } catch (error) {
      console.log("Error saving task:", error);
    }
  };
  

  return (
    <div>
      <button
        className="m-2 p-2 bg-primary rounded text-white font-semibold shadow-md hover:bg-primary/90 transition"
        onClick={() => setShowPop(true)}
      >
        Add Task
      </button>

      {showPop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">Add a Task</h2>
              <button
                onClick={() => setShowPop(false)}
                className="text-gray-600 hover:text-red-500 transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter task title"
              />
            </div>
            <div className="mb-4 flex flex-auto gap-3">
              <div>
                <label> Scheduled Date</label>
                <input
                  type="date"
                  value={datein}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label> Scheduled time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter task title"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe the task"
              ></textarea>
            </div>

            {/* Save Button */}
            <button
              className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90 transition"
              onClick={async () => {
                await handleSave(); // <- properly call the function
                setShowPop(false);
              }}
            >
              Save Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
