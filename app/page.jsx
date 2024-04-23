"use client";

import { useMainContext } from "@/context/main-context";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import Auth from "@/components/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/home/header";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/admin"); // Assuming the auth page route is "/auth"
    }
  }, [user]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full md:w-2/3 lg:w-1/2">
        {user ? (
          <div className="w-full flex flex-col items-center gap-4">
            <Header />
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </main>
  );
}
