/* eslint-disable @next/next/no-img-element */
"use client";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { ChevronRight, Send } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsesIcon } from "@/components/icons";
import Link from "next/link";
import { Button } from "./ui/button";
import Loading from "./admin/loading";
import NotFound from "./admin/404";
import Image from "next/image";
import SendMessageDialog from "./admin/dialogs/message";
import { emojiPlus } from "@/utils/variables";
import { getFirstNumberFromUserID } from "@/lib/utils";
import { useApiContext } from "@/context/api-context";
import DefaultHome from "./templates/default/home";
// import NotFound from "@/app/not-found/page";

export default function UserProfileClient({ username }) {
  const { settings } = useApiContext();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  console.log(userData);

  useEffect(() => {
    if (!userData) return; // Wait until userData is fetched

    const projectsCollection = collection(db, `users/${userData.uid}/projects`);

    const q = query(projectsCollection);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let projectsArr = [];

      querySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });

      setProjects(projectsArr);
    });

    return () => unsubscribe();
  }, [userData]);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <NotFound />;
  }

  return (
    <div className="px-4 min-h-screen max-w-3xl mx-auto my-20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 !mt-6 md:!mt-10 w-full p-5 md:px-8 md:py-6 rounded-lg bg-white">
      <DefaultHome />

      {settings?.canMessage && (
        <SendMessageDialog userId={userData?.uid} username={username}>
          <Button className="fixed bottom-4 left-4 flex items-center shadow-lg gap-2 py-2 px-3 rounded-full">
            <Send className="w-4 h-4" />
            <span className="hidden md:block text-sm mr-2">Message</span>
          </Button>
        </SendMessageDialog>
      )}

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
