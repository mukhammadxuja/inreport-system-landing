/* eslint-disable @next/next/no-img-element */
"use client";
import { db } from "@/firebase/config";
import { Send } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Loading from "./admin/loading";
import NotFound from "./admin/404";
import SendMessageDialog from "./admin/dialogs/message";
import templates from "./templates";
import useUserData from "@/hooks/useUserData";
import useUserSubcollections from "@/hooks/useUserSubcollections";
import useUserSettings from "@/hooks/useUserSettings";

export default function UserProfileClient({ username }) {
  const { userData, loading } = useUserData(db, username);

  const projects = useUserSubcollections(db, userData?.uid, "projects");
  const sideProjects = useUserSubcollections(
    db,
    userData?.uid,
    "side-projects"
  );
  const experiences = useUserSubcollections(db, userData?.uid, "experiences");
  const educations = useUserSubcollections(db, userData?.uid, "educations");
  const certifications = useUserSubcollections(
    db,
    userData?.uid,
    "certifications"
  );
  const awards = useUserSubcollections(db, userData?.uid, "awards");
  const volunteerings = useUserSubcollections(
    db,
    userData?.uid,
    "volunteerings"
  );
  const contacts = useUserSubcollections(db, userData?.uid, "contacts");
  const settings = useUserSettings(db, userData?.uid);

  const TemplateComponent = userData?.template
    ? templates[userData?.template]
    : null;

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <NotFound />;
  }

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
      <TemplateComponent data={data} text="It is working" />

      {/* {settings?.canMessage && (
        <SendMessageDialog userId={userData?.uid} username={username}>
          <Button className="fixed bottom-4 left-4 flex items-center shadow-lg gap-2 py-2 px-3 rounded-full">
            <Send className="w-4 h-4" />
            <span className="hidden md:block text-sm mr-2">Message</span>
          </Button>
        </SendMessageDialog>
      )} */}

      {settings?.hideMark && (
        <Link
          className="fixed bottom-4 right-4 flex items-center shadow-lg rounded-sm py-2 px-3 gap-1.5"
          href="http://localhost:3000/"
        >
          <img
            className="w-3 h-3 rotate-90"
            src="/logo.svg"
            alt="Showcase logo"
          />
          <span className="text-xs font-bold">Made in Showcase</span>
        </Link>
      )}
    </div>
  );
}
