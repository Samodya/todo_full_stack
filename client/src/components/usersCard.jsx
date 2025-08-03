export const UserCard = ({ fullname, username, email, filePath, id }) => {

    function onAddFriend() {

    }

    return (
      <div className="flex items-center justify-between bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 m-4 w-[80%] mx-auto">
        {/* Left: Avatar and Info */}
        <div className="flex items-center gap-4">
          <img
            src={`http://localhost:4000/${filePath.replace(/^\/+/, "")}`}
            alt={fullname}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow"
          />
  
          <div className="flex flex-col text-sm sm:text-base">
            <div className="font-semibold text-gray-800">{fullname}</div>
            <div className="text-gray-500">@{username}</div>
            <div className="text-gray-400">{email}</div>
          </div>
        </div>
  
        {/* Right: Add Friend Button */}
        <button
          onClick={onAddFriend}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
        >
          Add Friend
        </button>
      </div>
    );
  };
  