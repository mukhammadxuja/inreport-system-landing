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
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { Separator } from "@/components/ui/separator";

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState("activity");

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

  const { getItem, setItem } = useSessionStorage("analytics");

  const storedActiveAnalyticsTab = getItem("analytics") || "activity";

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
        <div className="w-full">
          <LifeTimeAnalytics />
        </div>
        <TabsContent className="!mt-2" value="activity">
          <Activity />
        </TabsContent>
        <TabsContent className="!mt-2" value="performing-links">
          <PerformingLinks />
        </TabsContent>
        <TabsContent className="!mt-2" value="subscribers">
          <Subscribers />
        </TabsContent>
        <TabsContent className="!mt-2" value="locations">
          <Locations />
        </TabsContent>
        <TabsContent className="!mt-2" value="devices">
          <Devices />
        </TabsContent>
        <TabsContent className="!mt-2" value="icons">
          <Icons />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AnalyticsPage;
