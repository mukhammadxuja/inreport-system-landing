import { Shell } from "lucide-react";
import React from "react";
import { LoadingIcon } from "../icons";
import Image from "next/image";

function Loading() {
  return (
    <div className="fixed top-0 left-0 z-[100] bg-white flex flex-col items-center justify-center gap-2 h-screen w-full">
      <Image
        width={100}
        height={100}
        className="w-8 md:w-10 animate-pulse"
        src="/logo.svg"
        alt="showcase logo"
      />
    </div>
  );
}

export default Loading;
