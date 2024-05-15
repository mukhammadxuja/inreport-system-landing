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
import MessageItem from "../message-item";

function MessagesSheet({ openMessages, setOpenMessages, children }) {
  const { messages, markMessageAsRead } = useApiContext();

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
              <MessageItem
                key={message.id}
                message={message}
                markMessageAsRead={markMessageAsRead}
              />
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
