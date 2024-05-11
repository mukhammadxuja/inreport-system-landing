/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import EmailVerificationAlert from "@/components/email-verification-alert";
import { useApiContext } from "@/context/api-context";
import { ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsesIcon } from "@/components/icons";
import MoveToSideProjects from "@/components/admin/dialogs/move-project";
import { Button } from "@/components/ui/button";

// TODO: refactor and make sure all function works before transfer to another file
// Hide, Edit, Delete, Active tab with localStorage
// Edit: https://codesandbox.io/p/sandbox/react-hooks-crud-firebase-z7nh3?file=%2Fsrc%2Ftables%2FUserTableRow.js%3A27%2C16-27%2C23

function AdminPage() {
  const { projects, userData } = useApiContext();

  return (
    <div className="px-4 min-h-screen max-w-3xl mx-auto my-20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 !mt-6 md:!mt-10 w-full p-5 md:px-8 md:py-6 rounded-lg bg-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24 rounded-full">
            <AvatarImage
              className="object-cover"
              src={userData?.photoURL || "/assets/avatars/unknown.jpg"}
              alt="@shadcn"
            />
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">
              {userData?.displayName ? userData?.displayName : "Unknown"}
            </h3>
            <Link
              className="text-sm underline text-gray-500"
              target="_blank"
              href={`/${userData?.username}`}
            >{`http://localhost:3000/${userData?.username}`}</Link>
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <EllipsesIcon />
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
