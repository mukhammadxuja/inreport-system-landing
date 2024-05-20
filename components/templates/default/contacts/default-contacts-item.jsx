"use client";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { removeSubstring } from "@/lib/utils";
import { Link } from "lucide-react";

function DefaultContactsItem({ contact }) {
  return (
    <div className="relative md:flex md:items-start md:justify-between pr-4">
      <div className="default-template-item-date-lg">
        <p>{contact?.type}</p>
      </div>
      <div className="space-y-3 w-full md:w-[25rem]">
        <div className="-space-y-1">
          <div className="flex items-center w-full">
              <Link className="w-3 h-3 mr-2" />
            <Button variant="linkHover1">
              <a
                className="flex items-center space-x-1.5 group"
                href={`${contact.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{removeSubstring(contact.link, "https://")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 -rotate-45 group-hover:rotate-0 duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultContactsItem;
