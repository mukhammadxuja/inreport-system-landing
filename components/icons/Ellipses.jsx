import { cn } from "@/lib/utils";
import React from "react";

function EllipsesIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn(`w-5 h-5 md:w-7 md:h-7 cursor-pointer ${className}`)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </svg>
  );
}

export default EllipsesIcon;
