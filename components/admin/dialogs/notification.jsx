"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function NotificationSheet({
  openNotification,
  setOpenNotification,
  children,
}) {
  return (
    <Sheet open={openNotification} onOpenChange={setOpenNotification}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Your notifications</SheetTitle>
        </SheetHeader>
        <ul className="w-full my-2">
          <li className="flex items-start space-x-3 py-2 border-b">
            <Avatar>
              <AvatarImage src="/assets/avatars/1.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <div className="flex items-center space-x-2">
                <h6 className="text-base font-medium">@john_doe</h6>
                <small className="opacity-80">Monday 2:13</small>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                possimus quia debitis alias commodi consectetur hic quas? Enim
                nam dolorum quisquam harum, earum doloremque! Error quasi
                impedit nostrum asperiores quae.
              </p>
              <div className="my-2">
                <a href="tel:+" className="text-sm flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>+998995572027</span>
                </a>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3 py-2 border-b">
            <Avatar>
              <AvatarImage src="/assets/avatars/2s.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <div className="flex items-center space-x-2">
                <h6 className="text-base font-medium">@anonymous</h6>
                <small className="opacity-80">Monday 2:13</small>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                possimus quia debitis alias commodi consectetur hic quas? Enim
                nam dolorum quisquam harum, earum doloremque! Error quasi
                impedit nostrum asperiores quae.
              </p>
              <div className="my-2">
                <a href="tel:+" className="text-sm flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>mail@gmail.com</span>
                </a>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3 py-2 border-b">
            <Avatar>
              <AvatarImage src="/assets/avatars/1.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <div className="flex items-center space-x-2">
                <h6 className="text-base font-medium">@john_doe</h6>
                <small className="opacity-80">Monday 2:13</small>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                possimus quia debitis alias commodi consectetur hic quas? Enim
                nam dolorum quisquam harum, earum doloremque! Error quasi
                impedit nostrum asperiores quae.
              </p>
              <div className="my-2">
                <a href="tel:+" className="text-sm flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>+998995572027</span>
                </a>
              </div>
            </div>
          </li>
          <li className="flex items-start space-x-3 py-2 border-b">
            <Avatar>
              <AvatarImage src="/assets/avatars/2s.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <div className="flex items-center space-x-2">
                <h6 className="text-base font-medium">@anonymous</h6>
                <small className="opacity-80">Monday 2:13</small>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                possimus quia debitis alias commodi consectetur hic quas? Enim
                nam dolorum quisquam harum, earum doloremque! Error quasi
                impedit nostrum asperiores quae.
              </p>
              <div className="my-2">
                <a href="tel:+" className="text-sm flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>mail@gmail.com</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div className="hidden flex-col items-center justify-center h-full">
          <Bell className="w-10 h-10" />
          <p className="text-sm">No notification</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationSheet;
