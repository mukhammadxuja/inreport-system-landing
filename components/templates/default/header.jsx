"use client";
import Link from "next/link";
import Image from "next/image";
import { emojiPlus } from "@/utils/variables";
import { useApiContext } from "@/context/api-context";

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

function DefaultHeader() {
  const { userData } = useApiContext();

  return (
    <header className="mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative inline-block">
          <Avatar className="h-24 w-24 rounded-full">
            <AvatarImage
              className="object-cover"
              src={userData?.photoURL || `/assets/avatars/unknown.jpg`}
              alt="@shadcn"
            />
          </Avatar>
          <div
            className={`absolute bottom-0 right-0 gap-1 p-1 rounded-full bg-gray-100 border border-gray-300 shadow-sm group ${
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
        <div className="inline-block">
          <h3 className="default-template-name">
            {userData?.displayName ? userData?.displayName : "Unknown"}
          </h3>
          {!!userData?.profession && (
            <p className="default-template-profession">
              {userData?.profession} {userData?.location && "in"} <br className="block md:hidden" />
              {`${userData?.location}`}, {userData?.pronoun}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            {!!userData?.profession && (
              <Link
                href={`${userData?.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="default-template-website"
              >
                {removeSubstring(userData?.website, "https://")}
              </Link>
            )}
            {!!userData?.profession && (
              <span className="default-template-supporter">
                <Heart className="w-3 h-3" />
                supporter
              </span>
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
    </header>
  );
}

export default DefaultHeader;
