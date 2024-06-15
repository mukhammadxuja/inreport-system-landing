/* eslint-disable @next/next/no-img-element */
"use client";
import { AlignJustify } from "lucide-react";
import React, { useCallback, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMainContext } from "@/context/main-context";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import Image from "next/image";

import MinimalisticDesktop from "@/public/assets/templates/minimalistic/desktop.png";
import DefaultDesktop from "@/public/assets/templates/default/desktop.png";
import BentoDesktop from "@/public/assets/templates/bento/desktop.png";

import { useApiContext } from "@/context/api-context";

function TemplatesPage() {
  const { openSidebar } = useMainContext();
  const { userData } = useApiContext();
  const [templates, setTemplates] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const templatesTab = [
    {
      id: 0,
      title: "All",
      tag: "all",
    },
    {
      id: 1,
      title: "Software Engineer",
      tag: "software-engineer",
    },
    {
      id: 3,
      title: "Graphic designer",
      tag: "graphic-designer",
    },
    {
      id: 4,
      title: "Web designer",
      tag: "web-designer",
    },
    {
      id: 5,
      title: "Photographer",
      tag: "photographer",
    },
    {
      id: 6,
      title: "Videographer",
      tag: "videographer",
    },
    {
      id: 7,
      title: "Video editor",
      tag: "video-editor",
    },
    {
      id: 7,
      title: "Architects",
      tag: "architects",
    },
    {
      id: 7,
      title: "Writers",
      tag: "writers",
    },
    {
      id: 7,
      title: "Other",
      tag: "other",
    },
  ];

  const { getItem, setItem } = useSessionStorage("templates");

  const storedActiveTemplatesTab = getItem("templates") || "all";

  const handleSelectTemplatesTag = useCallback(
    (tag) => {
      setTemplates(tag);
      setItem(templates);
    },
    [templates, setItem]
  );

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  const minimalisticFullUrl =
    "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/templates%2Ffull.png?alt=media&token=98aade3b-04b3-4676-90ec-f0c414a3b2c7";
  const defaultFullUrl =
    "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/templates%2Fdefault.png?alt=media&token=067a389c-b983-4644-b0ad-455be64821b1";
  const bentoGridFullUrl =
    "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/templates%2Fbento-full.png?alt=media&token=38ee9e7c-0b71-485f-8d25-dd41370b885b";

  return (
    <div className="p-4 min-h-screen">
      <Tabs
        defaultValue={storedActiveTemplatesTab}
        onValueChange={(e) => handleSelectTemplatesTag(e, templates)}
      >
        <TabsList
          className={`sticky top-4 z-40 h-12 flex items-center space-x-1 w-fit p-1 shadow-md rounded-2xl duration-300 bg-white border border-border group ${
            openSidebar ? "" : "mx-auto"
          }`}
        >
          {templatesTab.map((template) => (
            <TabsTrigger
              key={template.id}
              className="bg-background data-[state=active]:bg-[#f3f3f1] h-10 py-2"
              onClick={() => handleSelectTemplatesTag(template.tag)}
              value={template.tag}
            >
              {template.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[2.5rem] max-w-7xl mx-auto"
          value="all"
        >
          <div
            onClick={() => openImageInNewTab(defaultFullUrl)}
            className={`rounded-lg border-2 border-border h-fit p-2 hover:border-indigo-300 cursor-zoom-in duration-300 ${
              userData?.template === "Default"
                ? "border-indigo-300"
                : "border-border"
            }`}
          >
            <Image
              className="w-full object-cover rounded-lg"
              src={DefaultDesktop}
              alt="image"
            />
          </div>
          <div
            onClick={() => openImageInNewTab(bentoGridFullUrl)}
            className={`rounded-lg border-2 border-border h-fit p-2 hover:border-indigo-300 cursor-zoom-in duration-300 ${
              userData?.template === "BentoGrid"
                ? "border-indigo-300"
                : "border-border"
            }`}
          >
            <Image
              className="w-full object-cover rounded-lg"
              src={BentoDesktop}
              alt="image"
            />
          </div>
          <div
            onClick={() => openImageInNewTab(minimalisticFullUrl)}
            className={`rounded-lg border-2 border-border h-fit p-2 hover:border-indigo-300 cursor-zoom-in duration-300 ${
              userData?.template === "Minimalistic"
                ? "border-indigo-300"
                : "border-border"
            }`}
          >
            <Image
              className="w-full object-cover rounded-lg"
              src={MinimalisticDesktop}
              alt="image"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TemplatesPage;
