"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageViewer } from "@/components/ui/image-viewer";
import { Button } from "@/components/ui/button";

function MinimalisticSideProjectItem({ project }) {
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
          <div className={`minimalistic-template-item flex items-center`}>
            <p className="mr-1">{project.year ? project.year : project.from}</p>
            <p>{project?.ongoing && " – Ongoing"}</p>
          </div>
          <div className="minimalistic-template-item-border" />
          <a
            className={`minimalistic-template-item hover:underline`}
            href={`${project.link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{project?.company}</span>
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full">
        <small className={`minimalistic-template-item opacity-80`}>
          {project?.title}
        </small>
        <div className="w-full max-w-[25rem] mt-1 md:mt-0">
          <div className="w-full text-right">
            <small
              className={`minimalistic-template-item leading-tight whitespace-pre-line opacity-80`}
            >
              {project?.description}
            </small>
          </div>
          <div className={`space-y-3 w-full mt-2`}>
            <div className="flex flex-row-reverse items-center gap-3 overflow-x-auto">
              {project.images && project.images.length > 0 && (
                <div className="flex items-center gap-2">
                  {project?.images?.map(({ url, id, name }, index) => (
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
                images={project?.images}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
                onClose={closeImageViewer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinimalisticSideProjectItem;
