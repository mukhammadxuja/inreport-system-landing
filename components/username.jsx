import { useAuthContext } from "@/context/auth-context";
import { useMainContext } from "@/context/main-context";
import { useEffect, useState } from "react";

export default function UserProfileClient({ username }) {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);

  const { users } = useMainContext();
  const { loading } = useAuthContext();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = users.find((item) => item.username === username);
        // Simulating a 3-second delay
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
      {userNotFound && <p>User not found</p>}
    </div>
  );
}
