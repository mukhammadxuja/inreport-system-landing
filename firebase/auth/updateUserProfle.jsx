import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config";

export const updateUserAccount = async (data) => {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  console.log(userDoc);
  try {
    await updateDoc(userDoc, data);
    console.log("User account updated successfully");
  } catch (error) {
    console.error("Error updating user account:", error);
    throw error;
  }
};

console.log(updateUserAccount);
