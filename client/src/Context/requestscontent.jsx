import { createContext, useContext, useEffect, useState } from "react";
import apiService from "../utilities/httpservices";
import Cookies from "js-cookie";

const RequestContext = createContext();

export const useRequestContext = () => useContext(RequestContext);

export const RequestContextProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [requestError, setRequestError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    const message = error?.message || "Something went wrong";
    if (message !== requestError) {
      setRequestError(message);
      setShowError(true);
    }
  };

  const fetchRequests = async () => {
    const currentUserId = Cookies.get("userId");
    const token = Cookies.get("token");
  
    if (!currentUserId) {
      setRequests([]);
      return;
    }
  
    setLoading(true);
  
    try {
      const result = await apiService.getDataById(
        "request/user",
        currentUserId,
        token
      );
  
      console.log("API response:", result.data);
  
      const validRequests = Array.isArray(result?.data?.data)
        ? result.data.data.filter((r) => r && r._id)
        : [];
  
      setRequests(validRequests);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  

  // Initial fetch
  useEffect(() => {
    fetchRequests();
  }, []);

  // Optional: Manual refresh
  const refreshRequests = () => {
    fetchRequests();
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        loading,
        showError,
        requestError,
        refreshRequests,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
