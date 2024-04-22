"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BadgeEuro,
  Brain,
  Fingerprint,
  Github,
  LogOut,
  Mail,
  Settings,
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "./ui/use-toast";
import { useAuthContext } from "@/context/auth-context";
import { useLogout } from "@/firebase/auth/logout";
import Image from "next/image";

export function Navbar() {
  const { toast } = useToast();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="fixed top-0 z-40 w-full">
      <div className="flex h-16 w-full items-center justify-end space-x-4 pr-5 md:pr-8">
        {user && (
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center justify-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.photoURL || "/avatars/04.png"}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {user?.displayName?.slice(0, 2) ||
                          user?.email?.slice(0, 2) ||
                          ""}
                      </AvatarFallback>
                    </Avatar>
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
                    <Link href="/profile">
                      <DropdownMenuItem>
                        <Fingerprint className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem disabled>
                      <BadgeEuro className="mr-2 h-4 w-4" />
                      Billing
                    </DropdownMenuItem>
                    <Link href="/settings">
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
          </div>
        )}
      </div>
    </nav>
  );
}
