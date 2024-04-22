import { useState } from "react";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export const useEmailPasswordRegistration = () => {
  const [errorEmailPasswordRegistration, setErrorEmailPasswordRegistration] =
    useState(null);
  const [isPendingEmailPasswordRegistration, setIsPendingEmailRegistration] =
    useState(false);

  const emailPasswordRegistration = async (email, password, username) => {
    setErrorEmailPasswordRegistration(null);
    setIsPendingEmailRegistration(true);

    try {
      if (!username) {
        throw new Error("Username is required for registration.");
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res.user) {
        throw new Error("User object not found in response.");
      }

      // Access user object from response
      const user = res.user;

      // Add user to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        username: username,
      });
    } catch (error) {
      console.error("Error during email/password registration:", error);
      setErrorEmailPasswordRegistration(
        error.code || "Unknown error occurred."
      );
      await signOut(auth);
    } finally {
      setIsPendingEmailRegistration(false);
    }
  };

  return {
    emailPasswordRegistration,
    errorEmailPasswordRegistration,
    isPendingEmailPasswordRegistration,
  };
};
