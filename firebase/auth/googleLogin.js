import { useState } from "react";
import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";

export const useGoogleLogin = () => {
  const [errorGoogleLogin, setErrorGoogleLogin] = useState(null);
  const [isPendingGoogleLogin, setIsPendingGoogleLogin] = useState(false);
  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
    setErrorGoogleLogin(null);
    setIsPendingGoogleLogin(true);

    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setErrorGoogleLogin(error.code);
      await signOut(auth);
    } finally {
      setIsPendingGoogleLogin(false);
    }
  };

  return { googleLogin, errorGoogleLogin, isPendingGoogleLogin };
};
