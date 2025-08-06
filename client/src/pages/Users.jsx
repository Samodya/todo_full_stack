import React, { useState } from "react";
import { useGetUsers } from "../Context/usersContext";
import { UserCard } from "../components/usersCard";
import Cookies from "js-cookie";
import { useRequestContext } from "../Context/requestscontent";
import { TopBanner } from "../components/topBanner";

export const UsersPage = () => {
  const { users } = useGetUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("available"); // "available" or "pending"

  const currentUserId = Cookies.get("userId");
  const { requests } = useRequestContext(); // your logic for fetching friend requests
  const pendingToIds = requests
    .filter((req) => req.from === currentUserId && req.status === "pending")
    .map((req) => req.to);

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.fullname.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    );
  });

  const availableUsers = filteredUsers.filter(
    (user) => user._id !== currentUserId && !pendingToIds.includes(user._id)
  );

  const pendingUsers = filteredUsers.filter(
    (user) => user._id !== currentUserId && pendingToIds.includes(user._id)
  );

  return (
    <div>
      <TopBanner title="Users" />

      {/* Filter input */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search by name, username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-indigo-400"
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-6 mb-4">
        <div className="bg-gray-100 p-1 rounded-full flex space-x-2 shadow-inner">
          <button
            onClick={() => setActiveTab("available")}
            className={`px-5 py-2 rounded-full transition-all duration-200 ${
              activeTab === "available"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-5 py-2 rounded-full transition-all duration-200 ${
              activeTab === "pending"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pb-10">
        {activeTab === "available" &&
          availableUsers.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              fullname={user.fullname}
              username={user.username}
              email={user.email}
              filePath={user.filePath}
              isPending={false}
            />
          ))}

        {activeTab === "pending" &&
          pendingUsers.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              fullname={user.fullname}
              username={user.username}
              email={user.email}
              filePath={user.filePath}
              isPending={true}
            />
          ))}
      </div>
    </div>
  );
};
