"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import UpgradeDialog from "../dialogs/upgrade";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Twitter",
    uv: 31.47,
    pv: 2400,
    fill: "#0ea5e9",
  },
  {
    name: "Email Address",
    uv: 26.69,
    pv: 4567,
    fill: "#f97316",
  },
  {
    name: "Telegram",
    uv: 15.69,
    pv: 1398,
    fill: "#3b82f6",
  },
  {
    name: "Instagram",
    uv: 8.22,
    pv: 9800,
    fill: "#f43f5e",
  },
  {
    name: "Github",
    uv: 15.69,
    pv: 1398,
    fill: "#10b981",
  },
  {
    name: "Dribble",
    uv: 8.22,
    pv: 9800,
    fill: "#ec4899",
  },
];

const Icons = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <h3 className="tab-title">Icons</h3>
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
        <div className="w-full h-96 py-5 rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              barSize={15}
              data={data}
            >
              <RadialBar
                minAngle={15}
                label={{ position: "left", fill: "#fff" }}
                background
                clockWise
                dataKey="uv"
              />
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Icons;
