import { auth, db } from "@/firebase/config";
import { clsx } from "clsx";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
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
