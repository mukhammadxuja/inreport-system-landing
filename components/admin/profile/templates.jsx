"use client";
import React, { useEffect, useCallback, useState } from "react";
import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMainContext } from "@/context/main-context";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import Image from "next/image";

import MinimalisticDesktop from "@/public/assets/templates/minimalistic/desktop.png";
import DefaultDesktop from "@/public/assets/templates/default/desktop.png";
import BentoDesktop from "@/public/assets/templates/bento/desktop.png";

import { useApiContext } from "@/context/api-context";
import { Check } from "lucide-react";

const Templates = () => {
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
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Templates
          </h3>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div
          onClick={() => openImageInNewTab(defaultFullUrl)}
          className={`relative rounded-lg border-2 border-border h-fit p-2 hover:border-gray-300 cursor-zoom-in duration-300`}
        >
          <Image
            className="w-full object-cover rounded-lg"
            src={DefaultDesktop}
            alt="image"
          />
          {userData?.template === "Default" && (
            <div className="absolute bottom-1 right-1 p-2 rounded-full bg-green-400 text-white w-fit">
              <Check className="w-4 h-4 lg:w-7 lg:h-7" />
            </div>
          )}
        </div>
        <div
          onClick={() => openImageInNewTab(bentoGridFullUrl)}
          className={`relative rounded-lg border-2 border-border h-fit p-2 hover:border-gray-300 cursor-zoom-in duration-300`}
        >
          <Image
            className="w-full object-cover rounded-lg"
            src={BentoDesktop}
            alt="image"
          />
          {userData?.template === "BentoGrid" && (
            <div className="absolute bottom-1 right-1 p-2 rounded-full bg-green-400 text-white w-fit">
              <Check className="w-4 h-4 lg:w-7 lg:h-7" />
            </div>
          )}
        </div>
        <div
          onClick={() => openImageInNewTab(minimalisticFullUrl)}
          className={`relative rounded-lg border-2 border-border h-fit p-2 hover:border-gray-300 cursor-zoom-in duration-300`}
        >
          <Image
            className="w-full object-cover rounded-lg"
            src={MinimalisticDesktop}
            alt="image"
          />
          {userData?.template === "Minimalistic" && (
            <div className="absolute bottom-1 right-1 p-2 rounded-full bg-green-400 text-white w-fit">
              <Check className="w-4 h-4 lg:w-7 lg:h-7" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
