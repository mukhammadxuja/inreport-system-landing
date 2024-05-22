"use client";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { removeSubstring } from "@/lib/utils";
import { Link } from "lucide-react";

function MinimalisticContactsItem({ contact }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="minimalistic-template-item">
        <p>{contact?.type}</p>
      </div>
      <div className="minimalistic-template-item-border"></div>
      <a
        className="minimalistic-template-item hover:underline"
        href={`${contact.link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{removeSubstring(contact.link, "https://")}</span>
      </a>
    </div>
  );
}

export default MinimalisticContactsItem;
