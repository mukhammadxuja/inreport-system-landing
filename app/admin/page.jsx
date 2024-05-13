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
import UserItem from "@/components/admin/user/user-item";
import { useMainContext } from "@/context/main-context";

function AdminPage() {
  const { projects, experiences, userData } = useApiContext();
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
                      priority={false}
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

          <UserItem
            data={projects}
            section="Projects"
            visibility={projectsVisibility}
            setVisibility={setProjectsVisibility}
          />
          <UserItem
            data={experiences}
            section="Experiences"
            visibility={projectsVisibility}
            setVisibility={setProjectsVisibility}
          />
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
