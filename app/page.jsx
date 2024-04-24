"use client";

import { useAuthContext } from "@/context/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/home/header";
import HomeNavbar from "@/components/home/navbar";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();


  return (
    <main>
      <HomeNavbar />
      <div className="w-full flex flex-col items-center justify-center h-screen">
        <Header />
      </div>
    </main>
  );
}
