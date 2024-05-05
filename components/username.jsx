import { useApiContext } from "@/context/api-context";
import { useMainContext } from "@/context/main-context";
import { useEffect, useState } from "react";

export default function UserProfileClient({ username }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);

  const { users } = useMainContext();
  const { loading } = useApiContext();

  console.log(users);

  useEffect(() => {
    function fetchUserData() {
      try {
        const user = users.find((item) => item.username === username);
        if (user) {
          setUserNotFound(false);
          setUserData(user);
        } else {
          setUserNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [users, username]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && userData && (
        <div>
          <h1>User Profile: {userData.uid}</h1>
          <h1>User Profile: {userData.username}</h1>
          <p>Email: {userData.email}</p>
        </div>
      )}
      {userNotFound ? (
        <p className={loading && "opacity-0"}>User not found</p>
      ) : null}
    </div>
  );
}
