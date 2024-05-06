"use client";
import React, { useCallback, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Activity from "@/components/admin/analytics/activity";
import PerformingLinks from "@/components/admin/analytics/performing-links";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import LifeTimeAnalytics from "@/components/admin/analytics/lifetime";
import Subscribers from "@/components/admin/analytics/subscribers";
import Locations from "@/components/admin/analytics/locations";
import Devices from "@/components/admin/analytics/devices";
import Icons from "@/components/admin/analytics/icons";

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState("");

  const analyticsTabs = [
    {
      id: 0,
      title: "Activity",
      tag: "activity",
    },
    {
      id: 0,
      title: "Performing Links",
      tag: "performing-links",
    },
    {
      id: 0,
      title: "Subscribers",
      tag: "subscribers",
    },
    {
      id: 0,
      title: "Locations",
      tag: "locations",
    },
    // {
    //   id: 0,
    //   title: "Referrers",
    //   tag: "referrers",
    // },
    {
      id: 0,
      title: "Devices",
      tag: "devices",
    },
    {
      id: 0,
      title: "Icons",
      tag: "icons",
    },
  ];

  const { getItem, setItem } = useLocalStorage("analytics");

  const storedActiveAnalyticsTab = getItem("analytics");

  const handleSelectAnalyticsTag = useCallback(
    (tag) => {
      setAnalytics(tag);
      setItem(analytics);
    },
    [analytics, setItem]
  );

  return (
    <div className="p-4 min-h-screen">
      <Tabs
        defaultValue={storedActiveAnalyticsTab}
        onValueChange={(e) => handleSelectAnalyticsTag(e, analytics)}
        className="w-full mt-0"
      >
        <TabsList className="sticky top-4 z-40 h-12 mx-auto flex items-center space-x-1 w-fit p-1 shadow-md rounded-2xl duration-300 bg-white border border-border group">
          {analyticsTabs.map((analytic) => (
            <TabsTrigger
              key={analytic.title}
              className="bg-background data-[state=active]:bg-[#f3f3f1] h-10 py-2"
              onClick={() => handleSelectAnalyticsTag(analytic.tag)}
              value={analytic.tag}
            >
              {analytic.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent className="mt-[1.2rem] max-w-7xl mx-auto" value="activity">
          <LifeTimeAnalytics />
          <div className="mx-auto px-8 py-6 rounded-lg bg-white">
            <Activity />
          </div>
        </TabsContent>
        <TabsContent
          className="mt-[1.2rem] max-w-7xl mx-auto"
          value="performing-links"
        >
          <LifeTimeAnalytics />
          <div className="mx-auto px-8 py-6 rounded-lg bg-white">
            <PerformingLinks />
          </div>
        </TabsContent>
        <TabsContent
          className="mt-[1.2rem] max-w-7xl mx-auto"
          value="subscribers"
        >
          <LifeTimeAnalytics />
          <div className="mx-auto px-8 py-6 rounded-lg bg-white">
            <Subscribers />
          </div>
        </TabsContent>
        <TabsContent
          className="mt-[1.2rem] max-w-7xl mx-auto"
          value="locations"
        >
          <LifeTimeAnalytics />
          <div className="mx-auto px-8 py-6 rounded-lg bg-white">
            <Locations />
          </div>
        </TabsContent>
        {/* <TabsContent className="mt-[1.2rem] max-w-7xl mx-auto" value="activity">
          <LifeTimeAnalytics />
          <div className="mx-auto px-8 py-6 rounded-lg bg-white">
            <Activity />
          </div>
        </TabsContent> */}
        <TabsContent className="mt-[1.2rem] max-w-7xl mx-auto" value="devices">
          <LifeTimeAnalytics />
          <div className="mx-auto px-8 py-6 rounded-lg bg-white">
            <Devices />
          </div>
        </TabsContent>
        <TabsContent className="mt-[1.2rem] max-w-7xl mx-auto" value="icons">
          <LifeTimeAnalytics />
          <div className="mx-auto px-8 py-6 rounded-lg bg-white">
            <Icons />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AnalyticsPage;
