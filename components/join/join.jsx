/* eslint-disable @next/next/no-img-element */
"use client";
import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsesIcon, LoadingIcon } from "@/components/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/admin/loading";
import NotFound from "@/components/admin/404";
import Image from "next/image";
import SendMessageDialog from "@/components/admin/dialogs/message";
import { emojiPlus } from "@/utils/variables";
import { getFirstNumberFromUserID } from "@/lib/utils";
import { Github } from "lucide-react";

function Join({ username }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <NotFound />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-5 border-2 border-gray-200 max-w-md mx-auto w-full rounded-lg">
        <Link
          href={`http://localhost:3000/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 mx-auto"
        >
          <div className="relative inline-block">
            <Avatar className="h-16 w-16 md:w-20 md:h-20 rounded-full">
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
            <div
              className={`absolute bottom-0 right-0 gap-1 p-1 rounded-full  bg-gray-100 border border-gray-300 shadow-sm group ${
                userData?.status?.title && "hover:rounded-r-lg"
              }`}
            >
              <div className="relative flex items-center">
                <Image
                  width={20}
                  height={20}
                  src={userData?.status?.emoji || emojiPlus}
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
          </div>
        </Link>
        <div className="my-2 space-y-3">
          <h6 className="text-lg font-semibold text-gray-700">
            {userData?.displayName ? userData?.displayName : "Unknown"} has
            invited you to <br /> join showcase.ai ✨
          </h6>
          <p className="text-sm">
            <Link
              href={`http://localhost:3000/about`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline mr-1"
            >
              Showcase.ai
            </Link>
            is a professional platform used by people across the world to create
            beautiful profiles and meaningful connections.
          </p>
          <div className="space-y-1">
            <Button className="w-full" type="button" variant="secondary">
              <Image
                width={20}
                height={20}
                src="/google.svg"
                alt="Google logo svg"
                className="mr-1.5 h-6 w-6"
              />
              Continue with Google
            </Button>
            <Button className="w-full" type="button" variant="secondary">
              <Image
                width={20}
                height={20}
                src="/github.svg"
                alt="Google logo svg"
                className="mr-1.5 h-4 w-4"
              />
              Continue with Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
