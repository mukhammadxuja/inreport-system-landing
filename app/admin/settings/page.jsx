"use client";
import React, { useCallback, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSessionStorage } from "@/hooks/useSessionStorage";

import Certifications from "@/components/admin/profile/certifications";
import Awards from "@/components/admin/profile/awards";
import Skills from "@/components/admin/profile/skills";
import Contacts from "@/components/admin/profile/contact";
import Subscription from "@/components/admin/settings/subscription";

function SettingsPage() {
  const [settings, setSettings] = useState("subscription");

  const settingsTab = [
    {
      id: 0,
      title: "Subscription",
      tag: "subscription",
    },
    {
      id: 0,
      title: "Personal Domain",
      tag: "personal-domain",
    },
    {
      id: 0,
      title: "Insights",
      tag: "insights",
    },
    {
      id: 0,
      title: "Billing",
      tag: "billing",
    },
    {
      id: 0,
      title: "Settings",
      tag: "settings",
    },
    {
      id: 0,
      title: "Invite friend!",
      tag: "invite-friend",
    },
  ];

  const { getItem, setItem } = useSessionStorage("settings");

  const storedActiveSettingsTab = getItem("settings") || "subscription";

  const handleSelectSettingsTag = useCallback(
    (tag) => {
      setSettings(tag);
      setItem(settings);
    },
    [settings, setItem]
  );

  return (
    <div className="p-4 min-h-screen">
      <Tabs
        defaultValue={storedActiveSettingsTab}
        onValueChange={(e) => handleSelectSettingsTag(e, settings)}
        className="w-full mt-0"
      >
        <TabsList className="sticky top-4 z-40 h-12 mx-auto flex items-center space-x-1 w-fit p-1 shadow-md rounded-2xl duration-300 bg-white border border-border group">
          {settingsTab.map((profile) => (
            <TabsTrigger
              key={profile.title}
              className="bg-background data-[state=active]:bg-[#f3f3f1] h-10 py-2"
              onClick={() => handleSelectSettingsTag(profile.tag)}
              value={profile.tag}
            >
              {profile.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="subscription"
        >
          <Subscription />
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

export default SettingsPage;
