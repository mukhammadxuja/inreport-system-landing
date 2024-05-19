"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const ApiContext = createContext({});

export const useApiContext = () => useContext(ApiContext);

export const ApiContextProvider = ({ children }) => {
  // User
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(userData);

  // Profile
  const [projects, setProjects] = useState([]);
  const [sideProjects, setSideProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [volunteerings, setVolunteerings] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [awards, setAwards] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Messages
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Settings
  const [settings, setSettings] = useState([]);

  const fetchUnreadMessagesCount = async () => {
    if (!userUid) return;

    const userMessagesRef = collection(db, "users", userUid, "messages");

    try {
      const unreadMessagesQuery = query(
        userMessagesRef,
        where("read", "==", false)
      );
      const unreadMessagesSnapshot = await getDocs(unreadMessagesQuery);
      setUnreadMessages(unreadMessagesSnapshot.size);
    } catch (error) {
      console.error("Error fetching unread messages: ", error);
    }
  };

  useEffect(() => {
    fetchUnreadMessagesCount();
  }, [auth.currentUser]);

  const markMessageAsRead = async (messageId) => {
    if (!userUid) return;

    const messageRef = doc(db, "users", userUid, "messages", messageId);

    try {
      await updateDoc(messageRef, { read: true });
      setUnreadMessages((prevCount) => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error("Error marking message as read: ", error);
    }
  };

  console.log(settings);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!userUid) {
        console.error("User UID is null or undefined");
        return;
      }

      try {
        const settingsDocRef = doc(
          db,
          "users",
          userUid,
          "settings",
          "settingsDoc"
        );
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings");
      }
    };

    fetchSettings();
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const awardsCollection = collection(db, `users/${userUid}/awards`);
      const queryAwards = query(awardsCollection);
      const unsubscribeAwards = onSnapshot(queryAwards, (snapshot) => {
        setAwards(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return () => unsubscribeAwards();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const contactsCollection = collection(db, `users/${userUid}/contacts`);
      const queryContacts = query(contactsCollection);
      const unsubscribeContacts = onSnapshot(queryContacts, (snapshot) => {
        setContacts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return () => unsubscribeContacts();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const projectsCollection = collection(db, `users/${userUid}/projects`);
      const queryProjects = query(projectsCollection);
      const unsubscribeProjects = onSnapshot(queryProjects, (snapshot) => {
        setProjects(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return () => unsubscribeProjects();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const sideProjectsCollection = collection(
        db,
        `users/${userUid}/sideProjects`
      );
      const querySideProjects = query(sideProjectsCollection);
      const unsubscribeSideProjects = onSnapshot(
        querySideProjects,
        (snapshot) => {
          setSideProjects(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      );
      return () => unsubscribeSideProjects();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const experiencesCollection = collection(
        db,
        `users/${userUid}/experiences`
      );
      const queryExperience = query(experiencesCollection);
      const unsubscribeExperience = onSnapshot(queryExperience, (snapshot) => {
        setExperiences(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return () => unsubscribeExperience();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const educationsCollection = collection(
        db,
        `users/${userUid}/educations`
      );
      const queryEducation = query(educationsCollection);
      const unsubscribeEducation = onSnapshot(queryEducation, (snapshot) => {
        setEducations(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return () => unsubscribeEducation();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const volunteeringsCollection = collection(
        db,
        `users/${userUid}/volunteerings`
      );
      const queryVolunteering = query(volunteeringsCollection);
      const unsubscribeVolunteering = onSnapshot(
        queryVolunteering,
        (snapshot) => {
          setVolunteerings(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      );
      return () => unsubscribeVolunteering();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const certificationsCollection = collection(
        db,
        `users/${userUid}/certifications`
      );
      const queryCertification = query(certificationsCollection);
      const unsubscribeCertification = onSnapshot(
        queryCertification,
        (snapshot) => {
          setCertifications(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        }
      );
      return () => unsubscribeCertification();
    }
  }, [userUid]);

  useEffect(() => {
    if (userUid) {
      const messagesCollection = collection(db, `users/${userUid}/messages`);
      const queryMessages = query(messagesCollection);
      const unsubscribeMessages = onSnapshot(queryMessages, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return () => unsubscribeMessages();
    }
  }, [userUid]);

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
  }, [userUid]);

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
    contacts,

    // messages
    messages,
    unreadMessages,
    setUnreadMessages,
    markMessageAsRead,

    // settings
    settings,
    
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};
