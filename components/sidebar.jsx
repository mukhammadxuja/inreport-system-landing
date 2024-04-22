"use client";
import {
  ChevronLeft,
  Gem,
  GraduationCap,
  LayoutDashboard,
  LayoutTemplate,
  Package2,
  PieChart,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import classNames from "classnames";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useMainContext } from "@/context/main-context";
import { usePathname } from "next/navigation";

function Sidebar() {
  const { openSidebar, setOpenSidebar } = useMainContext();
  const pathname = usePathname();

  console.log(pathname);

  const navData = [
    {
      id: 0,
      link: "/",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: 1,
      link: "/templates",
      title: "Templates",
      icon: Gem,
    },
    {
      id: 2,
      link: "/sections",
      title: "Sections",
      icon: LayoutTemplate,
    },
    {
      id: 3,
      link: "/resume",
      title: "Resume",
      icon: GraduationCap,
    },
    {
      id: 4,
      link: "/analytics",
      title: "Analytics",
      icon: PieChart,
    },
    {
      id: 5,
      link: "/settings",
      title: "Settings",
      icon: Settings,
    },
  ];

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
          className={classNames("flex flex-col flex-grow gap-1 py-4", {
            "items-start px-4": openSidebar,
            "items-center px-2": !openSidebar,
          })}
        >
          <Link
            href="/"
            className={classNames(
              "flex items-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base mb-6 duration-300",
              {
                "justify-start pl-4": openSidebar,
                "justify-center": !openSidebar,
              }
            )}
          >
            <Image
              width={40}
              height={40}
              src="/logo.svg"
              alt="Logo"
              className="h-5 w-5 transition-all group-hover:scale-110 opacity-90"
            />
            {openSidebar && <span className="text-primary">Showcase</span>}
          </Link>
          <ul className="w-full space-y-1 h-full">
            {navData.map((navitem) => (
              <Tooltip key={navitem.id}>
                <TooltipTrigger asChild>
                  <Link
                    href={`${navitem.link}`}
                    className={classNames(
                      "flex items-center rounded-lg text-gray-700 transition-colors hover:bg-accent duration-200 last:mt-auto",
                      {
                        "justify-start space-x-1 px-3 py-1 rounded-lg w-full":
                          openSidebar,
                        "justify-center": !openSidebar,
                      },
                      {
                        "bg-accent hover:bg-gray-200/70 text-blue-500":
                          pathname === navitem.link,
                      }
                    )}
                  >
                    <navitem.icon
                      className={classNames("h-9 w-9 p-2 rounded-lg", {
                        "bg-accent hover:bg-gray-200/70 text-blue-500":
                          pathname === navitem.link,
                      })}
                    />
                    {openSidebar && (
                      <span className="font-medium">{navitem.title}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {!openSidebar && (
                  <TooltipContent side="right">{navitem.title}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </ul>
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
