/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Files from "react-files";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useApiContext } from "@/context/api-context";
import { updateUserAccount } from "@/firebase/auth/updateUserProfle";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BadgeAlert,
  BarChart,
  Calendar,
  CircleDollarSign,
  MousePointerClick,
  Zap,
} from "lucide-react";
import UpgradeDialog from "../dialogs/upgrade";

const Activity = () => {
  const { user } = useApiContext();

  const [openUpgrade, setOpenUpgrade] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <h3 className="font-semibold leading-none tracking-tight">
            Activity
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 cursor-help"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <UpgradeDialog>
          <Button
            variant="secondary"
            className="bg-indigo-50 gap-2 hover:bg-indigo-100 flex items-center justify-center h-10"
          >
            <Zap className="h-4 w-4 text-indigo-600" />
            <span className="text-indigo-600">Upgrade</span>
          </Button>
        </UpgradeDialog>
      </div>
      <Separator />
      {openUpgrade ? (
        <Form userData={user} setOpenUpgrade={setOpenUpgrade} />
      ) : (
        <div className="flex flex-col items-center justify-center !min-h-[calc(100vh-14rem)] py-10 space-y-3">
          <BarChart className="w-12 h-12 lg:w-20 lg:h-20 text-indigo-500" />

          <div>
            <h6 className="text-lg font-medium text-center">
              No activity data
            </h6>
            <p className="text-center leading-snug">
              There is no data for that date range. <br /> Learn more about
              <a className="text-sm text-indigo-600 underline pl-1" href="#!">
                sharing your Showcase.
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;

const Form = ({ userData, setOpenUpgrade }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <h1>Activity</h1>
    </div>
  );
};
