import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function HomeNavbar() {
  return (
    <nav className="fixed top-5 left-0 right-0 container mx-auto flex items-center justify-between py-4 bg-indigo-200 z-50">
      <Link
        href="/"
        className="flex items-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base duration-300"
      >
        <Image
          width={40}
          height={40}
          src="/logo.svg"
          alt="Logo"
          className="h-5 w-5 transition-all group-hover:scale-110 opacity-90"
        />
        <span className="text-primary">Showcase</span>
      </Link>
      <div className="flex items-center gap-2">
        <Link href="/signin">
          <Button variant="secondary">Sign in</Button>
        </Link>
        <Link href="/signup">
          <Button>Sign up</Button>
        </Link>
      </div>
    </nav>
  );
}

export default HomeNavbar;
