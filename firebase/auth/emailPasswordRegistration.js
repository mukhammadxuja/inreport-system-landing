import { useState } from "react";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useEmailPasswordRegistration = () => {
  const [errorEmailPasswordRegistration, setErrorEmailPasswordRegistration] =
    useState(null);
  const [isPendingEmailPasswordRegistration, setIsPendingEmailRegistration] =
    useState(false);

  const emailPasswordRegistration = async (
    email,
    password,
    username,
    displayName
  ) => {
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

      await createUserDocumentFromAuth(user, {
        displayName: displayName || null,
        password: password,
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

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const docUser = doc(db, `users`, userAuth.uid);
  const userSnapshot = await getDoc(docUser);
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    try {
      await setDoc(docUser, {
        displayName,
        email,
        photoURL,
        timestamp: new Date(),
        prefixTime: new Date().getTime(),
        freeUseEndDate: new Date().getTime() + 864000000,
        uid: userAuth.uid,
        password: "",
        ...additionalInformation,
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }
};
