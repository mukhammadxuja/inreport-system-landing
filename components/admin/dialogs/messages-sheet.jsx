"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useApiContext } from "@/context/api-context";
import { copyToClipboard, formatDate, removeSubstring } from "@/lib/utils";
import Link from "next/link";

function MessagesSheet({ openMessages, setOpenMessages, children }) {
  const { messages } = useApiContext();

  console.log(messages, "12");
  return (
    <Sheet open={openMessages} onOpenChange={setOpenMessages}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle>Your messages</SheetTitle>
        </SheetHeader>
        {messages.length ? (
          <ul className="w-full my-2">
            {messages.map((message) => (
              <li
                key={message?.id}
                className="flex items-start space-x-3 py-2 border-b"
              >
                <Avatar>
                  <AvatarImage
                    src="/assets/avatars/unknown.jpg"
                    alt="@anonymous"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`${removeSubstring(message.username, "@")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium"
                    >
                      {message?.username ? message?.username : "@anonymous"}
                    </Link>
                    <small className="opacity-80">
                      {formatDate(message?.timestamp)}
                    </small>
                  </div>
                  <p className="text-sm">{message?.message}</p>
                  <div className="my-2">
                    <a
                      onClick={() => copyToClipboard(message?.email)}
                      href={`mailto:${message?.email}`}
                      className="text-sm flex items-center space-x-1"
                    >
                      <Mail className="w-4 h-4" />
                      <span>
                        {message?.email ? message?.email : "no contact"}
                      </span>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <MessageCircle className="w-10 h-10" />
            <p className="text-sm">No messages</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default MessagesSheet;
