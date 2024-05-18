import { auth, db } from "@/firebase/config";
import { clsx } from "clsx";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function getProjects() {
  const docRef = doc(db, `users/${auth.currentUser.uid}/projects`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}

export function removeSubstring(mainString, substringToRemove) {
  if (mainString.includes(substringToRemove)) {
    return mainString.replace(substringToRemove, "");
  }
  return mainString;
}

export const formatDate = (date) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast(`${text} copied!`);
    })
    .catch((error) => {
      toast("Error copying text to clipboard:", error);
    });
};

export function getFirstNumberFromUserID(id) {
  if (typeof id !== "string") {
    return null;
  }

  const match = id.match(/\d+/);

  return match ? Number(match[0]) : null;
}
