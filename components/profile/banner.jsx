"use client";
import { useAuthContext } from "@/context/auth-context";
import Image from "next/image";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Banner() {
  const { user } = useAuthContext();
  return (
    <div className="relative mt-4 rounded-lg">
      <div className="w-full h-36 bg-gray-200 rounded-lg" />
      <div className="flex items-end absolute -bottom-12 left-14">
        <Avatar className="w-28 h-28 object-cover rounded-full shadow">
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
