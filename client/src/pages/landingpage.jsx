import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./dashboard"
import { TasksManger } from "./taskmanger"
import { UserProfile } from "./userProfilePage"

export const LandingPage = () => {
    return(
        <div>
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard/>}
                />
                <Route
                    path="/tasks"
                    element={<TasksManger/>}
                />
                <Route
                    path="/user"
                    element={<UserProfile/>}
                />
            </Routes>
        </div>
    )
}