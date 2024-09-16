"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Head from "next/head";

import ContactForm from "@/components/contact/form";
import HomeFooter from "@/components/home/footer";
import HomeNavbar from "@/components/home/navbar";

import Lenis from "lenis";
import { useMainContext } from "@/context/main-context";
import MobileNav from "@/components/home/mobile-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cards from "../../../components/contact/cards";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

function Agreement() {
  const { openMobileNav, setOpenMobileNav } = useMainContext();
  const t = useTranslations();

  useEffect(() => {
    const lenis = new Lenis({
      // lerp: 0.15,
      wheelMultiplier: 0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      <HomeNavbar setOpenMobileNav={setOpenMobileNav} />
      <div
        onClick={() => setOpenMobileNav(false)}
        className={`${
          openMobileNav ? "opacity-100 z-[100]" : "opacity-0 -z-10"
        } h-screen w-full fixed top-0 left-0 bg-black bg-opacity-50 border-b-2 backdrop-blur-sm duration-200`}
      />

      <div className="mt-20 mb-10">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("Foydalanish Shartlari")}</h1>
        
        <p className="mb-6 text-lg text-gray-700">
        {t("term-1")}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("Xizmatlardan Foydalanish")}</h2>
        <p className="mb-6 text-lg text-gray-700">
        {t("term-2")}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("Intellektual Mulk")}</h2>
        <p className="mb-6 text-lg text-gray-700">
        {t("term-3")}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("Masuliyatni Cheklash")}</h2>
        <p className="mb-6 text-lg text-gray-700">
        {t("term-4")}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("O'zgartirishlar")}</h2>
        <p className="mb-6 text-lg text-gray-700">
        {t("term-5")}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t("Biz bilan bog'laning")}</h2>
        <p className="mb-4 text-lg text-gray-700">
        {t("contact-us-text-more")}:
        </p>
        <ul className="list-none mb-6">
          <li><strong>{t("Manzil")}:</strong> Jizzax shahar, O'zbekiston</li>
          <li><strong>{t("Telefon")}:</strong> <a href="tel:+998919449491" className="text-gray-900 hover:underline">+998 91 944 94 91</a></li>
          <li><strong>Email:</strong> <a href="mailto:dotsoftuz@gmail.com" className="text-gray-900 hover:underline">dotsoftuz@gmail.com</a></li>
        </ul>
      </div>
      </div>

      <MobileNav
        openMobileNav={openMobileNav}
        setOpenMobileNav={setOpenMobileNav}
      />
      <HomeFooter />
    </div>
  );
}

export default Agreement;
