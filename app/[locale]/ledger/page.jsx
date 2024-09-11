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
        <Head>
          <title>Hisob-kitoblaringizni qog'ozda yuritasizmi?</title>
          <meta
            name="description"
            content="Hisob-kitoblaringizni qog'ozda yuritasizmi? INREPORT sizga raqamli formatda qulay boshqarish imkoniyatlarini taqdim etadi."
          />
        </Head>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Hisob-kitoblaringizni qog'ozda yuritasizmi?
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hisob-kitoblarni Qog'ozda Yuritishning Muammolari
            </h2>
            <ul className="list-disc pl-5">
              <li>
                <strong>Xatoliklar va Noaniqliklar:</strong> Qog'ozda
                hisob-kitoblar yuritish xatoliklarni ko'paytirishi mumkin.
                Ma'lumotlarni qo'lda kiritish va yangilashda xatoliklar sodir
                bo'lishi ehtimoli yuqori.
              </li>
              <li>
                <strong>Vaqtni Sarflash:</strong> Hisob-kitoblarni qog'ozda
                yuritish ko'p vaqt talab qiladi. Hisoblarni yig'ish, hisoblash
                va tekshirish jarayonlari uzoq va murakkab bo'lishi mumkin.
              </li>
              <li>
                <strong>Ma'lumotlarni Qidirish:</strong> Qog'ozda saqlangan
                ma'lumotlarni tezda topish qiyin bo'lishi mumkin. Ma'lumotlarni
                topish va tahlil qilish qiyinchilik tug'dirishi mumkin.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              INREPORT Sizga Qanday Yordam Beradi?
            </h2>
            <ul className="list-disc pl-5">
              <li>
                <strong>Raqamli Hisob-kitob:</strong> INREPORT bilan
                hisob-kitoblaringizni raqamli formatda boshqarishingiz mumkin.
                Ma'lumotlaringizni tezda kiritish, tahrirlash va yangilash
                imkoniyatiga ega bo'lasiz.
              </li>
              <li>
                <strong>Avtomatik Hisoblash:</strong> Dastur avtomatik hisoblash
                va tahlil qilish imkoniyatlarini taqdim etadi, bu esa
                xatoliklarni kamaytiradi va vaqtni tejaydi.
              </li>
              <li>
                <strong>Tezkor Ma'lumotlarni Topish:</strong> INREPORT
                ma'lumotlarni tezda qidirish va tahlil qilish imkoniyatlarini
                taklif qiladi. Ma'lumotlarni qidirish va natijalarni olish juda
                oson.
              </li>
              <li>
                <strong>Xavfsizlik va Saqlash:</strong> Ma'lumotlaringizni
                xavfsiz saqlash va saqlash imkoniyatlari mavjud. Shaxsiy va
                moliyaviy ma'lumotlaringiz xavfsiz bo'ladi.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Biz bilan Aloqa
            </h2>
            <p className="mb-4">
              Ko'proq ma'lumot olish yoki demo versiyani sinab ko'rish uchun biz
              bilan bog'laning:
            </p>
            <ul className="list-none">
              <li>
                <strong>Telefon:</strong>{" "}
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
                  href="dotsoftuz@gmail.com"
                  className="text-gray-900 hover:underline"
                >
                  dotsoftuz@gmail.com
                </a>
              </li>
              <li>
                <strong>Manzil:</strong> IT PARK, Jizzax shahar, O'zbekiston
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-clamp-title items-center text-center text-primary pb-10 border-t pt-10 ">
          <span className="text-muted-foreground">Aloqa.</span>
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
