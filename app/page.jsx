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

const projects = [
  {
    title: `Savdo jarayonlarini avtomatlashtirish`,
    description:
      "Savdolarni qo'lda boshqarishdan qutulib, savdo jarayonlarini avtomatlashtiring va xatoliklarni kamaytiring.",
    src: "/assets/control.jpg",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    rotate: [3, -2],
    color: "#BBACAF",
  },
  {
    title: "Mijozlar bazasini boshqarish",
    description:
      "Mijozlar haqida to'liq ma'lumotga ega bo'lib, ularning talablarini yaxshiroq tushuning va xizmat sifatini oshiring.",
    src: "/assets/account.jpg",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    rotate: [-4, 2],
    color: "#977F6D",
  },
  {
    title: "Inventarizatsiyani kuzatib boring",
    description:
      "Mahsulotlar zaxirasini real vaqtda kuzatish va yangilash imkoniyati bilan tovarlar harakatini nazorat qiling.",
    src: "/assets/customer.webp",
    link: "https://www.ignant.com/2023//28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    rotate: [10, -2],
    color: "#C2491D",
  },
  {
    title: "Moliyaviy hisobotlarni tahlil qilish",
    description:
      "Moliyaviy holatni aniq tahlil qilish orqali qaror qabul qilishda yordam beruvchi hisobotlarni yarating.",
    src: "/assets/statistic.png",
    link: "https://www.ignant.com/2019/03/13/a-photographic-series-depicting-the-uncertain-future-of-denmarks-treasured-coastlines/",
    rotate: [-7, 3],
    color: "#B62429",
  },
  {
    title: "Jamoani boshqarish va o'zaro hamkorlik",
    description:
      "Jamoa a'zolari bilan samarali hamkorlik qilish va vazifalarni taqsimlash imkoniyati bilan ish samaradorligini oshiring.",
    src: "/assets/sell.jpg",
    link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
    rotate: [6, -2],
    color: "#88A28D",
  },
  {
    title: "Mobil ilovalar orqali ishlash",
    description:
      "Har joyda va har qanday qurilmadan kirish imkoniyati bilan biznesingizni boshqarishda moslashuvchanlikka ega bo'ling.",
    src: "/assets/control.webp",
    link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
    rotate: [10, 0],
    color: "#88A28D",
  },
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
      // lerp: 1,
      wheelMultiplier: 0,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

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

      <Header />
      <Call />
      <About data={projects} />

      {/* <section ref={container} className="container mx-auto pt-10 md:pt-16">
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
      </section> */}

      <HomeServices />
      {/* <Types /> */}
      <Comments />
      <Clients />
      <Price />
      {/* <Cards /> */}
      {/* <Blog /> */}

      <Contact />
      <HomeFooter />
    </main>
  );
}
