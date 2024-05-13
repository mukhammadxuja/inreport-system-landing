"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailVerificationAlert from "@/components/email-verification-alert";
import { useApiContext } from "@/context/api-context";
import { ChevronRight, Pencil } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsesIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { emojiPlus } from "@/utils/variables";
import StatusDialog from "@/components/admin/dialogs/status";

function AdminPage() {
  const { projects, userData } = useApiContext();
  const [projectsVisible, setProjectsVisible] = useState(true);

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);

  return (
    <div>
      <div className="max-w-3xl mx-auto min-h-screen">
        <EmailVerificationAlert />
        <div className="px-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full p-5 md:px-8 md:py-6 rounded-lg bg-white">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-fit">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage
                    className="object-cover"
                    src={userData?.photoURL || "/assets/avatars/unknown.jpg"}
                    alt="@shadcn"
                  />
                </Avatar>
              </div>
              <div className="">
                <h3 className="text-xl font-semibold">
                  {userData?.displayName ? userData?.displayName : "Unknown"}
                </h3>
                <p>
                  {userData?.profession
                    ? userData?.profession
                    : "Unknown Profession"}
                </p>
                <StatusDialog
                  openStatus={openStatus}
                  setOpenStatus={setOpenStatus}
                  selectedEmoji={selectedEmoji}
                  setSelectedEmoji={setSelectedEmoji}
                >
                  <div className="w-fit flex items-center gap-1 py-1 px-2 rounded-full bg-gray-100 shadow-sm cursor-pointer group">
                    <Image
                      width={20}
                      height={20}
                      src={
                        selectedEmoji
                          ? selectedEmoji
                          : userData?.status?.emoji || emojiPlus
                      }
                      alt="Fire emoji"
                      className="w-4 h-4"
                    />
                    <small className="text-xs pr-1 max-w-32 group-hover:w-full duration-300 truncate">
                      {userData?.status?.title}
                    </small>
                  </div>
                </StatusDialog>
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

          {!!projects.length && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm">Projects</h4>
              <Switch
                checked={projectsVisible}
                onCheckedChange={setProjectsVisible}
              />
            </div>
          )}
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
                            <Image
                              width={250}
                              height={150}
                              src={url ? url : "/assets/not-found.jpg"}
                              quality={80}
                              loading="lazy"
                              alt={name}
                              className={`w-full h-full object-cover rounded cursor-pointer`}
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
        </div>
      </div>
      <Link className="fixed bottom-4 right-4" href="/admin/profile">
        <Button
          variant="secondary"
          className="flex items-center bg-white shadow-lg gap-2"
        >
          <Pencil className="w-4 h-4" />
          <span className="text-sm">Edit Profile</span>
        </Button>
      </Link>
    </div>
  );
}

export default AdminPage;
