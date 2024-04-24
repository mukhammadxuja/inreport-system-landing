import { Shell } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-[100] bg-white flex items-center justify-center h-screen w-full">
      <Shell className="w-8 h-8 animate-spin" />
    </div>
  );
}

export default Loading;
