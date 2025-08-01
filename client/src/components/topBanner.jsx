import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ManinNavigation } from "./MainNavigation";
import { useLogout } from "../Hooks/useLogout";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import apiService from "../utilities/httpservices";
import user from "../assets/images/user.png";

export const TopBanner = ({ title = "Dashboard" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [usermenuOpen, setUserMenuOpen] = useState(false);
  const { logout } = useLogout();
  const uname = Cookies.get("username");
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const [profpic, setProfPic] = useState("");

  const getProfImg = async () => {
    try {
      const result = await apiService.getDataById("users", userId, token);
      setProfPic(result.data.filePath);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfImg();
  }, []);

  return (
    <div className="w-full h-40 bg-primary p-4 flex flex-col justify-between rounded-b-2xl">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Menu Icon (mobile only) */}
        <button className="text-white" onClick={() => setMenuOpen(true)}>
          <Menu size={32} />
        </button>

        {menuOpen && (
          <ManinNavigation
            menuHide={false}
            closeMenu={() => setMenuOpen(false)}
          />
        )}
        {/* App Title */}
        <div className="text-white font-extrabold text-3xl md:text-4xl">
          Todo App
        </div>

        {/* Right-side user info (desktop) */}
        <div
          className="flex items-center gap-2 text-white text-lg cursor-pointer"
          onClick={() => {
            setUserMenuOpen(!usermenuOpen);
          }}
        >
          <div className="bg-white text-primary rounded-full flex h-8 w-8 items-center justify-center font-bold">
            {profpic ? (
              <img
                src={`http://localhost:4000/${profpic.replace(/^\/+/, "")}`}
                alt="Preview"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <img
                src={user}
                alt="Preview"
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
          </div>
          <span>{uname}</span>
        </div>
        {usermenuOpen && (
          <div className="absolute right-1 top-12 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  to="../user"
                  className="flex hover hover:bg-blue-500 p-2 rounded hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="flex hover hover:bg-blue-500 p-2 rounded hover:text-white"
                  to="../user"
                >
                  Settings
                </Link>
              </li>

              <li
                className="flex hover hover:bg-blue-500 hover:text-white p-2 cursor-pointer rounded"
                onClick={() => {
                  setUserMenuOpen(false);
                  logout();
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Title Row (Always visible) */}
      <div className="flex items-center justify-between text-white">
        <div className="font-extrabold text-3xl md:text-4xl p-2">{title}</div>
      </div>
    </div>
  );
};
