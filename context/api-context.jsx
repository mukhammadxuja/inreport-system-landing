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

  // Profile
  const [projects, setProjects] = useState([]);
  const [sideProjects, setSideProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [volunteerings, setVolunteerings] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [awards, setAwards] = useState([]);

  // Profile
  const awardsCollection = collection(db, `users/${userUid}/awards`);
  const projectsCollection = collection(db, `users/${userUid}/projects`);
  const sideProjectsCollection = collection(
    db,
    `users/${userUid}/side-projects`
  );
  const experiencesCollection = collection(db, `users/${userUid}/experiences`);
  const educationsCollection = collection(db, `users/${userUid}/educations`);
  const volunteeringsCollection = collection(
    db,
    `users/${userUid}/volunteerings`
  );
  const certificationsCollection = collection(
    db,
    `users/${userUid}/certifications`
  );

  useEffect(() => {
    // fetch awards
    const queryAwards = query(awardsCollection);
    onSnapshot(queryAwards, (snapshot) => {
      setAwards(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    // fetch projects
    const queryProjects = query(projectsCollection);
    onSnapshot(queryProjects, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    // fetch side projects
    const querySideProjects = query(sideProjectsCollection);
    onSnapshot(querySideProjects, (snapshot) => {
      setSideProjects(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    // fetch side experience
    const queryExperience = query(experiencesCollection);
    onSnapshot(queryExperience, (snapshot) => {
      setExperiences(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    // fetch side education
    const queryEducation = query(educationsCollection);
    onSnapshot(queryEducation, (snapshot) => {
      setEducations(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    // fetch side volunteerings
    const queryVolunteering = query(volunteeringsCollection);
    onSnapshot(queryVolunteering, (snapshot) => {
      setVolunteerings(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    // fetch side volunteerings
    const queryCertification = query(certificationsCollection);
    onSnapshot(queryCertification, (snapshot) => {
      setCertifications(
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

  const values = {
    user,
    userUid,
    loading,
    userData,
    projects,
    sideProjects,
    experiences,
    educations,
    volunteerings,
    certifications,
    awards,
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};
