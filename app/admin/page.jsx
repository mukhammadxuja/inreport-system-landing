"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailVerificationAlert from "@/components/email-verification-alert";
import { useApiContext } from "@/context/api-context";
import { LayoutGrid, Pencil, ThumbsUp } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsesIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

import { emojiPlus } from "@/utils/variables";
import StatusDialog from "@/components/admin/dialogs/status";
import ProjectList from "@/components/admin/user/projects/project-list";
import { useMainContext } from "@/context/main-context";
import AppsDialog from "@/components/admin/dialogs/apps";
import FeedbackDialog from "@/components/admin/dialogs/feedback";
import { getFirstNumberFromUserID } from "@/lib/utils";

function AdminPage() {
  const { projects, sideProjects, experiences, userData } = useApiContext();
  const { projectsVisibility, setProjectsVisibility } = useMainContext();

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);

  return (
    <div>
      <div className="max-w-3xl mx-auto min-h-screen">
        <EmailVerificationAlert />
        <div className="px-4 w-full p-5 md:px-8 md:py-6 rounded-lg bg-white">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative inline-block">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage
                    className="object-cover"
                    src={
                      userData?.photoURL ||
                      `/assets/avatars/${getFirstNumberFromUserID(
                        userData?.uid
                      )}.svg`
                    }
                    alt="@shadcn"
                  />
                </Avatar>
                <StatusDialog
                  openStatus={openStatus}
                  setOpenStatus={setOpenStatus}
                  selectedEmoji={selectedEmoji}
                  setSelectedEmoji={setSelectedEmoji}
                >
                  <div
                    className={`absolute bottom-0 right-0 gap-1 p-1 rounded-full cursor-pointer bg-gray-100 border border-gray-300 shadow-sm group ${
                      userData?.status?.title && "hover:rounded-r-lg"
                    }`}
                  >
                    <div className="relative flex items-center">
                      <Image
                        width={20}
                        height={20}
                        src={
                          selectedEmoji
                            ? selectedEmoji
                            : userData?.status?.emoji || emojiPlus
                        }
                        priority={false}
                        alt="Fire emoji"
                        className="w-5 h-5"
                      />
                      {userData?.status?.title && (
                        <small className="absolute -bottom-[0.28rem] left-6 whitespace-nowrap max-w-72 truncate bg-gray-100 border border-gray-300 border-l-gray-100 shadow-sm text-gray-800 text-xs rounded-r-lg py-1.5 pr-2 hidden group-hover:block">
                          {userData?.status?.title}
                        </small>
                      )}
                    </div>
                  </div>
                </StatusDialog>
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

          <ProjectList
            data={projects}
            section="Projects"
            visibility={projectsVisibility}
            setVisibility={setProjectsVisibility}
          />
          <ProjectList
            data={sideProjects}
            section="Side Projects"
            visibility={projectsVisibility}
            setVisibility={setProjectsVisibility}
          />
        </div>
      </div>
      <div className="fixed top-4 right-2 md:right-4 flex items-center gap-1 md:gap-2">
        <FeedbackDialog>
          <Button
            variant="secondary"
            className="py-2 px-3 rounded-full md:rounded-md flex items-center bg-white shadow-lg gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="hidden md:block text-sm">Feedback</span>
          </Button>
        </FeedbackDialog>
        <AppsDialog>
          <Button
            variant="secondary"
            className="py-2 px-3 rounded-full md:rounded-md flex items-center bg-white shadow-lg gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden md:block text-sm">Apps</span>
          </Button>
        </AppsDialog>
      </div>
      <Link
        className="fixed bottom-4 right-2 md:right-4 gap-1 md:gap-2"
        href="/admin/profile"
      >
        <Button
          variant="secondary"
          className="py-2 px-3 rounded-full md:rounded-md flex items-center bg-white shadow-lg gap-2"
        >
          <Pencil className="w-4 h-4" />
          <span className="hidden md:block text-sm">Edit Profile</span>
        </Button>
      </Link>
    </div>
  );
}

export default AdminPage;
