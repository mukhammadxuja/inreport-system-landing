"use client";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const MainContext = createContext({});

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [openSidebar, setOpenSidebar] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);

        // Extract users data from snapshot
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const getUser = async (username) => {
    const userData = await users.find((item) => item.username === username);

    return userData;
  };

  const contextValue = {
    users,
    openSidebar,
    setOpenSidebar,
    getUser,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
