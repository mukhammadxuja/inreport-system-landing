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
      className={`fixed top-0 left-0 right-0 lg:px-4 py-4 bg-white bg-opacity-50 border-b-2 border-border backdrop-blur-sm z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 duration-300 hover:opacity-70"
        >
          <Image
            width={40}
            height={40}
            src="/logo.svg"
            alt="Logo"
            className="w-7 h-7 lg:h-5 lg:w-5 transition-all group-hover:scale-110 opacity-90"
          />
          <span className="hidden lg:block text-primary text-base font-semibold">Showcase</span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden lg:flex items-center gap-4">
            <li className="nav-link">
              <a href="#templates">Templates</a>
            </li>
            <li className="nav-link">Services</li>
            <li className="nav-link">
              <a href="#about">About</a>
            </li>
            <li className="nav-link">
              <a href="#contact">Contact</a>
            </li>
          </ul>
          {user ? (
            <Link href="/admin">
              <Button className="">Dashboard</Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <Button
                  variant="secondary"
                  className="bg-white hover:bg-gray-50"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
