import { useMainContext } from "@/context/main-context";
import { useEffect, useState } from "react";

export default function UserProfileClient({ username }) {
  const [userData, setUserData] = useState(null);

  const { users } = useMainContext();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = users.find((item) => item.username === username);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [users]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile: {userData.uid}</h1>
      <h1>User Profile: {userData.username}</h1>
      <p>Email: {userData.email}</p>
    </div>
  );
}
