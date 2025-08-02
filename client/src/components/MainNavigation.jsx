import { LayoutDashboard, X,ClipboardCheck, User } from "lucide-react";
import { Link } from "react-router-dom";

const listItems = [
    {id:1, text:"Dashboard", icon:<LayoutDashboard/>, link:"../"},
    {id:2, text:"Tasks", icon:<ClipboardCheck/>, link:"../../todo/tasks"},
    {id:3, text:"Users", icon:<User/>, link:"../../todo/users"}
]

export const ManinNavigation = ({ menuHide = true, closeMenu }) => {
  return (
    <div className={!menuHide ? "mainNav p-2" : "hidden"}>
      <div className="flex text-black items-center justify-between p-2 my-5">
        <div className="text-2xl font-semibold">Menu</div>
        <div onClick={closeMenu} className="cursor-pointer">
          <X size={34} />
        </div>
      </div>
      <ul className="list-none">
        {listItems.map((item)=> (
            <li key={item.id}>
               <Link to={item.link} className="flex items-center gap-2 p-3 text-xl">
               <div>{item.icon}</div>
                <div>{item.text}</div>
               </Link>
            </li>
        ))}
      </ul>
      {/* Add your navigation items here */}
    </div>
  );
};
