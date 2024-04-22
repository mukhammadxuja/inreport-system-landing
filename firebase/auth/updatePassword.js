import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config";

export const updateUserPassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;
  const email = user?.email;
  const credential = EmailAuthProvider.credential(email, currentPassword);

  try {
    // Reauthenticate user
    await reauthenticateWithCredential(user, credential);

    // Update password in Firebase Authentication
    await updatePassword(user, newPassword);

    console.log("Password updated successfully");
  } catch (error) {
    console.error("Error updating password:", error.message);
  }
};
