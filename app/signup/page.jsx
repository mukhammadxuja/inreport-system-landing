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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  async function onSubmitEmailPasswordRegistration(data) {
    await emailPasswordRegistration(
      data.email,
      data.username,
      data.password,
      data.profession
    );
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
                    <Input
                      required
                      placeholder="leonelngoya@gmail.com"
                      {...field}
                    />
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
                    <Input required placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formEmailPassword.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select your Profession</FormLabel>
                  <FormControl>
                    <Select
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Profession" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-developer">
                          Software developer
                        </SelectItem>
                        <SelectItem value="graphic-designer">
                          Graphic designer
                        </SelectItem>
                        <SelectItem value="web-designer">
                          Web designer
                        </SelectItem>
                        <SelectItem value="photographer">
                          Photographer
                        </SelectItem>
                        <SelectItem value="videographer">
                          Videographer
                        </SelectItem>
                        <SelectItem value="video-editor">
                          Video editor
                        </SelectItem>
                        <SelectItem value="architects">Architects</SelectItem>
                        <SelectItem value="writer">Writers</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                      required
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
                <br />
                {errorEmailPasswordRegistration === "auth/missing-email" &&
                  "Email required"}
              </span>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}

export default Auth;
