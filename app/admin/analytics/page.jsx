"use client";
import React, { useCallback, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Projects from "@/components/admin/profile/projects";
import Experience from "@/components/admin/profile/experience";
import Volunteering from "@/components/admin/profile/volunteering";
import Education from "@/components/admin/profile/education";
import Certifications from "@/components/admin/profile/certifications";
import Awards from "@/components/admin/profile/awards";
import Skills from "@/components/admin/profile/skills";
import Contacts from "@/components/admin/profile/contact";
import Subscription from "@/components/admin/settings/subscription";
import Activity from "@/components/admin/analytics/activity";
import PerformingLinks from "@/components/admin/analytics/performing-links";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
    {
      id: 0,
      title: "Referrers",
      tag: "referrers",
    },
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
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="activity"
        >
          <Activity />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="performing-links"
        >
          <PerformingLinks />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="experience"
        >
          <Experience />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="volunteering"
        >
          <Volunteering />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="education"
        >
          <Education />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="certifications"
        >
          <Certifications />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="awards"
        >
          <Awards />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="skills"
        >
          <Skills />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="contact"
        >
          <Contacts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AnalyticsPage;
