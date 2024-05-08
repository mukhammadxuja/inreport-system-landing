/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import EmailVerificationAlert from "@/components/email-verification-alert";
import { useApiContext } from "@/context/api-context";
import { ChevronRight } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipses } from "@/components/icons";
import MoveToSideProjects from "@/components/admin/dialogs/move-to-side-projects";
import { Button } from "@/components/ui/button";

// TODO: refactor and make sure all function works before transfer to another file
// Hide, Edit, Delete, Active tab with localStorage
// Edit: https://codesandbox.io/p/sandbox/react-hooks-crud-firebase-z7nh3?file=%2Fsrc%2Ftables%2FUserTableRow.js%3A27%2C16-27%2C23

function AdminPage() {
  const { projects, user } = useApiContext();

  return (
    <div className="px-4 min-h-screen max-w-2xl mx-auto my-20">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24 rounded-full">
            <AvatarImage
              className="object-cover"
              src={user?.photoURL || "/assets/avatars/1.png"}
              alt="@shadcn"
            />
          </Avatar>
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
        </div>
        <Popover>
          <PopoverTrigger>
            <Ellipses />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit p-2">
            <Button variant="ghost" size="sm">
              Edit Profile
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      {!!projects.length && <h4 className="text-sm">Projects</h4>}
      <div className="my-4">
        {projects.map((project) => (
          <div
            key={project.uid}
            className="flex items-start justify-between py-2 pl-2 pr-4 border-b"
          >
            <p>{project.year}</p>
            <div className="space-y-3 w-[25rem]">
              <div>
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
                      <div key={id} className="w-32 rounded-md">
                        <img
                          src={url}
                          alt={name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-2xl">
        <EmailVerificationAlert />
      </div>
    </div>
  );
}

export default AdminPage;
