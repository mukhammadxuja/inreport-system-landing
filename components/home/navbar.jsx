"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useApiContext } from "@/context/api-context";
import { EllipsesIcon } from "../icons";

function HomeNavbar({ openMobileNav, setOpenMobileNav }) {
  const { user } = useApiContext();

  const [showNavbar, setShowNavbar] = useState(true);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  };
  // scroll animation
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
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
          <span className="hidden lg:block text-primary text-base font-bold">
            Inreport
          </span>
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden lg:flex items-center gap-4">
            <li className="nav-link">
              <a href="#templates">Prices</a>
            </li>
            <li className="nav-link">Services</li>
            <li className="nav-link">
              <a href="#about">About</a>
            </li>
            <li className="nav-link">
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://app.inreport.uz/"
          >
            <Button>Sign up</Button>
          </Link>
          <Button
            onClick={() => setOpenMobileNav(true)}
            className="block -ml-3"
            variant="outline"
          >
            <EllipsesIcon />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
