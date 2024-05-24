/* eslint-disable @next/next/no-img-element */
"use client";
import { AlignJustify } from "lucide-react";
import React, { useCallback, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMainContext } from "@/context/main-context";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import Image from "next/image";

function TemplatesPage() {
  const { openSidebar } = useMainContext();
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
            onClick={() => setSelectedTemplate(1)}
            className={`relative rounded-2xl cursor-pointer shadow-md bg-accent duration-300 border-4 border-transparent w-full h-[27rem] p-2 group ${
              selectedTemplate === 1 && "border-blue-500"
            }`}
          >
            <Image
              width={300}
              height={400}
              className="w-full h-full object-cover"
              src="/assets/templates/default.png"
              alt="image"
            />
            <h3 className="text-center text-muted-foreground mt-3">Default</h3>
          </div>
          <div
            onClick={() => setSelectedTemplate(1)}
            className={`relative rounded-2xl cursor-pointer shadow-md bg-accent duration-300 border-4 border-transparent w-full h-[27rem] p-2 group ${
              selectedTemplate === 1 && "border-blue-500"
            }`}
          >
            <Image
              width={300}
              height={400}
              className="w-full h-full object-cover"
              src="/assets/templates/bento-grid.png"
              alt="image"
            />
            <h3 className="text-center text-muted-foreground mt-3">Bento grid</h3>
          </div>
          <div
            onClick={() => setSelectedTemplate(1)}
            className={`relative rounded-2xl cursor-pointer shadow-md bg-accent duration-300 border-4 border-transparent w-full h-[27rem] p-2 group ${
              selectedTemplate === 1 && "border-blue-500"
            }`}
          >
            <Image
              width={300}
              height={400}
              className="w-full h-full object-cover"
              src="/assets/templates/minimalistic.png"
              alt="image"
            />
            <h3 className="text-center text-muted-foreground mt-3">Minimalistic</h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TemplatesPage;
