import React, { useState } from "react";
import { TopBanner } from "../components/topBanner";
import { UseUserContext } from "../Context/userContext"; // assuming this provides currentUser, users, and friends

export const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const { users, currentUser, friends } = UseUserContext();

  const isFriend = (userId) => friends.includes(userId);

  const friendsList = users.filter(user => user.id !== currentUser.id && isFriend(user.id));
  const nonFriendsList = users.filter(user => user.id !== currentUser.id && !isFriend(user.id));

  const renderUserCard = (user) => (
    <div key={user.id} className="p-4 bg-white shadow rounded-lg mb-3 flex justify-between items-center">
      <div>
        <div className="text-sm font-medium text-gray-700">{user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </div>
      <button className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
        {activeTab === "friends" ? "Remove Friend" : "Add Friend"}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-auto">
      <TopBanner />

      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("friends")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "friends"
                ? "bg-primary text-white shadow"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setActiveTab("non-friends")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "non-friends"
                ? "bg-primary text-white shadow"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Non-Friends
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-inner overflow-y-auto max-h-[70vh]">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {activeTab === "friends" ? "Your Friends" : "Other Users"}
          </h2>
          {(activeTab === "friends" ? friendsList : nonFriendsList).length > 0 ? (
            (activeTab === "friends" ? friendsList : nonFriendsList).map(renderUserCard)
          ) : (
            <div className="text-center text-gray-400">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};
