"use client";
import {
  Bell,
  ChevronLeft,
  Coffee,
  Gem,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  PieChart,
  Settings,
  Share2,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import classNames from "classnames";
import { Cloud, Keyboard, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useMainContext } from "@/context/main-context";
import { usePathname } from "next/navigation";
import { useApiContext } from "@/context/api-context";
import { useLogout } from "@/firebase/auth/logout";
import UpgradeDialog from "./admin/dialogs/upgrade";
import MessagesSheet from "./admin/dialogs/messages-sheet";
import AppsDialog from "./admin/dialogs/apps";

function Sidebar() {
  const { openSidebar, setOpenSidebar } = useMainContext();
  const [openMessages, setOpenMessages] = useState(false);
  const { userData, messages, unreadMessages } = useApiContext();
  const { logout } = useLogout();
  const pathname = usePathname();

  const navData = [
    {
      id: 0,
      link: "/admin",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: 1,
      link: "/admin/templates",
      title: "Templates",
      icon: Gem,
    },
    {
      id: 2,
      link: "/admin/profile",
      title: "Profile",
      icon: User,
    },
    {
      id: 3,
      link: "/admin/resume",
      title: "Resume",
      icon: GraduationCap,
    },
    {
      id: 4,
      link: "/admin/analytics",
      title: "Analytics",
      icon: PieChart,
    },
    {
      id: 5,
      link: "/admin/settings",
      title: "Settings",
      icon: Settings,
    },
  ];

  return (
    <TooltipProvider>
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-50 my-4 mx-2 rounded-2xl duration-300 hidden bg-white flex-col shadow-xl sm:flex group",
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
            href="/admin/"
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
                        "justify-start space-x-1 px-3 py-1 rounded-xl w-full":
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
                        "bg-accent hover:bg-gray-200/70 text-gray-700":
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
          <div className="mt-auto space-y-2 w-full">
            <Tooltip>
              <TooltipTrigger className="w-full">
                <UpgradeDialog>
                  <Button
                    variant="secondary"
                    className={classNames(
                      "!w-full bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center h-10",
                      {
                        "gap-2": openSidebar,
                        "p-0.5 rounded-full": !openSidebar,
                      }
                    )}
                  >
                    <Zap className="h-4 w-4 text-indigo-600" />
                    {openSidebar && (
                      <span className="text-indigo-600">Try Pro for free</span>
                    )}
                  </Button>
                </UpgradeDialog>
              </TooltipTrigger>
              {!openSidebar && (
                <TooltipContent side="right">Upgrade</TooltipContent>
              )}
            </Tooltip>
            <MessagesSheet
              openMessages={openMessages}
              setOpenMessages={setOpenMessages}
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="" asChild>
                <Button
                  variant="outline"
                  className={classNames("w-full flex items-center h-10", {
                    "justify-start pl-1.5 gap-2 rounded-lg": openSidebar,
                    "justify-center rounded-full": !openSidebar,
                  })}
                >
                  <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage
                      className="object-cover"
                      src={userData?.photoURL || "/assets/avatars/1.png"}
                      alt="@shadcn"
                    />
                  </Avatar>
                  {openSidebar && (
                    <span className="font-semibold truncate">
                      @
                      {userData?.username?.split(" ")[0].toLowerCase() ||
                        userData?.email?.slice(
                          0,
                          userData?.email?.indexOf("@")
                        ) ||
                        "Anonymous"}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userData?.displayName ||
                        userData?.email?.slice(
                          0,
                          userData?.email?.indexOf("@")
                        ) ||
                        "Anonymous"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData?.email || "No email"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/admin/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => setOpenMessages(true)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                    {messages.length && (
                      <span className="h-5 w-5 flex items-center justify-center text-white rounded-full bg-indigo-500 ml-auto text-xs">
                        {unreadMessages}
                      </span>
                    )}
                    {/* <div /> */}
                  </DropdownMenuItem>
                  <Link href="/admin/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <AppsDialog>
                  <DropdownMenuItem>
                    <Coffee className="mr-2 h-4 w-4" />
                    <span>Apps</span>
                  </DropdownMenuItem>
                </AppsDialog>
                <DropdownMenuItem disabled>
                  <Cloud className="mr-2 h-4 w-4" />
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
              <span className="hidden group-hover:flex h-9 w-9 items-center justify-center rounded-md bg-white shadow-md text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer">
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
