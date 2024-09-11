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

function ContactPage() {
  const { openMobileNav, setOpenMobileNav } = useMainContext();

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
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Foydalanish Shartlari</h1>
        
        <p className="mb-6 text-lg text-gray-700">
        INREPORT xizmatidan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz. Iltimos, quyidagi shartlarni diqqat bilan o'qing.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Xizmatlardan Foydalanish</h2>
        <p className="mb-6 text-lg text-gray-700">
        INREPORT platformasi faqat qonuniy maqsadlarda foydalaniladi. Platformadan foydalanish davomida, siz hech qanday noqonuniy yoki zararli harakatlar qilmasligingiz kerak.
        </p>
      
      

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellektual Mulk</h2>
        <p className="mb-6 text-lg text-gray-700">
        Platformadagi barcha kontent, jumladan, logotiplar, matnlar, grafikalar, bizning mulkimizdir va qonun bilan himoyalangan. Ushbu kontentlardan ruxsatsiz foydalanish taqiqlanadi.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mas’uliyatni Cheklash</h2>
        <p className="mb-6 text-lg text-gray-700">
        Biz platformaning uzluksiz ishlashi uchun barcha zarur choralarni ko'ramiz, ammo texnik muammolar, uzilishlar yoki yo'qotishlar uchun mas'uliyatni o'z zimmamizga olmaymiz.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">O'zgartirishlar</h2>
        <p className="mb-6 text-lg text-gray-700">
        Biz ushbu shartlarni istalgan vaqtda yangilash huquqiga egamiz. Yangilangan shartlar ushbu sahifada e'lon qilingan vaqtdan boshlab kuchga kiradi.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Biz bilan bog'laning</h2>
        <p className="mb-4 text-lg text-gray-700">
        Agar sizda savollar bo'lsa, biz bilan bog'laning:
        </p>
        <ul className="list-none mb-6">
          <li><strong>Manzil:</strong> Jizzax shahar, O'zbekiston</li>
          <li><strong>Telefon:</strong> <a href="tel:+998919449491" className="text-gray-900 hover:underline">+998 91 944 94 91</a></li>
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

export default ContactPage;
