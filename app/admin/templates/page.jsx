/* eslint-disable @next/next/no-img-element */
"use client";
import { AlignJustify } from "lucide-react";
import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMainContext } from "@/context/main-context";

function TemplatesPage() {
  const { openSidebar } = useMainContext();
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
  return (
    <div className="p-4 min-h-screen">
      <Tabs defaultValue="all">
        <TabsList
          className={`sticky top-4 z-40 h-12 flex items-center space-x-1 w-fit p-1 shadow-md rounded-2xl duration-300 bg-white border border-border group ${
            openSidebar ? "" : "mx-auto"
          }`}
        >
          {templatesTab.map((template) => (
            <TabsTrigger
              key={template.id}
              className="bg-background data-[state=active]:bg-[#f3f3f1] h-10 py-2"
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
            className={`relative rounded-2xl cursor-pointer shadow-md bg-white hover:bg-blue-50 duration-300 border-4 border-transparent w-full h-[27rem] p-6 group ${
              selectedTemplate === 1 && "border-blue-400"
            }`}
          >
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-5 left-5 h-28 z-10"
              src="https://images.refero.design/screenshots/wise.com/desktop/01ac4629-4a0a-419a-b7c3-0b360e577ad9_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-44 z-20"
              src="https://images.refero.design/screenshots/overflow.io/desktop/39b7a3de-225f-4f7f-9b35-e302484d03c1_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 bottom-5 right-5 h-28 z-30"
              src="https://images.refero.design/screenshots/apple.com/desktop/6296a6b9-a85e-4cc2-a7e4-4158dc4ac32d_thumb.jpg"
              alt="image"
            />
          </div>
          <div
            onClick={() => setSelectedTemplate(2)}
            className={`relative rounded-2xl cursor-pointer shadow-md bg-white hover:bg-blue-50 duration-300 border-4 border-transparent w-full h-[27rem] p-6 group ${
              selectedTemplate === 2 && "border-blue-400"
            }`}
          >
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-5 left-5 h-28 z-10"
              src="https://images.refero.design/screenshots/wise.com/desktop/01ac4629-4a0a-419a-b7c3-0b360e577ad9_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-44 z-20"
              src="https://images.refero.design/screenshots/overflow.io/desktop/39b7a3de-225f-4f7f-9b35-e302484d03c1_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 bottom-5 right-5 h-28 z-30"
              src="https://images.refero.design/screenshots/apple.com/desktop/6296a6b9-a85e-4cc2-a7e4-4158dc4ac32d_thumb.jpg"
              alt="image"
            />
          </div>
          <div
            onClick={() => setSelectedTemplate(3)}
            className={`relative rounded-2xl cursor-pointer shadow-md bg-white hover:bg-blue-50 duration-300 border-4 border-transparent w-full h-[27rem] p-6 group ${
              selectedTemplate === 3 && "border-blue-400"
            }`}
          >
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-5 left-5 h-28 z-10"
              src="https://images.refero.design/screenshots/wise.com/desktop/01ac4629-4a0a-419a-b7c3-0b360e577ad9_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-44 z-20"
              src="https://images.refero.design/screenshots/overflow.io/desktop/39b7a3de-225f-4f7f-9b35-e302484d03c1_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 bottom-5 right-5 h-28 z-30"
              src="https://images.refero.design/screenshots/apple.com/desktop/6296a6b9-a85e-4cc2-a7e4-4158dc4ac32d_thumb.jpg"
              alt="image"
            />
          </div>
          <div
            onClick={() => setSelectedTemplate(4)}
            className={`relative rounded-2xl cursor-pointer shadow-md bg-white hover:bg-blue-50 duration-300 border-4 border-transparent w-full h-[27rem] p-6 group ${
              selectedTemplate === 4 && "border-blue-400"
            }`}
          >
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-5 left-5 h-28 z-10"
              src="https://images.refero.design/screenshots/wise.com/desktop/01ac4629-4a0a-419a-b7c3-0b360e577ad9_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-44 z-20"
              src="https://images.refero.design/screenshots/overflow.io/desktop/39b7a3de-225f-4f7f-9b35-e302484d03c1_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 bottom-5 right-5 h-28 z-30"
              src="https://images.refero.design/screenshots/apple.com/desktop/6296a6b9-a85e-4cc2-a7e4-4158dc4ac32d_thumb.jpg"
              alt="image"
            />
          </div>
          <div
            onClick={() => setSelectedTemplate(5)}
            className={`relative rounded-2xl cursor-pointer shadow-md bg-white hover:bg-blue-50 duration-300 border-4 border-transparent w-full h-[27rem] p-6 group ${
              selectedTemplate === 5 && "border-blue-400"
            }`}
          >
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-5 left-5 h-28 z-10"
              src="https://images.refero.design/screenshots/wise.com/desktop/01ac4629-4a0a-419a-b7c3-0b360e577ad9_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-44 z-20"
              src="https://images.refero.design/screenshots/overflow.io/desktop/39b7a3de-225f-4f7f-9b35-e302484d03c1_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 bottom-5 right-5 h-28 z-30"
              src="https://images.refero.design/screenshots/apple.com/desktop/6296a6b9-a85e-4cc2-a7e4-4158dc4ac32d_thumb.jpg"
              alt="image"
            />
          </div>
          <div
            onClick={() => setSelectedTemplate(6)}
            className={`relative rounded-2xl cursor-pointer shadow-md bg-white hover:bg-blue-50 duration-600 border-4 border-transparent w-full h-[27rem] p-6 group ${
              selectedTemplate === 6 && "border-blue-400"
            }`}
          >
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-5 left-5 h-28 z-10"
              src="https://images.refero.design/screenshots/wise.com/desktop/01ac4629-4a0a-419a-b7c3-0b360e577ad9_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-44 z-20"
              src="https://images.refero.design/screenshots/overflow.io/desktop/39b7a3de-225f-4f7f-9b35-e302484d03c1_thumb.jpg"
              alt="image"
            />
            <img
              className="absolute rounded group-hover:scale-105 duration-300 bottom-5 right-5 h-28 z-30"
              src="https://images.refero.design/screenshots/apple.com/desktop/6296a6b9-a85e-4cc2-a7e4-4158dc4ac32d_thumb.jpg"
              alt="image"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TemplatesPage;
