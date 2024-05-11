"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import UpgradeDialog from "../dialogs/upgrade";

const data = [
  {
    name: "June 27",
    phone: 4000,
    email: 2400,
    amt: 2400,
  },
  {
    name: "June 28",
    phone: 2000,
    email: 9800,
    amt: 2290,
  },
  {
    name: "June 29",
    phone: 3000,
    email: 1398,
    amt: 2210,
  },
  {
    name: "June 30",
    phone: 2780,
    email: 3908,
    amt: 2000,
  },
];

const Subscribers = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-x-1">
          <h3 className="tab-title">Subscribers</h3>
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
      <div className="relative flex flex-col h-full !min-h-[calc(100vh-18rem)] px-0 space-y-2">
        <div className="absolute flex top-1 left-0 z-10 rounded-sm w-full h-full bg-gray-500 bg-opacity-10 backdrop-blur-[1.5px] items-center justify-center">
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
        <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 xl:gap-x-10 border-b py-5">
          <div className="flex items-center gap-x-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs md:text-sm">Viewers:</p>
            <span className="text-base font-medium">0</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <p className="text-xs md:text-sm">Clicks:</p>
            <span className="text-base font-medium">0</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <p className="text-xs md:text-sm">CTR:</p>
            <span className="text-base font-medium">0</span>
          </div>
          <div className="flex items-center gap-x-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <p className="text-xs md:text-sm">Subscribers:</p>
            <span className="text-base font-medium">0</span>
          </div>
        </div>
        <div className="w-full h-96 py-5 rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="email"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="phone" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Subscribers;
