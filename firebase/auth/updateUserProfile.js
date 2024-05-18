import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config";

export const updateUserAccount = async (data, photoURL, template) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  const updateData = { ...data };

  if (photoURL) {
    updateData.photoURL = photoURL;
  }
  if (template) {
    updateData.template = template;
  }

  try {
    await updateDoc(userDoc, updateData);
  } catch (error) {
    console.error("Error updating user account:", error);
    throw error;
  }
};
