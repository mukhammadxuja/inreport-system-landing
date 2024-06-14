"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageViewer } from "@/components/ui/image-viewer";
import { Button } from "@/components/ui/button";

function MinimalisticEducationItem({ education }) {
  const [showViewer, setShowViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openImageViewer = (index) => {
    console.log(index);
    setSelectedImageIndex(index);
    setShowViewer(true);
  };

  const closeImageViewer = () => {
    setShowViewer(false);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <div
            className={`minimalistic-template-item flex items-center ${
              education?.present && "text-lime-600"
            }`}
          >
            <p className="mr-1">
              {education.year ? education.year : education.from}
            </p>
            <p>{education?.present ? " – Present" : ` – ${education?.to}`}</p>
          </div>
          <div
            className={`minimalistic-template-item-border ${
              education?.present && "border-lime-600"
            }`}
          />
          <div className="flex items-center gap-1">
            {education?.images && education.images.length > 0 && (
              <>
                {education?.images?.slice(0, 1).map(({ url, id, name }) => (
                  <Image
                    key={id}
                    width={10}
                    height={10}
                    className="w-5 h-5 object-cover rounded-full"
                    src={url}
                    alt={name}
                  />
                ))}
              </>
            )}
            <a
              className={`minimalistic-template-item hover:underline ${
                education?.present && "text-lime-600"
              }`}
              href={`${education.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{education?.school}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full">
        <small
          className={`minimalistic-template-item opacity-80 ${
            education?.present && "text-lime-700/80"
          }`}
        >
          {education?.degree}
        </small>
        {education?.description ? (
          <small
            className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0 ${
              education?.present && "text-lime-700/80"
            }`}
          >
            {education?.description}
          </small>
        ) : (
          <small
            className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0 ${
              education?.present && "text-lime-700/80"
            }`}
          >
            {education?.location}
          </small>
        )}
      </div>
    </div>
  );
}

export default MinimalisticEducationItem;
