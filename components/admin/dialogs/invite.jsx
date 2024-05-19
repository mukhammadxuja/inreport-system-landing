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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function InviteDialog({ userData, children }) {
  const [openInvite, setOpenInvite] = useState(false);
  const [copy, setCopy] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`localhost:3000/join/${userData?.username}`);
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  return (
    <Dialog open={openInvite} onOpenChange={setOpenInvite}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[28rem]">
        <DialogHeader>
          <DialogTitle>Invite your first friend!</DialogTitle>
          <DialogDescription className="!mt-4 flex items-center gap-2">
            <Input
              className="outline-none ring-0"
              value={`https://localhost:3000/join/${userData?.username}`}
            />
            <Button onClick={copyToClipboard} variant="secondary">
              {copy ? "Copied" : "Copy"}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InviteDialog;
