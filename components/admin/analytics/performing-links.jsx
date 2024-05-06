import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import UpgradeDialog from "../dialogs/upgrade";

const PerformingLinks = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <h3 className="font-semibold leading-none tracking-tight">
            Performing Links
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
      <div className="relative flex flex-col h-full !min-h-[calc(100vh-18rem)] py-10 px-4 space-y-2">
        <div className="absolute top-1 left-0 z-10 rounded-sm w-full h-full bg-gray-500 bg-opacity-10 backdrop-blur-[1.5px] flex items-center justify-center">
          <UpgradeDialog>
            <Button
              variant="secondary"
              className="bg-indigo-500 gap-2 hover:bg-indigo-600/80 duration-300 flex items-center justify-center h-10"
            >
              <Zap className="h-4 w-4 text-white" />
              <span className="text-white">Upgrade</span>
            </Button>
          </UpgradeDialog>
        </div>
        <div className="flex items-center justify-between pt-2 pb-3 border-b">
          <p className="text-lg">Contact me</p>
          <strong className="text-lg">2,134</strong>
        </div>
        <div className="flex items-center justify-between pt-2 pb-3 border-b">
          <p className="text-lg">Contact me</p>
          <strong className="text-lg">2,134</strong>
        </div>
        <div className="flex items-center justify-between pt-2 pb-3 border-b">
          <p className="text-lg">Contact me</p>
          <strong className="text-lg">2,134</strong>
        </div>
        <div className="flex items-center justify-between pt-2 pb-3 border-b">
          <p className="text-lg">Contact me</p>
          <strong className="text-lg">2,134</strong>
        </div>
        <div className="flex items-center justify-between pt-2 pb-3 border-b">
          <p className="text-lg">Contact me</p>
          <strong className="text-lg">2,134</strong>
        </div>
      </div>
    </div>
  );
};

export default PerformingLinks;
