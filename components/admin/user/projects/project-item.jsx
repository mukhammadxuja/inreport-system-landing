"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ImageViewer } from "@/components/ui/image-viewer";

import { Button } from "@/components/ui/button";
import DeleteItem from "../../dialogs/delete-item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsesIcon } from "@/components/icons";
import MoveProject from "../../dialogs/move-project";

function ProjectItem({ item, profile = true, setEditableId, setIsEdit }) {
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
      <di className="hidden md:flex items-center space-x-1">
        <p>{item.year ? item.year : item.from}</p>
        <p>{item?.present ? " — Present" : item?.to}</p>
      </di>
      <div className="space-y-3 w-full md:w-[25rem]">
        <div className="-space-y-1">
          <div className="flex items-center justify-between w-full">
            <Button variant="linkHover1">
              <Link
                className="flex items-center space-x-1.5 group"
                href={`${item.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {item.title} at {item.company}
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
            <p className="block md:hidden ml-auto">
              {item.year ? item.year : item.from}
            </p>
          </div>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto">
          {item.images && item.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {item?.images?.map(({ url, id, name }, index) => (
                <div key={id} className="w-32 h-24 rounded-md">
                  <Image
                    width={250}
                    height={150}
                    src={url ? url : "/assets/not-found.jpg"}
                    quality={80}
                    loading="lazy"
                    alt={name}
                    onClick={() => openImageViewer(index)}
                    className={`w-full h-auto object-cover rounded cursor-pointer`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {profile && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <small
                onClick={() => toggleHide("projects", item.id, item.hide)}
                className="hover:underline cursor-pointer"
              >
                {item.hide ? "Show" : "Hide"}
              </small>
              <small
                onClick={() => handleEdit(item.id)}
                className="hover:underline cursor-pointer"
              >
                Edit
              </small>
              <DeleteItem id={item.id} title={item.title} source="projects">
                <small className="hover:underline cursor-pointer">Delete</small>
              </DeleteItem>
            </div>
            <Popover>
              <PopoverTrigger>
                <EllipsesIcon />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-fit p-2">
                <MoveProject
                  id={item.id}
                  name={item.title}
                  from="projects"
                  to="side-projects"
                >
                  <Button variant="ghost" size="sm">
                    Move to Side Projects
                  </Button>
                </MoveProject>
              </PopoverContent>
            </Popover>
          </div>
        )}
        {showViewer && (
          <ImageViewer
            images={item?.images}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            onClose={closeImageViewer}
          />
        )}
      </div>
    </div>
  );
}

export default ProjectItem;
