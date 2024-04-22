"use client";

import { useMainContext } from "@/context/main-context";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import Auth from "@/components/auth";

export default function Home() {
  const { user } = useAuthContext();
  const { users } = useMainContext();
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full md:w-2/3 lg:w-1/2">
        {user ? (
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-center text-xl font-bold">Connected !</h1>
            {users.map((user) => (
              <Link key={user.uid} href={user.username}>
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
