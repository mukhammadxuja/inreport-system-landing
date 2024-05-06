import { useState } from "react";
import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createUserDocumentFromAuth } from "./emailPasswordRegistration";

export const useGoogleLogin = () => {
  const [errorGoogleLogin, setErrorGoogleLogin] = useState(null);
  const [isPendingGoogleLogin, setIsPendingGoogleLogin] = useState(false);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const googleLogin = async () => {
    setErrorGoogleLogin(null);
    setIsPendingGoogleLogin(true);

    try {
      const { user } = await signInWithPopup(auth, provider);
      createUserDocumentFromAuth(user);
    } catch (error) {
      setErrorGoogleLogin(error.code);
      await signOut(auth);
    } finally {
      setIsPendingGoogleLogin(false);
    }
  };

  return { googleLogin, errorGoogleLogin, isPendingGoogleLogin };
};
