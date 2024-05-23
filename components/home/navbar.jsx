"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useApiContext } from "@/context/api-context";

function HomeNavbar() {
  const { user } = useApiContext();

  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = 0;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-5 left-0 right-0 container mx-auto px-4 flex items-center justify-between py-2 bg-gray-200 bg-opacity-50 border-2 border-border backdrop-blur-md rounded-lg shadow-lg z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-[calc(100%_+_1.25rem)]"
      }`}
    >
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
      {user ? (
        <Link href="/admin">
          <Button className="">Dashboard</Button>
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/signin">
            <Button variant="secondary" className="bg-white hover:bg-gray-50">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default HomeNavbar;
