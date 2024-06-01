import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Template({ index, title, avatar, setModal }) {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="grid grid-cols-3 w-full items-start px-[100px] py-[50px] border-t border-gray-300 cursor-pointer transition-all duration-200 last:border-b last:border-gray-300 hover:opacity-50 group"
    >
      <div className="flex items-center gap-2">
        <Image width={60} height={60} src={avatar} alt="user avatar" />
        <div className="-space-y-2">
          <h2 className="tracking-[1.12] leading-[-.005em] text-base font-bold">
            {title}
          </h2>
          <h2 className="tracking-[1.12] leading-[-.005em] text-base font-bold text-gray-400">
            @username
          </h2>
        </div>
      </div>
      <div>
        <p className="tracking-[1.12] leading-[-.005em] text-base text-muted-foreground font-semibold">
          31 May 2024
        </p>
        <h5 className="tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold">
          Design & Development
        </h5>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex items-center gap-1 text-xs"
            variant="outline"
          >
            Developer
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1 text-xs"
            variant="outline"
          >
            Designer
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1 text-xs"
            variant="outline"
          >
            Editor
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="">
        <Link href="/signup">
          <Button variant="outline" className="float-right">
            <ArrowRight className="w-5 h-5 group-hover:-rotate-45 duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
