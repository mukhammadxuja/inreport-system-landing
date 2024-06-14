"use client";
import Link from "next/link";
import Image from "next/image";
import { emojiPlus } from "@/utils/variables";

// UI
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { removeSubstring } from "@/lib/utils";
import { Heart } from "lucide-react";
import { EllipsesIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import StatusDialog from "@/components/admin/dialogs/status";
import { useState } from "react";

function MinimalisticHeader({ userData, admin = false }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between">
        <div className="relative inline-block">
          <Avatar className="h-16 w-16 md:w-20 md:h-20 rounded-full p-1 bg-gray-100 border border-border">
            <AvatarImage
              className="object-cover rounded-full"
              src={userData?.photoURL || `/assets/avatars/unknown.jpg`}
              alt="@shadcn"
            />
          </Avatar>
          <div
            className={`absolute -bottom-1 -right-1 gap-1 p-1 rounded-full bg-gray-100 border border-border shadow-sm group ${
              userData?.status?.title && "hover:rounded-r-lg"
            }`}
          >
            <div className="relative flex items-center">
              <Image
                width={20}
                height={20}
                src={userData?.status?.emoji || emojiPlus}
                priority={false}
                alt="Fire emoji"
                className="w-5 h-5"
              />
              {userData?.status?.title && (
                <small className="absolute -bottom-[0.28rem] left-6 whitespace-nowrap max-w-72 truncate bg-gray-100 border border-gray-300 border-l-gray-100 shadow-sm text-gray-800 text-xs rounded-r-lg py-1.5 pr-2 hidden group-hover:block">
                  {userData?.status?.title}
                </small>
              )}
            </div>
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <EllipsesIcon />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit p-0">
            <Button variant="ghost" size="sm">
              Report
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-5 space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="minimalistic-template-name">
            {userData?.displayName ? userData?.displayName : "Unknown"},{" "}
            {userData?.pronoun}
          </h3>
          {!!userData?.profession && (
            <Link
              href={`${userData?.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="minimalistic-template-website"
            >
              {removeSubstring(userData?.website, "https://")}
            </Link>
          )}
          {!!userData?.profession && (
            <span className="minimalistic-template-supporter">
              <Heart className="w-3 h-3" />
              supporter
            </span>
          )}
        </div>

        {!!userData?.profession && (
          <div className="flex items-center justify-between">
            <p className="minimalistic-template-profession">
              {userData?.profession} {`in ${userData?.location}`}
            </p>
            {userData?.isOpenToWork && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></div>
                <small className="text-foreground">Open to work</small>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default MinimalisticHeader;
