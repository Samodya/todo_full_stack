import { useGetUsers } from "../Context/usersContext";
import { TopBanner } from "../components/topBanner";
import { UserCard } from "../components/usersCard";

export const UsersPage = () => {
  const { users } = useGetUsers();

  console.log(users);
  return (
    <div>
      <TopBanner title="Users" />

      <div className="flex flex-row m-auto w-full 
                items-center justify-center h-[82.5vh]">
        <div className="m-auto max-h-[60vh] p-2 w-[60%]">
          <ul>
            {users.length > 0 ? users.map((user) => <li>
                <UserCard
                    key={user._id}
                    id={user._id}
                    fullname={user.fullname}
                    username={user.username}
                    email={user.email}
                    filePath={user.filePath}
                />
            </li>) : "server error"}
          </ul>
        </div>
      </div>
    </div>
  );
};
