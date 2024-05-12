import { Button } from "@/components/ui/button";
import React from "react";

function Empty({ setAddVolunteering }) {
  return (
    <div className="flex flex-col items-center justify-center !min-h-[calc(100vh-14rem)] py-10 space-y-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-12 h-12 text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>

      <Button onClick={() => setAddVolunteering(true)} variant="secondary">
        Add experience
      </Button>
    </div>
  );
}

export default Empty;
