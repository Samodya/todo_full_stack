import { createContext, useContext, useEffect, useState } from "react";
import apiService from "../utilities/httpservices";
import Cookies from "js-cookie";

const TasksContext = createContext();
    

export const UseTaskContext = () => {
    return useContext(TasksContext);
}

export const TasksContextProvider = ({ children }) => {
    const [tasks,setTasks] = useState([]);
    const [tasksErrors,setTaskErrors] = useState("");
    const [refresh,setRefresh] = useState(false);
    const userId = Cookies.get('userId')

    useEffect(()=>{
        const fetchTasks = async () => {
            try {
                const results = await apiService.getDataById("tasks/user",userId);
                setTasks(results.data);
            } catch (error) {
                setTaskErrors(error);
            }
        }

        fetchTasks();
    },[refresh])

    const refreshTasks = () => setRefresh((prev) => !prev);
    return(
        <TasksContext.Provider value={{
            tasks,
            tasksErrors,
            refreshTasks
        }}>
            {children}
        </TasksContext.Provider>
    )
}