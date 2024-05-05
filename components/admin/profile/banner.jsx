/* eslint-disable @next/next/no-img-element */
"use client";
import { useApiContext } from "@/context/api-context";
import Image from "next/image";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Banner() {
  const { user } = useApiContext();
  return (
    <div className="relative mt-4 rounded-lg">
      <img
        className="w-full h-44 object-cover bg-gray-200 rounded-lg"
        src="/assets/banner.png"
        alt="Banner Image"
      />
      <div className="flex items-end absolute -bottom-12 left-14">
        <Avatar className="w-28 h-28 object-cover rounded-full shadow border-2 border-white">
          <AvatarImage
            className="object-cover"
            src={user?.photoURL || "/assets/avatars/1.png"}
            alt="@shadcn"
          />
        </Avatar>
        <div className="-space-y-0.5">
          <h3 className="font-bold text-base">
            {user?.displayName || "Anonymous"}
          </h3>
          <h3 className="text-sm text-gray-600">{user?.email}</h3>
        </div>
      </div>
    </div>
  );
}

export default Banner;
