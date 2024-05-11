"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";

export const ApiContext = createContext({});

export const useApiContext = () => useContext(ApiContext);

export const ApiContextProvider = ({ children }) => {
  // User
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [sideProjects, setSideProjects] = useState([]);

  console.log("sideProjects", sideProjects);

  const projectsCollection = collection(db, `users/${userUid}/projects`);
  const sideProjectsCollection = collection(
    db,
    `users/${userUid}/side-projects`
  );

  useEffect(() => {
    const queryProjects = query(projectsCollection);
    onSnapshot(queryProjects, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    const querySideProjects = query(sideProjectsCollection);
    onSnapshot(querySideProjects, (snapshot) => {
      setSideProjects(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

  }, [auth.currentUser]);

  // Get user from google auth
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

  // Get user from fireStore
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        setUserData(snapshot.data());
      }
    });
  }, []);

  const values = { user, userUid, loading, userData, projects, sideProjects };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};
