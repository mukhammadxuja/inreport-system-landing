import { clsx } from "clsx";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function removeSubstring(mainString, substringToRemove) {
  if (mainString?.includes(substringToRemove)) {
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
