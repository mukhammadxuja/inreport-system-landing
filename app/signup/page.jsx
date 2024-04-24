"use client";
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
import { Shell } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/admin/loading";

function Auth() {
  const { isPendingGoogleLogin } = useGoogleLogin();
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

  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user]);

  return (
    <>
      {loading && <Loading />}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center h-screen">
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
            <div className="w-full">
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
              <span className="text-red-500 text-center text-sm block font-semibold">
                {errorEmailPasswordLogin === "auth/invalid-login-credentials" &&
                  "Invalid email or password"}
                <br />
                {errorEmailPasswordRegistration ===
                  "auth/email-already-in-use" && "This user already exists "}
              </span>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}

export default Auth;
