import { Link } from "react-router-dom";
import { UseTaskContext } from "../Context/tasksContext";
import { AddTasks } from "../components/addTasks";
import { TopBanner } from "../components/topBanner";
import { Pencil, Trash } from "lucide-react";

export const TasksManger = () => {
  const { tasks } = UseTaskContext();

  return (
    <div>
      <TopBanner title="Tasks Manager" />
      <div className="p-5 flex flex-row-reverse m-auto w-[95vw]">
        <AddTasks />
      </div>
      <div className="px-5 py-6">
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl shadow-sm mb-5 border border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center hover:shadow-md transition"
            >
             
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {item.task}
                </h3>
                <p className="text-gray-600 text-sm">
                  {new Date(item.date).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">Time: {item.time}</p>
              </div>
              <div className="flex items-center gap-1 flex-1">
                <div
                  className={
                    item.status == "Active"
                      ? "flex w-4 h-4 rounded-full bg-green-500"
                      : "flex w-4 h-4 rounded-full bg-red-500"
                  }
                ></div>
                {item.status}
              </div>

              
              <div className="flex gap-3 justify-start sm:justify-end">
                <Link
                  to={`/edit/${item._id}`}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  title="Edit Task"
                >
                  <Pencil size={18} />
                  <span className="text-sm">Edit</span>
                </Link>

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
