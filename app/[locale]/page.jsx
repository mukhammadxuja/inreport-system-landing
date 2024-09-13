"use client";
import HomeFooter from "@/components/home/footer";
import Header from "@/components/home/header";
import Contact from "@/components/home/contact";
import HomeNavbar from "@/components/home/navbar";
import Blog from "@/components/home/blog/blogs";
import { useEffect, useRef, useState } from "react";

import Lenis from "lenis";
import { useScroll } from "framer-motion";
import CardTemplate from "@/components/home/card-template";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpIcon, Phone, Send, X } from "lucide-react";
import HomeServices from "@/components/home/services";

import MobileNav from "@/components/home/mobile-nav";
import Comments from "@/components/home/comments";
import Price from "@/components/home/prices";
import { useMainContext } from "@/context/main-context";
import Clients from "@/components/home/clients";
import FAQ from "@/components/home/faq";
import { Input } from "@/components/ui/input";
import About from "@/components/home/about";
import Call from "@/components/home/call";
import Types from "@/components/home/types";
import { useTranslations } from "next-intl";



export default function Home() {
  const { openMobileNav, setOpenMobileNav } = useMainContext();
  const [openPhone, setOpenPhone] = useState(false);
  const container = useRef(null);

  // About pageda useTranslations("AboutPage") qilib ishlatasiz
  const t = useTranslations();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis({
      // lerp: 1,
      wheelMultiplier: 0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);


  const projects = [
    {
      title: t("Savdo jarayonlarini avtomatlashtirish"),
      description:
        t("Savdo jarayonlarini avtomatlashtirish more"),
      src: "/assets/sell.jpg",
      rotate: [3, -2],
      color: "#BBACAF",
    },
    {
      title: t("Mijozlar bazasini boshqarish"),
      description:
        t("Mijozlar bazasini boshqarish more"),
      src: "/assets/customer.webp",
      rotate: [-4, 2],
      color: "#977F6D",
    },
    {
      title: t("Inventarizatsiyani kuzatib boring"),
      description:
        t("Inventarizatsiyani kuzatib boring more"),
      src: "/assets/control.jpg",
      rotate: [10, -2],
      color: "#C2491D",
    },
    {
      title: t("Moliyaviy hisobotlarni tahlil qilish"),
      description:
        t("Moliyaviy hisobotlarni tahlil qilish more"),
      src: "/assets/sales auto.jpg",
      rotate: [-7, 3],
      color: "#B62429",
    },
    {
      title: t("Jamoani boshqarish va o'zaro hamkorlik"),
      description:
        t("Jamoani boshqarish va o'zaro hamkorlik more"),
      src: "/assets/control.webp",
      rotate: [6, -2],
      color: "#88A28D",
    },
    {
      title: t("Mobil ilovalar orqali ishlash"),
      description:
        t("Mobil ilovalar orqali ishlash more"),
      src: "/assets/statistic.png",
      rotate: [10, 0],
      color: "#88A28D",
    },
  ];

  return (
    <main className="scroll-smooth">
      <HomeNavbar setOpenMobileNav={setOpenMobileNav} />
      <div
        onClick={() => setOpenMobileNav(false)}
        className={`${
          openMobileNav ? "opacity-100 z-[100]" : "opacity-0 -z-10"
        } h-screen w-full fixed top-0 left-0 bg-black bg-opacity-50 border-b-2 backdrop-blur-sm duration-200`}
      />
      <MobileNav
        openMobileNav={openMobileNav}
        setOpenMobileNav={setOpenMobileNav}
      />
      <Header t={t} />
      <About data={projects} t={t} />

      <HomeServices t={t} />
      {/* <Types /> */}
      <Comments t={t} />
      <Clients />
      <Price />
      {/* <Cards /> */}
      {/* <Blog /> */}
      <Contact />
      <HomeFooter />
    </main>
  );
}
