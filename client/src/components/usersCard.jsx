import Cookies from "js-cookie";
import apiService from "../utilities/httpservices";
import { useRequestContext } from "../Context/requestscontent";

export const UserCard = ({ fullname, username, email, filePath, id }) => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  const { requests, refreshRequests } = useRequestContext();

  const hasPendingRequest = requests.some(
    (req) => req.from === userId && req.to === id && req.status === "pending"
  );

  const data = {
    from: userId,
    to: id,
    status: "pending",
  };

  const onAddFriend = async () => {
    try {
      const result = await apiService.createData("request", data, token);
      if (result) {
        console.log("request sent");
        refreshRequests(); // Refresh to reflect "Pending" state
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 m-4 w-full max-w-2xl mx-auto">
      {/* Left: Avatar and Info */}
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <img
          src={`http://localhost:4000/${filePath.replace(/^\/+/, "")}`}
          alt={fullname}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-indigo-500 shadow"
        />

        <div className="flex flex-col text-sm sm:text-base">
          <div className="font-semibold text-gray-800">{fullname}</div>
          <div className="text-gray-500">@{username}</div>
          <div className="text-gray-400">{email}</div>
        </div>
      </div>

      {/* Right: Button or Pending Text */}
      {hasPendingRequest ? (
        <span className="text-gray-500 italic text-sm">Pending</span>
      ) : (
        <button
          onClick={onAddFriend}
          className="px-4 py-2 w-full sm:w-auto bg-primary text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
        >
          Add Friend
        </button>
      )}
    </div>
  );
};
