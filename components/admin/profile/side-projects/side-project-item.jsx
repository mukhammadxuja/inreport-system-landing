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
import DeleteProject from "@/components/admin/dialogs/delete-project";
import MoveProject from "@/components/admin/dialogs/move-project";

function SideProjectItem({ project, setEditableId, setIsEdit }) {
  const [loaded, setLoaded] = useState(false);

  function handleEdit(id) {
    setEditableId(id);
    setIsEdit(true);
  }
  return (
    <div
      key={project.id}
      className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 py-2 px-4 rounded-md border"
    >
      <p className="hidden md:block">{project.year}</p>
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
        <div className="flex items-center gap-3 overflow-x-scroll">
          {project.images && project.images.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Map through images and render each */}
              {project.images.map(({ url, id, name }) => (
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
                    className={`${project.hide && "blur-[1.5px]"} ${
                      loaded && "unblur"
                    } w-full h-full object-cover rounded cursor-pointer`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
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
            <DeleteProject
              id={project.id}
              title={project.title}
              source="side-projects"
            >
              <small className="hover:underline cursor-pointer">Delete</small>
            </DeleteProject>
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
