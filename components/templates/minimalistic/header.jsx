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
import { BadgeCheck, Heart } from "lucide-react";
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
          <Avatar className="h-16 w-16 md:w-20 md:h-20 rounded-full p-1 bg-gray-50 border border-border">
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
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
          <span className="flex items-center gap-1">
            <h3 className="minimalistic-template-name">
              {userData?.displayName ? userData?.displayName : "Unknown"},{" "}
              {userData?.pronoun}
            </h3>
            {userData?.username == "anvarov" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
          <div className="flex items-center gap-1">
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
            {userData?.username == "anvarov" && (
              <span className="minimalistic-template-supporter">
                <Heart className="w-3 h-3" />
                supporter
              </span>
            )}
          </div>
        </div>

        {!!userData?.profession && (
          <div className="flex flex-col md:flex-row md:items-center justify-between">
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
