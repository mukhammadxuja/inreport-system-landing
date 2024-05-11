import React from "react";
import { DueDatePicker } from "@/components/ui/due-date";

function LifeTimeAnalytics() {
  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto bg-white py-4 px-5 md:px-8 mt-6 md:mt-10 rounded-md mb-2">
      <h5 className="">Lifetime Analytics</h5>
      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <p className="text-sm">Viewers:</p>
          <span className="text-base font-medium">0</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <p className="text-sm">Clicks:</p>
          <span className="text-base font-medium">0</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <p className="text-sm">CTR:</p>
          <span className="text-base font-medium">0</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <p className="text-sm">Subscribers:</p>
          <span className="text-base font-medium">0</span>
        </div>
      </div>
      <DueDatePicker />
    </div>
  );
}

export default LifeTimeAnalytics;
