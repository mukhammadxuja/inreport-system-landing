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

function ContactPage() {
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
        <Head>
          <title>{t("Maxfiylik siyosati")} | INREPORT</title>
          <meta
            name="description"
            content="INREPORT platformasining maxfiylik siyosati. Sizning shaxsiy ma'lumotlaringiz qanday to'planadi, saqlanadi va himoyalanadi."
          />
        </Head>
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {t("Maxfiylik siyosati")}
          </h1>

          <p className="mb-6 text-lg text-gray-700">{t("privacy-1")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("Ma'lumotlarni yig'ish va ulardan foydalanish")}
          </h2>
          <p className="mb-6 text-lg text-gray-700">
            {t("Biz quyidagi ma'lumotlarni to'plashimiz mumkin")}:
          </p>
          <ul className="list-disc list-inside mb-6 text-lg text-gray-700">
            <li>{t("p-li-1")}</li>
            <li>{t("p-li-2")}</li>
            <li>{t("p-li-3")}</li>
            <li>{t("p-li-4")}</li>
            <li>{t("p-li-5")}</li>
          </ul>
          <p className="mb-6 text-lg text-gray-700">{t("privacy-2")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("Ma'lumotlaringizni himoya qilish")}
          </h2>
          <p className="mb-6 text-lg text-gray-700">{t("privacy-3")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("Ma'lumotlarni uchinchi tomonlarga oshkor qilish")}
          </h2>
          <p className="mb-6 text-lg text-gray-700">{t("privacy-4")}</p>
          <ul className="list-disc list-inside mb-6 text-lg text-gray-700">
            <li>{t("p-li-6")}</li>
            <li>{t("p-li-7")}</li>
            <li>{t("p-li-8")}</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("Cookies va kuzatish texnologiyalari")}
          </h2>
          <p className="mb-6 text-lg text-gray-700">{t("privacy-5")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("Ma'lumotlarni saqlash")}
          </h2>
          <p className="mb-6 text-lg text-gray-700">{t("privacy-6")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("Foydalanuvchilar huquqlari")}
          </h2>
          <p className="mb-6 text-lg text-gray-700">{t("privacy-7")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("Maxfiylik siyosatiga o'zgarishlar")}
          </h2>
          <p className="mb-6 text-lg text-gray-700">{t("privacy-8")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("Biz bilan bog'laning")}
          </h2>
          <p className="mb-4 text-lg text-gray-700">{t("privacy-9")}</p>
          <ul className="list-none mb-6">
            <li>
              <strong>{t("Manzil")}:</strong> Jizzax shahar, O'zbekiston
            </li>
            <li>
              <strong>{t("Telefon")}:</strong>{" "}
              <a
                href="tel:+998919449491"
                className="text-gray-900 hover:underline"
              >
                +998 91 944 94 91
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:dotsoftuz@gmail.com"
                className="text-gray-900 hover:underline"
              >
                dotsoftuz@gmail.com
              </a>
            </li>
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

export default ContactPage;
