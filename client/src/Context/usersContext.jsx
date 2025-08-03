import React, { createContext, useContext, useEffect, useState } from 'react';
import apiService from '../utilities/httpservices';
import Cookies from 'js-cookie';

export const UsersContext = createContext();
export const useGetUsers = () => useContext(UsersContext);

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(Cookies.get("userId"));
  const [token, setToken] = useState(Cookies.get("token"));

  // Poll cookies every 1s to check for login change
  useEffect(() => {
    const interval = setInterval(() => {
      const newUserId = Cookies.get("userId");
      const newToken = Cookies.get("token");

      if (newUserId !== currentUserId || newToken !== token) {
        setCurrentUserId(newUserId);
        setToken(newToken);
        setRefresh(prev => !prev); // trigger refresh
      }
    }, 1000); // adjust interval as needed

    return () => clearInterval(interval);
  }, [currentUserId, token]);

  // Fetch users list excluding self
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token || !currentUserId) return;

        const results = await apiService.getData('users', token);
        if (results && results.data) {
          const filteredUsers = results.data.filter(user => user._id !== currentUserId);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [refresh, currentUserId, token]);

  const refreshUsers = () => setRefresh(prev => !prev);

  return (
    <UsersContext.Provider value={{ users, refreshUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
