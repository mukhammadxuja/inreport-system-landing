/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

// UI
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function AppsDialog({ children }) {
  const [openApps, setOpenApps] = useState(false);
  return (
    <Dialog open={openApps} onOpenChange={setOpenApps}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[28rem]">
        <DialogHeader>
          <DialogDescription className="!mt-4 grid grid-cols-3 gap-4">
            <Link
              href="https://lazydev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-4 rounded-md hover:bg-gray-200 duration-200"
              title="Lazydev UI"
            >
              <Image
                width={50}
                height={50}
                className="w-10 mx-auto"
                src="/assets/apps/lazydev.svg"
                alt="Lazydev ui"
              />
              <p className="text-xs mt-2 leading-tight whitespace-nowrap truncate text-center text-gray-800">
                Lazydev UI
              </p>
            </Link>
            <Link
              href="https://app.intoday.uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-4 rounded-md hover:bg-gray-200 duration-200"
              title="Intoday System"
            >
              <Image
                width={50}
                height={50}
                className="w-10 mx-auto"
                src="/assets/apps/intoday-system.svg"
                alt="Intoday system"
              />
              <p className="text-xs mt-2 leading-tight whitespace-nowrap truncate text-center text-gray-800">
                Intoday System
              </p>
            </Link>
            <Link
              href="https://frontendresources.vercel.app/jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-4 rounded-md hover:bg-gray-200 duration-200"
              title="Frontend Resources"
            >
              <Image
                width={50}
                height={50}
                className="w-10 mx-auto"
                src="/assets/apps/frontend-resources.svg"
                alt="Frontend resources"
              />
              <p className="text-xs mt-2 leading-tight whitespace-nowrap truncate text-center text-gray-800">
                Frontend Resources
              </p>
            </Link>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AppsDialog;
