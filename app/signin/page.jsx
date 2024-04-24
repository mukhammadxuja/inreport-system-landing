"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@/firebase/auth/googleLogin";
import { useEmailPasswordLogin } from "@/firebase/auth/emailPasswordLogin";
import { useEmailPasswordRegistration } from "@/firebase/auth/emailPasswordRegistration";
import { useEmailVerification } from "@/firebase/auth/emailVerificationLink";

import { Button } from "@/components/ui/button";
import { Globe2, Shell } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import Loading from "@/components/admin/loading";
import Image from "next/image";

function Auth() {
  const { googleLogin, isPendingGoogleLogin } = useGoogleLogin();
  const { isPendingEmailPasswordLogin } = useEmailPasswordLogin();
  const { isPendingEmailPasswordRegistration } = useEmailPasswordRegistration();
  const { isEmailVerificationPending, sendEmailVerificationLink } =
    useEmailVerification();

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
        <Button
          className="w-fit"
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
            <Image
              width={20}
              height={20}
              src="/google.svg"
              alt="Google logo svg"
              className="mr-1.5 h-6 w-6"
            />
          )}
          Sign in with Google
        </Button>
      </div>
    </>
  );
}

export default Auth;
