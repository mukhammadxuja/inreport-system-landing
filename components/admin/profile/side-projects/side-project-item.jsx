"use client";
import React, { useState } from "react";
import { toggleHide } from "@/services/firestore-service";
import Image from "next/image";

// Icons
import { ChevronRight } from "lucide-react";
import { EllipsesIcon } from "@/components/icons";

// UI
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Dialogs
import DeleteItem from "@/components/admin/dialogs/delete-item";
import MoveProject from "@/components/admin/dialogs/move-project";
import { ImageViewer } from "@/components/ui/image-viewer";

function SideProjectItem({ project, setEditableId, setIsEdit }) {
  const [showViewer, setShowViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  function handleEdit(id) {
    setEditableId(id);
    setIsEdit(true);
  }

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setShowViewer(true);
  };

  const closeImageViewer = () => {
    setShowViewer(false);
  };
  return (
    <div
      key={project.id}
      className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 py-2 px-4 rounded-md border"
    >
      <p className="hidden md:block">
        {project?.ongoing ? "Ongoing" : project.year}
      </p>
      <div className="space-y-3 col-span-2">
        <div className={`${project.hide && "blur-[1.5px]"}`}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-medium hover:underline cursor-pointer"
          >
            {project.title} at {project.company}
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-gray-500">{project.description}</p>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto">
          {project.images && project.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {project.images.map(({ url, id, name }, index) => (
                <div
                  key={id}
                  className="w-[7.55rem] h-24 bg-indigo-200 rounded-md"
                >
                  <Image
                    width={250}
                    height={150}
                    src={url ? url : "/assets/not-found.jpg"}
                    quality={80}
                    loading="lazy"
                    alt={name}
                    onClick={() => openImageViewer(index)}
                    className={`${project.hide && "blur-[1.5px]"} ${
                      loaded && "unblur"
                    } w-full h-full object-cover rounded cursor-pointer`}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <small
              onClick={() =>
                toggleHide("side-projects", project.id, project.hide)
              }
              className="hover:underline cursor-pointer"
            >
              {project.hide ? "Show" : "Hide"}
            </small>
            <small
              onClick={() => handleEdit(project.id)}
              className="hover:underline cursor-pointer"
            >
              Edit
            </small>
            <DeleteItem
              id={project.id}
              title={project.title}
              source="side-projects"
            >
              <small className="hover:underline cursor-pointer">Delete</small>
            </DeleteItem>
          </div>
          <Popover>
            <PopoverTrigger>
              <EllipsesIcon />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit p-2">
              <MoveProject
                id={project.id}
                name={project.title}
                from="side-projects"
                to="projects"
              >
                <Button variant="ghost" size="sm">
                  Move to Projects
                </Button>
              </MoveProject>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default SideProjectItem;
