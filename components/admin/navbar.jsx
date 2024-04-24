"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BadgeEuro,
  Bell,
  BellOff,
  Brain,
  ChevronDown,
  Fingerprint,
  Github,
  LogOut,
  Mail,
  Settings,
  Share2,
  Shell,
  Twitter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "../ui/use-toast";
import { useAuthContext } from "@/context/auth-context";
import { useLogout } from "@/firebase/auth/logout";

export function AdminNavbar() {
  const { toast } = useToast();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="fixed top-5 right-4 z-50">
      <div className="flex w-full items-center justify-end">
        {user && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-10 p-3 rounded-full border-none"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-auto py-5 px-4 flex items-center gap-1"
                align="end"
                forceMount
              >
                <BellOff className="w-4 h-4" />
                <span className="text-xs text-center">No notification</span>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 h-10 pl-1.5 pr-3 rounded-full border-none"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      className="object-cover"
                      src={user?.photoURL || "/assets/avatars/1.png"}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <span className="font-semibold">
                    {user?.displayName?.split(" ")[0].toLowerCase() ||
                      user?.email?.slice(0, user?.email?.indexOf("@")) ||
                      "Anonymous"}
                  </span>
                  <ChevronDown className="w-4 h-4 -ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.displayName ||
                        user?.email?.slice(0, user?.email?.indexOf("@")) ||
                        "Anonymous"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "No email"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/admin/profile">
                    <DropdownMenuItem>
                      <Fingerprint className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem disabled>
                    <BadgeEuro className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <Link href="/admin/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:!bg-red-200/80 text-red-500 hover:!text-red-500"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
}
