import { Trash, X } from "lucide-react";
import { useState } from "react";
import apiService from "../utilities/httpservices";
import { UseTaskContext } from "../Context/tasksContext";

export const DeleteTask = ({ id }) => {
  const [showPop, setShowPop] = useState(false);
  const { editTask,refreshTasks  } = UseTaskContext();

  const handleDelete = async () => {
    try {
        await apiService.deleteData("tasks",id)
        refreshTasks()
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div>
      {/* Delete Button */}
      <button
            className="flex gap-1 items-center justify-center
             m-2 p-2 bg-red-500 rounded
              text-white font-semibold shadow-md 
              hover:bg-red-500/90 transition"
            onClick={() => {
            //   getTask();
              setShowPop(true);
            }}
          >
            <Trash size={20} />
            Delete
          </button>

      {/* Confirmation Popup */}
      {showPop && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up relative">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
              <button
                onClick={() => setShowPop(false)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPop(false)}
                className="flex items-center gap-1 px-4 py-2 text-sm 
                           rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 
                           transition-all duration-150"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={() => {
                    handleDelete();
                    setShowPop(false)
                }}
                className="flex items-center gap-1 px-4 py-2 text-sm 
                           rounded-lg bg-red-500 text-white hover:bg-red-600 
                           transition-all duration-150"
              >
                <Trash size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
