"use client";
import { createContext, useContext, useEffect, useState } from "react";
import firebase_app from "@/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Shell } from "lucide-react";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({
  user: {
    email: "",
    emailVerified: "",
    displayName: "",
    username: "",
    profession: "",
    photoURL: "",
  },
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("user", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userId = auth.currentUser?.uid;
        const projectsCollection = collection(db, "users", +userId, "projects");
        const projectsSnapshot = await getDocs(projectsCollection);

        // Extract projects data from snapshot
        const projectsData = projectsSnapshot.docs.map((doc) => doc.data());
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  console.log("projects", projects);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
