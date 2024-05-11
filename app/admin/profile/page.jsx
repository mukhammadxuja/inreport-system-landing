"use client";
import React, { useCallback, useEffect, useState } from "react";
import EmailVerificationAlert from "../../../components/email-verification-alert";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "@/components/admin/profile/general";
import Projects from "@/components/admin/profile/projects";
import Volunteering from "@/components/admin/profile/volunteering";
import Certifications from "@/components/admin/profile/certifications";
import Awards from "@/components/admin/profile/awards";
import Skills from "@/components/admin/profile/skills";
import Contacts from "@/components/admin/profile/contact";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import SideProjects from "@/components/admin/profile/side-projects/side-projects";
import Experience from "@/components/admin/profile/experience/experience";
import Education from "@/components/admin/profile/education/education";

function Profile() {
  const [profile, setProfile] = useState("general");

  const profileTabs = [
    {
      id: 0,
      title: "General",
      tag: "general",
    },
    {
      id: 0,
      title: "Projects",
      tag: "projects",
    },
    {
      id: 0,
      title: "Side Projects",
      tag: "side-projects",
    },
    {
      id: 0,
      title: "Experience",
      tag: "experience",
    },
    {
      id: 0,
      title: "Volunteering",
      tag: "volunteering",
    },
    {
      id: 0,
      title: "Education",
      tag: "education",
    },
    {
      id: 0,
      title: "Certifications",
      tag: "certifications",
    },
    {
      id: 0,
      title: "Awards",
      tag: "awards",
    },
    {
      id: 0,
      title: "Skills",
      tag: "skills",
    },
    {
      id: 0,
      title: "Contact",
      tag: "contact",
    },
  ];

  const { getItem, setItem } = useSessionStorage("profile");

  const storedActiveProfileTab = getItem("profile") || "general";
  console.log(storedActiveProfileTab);

  const handleSelectProfileTag = useCallback(
    (tag) => {
      setProfile(tag);
      setItem(profile);
    },
    [profile, setItem]
  );

  return (
    <div className="px-4 md:px-6 py-4 md:mx-auto min-h-screen">
      <Tabs
        defaultValue={storedActiveProfileTab}
        onValueChange={(e) => handleSelectProfileTag(e, profile)}
        className="w-full mt-0"
      >
        <div className="sticky top-4 z-40 overflow-x-auto">
          <TabsList className="mx-auto flex items-center w-fit">
            {profileTabs.map((profile) => (
              <TabsTrigger
                key={profile.title}
                onClick={() => handleSelectProfileTag(profile.tag)}
                value={profile.tag}
              >
                {profile.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="general">
          <General />
        </TabsContent>
        <TabsContent value="projects">
          <Projects />
        </TabsContent>
        <TabsContent value="side-projects">
          <SideProjects />
        </TabsContent>
        <TabsContent value="experience">
          <Experience />
        </TabsContent>
        <TabsContent value="volunteering">
          <Volunteering />
        </TabsContent>
        <TabsContent value="education">
          <Education />
        </TabsContent>
        <TabsContent value="certifications">
          <Certifications />
        </TabsContent>
        <TabsContent value="awards">
          <Awards />
        </TabsContent>
        <TabsContent value="skills">
          <Skills />
        </TabsContent>
        <TabsContent value="contact">
          <Contacts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;
