"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGoogleLogin } from "@/firebase/auth/googleLogin";
import { useEmailPasswordLogin } from "@/firebase/auth/emailPasswordLogin";
import { useEmailPasswordRegistration } from "@/firebase/auth/emailPasswordRegistration";
import { useEmailVerification } from "@/firebase/auth/emailVerificationLink";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Globe2, Shell } from "lucide-react";

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
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username must contain only letters, numbers, or underscores.",
    }),
});

function Auth() {
  const { googleLogin, isPendingGoogleLogin } = useGoogleLogin();
  const {
    emailPasswordLogin,
    errorEmailPasswordLogin,
    isPendingEmailPasswordLogin,
  } = useEmailPasswordLogin();
  const {
    emailPasswordRegistration,
    errorEmailPasswordRegistration,
    isPendingEmailPasswordRegistration,
  } = useEmailPasswordRegistration();
  const { isEmailVerificationPending, sendEmailVerificationLink } =
    useEmailVerification();

  const formEmailPassword = useForm();

  async function onSubmitEmailPasswordLogin(data) {
    await emailPasswordLogin(data.email, data.password);
  }
  async function onSubmitEmailPasswordRegistration(data) {
    await emailPasswordRegistration(data.email, data.password, data.username);
  }

  return (
    <div className="w-full">
      <Form {...formEmailPassword}>
        <form className="w-full space-y-6">
          <FormField
            control={formEmailPassword.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="leonelngoya@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formEmailPassword.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formEmailPassword.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center gap-2">
            <Button
              className="w-full"
              type="button"
              disabled={
                isPendingGoogleLogin ||
                isPendingEmailPasswordLogin ||
                isPendingEmailPasswordRegistration ||
                isEmailVerificationPending
              }
              onClick={formEmailPassword.handleSubmit(
                onSubmitEmailPasswordLogin
              )}
            >
              {isPendingEmailPasswordLogin && (
                <Shell className="mr-2 h-4 w-4 animate-spin" />
              )}
              Connexion
            </Button>
            <Button
              className="w-full"
              type="button"
              disabled={
                isPendingGoogleLogin ||
                isPendingEmailPasswordLogin ||
                isPendingEmailPasswordRegistration ||
                isEmailVerificationPending
              }
              onClick={formEmailPassword.handleSubmit(
                onSubmitEmailPasswordRegistration
              )}
            >
              {isPendingEmailPasswordRegistration && (
                <Shell className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </Button>
          </div>
          {(errorEmailPasswordLogin || errorEmailPasswordRegistration) && (
            <span className="text-red-500 text-center text-sm block mt-4 font-semibold">
              {errorEmailPasswordLogin === "auth/invalid-login-credentials" &&
                "Invalid email or password"}
              <br />
              {errorEmailPasswordRegistration === "auth/email-already-in-use" &&
                "This user already exists "}
            </span>
          )}
        </form>
      </Form>
      <span className="flex font-semibold items-center justify-center my-6">
        OR
      </span>
      <Button
        className="w-full"
        type="button"
        variant="secondary"
        onClick={googleLogin}
        disabled={
          isPendingGoogleLogin ||
          isPendingEmailPasswordLogin ||
          isPendingEmailPasswordRegistration ||
          isEmailVerificationPending
        }
      >
        {isPendingGoogleLogin ? (
          <Shell className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Globe2 className="mr-2 h-4 w-4" />
        )}
        Sign in with Google
      </Button>
    </div>
  );
}

export default Auth;
