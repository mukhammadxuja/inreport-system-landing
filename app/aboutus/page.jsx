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
import Cards from "../../components/contact/cards";
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
      <Head>
        <title>Biz haqimizda | INREPORT</title>
        <meta name="description" content="INREPORT haqida ma'lumot. Bizning jamoamiz, maqsadlarimiz va xizmatlarimiz haqida batafsil ma'lumot oling." />
      </Head>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Biz haqimizda</h1>
        <p className="mb-6 text-lg text-gray-700">
        DOTSOFT MCHJ — O'zbekistonning Jizzax shahrida joylashgan va 2021-yildan beri IT bozorida faoliyat yurituvchi innovatsion kompaniya. Biz mijozlarimizga veb-saytlar, veb-ilovalar, mobil ilovalar va brending xizmatlarini taqdim etamiz. Maqsadimiz jahon IT bozorida yetakchi bo'lish va xalqaro talablar darajasida xizmat ko'rsatadigan dasturchilar jamoasini shakllantirishdir.
        <br /><br />  DOTSOFT MCHJ sifatida biz INREPORT platformasini yaratishda o'z oldimizga savdo jarayonlarini avtomatlashtirish va mijozlarimizga yuqori sifatli xizmat ko'rsatishni maqsad qilganmiz. Bizning jamoamiz innovatsion yechimlar orqali biznesingizni yangi bosqichga olib chiqishga tayyor.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bizning Maqsadimiz</h2>
        <p className="mb-6 text-lg text-gray-700">
          Biznes boshqaruvini soddalashtirish, savdo jarayonlarini tezlashtirish va xatoliklarni kamaytirish uchun INREPORT platformasini yaratdik. Ushbu platforma biznesingiz uchun barcha vazifalarni hal qilishda ishonchli yordamchi bo'lib xizmat qiladi.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Biz bilan bog'laning</h2>
        <p className="mb-4 text-lg text-gray-700">
          Agar sizda savollar yoki qo'shimcha ma'lumotga ehtiyoj bo'lsa, biz bilan bog'laning:
        </p>
        <ul className="list-none mb-6">
          <li><strong>Manzil:</strong> Jizzax shahar, O'zbekiston</li>
          <li><strong>Telefon:</strong> <a href="tel:+998919449491" className="text-gray-900 hover:underline">+998 91 944 94 91</a></li>
          <li><strong>Email:</strong> <a href="mailto:dotsoftuz@gmail.com" className="text-gray-900 hover:underline">dotsoftuz@gmail.com</a></li>
        </ul>

        <p className="text-lg text-gray-700">
          Sizning biznesingizni rivojlantirish yo'lida hamkorlik qilishdan mamnunmiz!
        </p>
      </div>

        <h2 className="text-clamp-title items-center text-center text-primary pb-10 border-t pt-10 ">
          <br />
          Biz bilan bog&apos;laning.
        </h2>

        <div className="w-full container md:max-w-xl mx-auto">
          <ContactForm />
        </div>

        <div className="w-full container md:max-w-xl mx-auto">
          <div className="flex items-center space-x-2 my-5">
            <div className="w-full h-[2px] bg-border" />
            <small>OR</small>
            <div className="w-full h-[2px] bg-border" />
          </div>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/ubehruz"
          >
            <Button
              variant="secondary"
              className="flex items-center gap-2 w-full mb-10"
            >
              <Send className="w-4 h-4" />
              <span>Telegram orqali bog&apos;lanish</span>
            </Button>
          </a>
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
