import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Template({
  index,
  username,
  title,
  paragraph,
  avatar,
  setModal,
}) {
  return (
    <div
      onMouseEnter={() => {
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        setModal({ active: false, index });
      }}
      className="grid grid-cols-1 lg:grid-cols-3 w-full items-start py-5 lg:py-8 border-t border-gray-300 cursor-pointer transition-all duration-200 last:border-b last:border-gray-300 hover:opacity-50 group"
    >
      <div className="hidden lg:flex items-center gap-2">
        <Image width={60} height={60} src={avatar} alt="user avatar" />
        <div className="-space-y-2">
          <h2 className="tracking-[1.12] leading-[-.005em] text-base font-bold">
            {username}
          </h2>
          <h2 className="tracking-[1.12] leading-[-.005em] text-base font-bold text-gray-400">
            @username
          </h2>
        </div>
      </div>
      <div className="w-full">
        <p className="tracking-[1.12] leading-[-.005em] text-base text-muted-foreground font-semibold">
          31 May 2024
        </p>
        <h5 className="tracking-[1.12] leading-[-.005em] text-clamp-footer font-bold w-full">
          {title}
        </h5>
        <p className="text-lg text-foreground-secondary">
          {paragraph}
        </p>
      </div>
      <div className="hidden lg:block">
        <Link href="/signup">
          <Button variant="outline" className="float-right">
            <ArrowRight className="w-5 h-5 group-hover:-rotate-45 duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
