import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config";

export const updateUserAccount = async (data, photoURL) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  try {
    await updateDoc(userDoc, { ...data, photoURL });
  } catch (error) {
    console.error("Error updating user account:", error);
    throw error;
  }
};
