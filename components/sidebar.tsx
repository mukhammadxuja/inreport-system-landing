"use client";
import { ChevronLeft, Package2, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import classNames from "classnames";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useMainContext } from "@/context/main-context";

function Sidebar() {
  const { openSidebar, setOpenSidebar } = useMainContext();
  
  return (
    <TooltipProvider>
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-50 duration-300 hidden flex-col border-r bg-background sm:flex group",
          {
            "w-[260px]": openSidebar,
            "w-14": !openSidebar,
          }
        )}
      >
        <nav
          className={classNames("flex flex-col gap-1 py-4", {
            "items-start px-4": openSidebar,
            "items-center px-2": !openSidebar,
          })}
        >
          <Link
            href="/"
            className={classNames(
              "flex items-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base mb-6",
              {
                "justify-start": openSidebar,
                "justify-center": !openSidebar,
              }
            )}
          >
            <Image
              width={40}
              height={40}
              src="/logo.svg"
              alt="Logo"
              className="h-4 w-4 transition-all group-hover:scale-110"
            />
            {openSidebar && <span className="text-primary">Showcase</span>}
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={classNames(
                  "flex items-center rounded-lg text-gray-700 transition-colors hover:text-foreground duration-200",
                  {
                    "justify-start space-x-1 px-3 py-1 rounded-lg bg-accent hover:bg-gray-200 w-full":
                      openSidebar,
                    "justify-center": !openSidebar,
                  }
                )}
              >
                <Package2
                  className={classNames("h-9 w-9 p-2 rounded-lg", {
                    "bg-transparent hover:bg-transparent": openSidebar,
                    "bg-muted hover:bg-gray-200": !openSidebar,
                  })}
                />
                {openSidebar && <span className="font-medium">Dashboard</span>}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={classNames(
                  "flex items-center rounded-lg text-gray-700 transition-colors hover:text-foreground duration-200",
                  {
                    "justify-start space-x-1 px-3 py-1 rounded-lg bg-accent hover:bg-gray-200 w-full":
                      openSidebar,
                    "justify-center": !openSidebar,
                  }
                )}
              >
                <Package2
                  className={classNames("h-9 w-9 p-2 rounded-lg", {
                    "bg-transparent hover:bg-transparent": openSidebar,
                    "bg-muted hover:bg-gray-200": !openSidebar,
                  })}
                />
                {openSidebar && <span className="font-medium">Dashboard</span>}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </nav>
        <nav
          className={`${
            openSidebar ? "items-start px-4" : "items-center px-2"
          } mt-auto flex flex-col gap-4 py-4`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className={classNames(
                  "flex items-center rounded-lg text-gray-700 transition-colors hover:text-foreground duration-200 bg-transparent hover:bg-muted",
                  {
                    "justify-start space-x-1 px-3 py-1 rounded-lg w-full":
                      openSidebar,
                    "justify-center": !openSidebar,
                  }
                )}
              >
                <Settings className="h-9 w-9 p-2 rounded-lg bg-transparent hover:bg-muted" />
                {openSidebar && <span className="font-medium">Settings</span>}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
        <div
          onClick={() => setOpenSidebar((prev) => !prev)}
          className={classNames("absolute m-5", {
            "-right-9": openSidebar,
            "-right-10": !openSidebar,
          })}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="hidden group-hover:flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer">
                <ChevronLeft
                  className={classNames("h-5 w-5", {
                    "rotate-0": openSidebar,
                    "rotate-180": !openSidebar,
                  })}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right">Collapse Sidebar</TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}

export default Sidebar;
