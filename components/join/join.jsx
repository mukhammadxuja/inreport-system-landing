/* eslint-disable @next/next/no-img-element */
"use client";
import { auth, db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@/firebase/auth/googleLogin";
import { useEmailPasswordLogin } from "@/firebase/auth/emailPasswordLogin";
import { useEmailPasswordRegistration } from "@/firebase/auth/emailPasswordRegistration";
import { useEmailVerification } from "@/firebase/auth/emailVerificationLink";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/admin/loading";
import NotFound from "@/components/admin/404";
import Image from "next/image";
import { emojiPlus } from "@/utils/variables";
import { getFirstNumberFromUserID } from "@/lib/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { LoadingIcon } from "../icons";
import { useApiContext } from "@/context/api-context";

function Join({ username }) {
  const { user } = useApiContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const { googleLogin, isPendingGoogleLogin } = useGoogleLogin();
  const { isPendingEmailPasswordLogin } = useEmailPasswordLogin();
  const { isPendingEmailPasswordRegistration } = useEmailPasswordRegistration();
  const { isEmailVerificationPending } = useEmailVerification();

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

  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [router, user]);

  console.log(userData);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <NotFound />;
  }

  const handleClick = async () => {
    await googleLogin();
    try {
      const inviterQuery = await getDocs(
        query(collection(db, "users"), where("username", "==", username))
      );

      if (inviterQuery.exists()) {
        const gotUserData = inviterQuery.data();
        gotUserData["invite"] = "working";
        await updateDoc(docRef, gotUserData);

        await addDoc(
          collection(db, `users/${auth.currentUser.uid}/adminNotifications`),
          {
            message: `New user signed up through ${username}'s invite link.`,
            timestamp: new Date(),
          }
        );
      }

      router.push("/admin");
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

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
                src={userData?.photoURL || `/assets/avatars/unknown.jpg`}
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
            <Button
              className="w-full"
              type="button"
              variant="secondary"
              onClick={handleClick}
              disabled={
                isPendingGoogleLogin ||
                isPendingEmailPasswordLogin ||
                isPendingEmailPasswordRegistration ||
                isEmailVerificationPending
              }
            >
              {isPendingGoogleLogin ? (
                <LoadingIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Image
                  width={20}
                  height={20}
                  src="/google.svg"
                  alt="Google logo svg"
                  className="mr-1.5 h-6 w-6"
                />
              )}
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
        {/* <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <button type="submit">Sign Up</button>
        </form> */}
      </div>
    </div>
  );
}

export default Join;
