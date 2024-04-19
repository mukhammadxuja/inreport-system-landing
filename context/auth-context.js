import { createContext, useContext, useEffect, useState } from "react";
import firebase_app, { db } from "@/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Shell } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";

const auth = getAuth(firebase_app);

export const AuthContext = createContext({
  user: {
    email: "",
    emailVerified: "",
    displayName: "",
    photoURL: "",
  },
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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


  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="loading-container">
          <Shell className="w-5 h-5 animate-spin" />
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
};
