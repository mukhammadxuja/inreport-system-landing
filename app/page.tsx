"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAuthContext } from "@/context/auth-context";
import { useGoogleLogin } from "@/firebase/auth/googleLogin";
import { useGithubLogin } from "@/firebase/auth/githubLogin";
import { useEmailPasswordLogin } from "@/firebase/auth/emailPasswordLogin";
import { useEmailPasswordRegistration } from "@/firebase/auth/emailPasswordRegistration";
import { useEmailVerification } from "@/firebase/auth/emailVerificationLink";

import { Button } from "@/components/ui/button";
import { Shell } from "lucide-react";
import Auth from "@/components/auth";
import { useMainContext } from "@/context/main-context";
import Link from "next/link";

const FormSchemaEmailPassword = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Please enter a valid email.",
    }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export default function Home() {
  const { user } = useAuthContext();
  const { users } = useMainContext();
  console.log(users);

  const { googleLogin, isPendingGoogleLogin } = useGoogleLogin();
  const { emailPasswordLogin, isPendingEmailPasswordLogin } =
    useEmailPasswordLogin();
  const { emailPasswordRegistration, isPendingEmailPasswordRegistration } =
    useEmailPasswordRegistration();
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
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full md:w-2/3 lg:w-1/2">
        {user ? (
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-center text-xl font-bold">Connected !</h1>
            {users.map((user) => (
              <Link
                key={user.uid}
                href={{
                  pathname: "/username",
                  query: { _username: user?.username },
                }}
              >
                {user.username}
              </Link>
            ))}
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </main>
  );
}
