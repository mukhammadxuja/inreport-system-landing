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
import { Blocks } from "lucide-react";

function WorkingOnItDialog({ userData, children }) {
  const [openWorkingOnIt, setOpenWorkingOnIt] = useState(false);

  return (
    <Dialog open={openWorkingOnIt} onOpenChange={setOpenWorkingOnIt}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="my-10">
          <Blocks className="w-16 h-16 text-gray-600 mx-auto" />
          <p className="text-center">We are working on it!</p>
        </DialogHeader>
        {/* <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose> */}
      </DialogContent>
    </Dialog>
  );
}

export default WorkingOnItDialog;
