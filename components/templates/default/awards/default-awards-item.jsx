"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageViewer } from "@/components/ui/image-viewer";
import { Button } from "@/components/ui/button";

function DefaultAwardItem({ award }) {
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
    <div className="relative md:flex md:items-start md:justify-between py-4 pr-4">
      <div className="default-template-item-date-lg">
        <p>{award?.year}</p>
      </div>
      <div className="space-y-3 w-full md:w-[25rem]">
        <div className="-space-y-1">
          <div className="flex items-center justify-between w-full">
            <Button variant="linkHover1">
              <Link
                className="flex items-center space-x-1.5 group"
                href={`${award.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {award?.title} at {award?.presentedBy}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 -rotate-45 group-hover:rotate-0 duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </Button>
            <div className="default-template-item-date-sm">
              <p>{award.year}</p>
            </div>
          </div>
          <p className="default-template-item-desc">{award?.description}</p>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto">
          {award?.images && award.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {award?.images?.map(({ url, id, name }, index) => (
                <div key={id} className="w-32 h-24 rounded-md">
                  <Image
                    width={250}
                    height={150}
                    src={url ? url : "/assets/not-found.jpg"}
                    quality={90}
                    loading="lazy"
                    alt={name}
                    onClick={() => openImageViewer(index)}
                    className={`default-template-item-img`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {showViewer && (
          <ImageViewer
            images={award?.images}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            onClose={closeImageViewer}
          />
        )}
      </div>
    </div>
  );
}

export default DefaultAwardItem;
