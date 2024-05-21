"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageViewer } from "@/components/ui/image-viewer";
import { Button } from "@/components/ui/button";

function DefaultCertificationItem({ certification }) {
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
        <p>
          {certification?.issued}
          {certification?.notExpire
            ? " — Not Expire"
            : ` — ${certification?.expires}`}
        </p>
      </div>
      <div className={`space-y-3 w-full md:w-[25rem]`}>
        <div className="-space-y-1">
          <div className="flex items-center justify-between w-full">
            <Button className="!py-0" variant="linkHover1">
              <Link
                className="flex items-center space-x-1.5 group"
                href={`${certification?.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {certification?.name} at {certification?.organization}
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
            <p className="default-template-item-date-sm">
              {certification?.expires && certification?.expires}
            </p>
          </div>
          <p className="default-template-item-desc">
            {certification?.description}
          </p>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto">
          {certification?.images && certification.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {certification?.images?.map(({ url, id, name }, index) => (
                <div key={id} className="w-32 rounded-md">
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
            images={certification?.images}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            onClose={closeImageViewer}
          />
        )}
      </div>
    </div>
  );
}

export default DefaultCertificationItem;
