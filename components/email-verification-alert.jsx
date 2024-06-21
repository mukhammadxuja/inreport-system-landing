"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Shell } from "lucide-react";
import { useEmailVerification } from "../firebase/auth/emailVerificationLink";
import { useApiContext } from "@/context/api-context";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

function EmailVerificationAlert() {
  const { user, userData } = useApiContext();
  const [copy, setCopy] = useState(false);

  const {
    isEmailVerificationSent,
    isEmailVerificationPending,
    errorVerificationLink,
    sendEmailVerificationLink,
  } = useEmailVerification();

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerificationLink();
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `https://showcaseai.vercel.app/${userData?.username}`
    );
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  return (
    <>
      {!user?.emailVerified && !userData?.username ? (
        <Alert
          variant="destructive"
          className="flex items-center bg-red-100 justify-between my-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4" />
            <div>
              <AlertTitle className="flex items-center gap-x-1.5">
                <Image
                  width={20}
                  height={20}
                  src={"/assets/emojis/4.png"}
                  alt="Fire emoji"
                  className="w-5 h-5"
                />
                <span>Your Profile is not active.</span>
              </AlertTitle>
              {!user?.emailVerified && (
                <AlertDescription>
                  - Please verify your email address to access your profile.
                </AlertDescription>
              )}
              {!userData?.username && (
                <AlertDescription>
                  - Please add username
                  <Link href="/admin/profile" className="mx-1 underline">
                    here
                  </Link>
                  and get your page.
                </AlertDescription>
              )}
            </div>
          </div>
          {!user?.emailVerified && (
            <Button onClick={handleSendVerificationEmail} variant="link">
              {isEmailVerificationPending && (
                <Shell className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send verification email
            </Button>
          )}
        </Alert>
      ) : (
        <Alert
          variant="ready"
          className="bg-indigo-100 flex flex-col lg:flex-row lg:justify-between my-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4" />
            <div>
              <AlertTitle className="flex items-center gap-x-1.5">
                <Image
                  width={20}
                  height={20}
                  src={"/assets/emojis/fire.png"}
                  alt="Fire emoji"
                  className="w-5 h-5"
                />
                <span>Your Profile is now active.</span>
              </AlertTitle>
              <AlertDescription>
                Share your Showcase to your socials:
                <Link
                  className="text-sm underline ml-1"
                  target="_blank"
                  href={`/${userData?.username}`}
                >{`showcase.ai/${userData?.username}`}</Link>
              </AlertDescription>
            </div>
          </div>
          <Button
            onClick={copyToClipboard}
            variant="ghost"
            className="hidden lg:block w-fit bg-white hover:bg-gray-50 hover:text-indigo-600/80 duration-300"
          >
            {isEmailVerificationPending && (
              <Shell className="mr-2 h-4 w-4 animate-spin" />
            )}
            {copy ? "Copied" : "Copy Url"}
          </Button>
        </Alert>
      )}

      {isEmailVerificationSent && (
        <p className="text-green-900 text-md font-semibold">
          The email was successfully sent, check your email box to confirm
        </p>
      )}
      {errorVerificationLink && (
        <p className="text-red-900 text-md font-semibold">
          {errorVerificationLink}
        </p>
      )}
    </>
  );
}

export default EmailVerificationAlert;
