"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Shell } from "lucide-react";
import { useEmailVerification } from "../firebase/auth/emailVerificationLink";
import { useApiContext } from "@/context/api-context";
import Link from "next/link";
import { useState } from "react";

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
    navigator.clipboard.writeText(`showcase.ai/${userData?.username}`);
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  return (
    <>
      {user?.emailVerified ? (
        <Alert className="bg-blue-100 justify-between my-4 flex">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4" />
            <div>
              <AlertTitle>Your Profile is now active. </AlertTitle>
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
            className="bg-white hover:bg-gray-50 duration-300"
          >
            {isEmailVerificationPending && (
              <Shell className="mr-2 h-4 w-4 animate-spin" />
            )}
            {copy ? "Copied" : "Copy Url"}
          </Button>
        </Alert>
      ) : (
        <Alert variant="destructive" className="flex ite justify-between mb-2">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4" />
            <div>
              <AlertTitle>Your Profile is not active.</AlertTitle>
              <AlertDescription>
                Please verify your email address to access your profile.
              </AlertDescription>
            </div>
          </div>
          <Button onClick={handleSendVerificationEmail} variant="link">
            {isEmailVerificationPending && (
              <Shell className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send verification email
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
