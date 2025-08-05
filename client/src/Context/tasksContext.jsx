import { createContext, useContext, useEffect, useState } from "react";
import apiService from "../utilities/httpservices";
import Cookies from "js-cookie";

// Error modal component
const ErrorModal = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
      <h2 className="text-red-600 font-semibold mb-4">Error</h2>
      <p className="mb-6">{message}</p>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

const TasksContext = createContext();

export const UseTaskContext = () => useContext(TasksContext);

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksError, setTasksError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  // Handle errors, show popup only on new errors
  const handleError = (error) => {
    const message = error?.message || "Something went wrong";
    if (message !== tasksError) {
      setTasksError(message);
      setShowError(true);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const currentUserId = Cookies.get("userId");

    if (!currentUserId) return;

    // 🟡 Immediately clear previous tasks *outside* of render cycle
    setTasks([]); // This is okay inside useEffect

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const results = await apiService.getDataById(
          "tasks/user",
          currentUserId
        );
        if (isMounted) {
          setTasks(Array.isArray(results?.data) ? results.data : []);
        }
      } catch (error) {
        if (isMounted) handleError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentUserId = Cookies.get("userId");

      if (currentUserId !== userId) {
        setRefresh((prev) => !prev); // Triggers the fetch effect
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [userId]);

  const addTask = async (newTaskData) => {
    try {
      const createdTask = await apiService.createData(
        "tasks",
        newTaskData,
        token,
        role
      );
      setTasks((prev) => [...prev, createdTask.data]);
    } catch (error) {
      handleError(error);
    }
  };

  const editTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await apiService.updateData(
        "tasks",
        taskId,
        updatedData,
        token,
        role
      );
      setTasks(
        Array.isArray(updatedTask?.data)
          ? updatedTask.data.filter((task) => task && task._id)
          : []
      );
    } catch (error) {
      handleError(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await apiService.deleteData("tasks", taskId, token);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        tasksError,
        loading,
        editTask,
        deleteTask,
      }}
    >
      {children}

      {showError && (
        <ErrorModal
          message={tasksError}
          onClose={() => {
            setShowError(false);
            setTasksError(null);
          }}
        />
      )}
    </TasksContext.Provider>
  );
};
