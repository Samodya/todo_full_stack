import React, { createContext, useContext, useEffect, useState } from 'react';
import apiService from '../utilities/httpservices';
import Cookies from 'js-cookie';

export const UsersContext = createContext()

export const useGetUsers = () => useContext(UsersContext)

export const UsersContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);

    
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const role = Cookies.get("role");

    useEffect(()=> {
        const fetchUseres = async ()=>{
            try {
                const results = await apiService.getData('users',token);
                setUsers(results.data);
                
            } catch (error) {
                console.log(error);
            }
        }

        fetchUseres();
    },[])

    return(
        <UsersContext.Provider
            value={{users}}
        >
            {children}
        </UsersContext.Provider>
    )
}
