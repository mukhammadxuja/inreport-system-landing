"use client";
import { useEffect, useRef, useState } from "react";

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
      lerp: 0.15,
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

      <h2 className="text-clamp-title items-center text-center text-primary pt-24 pb-10 md:pt-24 lg:pt-36">
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
          <Button className="flex items-center gap-2 w-full bg-blue-50 hover:bg-blue-500 text-blue-500 hover:text-white mb-10">
            <Send className="w-4 h-4" />
            <span>Telegram orqali bog&apos;lanish</span>
          </Button>
        </a>
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
