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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import MobileNav from "@/components/home/mobile-nav";
import Comments from "@/components/home/comments";
import Price from "@/components/home/prices";
import { useMainContext } from "@/context/main-context";
import Clients from "@/components/home/clients";
import FAQ from "@/components/home/faq";
import { Input } from "@/components/ui/input";

const projects = [
  {
    title: `Savdo bo'limi nazorati`,
    description:
      "Real vaqt rejimida sotish, ombor balanslari va buyurtmalarni qayta ishlashni kuzatib borish.",
    src: "/assets/control.jpg",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    rotate: [3, -2],
    color: "#BBACAF",
  },
  {
    title: "Tovarlar hisob kitobi",
    description:
      "Inreport tovarlarni hisobga olish uchun professional dastur bo'lib, unda barcha tovarlar harakati kaftingizdagidek ko'rinadi, shuningdek, firibgarlik bilan bog'liq og'rilik va yo'qotishlarni oldini oladi.",
    src: "/assets/account.jpg",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    rotate: [-4, 2],
    color: "#977F6D",
  },
  {
    title: "Mijozlarni boshqarish",
    description:
      "Inreport tizimida mijozlarning barcha ma'luotlarini qayd etishingiz, ularning afzalliklarini kuzatishingiz, sodiqlik dasturini yaratishingiz va shaxsiy takliflarni ishga tushurishingiz mumkin.",
    src: "/assets/customer.webp",
    link: "https://www.ignant.com/2023//28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    rotate: [10, -2],
    color: "#C2491D",
  },
  {
    title: "Hisobotlar va tahlillar",
    description:
      "Hisobotlarni har qanday qurulmada ko'rib chiqish mumkin. Tayyor hisobotlar tovarlarni sotib olish, sotuvchilarni rag'batlanirish, sotishni ko'paytirish, marketing faoliyatini boshlash va shu kabi qarorlarni qabul qilishni osonlashtiradi.",
    src: "/assets/statistic.png",
    link: "https://www.ignant.com/2019/03/13/a-photographic-series-depicting-the-uncertain-future-of-denmarks-treasured-coastlines/",
    rotate: [-7, 3],
    color: "#B62429",
  },
  {
    title: "Savdo bo'yicha hisobotlar",
    description:
      "Savdo hisoboti sizga kunlar, oylar va soatlar kesimida aks ettirilgan sotuvlar dinamikasi, sof foyda, operatsiyalar, almashtirishlar, qaytarishlar soni va boshqa foydali ma'lumotlarni ko'rsatadi",
    src: "/assets/sell.jpg",
    link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
    rotate: [6, -2],
    color: "#88A28D",
  },
  // {
  //   title: "Moliyani boshqarish",
  //   description:
  //     "Moliya boshqaruvi sizga daromad va xarajatlarni kuzatishda sizga shaffoflikni taminlaydi. O'g'irliklar vs hodimlarning noto'g'ri harakatlarini kamaytirish, shuningdek, do'konadgi xarajatlarni optimmallashtirish imkonini beradi",
  //   src: "/assets/control.webp",
  //   link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
  //   rotate: [10, 0],
  //   color: "#88A28D",
  // },
];

export default function Home() {
  const { openMobileNav, setOpenMobileNav } = useMainContext();
  const [openPhone, setOpenPhone] = useState(false);
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      // wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
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

      <Header />

      <div className="fixed bottom-10 right-[3rem] container z-50 duration-500 w-fit">
        <Popover className="">
          <PopoverTrigger className="inline-block bg-gray-200 p-1 rounded-full cursor-pointer shadow-md">
            {openPhone ? (
              <X
                onClick={() => setOpenPhone(false)}
                className="p-3 w-12 h-12 bg-border rounded-full"
              />
            ) : (
              <Phone
                onClick={() => setOpenPhone(true)}
                className="p-3 w-12 h-12 bg-border rounded-full"
              />
            )}
          </PopoverTrigger>
          <PopoverContent
            className="w-80 bg-accent border-2 border-border"
            align="end"
          >
            <h6>Telefon raqamingiz</h6>
            <p className="text-muted-foreground text-xs">
              Menejerlarimi siz bilan tez orada bo&apos;g&apos;lanishadi.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative">
                <b className="absolute left-2.5 top-1/2 -translate-y-1/2 text-lg font-semibold text-primary">
                  +998
                </b>
                <Input
                  type="number"
                  className="pl-16 text-lg placeholder:text-primary font-semibold text-primary"
                />
              </div>
              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <section ref={container} className="container mx-auto pt-10 md:pt-16">
        <div className="w-full">
          <h2 className="text-clamp-title items-center text-center">
            <span className="text-muted-foreground">Barcha vazifalar</span>
            <br />
            uchun bitta yechim.
          </h2>
          <Button className="flex items-center gap-1.5 mx-auto mt-5">
            <span>Ko&apos;proq ma&apos;lumot</span>
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <CardTemplate
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
      <HomeServices />
      <Comments />
      <Clients />
      <Price />
      {/* <Cards /> */}
      <Blog />

      <Contact />
      <HomeFooter />
    </main>
  );
}
