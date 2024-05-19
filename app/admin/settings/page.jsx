"use client";
import React, { useCallback, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSessionStorage } from "@/hooks/useSessionStorage";

import Certifications from "@/components/admin/profile/certifications";
import Skills from "@/components/admin/profile/skills";
import Subscription from "@/components/admin/settings/subscription";
import General from "@/components/admin/settings/general";
import Invite from "@/components/admin/settings/invite";

function SettingsPage() {
  const [settings, setSettings] = useState("general");

  const settingsTab = [
    {
      id: 0,
      title: "General",
      tag: "general",
      disabled: false,
    },
    {
      id: 0,
      title: "Subscription",
      tag: "subscription",
      disabled: false,
    },
    {
      id: 0,
      title: "Personal Domain",
      tag: "personal-domain",
      disabled: true,
    },
    {
      id: 0,
      title: "Insights",
      tag: "insights",
      disabled: true,
    },
    {
      id: 0,
      title: "Billing",
      tag: "billing",
      disabled: true,
    },
    {
      id: 0,
      title: "Invite friend!",
      tag: "invite",
      disabled: false,
    },
  ];

  const { getItem, setItem } = useSessionStorage("settings");

  const storedActiveSettingsTab = getItem("settings") || "general";

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
              disabled={profile.disabled}
              key={profile.title}
              className="bg-background data-[state=active]:bg-[#f3f3f1] h-10 py-2"
              onClick={() => handleSelectSettingsTag(profile.tag)}
              value={profile.tag}
            >
              {profile.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="general">
          <General />
        </TabsContent>
        <TabsContent value="subscription">
          <Subscription />
        </TabsContent>
        <TabsContent value="certifications">
          <Certifications />
        </TabsContent>
        <TabsContent value="skills">
          <Skills />
        </TabsContent>
        <TabsContent value="invite">
          <Invite />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SettingsPage;
