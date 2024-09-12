"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EllipsesIcon } from "../icons";
import { useMainContext } from "@/context/main-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

function HomeNavbar({ setOpenMobileNav }) {
  const { isVisible, setIsVisible, lastScrollTop, setLastScrollTop } =
    useMainContext();

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Get the first segment or the only one if there's just one
  const firstPathSegment =
    pathSegments.length > 0 ? `/${pathSegments[0]}` : "/";

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const localActive = useLocale();

  const onSelectChange = (value) => {
    const nextLocale = value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 lg:px-4 py-4 bg-white bg-opacity-50 border-b border-border backdrop-blur-sm z-50 transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="hidden lg:block items-center gap-2 duration-300 hover:opacity-70"
        >
          <Image
            width={140}
            height={140}
            src="/inreport logo dark.svg"
            alt="Logo"
            className="transition-all group-hover:scale-110 opacity-90"
          />
        </Link>
        <Link
          href="/"
          className="flex lg:hidden items-center gap-2 duration-300 hover:opacity-70"
        >
          <Image
            width={140}
            height={140}
            src="/logo.svg"
            alt="Logo"
            className="w-7 h-7 lg:h-5 lg:w-5 transition-all group-hover:scale-110 opacity-90"
          />
        </Link>
        <div className="flex items-center sm:gap-2 md:gap-6">
          <ul className="hidden lg:flex items-center gap-4">
            <li className="nav-link">
              <Link href={`${firstPathSegment}/prices`}>Narxlar</Link>
            </li>
            <li className="nav-link">
              <Link href="/#services">Xizmatlar</Link>
            </li>
            <li className="nav-link">
              <Link href={`${firstPathSegment}/aboutus`}>Haqimizda</Link>
            </li>
            <li className="nav-link">
              <Link href={`${firstPathSegment}/contact`}>Aloqa</Link>
            </li>
          </ul>
          <div className="flex gap-2 items-center">
            <Select
              defaultValue={localActive}
              onValueChange={onSelectChange}
              disabled={isPending}
            >
              <SelectTrigger className="w-[70px] ring-transparent">
                <SelectValue placeholder="Lang" />
              </SelectTrigger>
              <SelectContent className="w-[70px]">
                <SelectItem value="uz">UZ</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.inreport.uz/"
            >
              <Button className="whitespace-nowrap">Hisobga kirish</Button>
            </Link>
          </div>

          <div
            onClick={() => setOpenMobileNav(true)}
            className="block md:-ml-5 pl-4 md:px-4"
          >
            <EllipsesIcon />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;
