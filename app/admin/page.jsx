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
import AppsDialog from "@/components/admin/dialogs/apps";
import FeedbackDialog from "@/components/admin/dialogs/feedback";
import DefaultHome from "@/components/templates/default/home";

function AdminPage() {
  const {
    userData,
    projects,
    sideProjects,
    experiences,
    educations,
    certifications,
    awards,
    volunteerings,
    contacts,
    settings,
  } = useApiContext();

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);

  const data = {
    userData,
    projects,
    sideProjects,
    experiences,
    educations,
    certifications,
    awards,
    volunteerings,
    contacts,
    settings,
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto min-h-screen">
        <EmailVerificationAlert />
        <DefaultHome data={data} admin={true} />
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
