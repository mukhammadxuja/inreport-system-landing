"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const ApiContext = createContext({});

export const useApiContext = () => useContext(ApiContext);

export const ApiContextProvider = ({ children }) => {
  // User
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);

  const projectsCollection = collection(db, `users/${userUid}/projects`);

  useEffect(() => {
    const q = query(projectsCollection);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let projectsArr = [];

      querySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });

      setProjects(projectsArr);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserUid(auth.currentUser.uid);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;
      const fetchUser = async () => {
        const queryUser = query(
          collection(db, "users"),
          where("id", "==", uid)
        );
        onSnapshot(queryUser, (snapshot) => {
          setUserData(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      };
      fetchUser();
    }
  }, []);

  console.log("userData", userData);

  const values = { user, userUid, loading, projects, setProjects };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};
