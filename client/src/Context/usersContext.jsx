import React, { createContext, useContext, useEffect, useState } from 'react';
import apiService from '../utilities/httpservices';

export const UsersContext = createContext()

export const useGetUsers = () => useContext(UsersContext)

export const UsersContextProvider = ({children}) => {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        const fetchUseres = async ()=>{
            try {
                const results = await apiService.getData('users');
                setUsers(results);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUseres();
    },[])

    return(
        <UsersContext.Provider
            value={users}
        >
            {children}
        </UsersContext.Provider>
    )
}
