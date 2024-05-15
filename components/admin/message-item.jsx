import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { copyToClipboard, formatDate, removeSubstring } from "@/lib/utils";

function MessageItem({ message }) {
  return (
    <li key={message?.id} className="flex items-start space-x-3 py-2 border-b">
      <Avatar>
        <AvatarImage src="/assets/avatars/unknown.jpg" alt="@anonymous" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2">
          <Link
            href={`${removeSubstring(message.username, "@")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium"
          >
            {message?.username ? message?.username : "@anonymous"}
          </Link>
          <small className="opacity-80">{formatDate(message?.timestamp)}</small>
        </div>
        <p className="text-sm">{message?.message}</p>
        <div className="my-2">
          <a
            onClick={() => copyToClipboard(message?.email)}
            href={`mailto:${message?.email}`}
            className="text-sm flex items-center space-x-1"
          >
            <Mail className="w-4 h-4" />
            <span>{message?.email ? message?.email : "no contact"}</span>
          </a>
        </div>
      </div>
    </li>
  );
}

export default MessageItem;
