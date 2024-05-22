"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageViewer } from "@/components/ui/image-viewer";
import { Button } from "@/components/ui/button";

function MinimalisticExperienceItem({ experience }) {
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
              experience?.present && "text-orange-600"
            }`}
          >
            <p className="mr-1">
              {experience.year ? experience.year : experience.from}
            </p>
            <p>{experience?.present ? " – Present" : ` – ${experience?.to}`}</p>
          </div>
          <div
            className={`minimalistic-template-item-border ${
              experience?.present && "border-orange-600"
            }`}
          />
          <div className="flex items-center gap-1">
            {experience?.images && experience.images.length > 0 && (
              <>
                {experience?.images?.slice(0, 1).map(({ url, id, name }) => (
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
                experience?.present && "text-orange-600"
              }`}
              href={`${experience.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{experience?.company}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full">
        <small
          className={`minimalistic-template-item opacity-80 ${
            experience?.present && "text-orange-700/80"
          }`}
        >
          {experience?.title}
        </small>
        {experience?.description ? (
          <small
            className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0 ${
              experience?.present && "text-orange-700/80"
            }`}
          >
            {experience?.description}
          </small>
        ) : (
          <small
            className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0 ${
              experience?.present && "text-orange-700/80"
            }`}
          >
            {experience?.location}
          </small>
        )}
      </div>
    </div>
  );
}

export default MinimalisticExperienceItem;
