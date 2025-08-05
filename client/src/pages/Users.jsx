import { useEffect, useState } from "react";
import { useGetUsers } from "../Context/usersContext";
import { TopBanner } from "../components/topBanner";
import { UserCard } from "../components/usersCard";
import { useRequestContext } from "../Context/requestscontent";

export const UsersPage = () => {
    const { users, refreshUsers } = useGetUsers();
    const { requests } = useRequestContext()
    const [searchTerm, setSearchTerm] = useState("");
  
    // Normalize and filter
    const filteredUsers = users.filter((user) => {
      const term = searchTerm.toLowerCase();
      return (
        user.username?.toLowerCase().includes(term) ||
        user.fullname?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
      );
    });
  
    return (
      <div>
        <TopBanner title="Users" />
  
        {/* Search bar */}
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search by name, username, or email"
            className="border px-4 py-2 rounded w-[60%]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  
        <div className="flex flex-row m-auto w-full items-center justify-center h-[82.5vh]">
          <div className="m-auto h-[60vh] p-1 w-[60%] bg-gray-50 overflow-y-auto rounded-xl">
            <ul>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <li key={user._id}>
                    <UserCard
                      id={user._id}
                      fullname={user.fullname}
                      username={user.username}
                      email={user.email}
                      filePath={user.filePath}
                    />
                  </li>
                ))
              ) : (
                <p className="text-center mt-4">No matching users found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
