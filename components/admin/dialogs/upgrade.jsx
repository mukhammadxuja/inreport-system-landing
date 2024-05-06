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
import {
  Calendar,
  CircleDollarSign,
  MousePointerClick,
  Zap,
} from "lucide-react";

function UpgradeDialog({ children }) {
  const [openUpgrade, setOpenUpgrade] = useState(false);
  return (
    <Dialog open={openUpgrade} onOpenChange={setOpenUpgrade}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Try Pro to use this feature</DialogTitle>
          <DialogDescription className="!my-4">
            <img
              className="w-full h-fit rounded-md"
              src="/assets/premium-banner.png"
              alt="Upgrade banner"
            />
            <div className="py-2 space-y-2">
              <h6 className="text-lg font-semibold text-black">
                Want powerful analytics?
              </h6>
              <p className="leading-snug text-sm">
                Try Pro with a free 30-day trial. Just €6 EUR/month after.
                Cancel anytime.
              </p>
              <p className="flex items-center space-x-2 leading-snug text-base pt-2">
                <MousePointerClick className="w-5 h-5" />
                <span>See your top performing links</span>
              </p>
              <p className="flex items-center space-x-2 leading-snug text-base">
                <CircleDollarSign className="w-5 h-5" />
                <span>Track your revenue and sales</span>
              </p>
              <p className="flex items-center space-x-2 leading-snug text-base">
                <Calendar className="w-5 h-5" />
                <span>Get the full picture with a year is worth of data</span>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="w-full bg-indigo-500 gap-2 hover:bg-indigo-600/80 flex items-center justify-center duration-300 h-10"
            >
              <Zap className="h-4 w-4 text-white" />
              <span className="text-white">Upgrade</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpgradeDialog;
