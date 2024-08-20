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
        <title>Maxfiylik siyosati | INREPORT</title>
        <meta name="description" content="INREPORT platformasining maxfiylik siyosati. Sizning shaxsiy ma'lumotlaringiz qanday to'planadi, saqlanadi va himoyalanadi." />
      </Head>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Maxfiylik siyosati</h1>
        
        <p className="mb-6 text-lg text-gray-700">
        INREPORT platformasi foydalanuvchilarining shaxsiy ma'lumotlarini himoya qilishga qat'iy amal qiladi. Biz siz haqingizdagi ma'lumotlarni qanday yig'ishimiz, ulardan foydalanishimiz va saqlashimiz haqida quyida batafsil ma'lumot berilgan.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ma'lumotlarni yig'ish va ulardan foydalanish</h2>
        <p className="mb-6 text-lg text-gray-700">
          Biz quyidagi ma'lumotlarni to'plashimiz mumkin:
        </p>
        <ul className="list-disc list-inside mb-6 text-lg text-gray-700">
          <li>Ism va familiya</li>
          <li>Elektron pochta manzili</li>
          <li>Telefon raqami</li>
          <li>IP manzil va qurilma ma'lumotlari</li>
          <li>Foydalanuvchi tajribasi va veb-sayt xatti-harakatlari</li>
        </ul>
        <p className="mb-6 text-lg text-gray-700">
          Ushbu ma'lumotlar xizmatlarimizni yaxshilash, foydalanuvchilar bilan aloqa o'rnatish, xavfsizlikni ta'minlash va qonuniy majburiyatlarni bajarish uchun ishlatiladi.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ma'lumotlaringizni himoya qilish</h2>
        <p className="mb-6 text-lg text-gray-700">
          Biz foydalanuvchilarning shaxsiy ma'lumotlarini xavfsiz saqlash uchun zamonaviy texnologiyalar va xavfsizlik protokollaridan foydalanamiz. Maxfiy ma'lumotlar shifrlanadi va faqat maxsus huquqiy sabablar asosida uchinchi tomonlarga oshkor qilinishi mumkin.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ma'lumotlarni uchinchi tomonlarga oshkor qilish</h2>
        <p className="mb-6 text-lg text-gray-700">
          Biz foydalanuvchilarning shaxsiy ma'lumotlarini uchinchi tomonlarga sotmaymiz va ulashmaymiz, faqat quyidagi hollarda:
        </p>
        <ul className="list-disc list-inside mb-6 text-lg text-gray-700">
          <li>Qonuniy talablar asosida</li>
          <li>Xavfsizlikni ta'minlash uchun</li>
          <li>Bizning xizmatlarimizni taqdim etish uchun ishonchli xizmat ko'rsatuvchilar bilan</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies va kuzatish texnologiyalari</h2>
        <p className="mb-6 text-lg text-gray-700">
          Biz cookies va boshqa kuzatish texnologiyalaridan foydalanuvchilar tajribasini yaxshilash va xizmatlarimizni optimallashtirish uchun foydalanamiz. Foydalanuvchilar cookies fayllarini o'chirib qo'yishlari mumkin, ammo bu xizmatlarimiz funksionalligiga ta'sir qilishi mumkin.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ma'lumotlarni saqlash</h2>
        <p className="mb-6 text-lg text-gray-700">
          Sizning shaxsiy ma'lumotlaringiz faqat kerakli muddat davomida saqlanadi va ushbu muddat tugagach, xavfsiz tarzda o'chiriladi. Ma'lumotlarni saqlash muddati xizmat turlari va qonuniy talablar asosida belgilanadi.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Foydalanuvchilar huquqlari</h2>
        <p className="mb-6 text-lg text-gray-700">
          Foydalanuvchilar o'z ma'lumotlariga kirish, ularni tahrirlash yoki o'chirish huquqiga ega. Bu huquqlardan foydalanish uchun biz bilan bog'lanishingiz mumkin.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Maxfiylik siyosatiga o'zgarishlar</h2>
        <p className="mb-6 text-lg text-gray-700">
          Maxfiylik siyosatiga kiritilgan o'zgarishlar ushbu sahifada yangilanadi. Foydalanuvchilar ushbu o'zgarishlarni kuzatishlari tavsiya etiladi.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Biz bilan bog'laning</h2>
        <p className="mb-4 text-lg text-gray-700">
          Maxfiylik siyosati bo'yicha savollaringiz bo'lsa, quyidagi manzillar orqali biz bilan bog'lanishingiz mumkin:
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
