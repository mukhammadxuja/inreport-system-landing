"use client"
import React, { useCallback, useState } from "react";
import EmailVerificationAlert from "../../../components/email-verification-alert";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "@/components/admin/profile/general";
import Projects from "@/components/admin/profile/projects";
import Experience from "@/components/admin/profile/experience";
import Volunteering from "@/components/admin/profile/volunteering";
import Education from "@/components/admin/profile/education";
import Certifications from "@/components/admin/profile/certifications";
import Awards from "@/components/admin/profile/awards";
import Skills from "@/components/admin/profile/skills";
import Contacts from "@/components/admin/profile/contact";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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

  const { getItem, setItem } = useLocalStorage("profile");

  const storedActiveProfileTab = getItem("profile");

  const handleSelectProfileTag = useCallback(
    (tag) => {
      setProfile(tag);
      setItem(profile);
    },
    [profile, setItem]
  );

  return (
    <div className="px-4 md:px-6 py-5 mx-auto min-h-screen">
      <EmailVerificationAlert />
      {/* <Banner /> */}
      <Tabs
        defaultValue={storedActiveProfileTab}
        onValueChange={(e) => handleSelectProfileTag(e, profile)}
        className="w-full mt-0"
      >
        <TabsList className="sticky top-4 z-40 h-12 mx-auto flex items-center space-x-1 w-fit p-1 shadow-md rounded-2xl duration-300 bg-white border border-border group">
          {profileTabs.map((profile) => (
            <TabsTrigger
              key={profile.title}
              className="bg-background data-[state=active]:bg-[#f3f3f1] h-10 py-2"
              onClick={() => handleSelectProfileTag(profile.tag)}
              value={profile.tag}
            >
              {profile.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="general"
        >
          <General />
        </TabsContent>
        <TabsContent
          className="mt-[2.5rem] max-w-7xl mx-auto px-8 py-6 rounded-lg bg-white"
          value="projects"
        >
          <Projects />
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

export default Profile;
