/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Files from "react-files";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useApiContext } from "@/context/api-context";
import { updateUserAccount } from "@/firebase/auth/updateUserProfile";

// UI
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zap } from "lucide-react";
import WorkingOnItDialog from "../dialogs/working-on-it";

const Subscription = () => {
  const { user } = useApiContext();

  const [addSubscription, setAddSubscription] = useState(false);

  return (
    <div className="max-h-full">
      <h3 className="font-semibold leading-none tracking-tight mb-3">
        Invite your first friend!
      </h3>
      <Separator />
      <div className="!mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              className="cursor-text hover:bg-transparent"
              variant="outline"
            >
              Free
            </Button>
            <p className="setting-p">
              Become a supporter to unlock more features on Showcase.ai and our
              community app.
            </p>
          </div>
          <WorkingOnItDialog>
            <Button>Upgrade</Button>
          </WorkingOnItDialog>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
