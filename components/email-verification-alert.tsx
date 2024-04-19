"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Shell } from "lucide-react";
import { useEmailVerification } from "../firebase/auth/emailVerificationLink";
import { useAuthContext } from "@/context/auth-context";

function EmailVerificationAlert() {
  const { user } = useAuthContext();

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

  return (
    <>
      {user?.emailVerified ? (
        <Alert className="flex ite justify-between">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4" />
            <div>
              <AlertTitle>Your Profile is now active. </AlertTitle>
              <AlertDescription>
                Share your Showcase to your socials.
                <a
                  href={`https://showcase.ai/${user.displayName?.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 underline"
                >
                  showcase.ai/{user.displayName?.toLowerCase()}
                </a>
              </AlertDescription>
            </div>
          </div>
          <Button
            onClick={() => {}}
            variant="secondary"
            className="bg-slate-100"
          >
            {isEmailVerificationPending && (
              <Shell className="mr-2 h-4 w-4 animate-spin" />
            )}
            Copy Url
          </Button>
        </Alert>
      ) : (
        <Alert variant="destructive" className="flex ite justify-between">
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